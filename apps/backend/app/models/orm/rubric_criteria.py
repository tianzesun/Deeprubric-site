"""
RubricCriteria ORM model.
Represents scoring dimensions in the database.

This is the core structure of the scoring logic.
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from .base import Base


class RubricCriteria(Base):
    """
    RubricCriteria model for scoring dimensions.
    
    This table stores the individual scoring items within a rubric.
    Each criterion has a maximum score and defined order.
    """
    
    __tablename__ = "rubric_criteria"
    
    # Primary key
    id = Column(Integer, primary_key=True, autoincrement=True)
    
    # Foreign keys
    rubric_id = Column(Integer, ForeignKey("rubrics.id"), nullable=False)
    
    # Scoring dimension
    title = Column(String(255), nullable=False)
    description = Column(Text)
    max_points = Column(Integer, nullable=False)
    sort_order = Column(Integer, nullable=False)
    
    # Audit trail
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    # Relationships
    rubric = relationship("Rubric", backref="criteria")
    
    def __repr__(self) -> str:
        return f"<RubricCriteria(id={self.id}, title={self.title}, max={self.max_points})>"