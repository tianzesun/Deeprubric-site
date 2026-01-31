"""
DeepRubric FastAPI Application.

Main entry point for the backend API.
All routes are versioned under /api/v1.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.logging import setup_logging
from app.api.v1.routers import health, auth
from app.api.v1.dependencies import create_tables
from app.db import base

# Setup logging
setup_logging()


# Create FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    docs_url=f"{settings.API_V1_PREFIX}/docs",
    redoc_url=f"{settings.API_V1_PREFIX}/redoc",
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json"
)

origins = [
    "http://localhost:3000",    # Next.js frontend
    "http://127.0.0.1:3000",
    # Add your production domain here later
]

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(health.router, prefix=settings.API_V1_PREFIX)
app.include_router(auth.router, prefix=settings.API_V1_PREFIX)


@app.on_event("startup")
def startup_event() -> None:
    """
    Application startup event.
    
    Creates database tables if they don't exist.
    In production, use Alembic migrations instead.
    """
    if settings.ENVIRONMENT == "development":
        create_tables()


@app.get("/")
def root() -> dict[str, str]:
    """
    Root endpoint.
    
    Returns:
        API information
    """
    return {
        "message": "DeepRubric API",
        "version": settings.VERSION,
        "docs": f"{settings.API_V1_PREFIX}/docs"
    }