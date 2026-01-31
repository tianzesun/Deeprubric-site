from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..db.base import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), index=True)
    code = Column(String(50), unique=True, index=True)
    description = Column(Text)
    professor_id = Column(Integer, ForeignKey("users.id"))
    is_active = Column(Boolean, default=True)

    # Relationships
    # ✅ back_populates matches User.courses
    professor = relationship("User", back_populates="courses")
    enrollments = relationship("Enrollment", back_populates="course")
    assignments = relationship("Assignment", back_populates="course")
    rubrics = relationship("Rubric", back_populates="course")