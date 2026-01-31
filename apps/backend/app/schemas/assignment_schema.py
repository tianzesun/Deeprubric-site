from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class AssignmentBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    course_id: int
    rubric_id: Optional[int] = None
    max_score: float = Field(default=100.0, gt=0)
    due_date: datetime
    is_published: bool = Field(default=False)

class AssignmentCreate(AssignmentBase):
    pass

class AssignmentUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    rubric_id: Optional[int] = None
    max_score: Optional[float] = Field(None, gt=0)
    due_date: Optional[datetime] = None
    is_published: Optional[bool] = None
    is_active: Optional[bool] = None

class Assignment(AssignmentBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True