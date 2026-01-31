from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.schemas.user_schema import UserCreate, UserResponse, UserUpdate
from app.services.user_service import UserService
from app.db.session import get_db
from app.permissions.decorators import require_permission
from app.core.security import get_current_user

router = APIRouter()

@router.get("/", response_model=List[UserResponse])
@require_permission("user_list")
async def list_users(
    skip: int = 0,
    limit: int = 100,
    role: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """List users (admin only)"""
    user_service = UserService(db)
    users = await user_service.get_users(skip=skip, limit=limit, role=role)
    return users

@router.get("/{user_id}", response_model=UserResponse)
@require_permission("user_view")
async def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get user by ID"""
    user_service = UserService(db)
    user = await user_service.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=UserResponse)
@require_permission("user_create")
async def create_user(
    user_data: UserCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Create new user (admin only)"""
    user_service = UserService(db)
    user = await user_service.create_user(user_data)
    return user

@router.put("/{user_id}", response_model=UserResponse)
@require_permission("user_update")
async def update_user(
    user_id: int,
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Update user (admin only)"""
    user_service = UserService(db)
    user = await user_service.update_user(user_id, user_data)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.delete("/{user_id}")
@require_permission("user_delete")
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Delete user (admin only)"""
    user_service = UserService(db)
    success = await user_service.delete_user(user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}

@router.get("/{user_id}/courses")
@require_permission("course_view")
async def get_user_courses(
    user_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get courses for a specific user"""
    user_service = UserService(db)
    courses = await user_service.get_user_courses(user_id)
    return {"courses": courses}

@router.post("/{user_id}/enroll/{course_id}")
@require_permission("course_enroll")
async def enroll_user_in_course(
    user_id: int,
    course_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Enroll user in course (admin/professor only)"""
    user_service = UserService(db)
    success = await user_service.enroll_user_in_course(user_id, course_id)
    if not success:
        raise HTTPException(status_code=404, detail="User or course not found")
    return {"message": "User enrolled in course successfully"}

@router.delete("/{user_id}/unenroll/{course_id}")
@require_permission("course_unenroll")
async def unenroll_user_from_course(
    user_id: int,
    course_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Unenroll user from course (admin/professor only)"""
    user_service = UserService(db)
    success = await user_service.unenroll_user_from_course(user_id, course_id)
    if not success:
        raise HTTPException(status_code=404, detail="User or course not found")
    return {"message": "User unenrolled from course successfully"}