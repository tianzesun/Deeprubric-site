"""
Score ORM model.
Represents actual scoring results in the database.

This is where real scores are recorded - the core of the scoring engine.
"""
from datetime import datetime
from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship

from .base import Base


class Score(Base):
    """
    Score model for actual scoring results.
    
    This table stores the real scoring data - one score per criterion.
    Total score is calculated from individual criterion scores.
    """
    
    __tablename__ = "scores"
    
    # Primary key
    id = Column(Integer, primary_key=True, autoincrement=True)
    
    # Foreign keys
    rubric_id = Column(Integer, ForeignKey("rubrics.id"), nullable=False)
    criterion_id = Column(Integer, ForeignKey("rubric_criteria.id"), nullable=False)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    grader_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Scoring result
    points = Column(Integer, nullable=False)
    comment = Column(Text)
    
    # Audit trail
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    # Relationships
    rubric = relationship("Rubric", backref="scores")
    criterion = relationship("RubricCriteria", backref="scores")
    student = relationship("User", foreign_keys=[student_id])
    grader = relationship("User", foreign_keys=[grader_id])
    
    def __repr__(self) -> str:
        return f"<Score(id={self.id}, student={self.student_id}, criterion={self.criterion_id}, points={self.points})>"