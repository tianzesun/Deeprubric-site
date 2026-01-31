from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class SubmissionBase(BaseModel):
    assignment_id: int
    student_id: int
    content: Optional[str] = None
    file_url: Optional[str] = None

class SubmissionCreate(SubmissionBase):
    pass

class SubmissionUpdate(BaseModel):
    content: Optional[str] = None
    file_url: Optional[str] = None
    feedback: Optional[str] = None
    ai_score: Optional[float] = None
    ai_feedback: Optional[str] = None
    plagiarism_score: Optional[float] = None
    is_graded: Optional[bool] = None
    graded_at: Optional[datetime] = None
    graded_by: Optional[int] = None

class Submission(SubmissionBase):
    id: int
    submitted_at: datetime
    is_late: bool
    is_graded: bool
    graded_at: Optional[datetime] = None
    graded_by: Optional[int] = None
    feedback: Optional[str] = None
    ai_score: Optional[float] = None
    ai_feedback: Optional[str] = None
    plagiarism_score: Optional[float] = None
    is_active: bool

    class Config:
        from_attributes = True

class SubmissionWithGrade(Submission):
    grade: Optional[float] = None
    grade_feedback: Optional[str] = None