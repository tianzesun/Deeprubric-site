# app/db/base.py
from app.db.base_class import Base  # Your declarative base
from app.models.user import User
from app.models.course import Course
from app.models.enrollment import Enrollment
from app.models.assignment import Assignment  # ✅ IS THIS MISSING?
from app.models.submission import Submission
from app.models.grade import Grade
from app.models.rubric import Rubric, RubricCriteria

# This file ensures SQLAlchemy knows about all models 
# before any queries (like Login) are run.