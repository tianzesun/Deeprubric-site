from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    PROFESSOR = "professor"
    TA = "grader"
    STUDENT = "student"

class AssignmentStatus(str, Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    SUBMITTED = "submitted"
    GRADED = "graded"
    CLOSED = "closed"

class GradeStatus(str, Enum):
    PENDING = "pending"
    GRADED = "graded"
    REVIEWED = "reviewed"
    DISPUTED = "disputed"

class SubmissionStatus(str, Enum):
    PENDING = "pending"
    SUBMITTED = "submitted"
    GRADED = "graded"
    LATE = "late"

# Feature permissions
FEATURE_PERMISSIONS = {
    "user_management": ["admin"],
    "user_create": ["admin"],
    "user_view": ["admin", "professor"],
    "user_update": ["admin", "professor"],
    "user_delete": ["admin"],
    
    "course_management": ["admin", "professor"],
    "course_create": ["professor"],
    "course_view": ["admin", "professor", "ta", "student"],
    "course_update": ["professor"],
    "course_delete": ["professor"],
    "course_enroll": ["admin", "professor"],
    "course_unenroll": ["admin", "professor"],
    "course_view_students": ["professor", "ta"],
    
    "assignment_management": ["professor", "ta"],
    "assignment_create": ["professor"],
    "assignment_view": ["professor", "ta", "student"],
    "assignment_update": ["professor"],
    "assignment_delete": ["professor"],
    "assignment_submit": ["student"],
    
    "grade_management": ["professor", "ta"],
    "grade_submission": ["professor", "ta"],
    "grade_view": ["professor", "ta", "student"],
    "grade_update": ["professor", "ta"],
    "grade_dispute": ["student"],
    "grade_review": ["professor", "ta"],
    
    "rubric_management": ["professor"],
    "rubric_create": ["professor"],
    "rubric_view": ["professor", "ta"],
    "rubric_update": ["professor"],
    "rubric_delete": ["professor"],
    
    "gradebook_view": ["professor", "ta", "student"],
    "gradebook_export": ["professor", "ta"],
    "gradebook_import": ["professor", "ta"],
    
    "analytics_view": ["admin", "professor"],
    "system_management": ["admin"],
    "system_health": ["admin"],
}