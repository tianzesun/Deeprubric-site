from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..db.base import Base

class Rubric(Base):
    __tablename__ = "rubrics"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), index=True)
    description = Column(Text)
    course_id = Column(Integer, ForeignKey("courses.id"))
    total_points = Column(Float, default=100.0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    # ✅ Matches Course.rubrics
    course = relationship("Course", back_populates="rubrics")
    # ✅ Matches Assignment.rubric
    assignments = relationship("Assignment", back_populates="rubric")
    # ✅ Matches RubricCriteria.rubric
    criteria = relationship("RubricCriteria", back_populates="rubric", cascade="all, delete-orphan")

class RubricCriteria(Base):
    __tablename__ = "rubric_criteria"

    id = Column(Integer, primary_key=True, index=True)
    rubric_id = Column(Integer, ForeignKey("rubrics.id"))
    name = Column(String(100))  # e.g., "Grammar", "Logic"
    description = Column(Text)
    max_points = Column(Float)
    weight = Column(Float, default=1.0)

    # Relationships
    rubric = relationship("Rubric", back_populates="criteria")