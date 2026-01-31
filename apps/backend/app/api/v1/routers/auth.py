from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

from app.core.security import authenticate_user, create_access_token, get_current_user
from app.schemas.auth_schema import UserCreate, UserResponse, Token, PasswordResetRequest, PasswordReset
from app.services.auth_service import AuthService
from app.db.session import get_db
from app.core.config import settings
from app.permissions.decorators import require_permission
from app.models.user import User

router = APIRouter(tags=["auth"])

# ----------------------
# Login
# ----------------------
@router.post("/login")
async def login(
    db: Session = Depends(get_db), 
    form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    Authenticate user and return JWT + full user info.
    """
    user = await authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")

    # Determine user role for frontend routing
    user_role = "admin" if user.is_superuser else user.role or "student"

    # Create JWT token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={
            "sub": user.email,
            "role": user_role,
            "is_superuser": user.is_superuser
        },
        expires_delta=access_token_expires
    )

    # Return token + user info (frontend expects this shape)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "role": user_role,  # use computed role
            "is_active": user.is_active,
            "is_superuser": user.is_superuser,
            "created_at": str(user.created_at),
            "updated_at": str(user.updated_at),
        },
    }

# ----------------------
# Register
# ----------------------
@router.post("/register", response_model=UserResponse)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """User registration"""
    auth_service = AuthService(db)
    user = await auth_service.create_user(user_data)
    return user

# ----------------------
# Password Reset
# ----------------------
@router.post("/reset-password-request")
async def reset_password_request(request: PasswordResetRequest, db: Session = Depends(get_db)):
    """Request password reset email"""
    auth_service = AuthService(db)
    await auth_service.request_password_reset(request.email)
    return {"message": "Password reset email sent"}

@router.post("/reset-password")
async def reset_password(reset_data: PasswordReset, db: Session = Depends(get_db)):
    """Reset password with token"""
    auth_service = AuthService(db)
    await auth_service.reset_password(reset_data.token, reset_data.new_password)
    return {"message": "Password reset successful"}

# ----------------------
# Current User Endpoints
# ----------------------
@router.get("/me", response_model=UserResponse)
@require_permission(["user_view"])
async def get_current_user_info(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get current user information"""
    return current_user

@router.put("/me", response_model=UserResponse)
@require_permission(["user_update"])
async def update_current_user(
    user_data: UserCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update current user information"""
    auth_service = AuthService(db)
    user = await auth_service.update_user(current_user.id, user_data)
    return user

@router.delete("/me")
@require_permission(["user_delete"])
async def delete_current_user(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete current user account"""
    auth_service = AuthService(db)
    await auth_service.delete_user(current_user.id)
    return {"message": "User account deleted successfully"}
