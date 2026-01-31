"""
Course ORM model.
Represents courses in the database.
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime
# ADD THIS IMPORT
from sqlalchemy.orm import relationship 

from .base import Base


class Course(Base):
    """
    Course model for teaching entities.
    """
    
    __tablename__ = "courses"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    
    # Course identity
    code = Column(String(50), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    term = Column(String(50), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    
    # Audit trail
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    # ADD THIS RELATIONSHIP
    # This completes the link to Enrollments
    enrollments = relationship("Enrollment", back_populates="course", cascade="all, delete-orphan")
    
    def __repr__(self) -> str:
        return f"<Course(id={self.id}, code={self.code}, term={self.term})>"