from pydantic import BaseModel, ConfigDict
from datetime import datetime
from app.permissions.roles import UserRole

class EnrollmentBase(BaseModel):
    user_id: int
    course_id: int
    role: UserRole

class EnrollmentCreate(EnrollmentBase):
    pass

class EnrollmentResponse(EnrollmentBase):
    id: int
    created_at: datetime
    
    # Modern Pydantic V2 syntax
    model_config = ConfigDict(from_attributes=True)