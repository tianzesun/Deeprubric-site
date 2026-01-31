"""
Health check router.
Used for monitoring and load balancer health checks.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.v1.dependencies import get_db
from app.core.config import settings


router = APIRouter(tags=["health"])


@router.get("/health")
def health_check() -> dict[str, str]:
    """
    Basic health check endpoint.
    
    Returns:
        Health status
    """
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION
    }


@router.get("/health/db")
def health_check_database(db: Session = Depends(get_db)) -> dict[str, str]:
    """
    Health check with database connection test.
    
    Args:
        db: Database session
        
    Returns:
        Health status with database connectivity
    """
    try:
        # Execute simple query to test database connection
        db.execute("SELECT 1")
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    return {
        "status": "healthy" if db_status == "connected" else "unhealthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "database": db_status
    }