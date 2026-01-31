from pydantic import BaseModel, ConfigDict
from datetime import datetime

class CourseBase(BaseModel):
    """Base schema for course data shared across requests and responses."""
    code: str
    title: str
    term: str
    is_active: bool = True

class CourseCreate(CourseBase):
    """Schema for creating a new course."""
    pass

class CourseResponse(CourseBase):
    """Schema for returning course data to the frontend."""
    id: int
    created_at: datetime
    
    # Updated to Pydantic V2 syntax
    model_config = ConfigDict(from_attributes=True)