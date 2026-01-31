from pydantic import BaseModel, EmailStr
from typing import Optional

# 1. Base Class First
class UserBase(BaseModel):
    email: EmailStr
    name: str

# 2. Inherited Response Class
class UserResponse(UserBase):
    id: int
    role: str
    
    class Config:
        from_attributes = True

# 3. Token depends on UserResponse
class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    user: UserResponse

# 4. Request Classes
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserCreate(UserBase):
    password: str
    role: str = "student"

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordReset(BaseModel):
    token: str
    new_password: str