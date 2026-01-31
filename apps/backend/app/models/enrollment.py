from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..db.base import Base

class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    student_id = Column(Integer, ForeignKey("users.id"))
    is_active = Column(Boolean, default=True)

    # Relationships
    # ✅ back_populates matches User.enrollments
    user = relationship(
        "User", 
        back_populates="enrollments", 
        foreign_keys=[student_id]
    )
    course = relationship("Course", back_populates="enrollments")