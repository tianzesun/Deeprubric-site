from enum import Enum
from typing import List, Set

class Role(str, Enum):
    ADMIN = "admin"
    PROFESSOR = "professor"
    TA = "ta"
    STUDENT = "student"

class Permission(str, Enum):
    # User permissions
    USER_LIST = "user_list"
    USER_VIEW = "user_view"
    USER_CREATE = "user_create"
    USER_UPDATE = "user_update"
    USER_DELETE = "user_delete"
    
    # Course permissions
    COURSE_VIEW = "course_view"
    COURSE_CREATE = "course_create"
    COURSE_UPDATE = "course_update"
    COURSE_DELETE = "course_delete"
    COURSE_ENROLL = "course_enroll"
    COURSE_UNENROLL = "course_unenroll"
    COURSE_VIEW_STUDENTS = "course_view_students"
    
    # Assignment permissions
    ASSIGNMENT_VIEW = "assignment_view"
    ASSIGNMENT_CREATE = "assignment_create"
    ASSIGNMENT_UPDATE = "assignment_update"
    ASSIGNMENT_DELETE = "assignment_delete"
    ASSIGNMENT_SUBMIT = "assignment_submit"
    
    # Grade permissions
    GRADE_VIEW = "grade_view"
    GRADE_SUBMISSION = "grade_submission"
    GRADE_UPDATE = "grade_update"
    GRADE_DISPUTE = "grade_dispute"
    GRADE_REVIEW = "grade_review"
    
    # Rubric permissions
    RUBRIC_VIEW = "rubric_view"
    RUBRIC_CREATE = "rubric_create"
    RUBRIC_UPDATE = "rubric_update"
    RUBRIC_DELETE = "rubric_delete"
    
    # Gradebook permissions
    GRADEBOOK_VIEW = "gradebook_view"
    GRADEBOOK_EXPORT = "gradebook_export"
    GRADEBOOK_IMPORT = "gradebook_import"
    
    # Analytics permissions
    ANALYTICS_VIEW = "analytics_view"
    
    # System permissions
    SYSTEM_MANAGEMENT = "system_management"
    SYSTEM_HEALTH = "system_health"

# Role to permissions mapping
ROLE_PERMISSIONS = {
    Role.ADMIN: {
        Permission.USER_LIST,
        Permission.USER_VIEW,
        Permission.USER_CREATE,
        Permission.USER_UPDATE,
        Permission.USER_DELETE,
        Permission.COURSE_VIEW,
        Permission.COURSE_CREATE,
        Permission.COURSE_UPDATE,
        Permission.COURSE_DELETE,
        Permission.COURSE_ENROLL,
        Permission.COURSE_UNENROLL,
        Permission.COURSE_VIEW_STUDENTS,
        Permission.ASSIGNMENT_VIEW,
        Permission.ASSIGNMENT_CREATE,
        Permission.ASSIGNMENT_UPDATE,
        Permission.ASSIGNMENT_DELETE,
        Permission.GRADE_VIEW,
        Permission.GRADE_SUBMISSION,
        Permission.GRADE_UPDATE,
        Permission.GRADE_REVIEW,
        Permission.RUBRIC_VIEW,
        Permission.RUBRIC_CREATE,
        Permission.RUBRIC_UPDATE,
        Permission.RUBRIC_DELETE,
        Permission.GRADEBOOK_VIEW,
        Permission.GRADEBOOK_EXPORT,
        Permission.GRADEBOOK_IMPORT,
        Permission.ANALYTICS_VIEW,
        Permission.SYSTEM_MANAGEMENT,
        Permission.SYSTEM_HEALTH,
    },
    Role.PROFESSOR: {
        Permission.COURSE_VIEW,
        Permission.COURSE_CREATE,
        Permission.COURSE_UPDATE,
        Permission.COURSE_DELETE,
        Permission.COURSE_ENROLL,
        Permission.COURSE_UNENROLL,
        Permission.COURSE_VIEW_STUDENTS,
        Permission.ASSIGNMENT_VIEW,
        Permission.ASSIGNMENT_CREATE,
        Permission.ASSIGNMENT_UPDATE,
        Permission.ASSIGNMENT_DELETE,
        Permission.GRADE_VIEW,
        Permission.GRADE_SUBMISSION,
        Permission.GRADE_UPDATE,
        Permission.GRADE_REVIEW,
        Permission.RUBRIC_VIEW,
        Permission.RUBRIC_CREATE,
        Permission.RUBRIC_UPDATE,
        Permission.RUBRIC_DELETE,
        Permission.GRADEBOOK_VIEW,
        Permission.GRADEBOOK_EXPORT,
        Permission.GRADEBOOK_IMPORT,
        Permission.ANALYTICS_VIEW,
    },
    Role.TA: {
        Permission.COURSE_VIEW,
        Permission.COURSE_VIEW_STUDENTS,
        Permission.ASSIGNMENT_VIEW,
        Permission.ASSIGNMENT_UPDATE,
        Permission.GRADE_VIEW,
        Permission.GRADE_SUBMISSION,
        Permission.GRADE_UPDATE,
        Permission.GRADE_REVIEW,
        Permission.RUBRIC_VIEW,
        Permission.GRADEBOOK_VIEW,
        Permission.GRADEBOOK_EXPORT,
    },
    Role.STUDENT: {
        Permission.COURSE_VIEW,
        Permission.ASSIGNMENT_VIEW,
        Permission.ASSIGNMENT_SUBMIT,
        Permission.GRADE_VIEW,
        Permission.GRADE_DISPUTE,
        Permission.GRADEBOOK_VIEW,
    },
}

def get_permissions_for_role(role: Role) -> Set[Permission]:
    """Get all permissions for a given role"""
    return ROLE_PERMISSIONS.get(role, set())

def has_permission(user_role: Role, permission: Permission) -> bool:
    """Check if a user role has a specific permission"""
    permissions = get_permissions_for_role(user_role)
    return permission in permissions

def get_user_permissions(user_role: Role) -> List[str]:
    """Get all permission names for a user role"""
    permissions = get_permissions_for_role(user_role)
    return [permission.value for permission in permissions]