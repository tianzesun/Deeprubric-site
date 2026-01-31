from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status

from app.models.orm.user import User
from app.schemas.auth_schema import UserCreate, UserResponse
from app.core.security import get_password_hash, verify_password
from app.core.config import settings
from app.utils.email_utils import send_password_reset_email

class AuthService:
    def __init__(self, db: Session):
        self.db = db

    async def authenticate_user(self, email: str, password: str):
        """Authenticate user with email and password and return full auth response"""
        user = self.db.query(User).filter(User.email == email).first()
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        
        # Get user's role from enrollments
        # For now, we'll use the first enrollment role or default to student
        # In a real system, you might want to handle multiple roles differently
        user_role = "student"  # default role
        if user.enrollments:
            # Get the first enrollment role
            user_role = user.enrollments[0].role
        
        # Return the structure expected by the frontend
        return {
            "user": user,
            "role": user_role
        }

    async def create_user(self, user_data: UserCreate) -> UserResponse:
        """Create a new user"""
        # Check if user already exists
        existing_user = self.db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        hashed_password = get_password_hash(user_data.password)
        user = User(
            email=user_data.email,
            full_name=user_data.full_name,
            hashed_password=hashed_password
        )
        
        try:
            self.db.add(user)
            self.db.commit()
            self.db.refresh(user)
            return UserResponse(
                id=user.id,
                email=user.email,
                full_name=user.full_name,
                role="student",  # Default role for new users
                is_active=user.is_active,
                created_at=user.created_at,
                updated_at=user.updated_at
            )
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

    async def get_user_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID"""
        return self.db.query(User).filter(User.id == user_id).first()

    async def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        return self.db.query(User).filter(User.email == email).first()

    async def update_user(self, user_id: int, user_data: UserCreate) -> Optional[UserResponse]:
        """Update user information"""
        user = await self.get_user_by_id(user_id)
        if not user:
            return None
        
        if user_data.email:
            user.email = user_data.email
        if user_data.full_name:
            user.full_name = user_data.full_name
        if user_data.password:
            user.hashed_password = get_password_hash(user_data.password)
        
        self.db.commit()
        self.db.refresh(user)
        
        return UserResponse(
            id=user.id,
            email=user.email,
            full_name=user.full_name,
            role="student",  # Default role - should be determined from enrollments
            is_active=user.is_active,
            created_at=user.created_at,
            updated_at=user.updated_at
        )

    async def delete_user(self, user_id: int) -> bool:
        """Delete user account"""
        user = await self.get_user_by_id(user_id)
        if not user:
            return False
        
        self.db.delete(user)
        self.db.commit()
        return True

    async def request_password_reset(self, email: str) -> None:
        """Request password reset email"""
        user = await self.get_user_by_email(email)
        if not user:
            # Don't reveal if user exists or not for security
            return
        
        # Generate reset token (in production, use a proper token system)
        reset_token = "temp_reset_token"  # TODO: Implement proper token generation
        
        # Send email
        await send_password_reset_email(user.email, reset_token)

    async def reset_password(self, token: str, new_password: str) -> None:
        """Reset password with token"""
        # TODO: Implement proper token validation
        # For now, this is a placeholder
        pass

    async def change_password(self, user_id: int, current_password: str, new_password: str) -> bool:
        """Change user password"""
        user = await self.get_user_by_id(user_id)
        if not user:
            return False
        
        if not verify_password(current_password, user.hashed_password):
            return False
        
        user.hashed_password = get_password_hash(new_password)
        self.db.commit()
        return True