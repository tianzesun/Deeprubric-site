from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from ..db.base import Base

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    # ✅ Add this column so SQLAlchemy can link this to an Assignment
    assignment_id = Column(Integer, ForeignKey("assignments.id"), nullable=False)
    
    student_id = Column(Integer, ForeignKey("users.id"))
    graded_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    content = Column(Text)

    # Relationships
    # ✅ Add this relationship to complete the handshake with Assignment.submissions
    assignment = relationship("Assignment", back_populates="submissions")

    student = relationship(
        "User", 
        back_populates="submissions", 
        foreign_keys=[student_id]
    )
    grader = relationship("User", foreign_keys=[graded_by])