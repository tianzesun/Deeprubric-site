from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class GradeBase(BaseModel):
    assignment_id: int
    student_id: int
    score: float = Field(..., ge=0, le=100)
    feedback: Optional[str] = None
    graded_by: int

class GradeCreate(GradeBase):
    pass

class GradeUpdate(BaseModel):
    score: Optional[float] = Field(None, ge=0, le=100)
    feedback: Optional[str] = None
    graded_by: Optional[int] = None
    is_final: Optional[bool] = None
    is_active: Optional[bool] = None

class Grade(GradeBase):
    id: int
    graded_at: datetime
    is_final: bool
    is_active: bool

    class Config:
        from_attributes = True

class GradeWithDetails(Grade):
    assignment_title: str
    student_name: str
    graded_by_name: str