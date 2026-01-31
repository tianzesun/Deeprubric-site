from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

# --- Criteria Schemas ---
class CriterionBase(BaseModel):
    title: str
    description: Optional[str] = None
    max_points: int
    sort_order: int

class CriterionResponse(CriterionBase):
    id: int
    rubric_id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

# --- Rubric Schemas ---
class RubricCreate(BaseModel):
    title: str
    course_id: int
    description: Optional[str] = None
    criteria: List[CriterionBase]

class RubricResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    course_id: int
    created_by: int
    is_published: bool
    created_at: datetime
    # This is the key: it returns the list of criteria objects too!
    criteria: List[CriterionResponse] 

    model_config = ConfigDict(from_attributes=True)