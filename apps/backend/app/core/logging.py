"""
Structured logging configuration for DeepRubric.
All actions are logged for audit trail.
"""

import logging
import sys
from typing import Any

from app.core.config import settings


def setup_logging() -> None:
    """
    Configure structured logging for the application.
    
    Logs include:
    - Timestamp
    - Log level
    - Module name
    - Message
    
    All logs go to stdout for container environments.
    """
    log_format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    
    logging.basicConfig(
        level=getattr(logging, settings.LOG_LEVEL.upper()),
        format=log_format,
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )
    
    # Reduce noise from third-party libraries
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)


def get_logger(name: str) -> logging.Logger:
    """
    Get a logger instance.
    
    Args:
        name: Logger name (typically __name__)
        
    Returns:
        Configured logger instance
    """
    return logging.getLogger(name)