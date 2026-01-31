"""
FastAPI dependencies for dependency injection.
Used across all routers for database sessions and authentication.
"""

from typing import Generator, Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.core.config import settings
from app.core.security import decode_access_token
from app.models.orm.user import User, Base
from app.repositories.user_repository import UserRepository


# Database engine and session factory
engine = create_engine(str(settings.DATABASE_URL))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# HTTP Bearer token security scheme
security_scheme = HTTPBearer()


def get_db() -> Generator[Session, None, None]:
    """
    Database session dependency.
    
    Provides a database session to route handlers.
    Session is automatically closed after request.
    
    Yields:
        Database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(security_scheme)],
    db: Annotated[Session, Depends(get_db)]
) -> User:
    """
    Get current authenticated user from JWT token.
    
    Args:
        credentials: HTTP Bearer credentials from Authorization header
        db: Database session
        
    Returns:
        Authenticated user
        
    Raises:
        HTTPException: If token is invalid or user not found
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    
    try:
        # Decode JWT token
        token = credentials.credentials
        payload = decode_access_token(token)
        user_id: str | None = payload.get("sub")
        
        if user_id is None:
            raise credentials_exception
            
    except JWTError:
        raise credentials_exception
    
    # Get user from database
    user = UserRepository.get_by_id(db, int(user_id))
    
    if user is None:
        raise credentials_exception
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    return user


def create_tables() -> None:
    """
    Create all database tables.
    Used for development and testing.
    In production, use Alembic migrations.
    """
    Base.metadata.create_all(bind=engine)