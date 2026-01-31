"""
Enrollment ORM model.
Represents user-course relationships in the database.

This is the relationship table - connects users to courses with roles.
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from .base import Base


class Enrollment(Base):
    __tablename__ = "enrollments"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    
    role = Column(String(50), nullable=False)  # student / instructor / ta
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    
    # Relationships
    # These two lines are the "Handshake" with User and Course
    user = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")

    # DELETE THIS LINE BELOW:
    # enrollments = relationship("Enrollment", back_populates="course", ...) 
    
    def __repr__(self) -> str:
        return f"<Enrollment(id={self.id}, user_id={self.user_id}, course_id={self.course_id}, role={self.role})>"