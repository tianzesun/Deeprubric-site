"""
Rubric ORM model.
Represents scoring templates in the database.

This is the scoring engine's core - templates that define how to score.
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from .base import Base


class Rubric(Base):
    """
    Rubric model for scoring templates.
    
    This table stores scoring templates that can be reused across assignments.
    The rubric is the template, not a one-time score.
    """
    
    __tablename__ = "rubrics"
    
    # Primary key
    id = Column(Integer, primary_key=True, autoincrement=True)
    
    # Foreign keys
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Scoring template
    title = Column(String(255), nullable=False)
    description = Column(Text)
    total_points = Column(Integer, nullable=False)
    
    # Status
    is_published = Column(Boolean, nullable=False, default=False)
    
    # Audit trail
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    # Relationships
    course = relationship("Course", backref="rubrics")
    creator = relationship("User", foreign_keys=[created_by])
    
    def __repr__(self) -> str:
        return f"<Rubric(id={self.id}, title={self.title}, total={self.total_points})>"