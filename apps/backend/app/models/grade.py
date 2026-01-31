from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..db.base import Base

class Grade(Base):
    __tablename__ = "grades"

    id = Column(Integer, primary_key=True, index=True)
    assignment_id = Column(Integer, ForeignKey("assignments.id"))
    student_id = Column(Integer, ForeignKey("users.id"))
    score = Column(Float)
    feedback = Column(Text, nullable=True)
    graded_by = Column(Integer, ForeignKey("users.id"))
    graded_at = Column(DateTime(timezone=True), server_default=func.now())
    is_final = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)

    # Relationships
    # ✅ Matches Assignment.grades
    assignment = relationship("Assignment", back_populates="grades")

    # ✅ Matches User.grades (back_populates must match the property name in User class)
    student = relationship(
        "User", 
        back_populates="grades", 
        foreign_keys=[student_id]
    )

    # ✅ Independent relationship for the person who did the grading
    grader = relationship(
        "User", 
        foreign_keys=[graded_by]
    )