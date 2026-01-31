"""
User ORM model.
Represents users in the database.

This is the system identity table - stable and core.
Role is NOT stored here - it's in enrollments table.
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Boolean

from sqlalchemy.orm import relationship
from .base import Base


class User(Base):
    """
    User model for system identity.
    
    This table stores stable user identity information.
    Role is stored in enrollments table (not here).
    """
    
    __tablename__ = "users"
    
    # Primary key
    id = Column(Integer, primary_key=True, autoincrement=True)
    
    # Identity
    email = Column(String(255), nullable=False, unique=True, index=True)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_superuser = Column(Boolean, nullable=False, default=False)
    # Status
    is_active = Column(Boolean, nullable=False, default=True)
    
    # Audit trail
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )
    
    # Relationship to see all enrollments (roles)
    enrollments = relationship("Enrollment", back_populates="user", cascade="all, delete-orphan")
    
    def __repr__(self) -> str:
        return f"<User(id={self.id}, email={self.email}, active={self.is_active})>"
