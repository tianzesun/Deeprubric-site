from datetime import datetime
from pydantic import BaseModel, EmailStr, ConfigDict, field_validator

# Remove UserRole import if it's not used here anymore

class UserBase(BaseModel):
    """Base user schema with common fields."""
    email: EmailStr
    full_name: str
    # Removed 'role' from here because it's not in the users table

class UserCreate(UserBase):
    """Schema for creating a new user with a password."""
    password: str
    
    @field_validator('password')
    @classmethod
    def validate_password_length(cls, v: str) -> str:
        """Validate that password is not longer than 72 bytes (bcrypt limit)."""
        if len(v.encode('utf-8')) > 72:
            raise ValueError('Password cannot be longer than 72 bytes')
        return v

class UserResponse(UserBase):
    """Schema for user in API responses."""
    id: int
    is_active: bool
    created_at: datetime
    # updated_at: datetime  # Optional: add if you want it in the frontend
    
    model_config = ConfigDict(from_attributes=True)

class UserUpdate(BaseModel):
    """Schema for updating user data."""
    email: EmailStr | None = None
    full_name: str | None = None
    is_active: bool | None = None