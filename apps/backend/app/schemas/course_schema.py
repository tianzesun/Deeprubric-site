from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class CourseBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    code: str = Field(..., min_length=1, max_length=50)
    description: Optional[str] = None
    semester: str = Field(..., min_length=1, max_length=50)
    year: int = Field(..., gt=1900, lt=2100)
    max_students: int = Field(default=50, gt=0)

class CourseCreate(CourseBase):
    pass

class CourseUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    code: Optional[str] = Field(None, min_length=1, max_length=50)
    description: Optional[str] = None
    semester: Optional[str] = Field(None, min_length=1, max_length=50)
    year: Optional[int] = Field(None, gt=1900, lt=2100)
    max_students: Optional[int] = Field(None, gt=0)
    is_active: Optional[bool] = None

class Course(CourseBase):
    id: int
    professor_id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True