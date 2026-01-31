"""
Base ORM model for the application.

This module defines the single Base class that all ORM models must inherit from.
"""
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """
    Base class for all SQLAlchemy ORM models.
    
    This ensures all models use the same metadata and follow consistent patterns.
    """
    pass