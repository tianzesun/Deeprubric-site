from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class ScoreBase(BaseModel):
    rubric_id: int
    criterion_id: int
    student_id: int
    grader_id: int # Could be the AI service user ID or a Professor's ID
    points: int
    comment: Optional[str] = None

class ScoreCreate(ScoreBase):
    pass

class ScoreResponse(ScoreBase):
    id: int
    created_at: datetime

    # Modern Pydantic V2 configuration
    model_config = ConfigDict(from_attributes=True)