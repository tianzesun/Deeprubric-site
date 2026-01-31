from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..db.base import Base

class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), index=True)
    description = Column(Text)
    course_id = Column(Integer, ForeignKey("courses.id"))
    rubric_id = Column(Integer, ForeignKey("rubrics.id"), nullable=True)
    max_score = Column(Float, default=100.0)
    due_date = Column(DateTime(timezone=True))
    is_published = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    course = relationship("Course", back_populates="assignments")
    rubric = relationship("Rubric", back_populates="assignments")
    submissions = relationship("Submission", back_populates="assignment")
    grades = relationship("Grade", back_populates="assignment")