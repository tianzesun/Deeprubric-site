from typing import List, Optional
from sqlalchemy.orm import Session
from ..models.course import Course
from ..schemas.course_schema import CourseCreate, CourseUpdate

class CourseService:
    def __init__(self, db: Session):
        self.db = db

    def get_course(self, course_id: int) -> Optional[Course]:
        return self.db.query(Course).filter(Course.id == course_id).first()

    def get_courses(self, skip: int = 0, limit: int = 100) -> List[Course]:
        return self.db.query(Course).offset(skip).limit(limit).all()

    def get_courses_by_professor(self, professor_id: int) -> List[Course]:
        return self.db.query(Course).filter(Course.professor_id == professor_id).all()

    def create_course(self, course_data: CourseCreate, professor_id: int) -> Course:
        db_course = Course(**course_data.dict(), professor_id=professor_id)
        self.db.add(db_course)
        self.db.commit()
        self.db.refresh(db_course)
        return db_course

    def update_course(self, course_id: int, course_data: CourseUpdate) -> Optional[Course]:
        db_course = self.get_course(course_id)
        if db_course:
            update_data = course_data.dict(exclude_unset=True)
            for field, value in update_data.items():
                setattr(db_course, field, value)
            self.db.commit()
            self.db.refresh(db_course)
        return db_course

    def delete_course(self, course_id: int) -> bool:
        db_course = self.get_course(course_id)
        if db_course:
            self.db.delete(db_course)
            self.db.commit()
            return True
        return False

    def get_course_students_count(self, course_id: int) -> int:
        from ..models.enrollment import Enrollment
        return self.db.query(Enrollment).filter(
            Enrollment.course_id == course_id,
            Enrollment.is_active == True
        ).count()
