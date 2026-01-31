"""
Role definitions for DeepRubric.
Roles determine what actions users can perform.
"""

from enum import Enum


class UserRole(str, Enum):
    """
    User roles in the system.
    
    Each role has specific permissions:
    - PROFESSOR: Full academic authority, can create courses and final grades
    - GRADER: Delegated grading authority, can grade assigned submissions
    - STUDENT: Can submit work and view grades
    - ADMIN: System management, cannot edit grades
    """
    
    PROFESSOR = "professor"
    GRADER = "grader"
    STUDENT = "student"
    ADMIN = "admin"
    
    @classmethod
    def can_grade(cls, role: "UserRole") -> bool:
        """Check if a role has grading permissions."""
        return role in (cls.PROFESSOR, cls.GRADER)
    
    @classmethod
    def has_final_authority(cls, role: "UserRole") -> bool:
        """Check if a role has final academic authority."""
        return role == cls.PROFESSOR
    
    @classmethod
    def can_manage_courses(cls, role: "UserRole") -> bool:
        """Check if a role can create and manage courses."""
        return role == cls.PROFESSOR
    
    @classmethod
    def can_manage_system(cls, role: "UserRole") -> bool:
        """Check if a role can manage system settings."""
        return role == cls.ADMIN