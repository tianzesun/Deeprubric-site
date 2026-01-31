import sys
from pathlib import Path
from datetime import datetime

# Add the app directory to sys.path so we can import our models
sys.path.append(str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.orm.user import User
from app.models.orm.enrollment import Enrollment
from app.core.security import get_password_hash

def seed():
    db: Session = SessionLocal()
    
    # Create users
    users = [
        {
            "full_name": "Admin User",
            "email": "admin@deeprubric.com",
            "password": "password123",
            "is_superuser": True,
            "role": None  # Admin users don't need enrollments
        },
        {
            "full_name": "Professor Oak",
            "email": "teacher@deeprubric.com",
            "password": "password123",
            "is_superuser": False,
            "role": "professor"
        },
        {
            "full_name": "TA Terry",
            "email": "grader@deeprubric.com",
            "password": "password123",
            "is_superuser": False,
            "role": "grader"
        },
        {
            "full_name": "Student Sam",
            "email": "student@deeprubric.com",
            "password": "password123",
            "is_superuser": False,
            "role": "student"
        }
    ]

    created_users = {}
    
    for user_data in users:
        # Check if exists
        user = db.query(User).filter(User.email == user_data["email"]).first()
        if not user:
            new_user = User(
                email=user_data["email"],
                full_name=user_data["full_name"],
                hashed_password=get_password_hash(user_data["password"]),
                is_superuser=user_data["is_superuser"],
                is_active=True
            )
            db.add(new_user)
            db.flush()  # Get the user ID
            created_users[user_data["email"]] = new_user
            print(f"Created user: {user_data['email']}")
        else:
            created_users[user_data["email"]] = user

    # Create a test course for enrollments
    from app.models.orm.course import Course
    course = db.query(Course).filter(Course.title == "Test Course").first()
    if not course:
        course = Course(
            title="Test Course",
            code="TEST101",
            term="Fall 2024"
        )
        db.add(course)
        db.flush()
        print("Created test course: TEST101")

    # Create enrollments for non-admin users
    for user_data in users:
        if user_data["role"] and user_data["role"] != "admin":
            user = created_users[user_data["email"]]
            
            # Check if enrollment already exists
            enrollment = db.query(Enrollment).filter(
                Enrollment.user_id == user.id,
                Enrollment.course_id == course.id
            ).first()
            
            if not enrollment:
                new_enrollment = Enrollment(
                    user_id=user.id,
                    course_id=course.id,
                    role=user_data["role"],
                    created_at=datetime.utcnow()
                )
                db.add(new_enrollment)
                print(f"Created enrollment for {user_data['email']} as {user_data['role']}")

    db.commit()
    db.close()
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed()
