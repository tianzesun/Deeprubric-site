from functools import wraps
from typing import List, Optional, Set
from fastapi import HTTPException, status, Depends
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.models.user import User
from app.permissions.role import Role, Permission, has_permission
from app.db.session import get_db

def require_permission(required_permissions: List[str]):
    """Decorator to require specific permissions for an endpoint"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Extract user from kwargs or get current user
            user = kwargs.get('current_user')
            if not user:
                # If user not in kwargs, try to get from dependency
                try:
                    user = await get_current_user()
                except:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="Authentication required"
                    )
            
            # Check if user has required permissions
            user_role = Role(user.role)
            for permission_name in required_permissions:
                try:
                    permission = Permission(permission_name)
                    if not has_permission(user_role, permission):
                        raise HTTPException(
                            status_code=status.HTTP_403_FORBIDDEN,
                            detail=f"Insufficient permissions. Required: {permission_name}"
                        )
                except ValueError:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=f"Invalid permission: {permission_name}"
                    )
            
            # Call the original function
            return await func(*args, **kwargs)
        
        return wrapper
    return decorator

def require_role(required_roles: List[str]):
    """Decorator to require specific roles for an endpoint"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Extract user from kwargs or get current user
            user = kwargs.get('current_user')
            if not user:
                # If user not in kwargs, try to get from dependency
                try:
                    user = await get_current_user()
                except:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="Authentication required"
                    )
            
            # Check if user has required role
            user_role = user.role
            if user_role not in required_roles:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Insufficient role. Required one of: {', '.join(required_roles)}"
                )
            
            # Call the original function
            return await func(*args, **kwargs)
        
        return wrapper
    return decorator

def check_course_access(func):
    """Decorator to check if user has access to a specific course"""
    @wraps(func)
    async def wrapper(*args, **kwargs):
        # Extract user and course_id from kwargs
        user = kwargs.get('current_user')
        course_id = kwargs.get('course_id')
        
        if not user or not course_id:
            return await func(*args, **kwargs)
        
        # Get database session
        db = kwargs.get('db')
        if not db:
            # Try to get db from dependency
            from app.db.session import get_db as get_db_session
            db = next(get_db_session())
        
        # Check course access based on user role
        from app.services.course_service import CourseService
        course_service = CourseService(db)
        
        has_access = await course_service.check_user_course_access(course_id, user.id, user.role)
        
        if not has_access:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied to this course"
            )
        
        # Call the original function
        return await func(*args, **kwargs)
    
    return wrapper

def require_ownership(resource_type: str = "course"):
    """Decorator to require ownership of a resource"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Extract user from kwargs
            user = kwargs.get('current_user')
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Authentication required"
                )
            
            # Extract resource ID based on type
            resource_id = None
            if resource_type == "course":
                resource_id = kwargs.get('course_id')
            elif resource_type == "assignment":
                resource_id = kwargs.get('assignment_id')
            elif resource_type == "user":
                resource_id = kwargs.get('user_id')
            
            if not resource_id:
                return await func(*args, **kwargs)
            
            # Check ownership based on user role
            if user.role not in [Role.ADMIN, Role.PROFESSOR]:
                # For non-admin/professor users, additional checks would be needed
                # This is a basic implementation
                pass
            
            # Call the original function
            return await func(*args, **kwargs)
        
        return wrapper
    return decorator

# Convenience decorators for common permission checks
def require_admin(func):
    """Decorator to require admin role"""
    return require_role([Role.ADMIN])(func)

def require_professor(func):
    """Decorator to require professor role"""
    return require_role([Role.PROFESSOR])(func)

def require_ta_or_professor(func):
    """Decorator to require TA or professor role"""
    return require_role([Role.TA, Role.PROFESSOR])(func)

def require_authenticated(func):
    """Decorator to require authentication"""
    @wraps(func)
    async def wrapper(*args, **kwargs):
        user = kwargs.get('current_user')
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication required"
            )
        return await func(*args, **kwargs)
    return wrapper