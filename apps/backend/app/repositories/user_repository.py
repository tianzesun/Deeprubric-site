"""
User repository for database operations.
Separates database access from business logic.
"""

from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.models.orm.user import User
from app.models.schemas.user import UserCreate


class UserRepository:
    """
    Repository for user database operations.
    All database queries for users go through this class.
    """
    
    @staticmethod
    def get_by_id(db: Session, user_id: int) -> User | None:
        """
        Get user by ID.
        
        Args:
            db: Database session
            user_id: User ID
            
        Returns:
            User if found, None otherwise
        """
        return db.query(User).filter(User.id == user_id).first()
    
    @staticmethod
    def get_by_email(db: Session, email: str) -> User | None:
        """
        Get user by email.
        
        Args:
            db: Database session
            email: User email
            
        Returns:
            User if found, None otherwise
        """
        return db.query(User).filter(User.email == email).first()
    
    @staticmethod
    def create(db: Session, user_data: UserCreate, hashed_password: str) -> User:
        """
        Create a new user.
        
        Args:
            db: Database session
            user_data: User creation data
            hashed_password: Pre-hashed password
            
        Returns:
            Created user
            
        Raises:
            IntegrityError: If email already exists
        """
        db_user = User(
            email=user_data.email,
            full_name=user_data.full_name,
            role=user_data.role,
            hashed_password=hashed_password,
            is_active=True
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        return db_user
    
    @staticmethod
    def get_all(db: Session, skip: int = 0, limit: int = 100) -> list[User]:
        """
        Get all users with pagination.
        
        Args:
            db: Database session
            skip: Number of records to skip
            limit: Maximum number of records to return
            
        Returns:
            List of users
        """
        return db.query(User).offset(skip).limit(limit).all()