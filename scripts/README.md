# DeepRubric Development Scripts

This directory contains utility scripts for managing the DeepRubric application.

## Quick Start Guide

### Starting the Backend

```bash
# Navigate to backend directory
cd apps/backend

# Install dependencies (if needed)
poetry install

# Start the backend server
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Backend will be available at:** http://localhost:8000

### Starting the Frontend

```bash
# Use the startup script (recommended)
./scripts/start-frontend.sh

# Or manually:
cd apps/frontend
pnpm install
pnpm dev
```

**Frontend will be available at:** http://localhost:3000 (or next available port)

### Starting Both Services

1. **Terminal 1 - Backend:**
   ```bash
   cd apps/backend
   poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   ./scripts/start-frontend.sh
   ```

## Available Scripts

### Backend Scripts

#### `seed_db.py`
Seeds the database with test data including users, courses, and enrollments.

**Usage:**
```bash
cd apps/backend
poetry run python scripts/seed_db.py
```

**What it creates:**
- Admin user: admin@deeprubric.com (password: password123)
- Professor user: teacher@deeprubric.com (password: password123)
- TA user: grader@deeprubric.com (password: password123)
- Student user: student@deeprubric.com (password: password123)
- Test course: TEST101 - Test Course
- Enrollments linking users to the test course with their respective roles

#### `service.sh`
Backend service management script.

**Usage:**
```bash
./scripts/service.sh start    # Start backend service
./scripts/service.sh stop     # Stop backend service
./scripts/service.sh restart  # Restart backend service
./scripts/service.sh status   # Check service status
```

### Frontend Scripts

#### `start-frontend.sh`
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

## Development Workflow

### 1. Initial Setup
```bash
# Clone the repository
git clone https://github.com/tianzesun/DeepRubric.git
cd DeepRubric

# Install pnpm (if not already installed)
npm install -g pnpm

# Install workspace dependencies
pnpm install
```

### 2. Database Setup
```bash
# Navigate to backend
cd apps/backend

# Run database migrations
poetry run alembic upgrade head

# Seed the database with test data
poetry run python scripts/seed_db.py
```

### 3. Start Development Servers
```bash
# Terminal 1: Start backend
cd apps/backend
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2: Start frontend
./scripts/start-frontend.sh
```

### 4. Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs

## Test Users

After seeding the database, you can use these test accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@deeprubric.com | password123 |
| Professor | teacher@deeprubric.com | password123 |
| TA/Grader | grader@deeprubric.com | password123 |
| Student | student@deeprubric.com | password123 |

## Troubleshooting

### Frontend Issues
- **Lock file errors:** The startup script automatically handles Next.js lock files
- **Dependency issues:** The script uses `pnpm install` to resolve workspace dependencies
- **Port conflicts:** The script will use the next available port if 3000 is taken

### Backend Issues
- **Database connection:** Ensure PostgreSQL is running and credentials are correct
- **Migration issues:** Run `alembic upgrade head` to apply pending migrations
- **Port conflicts:** Change the port in the uvicorn command if 8000 is taken

### Common Commands
```bash
# Check if services are running
ps aux | grep uvicorn
ps aux | grep next

# Kill running services
pkill -f uvicorn
pkill -f "next dev"

# Clean frontend build cache
rm -rf apps/frontend/.next