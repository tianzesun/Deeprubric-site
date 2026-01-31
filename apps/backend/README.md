# DeepRubric Backend

## Overview
FastAPI backend for DeepRubric: handles authentication, database CRUD, and API for frontend and AI worker.

## Database Architecture

### Core Design Principles

This is a **scoring engine**, not just a submission system. The database design follows these principles:

- **Users ≠ Roles ≠ Behavior**: Role is contextual to courses, not global
- **Stable Teaching Entities**: Courses and rubrics are independent core entities  
- **Audit Trail**: All tables have created_at timestamps for compliance
- **No JSON Storage**: All data is properly normalized in relational tables
- **Contextual Roles**: Same user can be professor in one course, student in another

### Schema Structure

```
users (system identity)
  └── enrollments (user-course-role relationships)
          └── courses (teaching entities)

rubrics (scoring templates)
  └── rubric_criteria (scoring dimensions)
          └── scores (actual scoring results)
```

### Table Design

#### 1. users (System Identity)
**Purpose**: Stable user identity table - core and unchanging
**Fields**:
- `id`: SERIAL PRIMARY KEY
- `email`: VARCHAR(255) UNIQUE NOT NULL (login identifier)
- `full_name`: VARCHAR(255) NOT NULL
- `is_active`: BOOLEAN NOT NULL DEFAULT true
- `created_at`: TIMESTAMPTZ NOT NULL
- `updated_at`: TIMESTAMPTZ NOT NULL

**Key Design**: Role is NOT stored here - it's in enrollments table

#### 2. courses (Teaching Entity)
**Purpose**: Core business data for courses
**Fields**:
- `id`: SERIAL PRIMARY KEY
- `code`: VARCHAR(50) NOT NULL (school course code)
- `title`: VARCHAR(255) NOT NULL
- `term`: VARCHAR(50) NOT NULL (e.g., "2025F")
- `is_active`: BOOLEAN NOT NULL DEFAULT true
- `created_at`: TIMESTAMPTZ NOT NULL

**Constraints**: UNIQUE(code, term) - prevents duplicate course entries

#### 3. enrollments (User-Course Relationship)
**Purpose**: Connects users to courses with contextual roles
**Fields**:
- `id`: SERIAL PRIMARY KEY
- `user_id`: INTEGER FK → users.id
- `course_id`: INTEGER FK → courses.id
- `role`: VARCHAR(50) NOT NULL (student/instructor/ta)
- `created_at`: TIMESTAMPTZ NOT NULL

**Constraints**: UNIQUE(user_id, course_id) - one enrollment per user per course

#### 4. rubrics (Scoring Templates)
**Purpose**: Scoring templates that can be reused across assignments
**Fields**:
- `id`: SERIAL PRIMARY KEY
- `course_id`: INTEGER FK → courses.id
- `created_by`: INTEGER FK → users.id
- `title`: VARCHAR(255) NOT NULL
- `description`: TEXT
- `total_points`: INTEGER NOT NULL
- `is_published`: BOOLEAN NOT NULL DEFAULT false
- `created_at`: TIMESTAMPTZ NOT NULL

**Design**: Templates are reusable, published status prevents modification

#### 5. rubric_criteria (Scoring Dimensions)
**Purpose**: Individual scoring items within a rubric
**Fields**:
- `id`: SERIAL PRIMARY KEY
- `rubric_id`: INTEGER FK → rubrics.id
- `title`: VARCHAR(255) NOT NULL
- `description`: TEXT
- `max_points`: INTEGER NOT NULL
- `sort_order`: INTEGER NOT NULL
- `created_at`: TIMESTAMPTZ NOT NULL

**Design**: Explicit ordering ensures consistent UI display

#### 6. scores (Actual Scoring Results)
**Purpose**: Real scoring data - one score per criterion
**Fields**:
- `id`: SERIAL PRIMARY KEY
- `rubric_id`: INTEGER FK → rubrics.id
- `criterion_id`: INTEGER FK → rubric_criteria.id
- `student_id`: INTEGER FK → users.id
- `grader_id`: INTEGER FK → users.id
- `points`: INTEGER NOT NULL
- `comment`: TEXT
- `created_at`: TIMESTAMPTZ NOT NULL

**Design**: Total score calculated from individual criterion scores for auditability

## ORM Architecture

### Base Class Structure
All models inherit from a single `DeclarativeBase`:

```python
# app/models/orm/base.py
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass
```

### Model Organization
```
app/models/orm/
├── base.py              # Single Base class
├── user.py              # User model
├── course.py            # Course model
├── enrollment.py        # Enrollment model
├── rubric.py            # Rubric model
├── rubric_criteria.py   # Rubric criteria model
├── score.py             # Score model
└── __init__.py          # Model registration
```

### Model Registration
The `__init__.py` file ensures all models are registered with the shared metadata:

```python
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

# Import all models to register them with Base.metadata
from . import user, course, enrollment, rubric, rubric_criteria, score

__all__ = ["Base"]
```

## Alembic Migration System

### Configuration
The `alembic/env.py` explicitly imports all models to ensure Alembic can see the complete schema:

```python
# Import the shared Base and all models
from app.models.orm.base import Base

# 强制导入所有 ORM 模型
from app.models.orm import user, course, enrollment, rubric, rubric_criteria, score

target_metadata = Base.metadata
```

### Migration Workflow

#### 1. Baseline Migration (Existing Database)
Since tables already exist, we created a baseline migration:

```python
def upgrade():
    """
    This migration reflects the existing database schema.
    Since the tables already exist, this is a no-op migration
    that simply establishes the baseline for future migrations.
    """
    pass
```

Database is stamped as up-to-date:
```bash
alembic stamp baseline_schema
```

#### 2. Future Migrations
For any schema changes:

```bash
# Generate migration
alembic revision --autogenerate -m "Description of changes"

# Review generated migration file
# Apply to development database
alembic upgrade head

# Test thoroughly
# Deploy to production
```

### Migration Best Practices

- **Single Base**: Only one `DeclarativeBase` for the entire application
- **Explicit Imports**: All models must be explicitly imported in `env.py`
- **No create_all()**: Never use `create_all()` in production - always use migrations
- **Audit Trail**: Every schema change must be a migration
- **Testing**: Always test migrations on development database first

## Database Setup

### Requirements
- PostgreSQL 14+
- Redis (for Celery background tasks)

### Environment Configuration
Set database URL in `.env.local`:

```bash
DATABASE_URL="postgresql://user:password@localhost/deeprubric"
```

### Initial Setup
1. Create database
2. Run baseline migration (already done)
3. Verify tables exist:
```bash
psql "$DATABASE_URL" -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
```

### Indexes for Performance
All foreign keys and frequently queried fields have indexes:
- `idx_users_email` on users.email
- `idx_courses_code` on courses.code
- `idx_rubrics_course_id` on rubrics.course_id
- `idx_scores_student_id` on scores.student_id
- And more...

## Development Workflow

### Adding New Tables
1. Create model in `app/models/orm/`
2. Import in `app/models/orm/__init__.py`
3. Generate migration: `alembic revision --autogenerate -m "Add new table"`
4. Review and apply migration
5. Test thoroughly

### Modifying Existing Tables
1. Update model definition
2. Generate migration: `alembic revision --autogenerate -m "Description"`
3. Review generated SQL carefully
4. Apply to development database
5. Test data integrity
6. Deploy to production

### Schema Validation
Always verify migrations work correctly:
```bash
# Check current schema state
alembic current

# Check for pending migrations
alembic heads

# Validate migration files
alembic upgrade head
```

## Requirements
- Python 3.11+
- Poetry (Python package manager)
- PostgreSQL
- Redis (for Celery)

## Poetry Setup

### Installing Poetry
Poetry is required for managing Python dependencies in this project.

#### Option 1: Install Poetry (Recommended)
```bash
# Install Poetry using the official installer
curl -sSL https://install.python-poetry.org | python3 -

# Add Poetry to your PATH (add to your shell profile)
export PATH="$HOME/.local/bin:$PATH"

# Verify installation
poetry --version
```

#### Option 2: Install via pip (Alternative)
```bash
pip install poetry
```

### Poetry Configuration
Configure Poetry to create virtual environments in the project directory:
```bash
# Set virtual environment location to project directory
poetry config virtualenvs.in-project true

# Verify configuration
poetry config --list
```

## Project Setup with Poetry

### 1. Install Dependencies
```bash
# Install all dependencies from pyproject.toml
poetry install

# Install with development dependencies
poetry install --with dev

# Install only production dependencies
poetry install --only main
```

### 2. Activate Virtual Environment
```bash
# Activate the project's virtual environment
poetry shell

# Or run commands within the virtual environment
poetry run python script.py
```

### 3. Managing Dependencies
```bash
# Add a new dependency
poetry add package-name

# Add a development dependency
poetry add --group dev package-name

# Remove a dependency
poetry remove package-name

# Update dependencies
poetry update

# Show dependency tree
poetry show --tree
```

### 4. Environment Management
```bash
# Create virtual environment
poetry env use python3.11

# List available environments
poetry env list

# Remove virtual environment
poetry env remove python3.11
```

### 5. Lock File Management
The `poetry.lock` file contains exact versions of all dependencies and should be committed to version control.

```bash
# Generate or update lock file
poetry lock

# Check if lock file is up to date
poetry lock --check

# Install from lock file
poetry install
```

## Setup

1. Install dependencies:
```bash
poetry install
