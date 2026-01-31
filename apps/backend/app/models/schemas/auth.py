"""
Authentication schemas for login and token management.
These define how credentials are exchanged for access tokens.
"""

from pydantic import BaseModel, EmailStr, ConfigDict
from app.permissions.roles import UserRole


class LoginRequest(BaseModel):
    """
    Schema for user login request.
    Sent by the frontend when a user enters email/password.
    """
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    """
    Schema for authentication token response.
    Includes the JWT and basic user metadata for the frontend state.
    """
    access_token: str
    token_type: str = "bearer"
    
    # Metadata to help the frontend manage session state
    user_id: int
    full_name: str
    
    # role here represents the "effective" or "primary" role 
    # derived from the enrollments table during login logic.
    role: UserRole

    model_config = ConfigDict(from_attributes=True)


class TokenData(BaseModel):
    """
    Internal schema for what is stored inside the JWT payload.
    Used for verifying the user in protected routes.
    """
    email: str | None = None
    user_id: int | None = None