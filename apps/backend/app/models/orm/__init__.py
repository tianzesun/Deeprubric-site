"""
ORM models package.

This module ensures all SQLAlchemy models are imported and registered
with a single Base metadata object for Alembic migrations.
"""

from sqlalchemy.ext.declarative import declarative_base

# Single Base for the entire application
Base = declarative_base()

# Import all models to register them with Base.metadata
# Order matters: models with foreign keys should come after their referenced models
from . import user, course, enrollment, rubric, rubric_criteria, score  # noqa: F401

# Export Base for use in other modules
__all__ = ["Base"]