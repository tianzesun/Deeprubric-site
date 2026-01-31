# Backend Integration Guide

This document provides a comprehensive guide for integrating the frontend with the recommended backend structure for DeepRubric.

## 🏗️ Backend Structure Overview

The backend follows a feature-based modular architecture with clear separation of concerns:

```
DeepRubric/apps/backend/app/
├── api/v1/routers/          # FastAPI routers (versioned)
├── services/                # Business logic
├── repositories/            # Database operations
├── models/                  # SQLAlchemy ORM models
├── schemas/                 # Pydantic models
├── permissions/             # Role-based access control
└── core/                    # Core utilities
```

## 🔄 Frontend-Backend Feature Mapping

### Authentication & Authorization

**Backend Structure:**
```
backend/app/api/v1/routers/auth.py
backend/app/services/auth_service.py
backend/app/repositories/user_repo.py
backend/app/schemas/auth_schema.py
backend/app/permissions/role.py
```

**Frontend Integration:**
```typescript
// Frontend: apps/frontend/features/auth/
├── api/auth.api.ts         // Maps to /api/v1/auth/*
├── services/auth.service.ts // Calls auth_service.py endpoints
├── hooks/useAuth.ts        // Manages JWT tokens from backend
└── policy/auth.permission.ts // Maps to backend permissions
```

**Key Endpoints:**
- `POST /api/v1/auth/login` - Login with email/password
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/reset-password` - Password reset
- `GET /api/v1/auth/me` - Get current user info

### User Management

**Backend Structure:**
```
backend/app/api/v1/routers/users.py
backend/app/services/user_service.py
backend/app/repositories/user_repo.py
backend/app/schemas/user_schema.py
```

**Frontend Integration:**
```typescript
// Frontend: apps/frontend/features/auth/
├── types/user.types.ts     // Maps to user_schema.py
├── api/auth.api.ts         // Maps to /api/v1/users/*
└── services/auth.service.ts // Calls user_service.py
```

**Key Endpoints:**
- `GET /api/v1/users` - List users (admin only)
- `GET /api/v1/users/{id}` - Get user by ID
- `PUT /api/v1/users/{id}` - Update user
- `DELETE /api/v1/users/{id}` - Delete user (admin only)

### Course Management

**Backend Structure:**
```
backend/app/api/v1/routers/courses.py
backend/app/services/course_service.py
backend/app/repositories/course_repo.py
backend/app/schemas/course_schema.py
```

**Frontend Integration:**
```typescript
// Frontend: apps/frontend/features/course/
├── types/course.types.ts   // Maps to course_schema.py
├── api/course.api.ts       // Maps to /api/v1/courses/*
├── services/course.service.ts // Calls course_service.py
└── hooks/useCourses.ts     // Manages course state
```

**Key Endpoints:**
- `GET /api/v1/courses` - List courses (filtered by role)
- `POST /api/v1/courses` - Create course (professor only)
- `GET /api/v1/courses/{id}` - Get course details
- `PUT /api/v1/courses/{id}` - Update course
- `DELETE /api/v1/courses/{id}` - Delete course
- `POST /api/v1/courses/{id}/enroll` - Enroll user
- `DELETE /api/v1/courses/{id}/unenroll` - Unenroll user

### Assignment Management

**Backend Structure:**
```
backend/app/api/v1/routers/assignments.py
backend/app/services/assignment_service.py
backend/app/repositories/assignment_repo.py
backend/app/schemas/assignment_schema.py
```

**Frontend Integration:**
```typescript
// Frontend: apps/frontend/features/assignment/
├── types/assignment.types.ts // Maps to assignment_schema.py
├── api/assignment.api.ts     // Maps to /api/v1/assignments/*
├── services/assignment.service.ts // Calls assignment_service.py
└── hooks/useAssignments.ts   // Manages assignment state
```

**Key Endpoints:**
- `GET /api/v1/assignments` - List assignments (filtered by course/role)
- `POST /api/v1/assignments` - Create assignment (professor/TA)
- `GET /api/v1/assignments/{id}` - Get assignment details
- `PUT /api/v1/assignments/{id}` - Update assignment
- `DELETE /api/v1/assignments/{id}` - Delete assignment
- `POST /api/v1/assignments/{id}/submit` - Submit assignment
- `GET /api/v1/assignments/{id}/submissions` - Get submissions

### Grading System

**Backend Structure:**
```
backend/app/api/v1/routers/grading.py
backend/app/services/grading_service.py
backend/app/repositories/grading_repo.py
backend/app/schemas/grading_schema.py
```

**Frontend Integration:**
```typescript
// Frontend: apps/frontend/features/grading/
├── types/grading.types.ts  // Maps to grading_schema.py
├── api/grading.api.ts      // Maps to /api/v1/grading/*
├── services/grading.service.ts // Calls grading_service.py
└── hooks/useGrading.ts     // Manages grading state
```

**Key Endpoints:**
- `GET /api/v1/grading` - List grades (filtered by role)
- `POST /api/v1/grading` - Create grade (professor/TA)
- `PUT /api/v1/grading/{id}` - Update grade
- `DELETE /api/v1/grading/{id}` - Delete grade
- `POST /api/v1/grading/{id}/review` - Request grade review
- `POST /api/v1/grading/{id}/dispute` - Submit grade dispute
- `GET /api/v1/grading/{id}/history` - Get grade history

### Rubric Management

**Backend Structure:**
```
backend/app/api/v1/routers/rubrics.py
backend/app/services/rubric_service.py
backend/app/repositories/rubric_repo.py
backend/app/schemas/rubric_schema.py
```

**Frontend Integration:**
```typescript
// Frontend: apps/frontend/features/rubric/ (to be created)
├── types/rubric.types.ts   // Maps to rubric_schema.py
├── api/rubric.api.ts       // Maps to /api/v1/rubrics/*
├── services/rubric.service.ts // Calls rubric_service.py
└── hooks/useRubrics.ts     // Manages rubric state
```

**Key Endpoints:**
- `GET /api/v1/rubrics` - List rubrics
- `POST /api/v1/rubrics` - Create rubric
- `GET /api/v1/rubrics/{id}` - Get rubric details
- `PUT /api/v1/rubrics/{id}` - Update rubric
- `DELETE /api/v1/rubrics/{id}` - Delete rubric

### Gradebook & Analytics

**Backend Structure:**
```
backend/app/api/v1/routers/gradebook.py
backend/app/services/gradebook_service.py
backend/app/repositories/gradebook_repo.py
backend/app/schemas/gradebook_schema.py
```

**Frontend Integration:**
```typescript
// Frontend: apps/frontend/features/gradebook/ (to be created)
├── types/gradebook.types.ts // Maps to gradebook_schema.py
├── api/gradebook.api.ts     // Maps to /api/v1/gradebook/*
├── services/gradebook.service.ts // Calls gradebook_service.py
└── hooks/useGradebook.ts    // Manages gradebook state
```

**Key Endpoints:**
- `GET /api/v1/gradebook/courses/{course_id}` - Course gradebook
- `GET /api/v1/gradebook/students/{student_id}` - Student grades
- `GET /api/v1/gradebook/export` - Export grades
- `POST /api/v1/gradebook/import` - Import grades
- `GET /api/v1/gradebook/analytics` - Grade analytics

## 🔐 Permission System Integration

### Backend Permission Structure

```python
# backend/app/permissions/role.py
class Role:
    ADMIN = "admin"
    PROFESSOR = "professor"
    TA = "ta"
    STUDENT = "student"

# backend/app/permissions/feature_permissions.py
FEATURE_PERMISSIONS = {
    "course_management": ["admin", "professor"],
    "assignment_creation": ["professor", "ta"],
    "grade_submission": ["professor", "ta"],
    "grade_view": ["professor", "ta", "student"],
    # ... more permissions
}
```

### Frontend Permission Integration

```typescript
// Frontend: apps/frontend/features/auth/policy/auth.permission.ts
export const PERMISSIONS = {
  COURSE_MANAGEMENT: ['admin', 'professor'],
  ASSIGNMENT_CREATION: ['professor', 'ta'],
  GRADE_SUBMISSION: ['professor', 'ta'],
  GRADE_VIEW: ['professor', 'ta', 'student'],
  // ... more permissions
};

// Usage in components
const { user, hasPermission } = useAuth();
const canCreateAssignment = hasPermission('ASSIGNMENT_CREATION');
```

## 📡 API Service Layer Pattern

### Service Implementation Example

```typescript
// apps/frontend/features/course/services/course.service.ts
import { Course, CourseCreateData, CourseUpdateData } from '../types/course.types';

class CourseService {
  private apiEndpoint = '/api/v1/courses';

  async getCourses(filters?: CourseFilter): Promise<Course[]> {
    const params = new URLSearchParams();
    if (filters?.role) params.append('role', filters.role);
    if (filters?.professorId) params.append('professor_id', filters.professorId);
    
    const response = await fetch(`${this.apiEndpoint}?${params}`);
    if (!response.ok) throw new Error('Failed to fetch courses');
    return response.json();
  }

  async createCourse(data: CourseCreateData): Promise<Course> {
    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create course');
    return response.json();
  }

  // ... other methods
}

export { CourseService };
```

## 🔄 State Management Integration

### Hook Pattern

```typescript
// apps/frontend/features/course/hooks/useCourses.ts
import { useState, useEffect, useCallback } from 'react';
import { CourseService } from '../services/course.service';

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const service = new CourseService();

  const fetchCourses = useCallback(async (filters?: CourseFilter) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getCourses(filters);
      setCourses(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    // ... other methods
  };
};
```

## 🧪 Testing Strategy

### Unit Tests

```typescript
// apps/frontend/features/course/__tests__/course.service.test.ts
describe('CourseService', () => {
  it('should fetch courses successfully', async () => {
    // Mock fetch response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCourses)
    });

    const service = new CourseService();
    const result = await service.getCourses();
    
    expect(result).toEqual(mockCourses);
  });
});
```

### Integration Tests

```typescript
// apps/frontend/features/course/__tests__/course.integration.test.ts
describe('Course Integration', () => {
  it('should create and fetch course', async () => {
    // Test full flow from API to state
    const { result } = renderHook(() => useCourses());
    
    await act(async () => {
      await result.current.createCourse(mockCourseData);
    });

    expect(result.current.courses).toContain(mockCourse);
  });
});
```

## 🚀 Deployment Considerations

### Environment Configuration

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
NEXT_PUBLIC_VERSION=1.0.0
```

### CORS Configuration

```python
# backend/app/main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Authentication Flow

1. **Login**: Frontend → `/api/v1/auth/login` → JWT token
2. **Storage**: Store token in httpOnly cookie or secure storage
3. **Requests**: Include token in Authorization header
4. **Validation**: Backend validates token on each request
5. **Refresh**: Automatic token refresh when expired

## 📋 Implementation Checklist

- [ ] **API Endpoints**: Verify all required endpoints exist in backend
- [ ] **Data Models**: Ensure frontend types match backend schemas
- [ ] **Permissions**: Map frontend permissions to backend roles
- [ ] **Error Handling**: Implement consistent error handling
- [ ] **Loading States**: Add loading indicators for all async operations
- [ ] **Validation**: Client-side validation matching backend rules
- [ ] **Testing**: Unit and integration tests for all features
- [ ] **Documentation**: API documentation and integration guides

## 🔧 Future Enhancements

### AI Integration
```typescript
// apps/frontend/features/ai/services/ai.service.ts
class AIService {
  async analyzeSubmission(submissionId: string): Promise<AIAnalysis> {
    const response = await fetch(`/api/v1/ai/analyze/${submissionId}`);
    return response.json();
  }
}
```

### Real-time Updates
```typescript
// WebSocket integration for live updates
class WebSocketService {
  private ws: WebSocket;

  connect() {
    this.ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Handle real-time updates
    };
  }
}
```

### Mobile App Integration
```typescript
// React Native compatibility
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
```

This integration guide ensures seamless communication between the frontend and backend while maintaining the modular, scalable architecture of both systems.