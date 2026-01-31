from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base 
from app.core.constants import UserRole

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.STUDENT, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    # ✅ We use 'courses' here to match the common expectation in other models
    courses = relationship("Course", back_populates="professor", foreign_keys="Course.professor_id")
    enrollments = relationship("Enrollment", back_populates="user")
    
    submissions = relationship(
        "Submission", 
        back_populates="student", 
        foreign_keys="Submission.student_id" 
    )
    
    grades = relationship(
        "Grade", 
        back_populates="student", 
        foreign_keys="Grade.student_id"
    )

    @property
    def is_professor(self) -> bool:
        return self.role == UserRole.PROFESSOR

    @property
    def is_ta(self) -> bool:
        return self.role == UserRole.TA

    @property
    def is_student(self) -> bool:
        return self.role == UserRole.STUDENT