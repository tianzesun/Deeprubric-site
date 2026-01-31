# Backend Scripts

This directory contains utility scripts for managing the DeepRubric backend.

## Quick Start

For complete startup instructions including both backend and frontend, see the comprehensive guide at: **`scripts/README.md`**

## Database Seeding

### `seed_db.py`

Creates initial test users for the application with different roles:

- **Admin User** (`admin@deeprubric.com`): Superuser with administrative privileges
- **Professor Oak** (`teacher@deeprubric.com`): Teacher role for creating courses and rubrics
- **TA Terry** (`grader@deeprubric.com`): Grader role for evaluating submissions
- **Student Sam** (`student@deeprubric.com`): Student role for submitting assignments

#### Usage

```bash
cd apps/backend
python scripts/seed_db.py
```

#### Requirements

- Database must be initialized and migrations applied
- SQLAlchemy models must be available
- Environment variables for database connection must be set

#### Notes

- Script checks for existing users by email to avoid duplicates
- Passwords are hashed using bcrypt for security
- All users are created with `is_active=True`

## Frontend Scripts

### `start-frontend.sh`

Starts the frontend development server with proper dependency installation.

**Usage:**
```bash
./scripts/start-frontend.sh
```

**What it does:**
- Checks for proper project structure
- Navigates to the frontend directory
- Installs frontend dependencies (pnpm install)
- Starts the development server on http://localhost:3000
- Provides clear status messages and error handling

**Prerequisites:**
- Node.js and pnpm installed
- Run from the project root directory

**Notes:**
- The script will automatically install dependencies if they're missing
- Use Ctrl+C to stop the development server
- Frontend will be accessible at http://localhost:3000
