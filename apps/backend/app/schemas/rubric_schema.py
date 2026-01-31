from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class RubricBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    course_id: int
    total_points: float = Field(default=100.0, gt=0)

class RubricCreate(RubricBase):
    pass

class RubricUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    total_points: Optional[float] = Field(None, gt=0)
    is_active: Optional[bool] = None

class RubricCriteriaBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    points: float = Field(..., gt=0)
    order: int = Field(default=0)

class RubricCriteriaCreate(RubricCriteriaBase):
    pass

class RubricCriteriaUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    points: Optional[float] = Field(None, gt=0)
    order: Optional[int] = None
    is_active: Optional[bool] = None

class RubricCriteria(RubricCriteriaBase):
    id: int
    rubric_id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Rubric(RubricBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    criteria: List[RubricCriteria] = []

    class Config:
        from_attributes = True