import os
from typing import Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Application
    APP_NAME: str = "DeepRubric Backend"
    DEBUG: bool = False
    VERSION: str = "1.0.0"
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/deeprubric"
    
    # Security
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Environment
    ENVIRONMENT: str = "development"
    
    # CORS
    if ENVIRONMENT == "production":
        ALLOWED_HOSTS: list = ["http://localhost:3000"]
    else:
        ALLOWED_HOSTS: list = ["http://localhost:3000"]
        
    # API Configuration
    API_V1_PREFIX: str = "/api/v1"
    
    # Additional settings for uvicorn
    PROJECT_NAME: str = "DeepRubric Backend"
    RELOAD: bool = False
    HOST: str = "127.0.0.1"
    PORT: int = 8000
    BACKEND_CORS_ORIGINS_STR: str = ""
    
    # Email (for password reset)
    SMTP_SERVER: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USERNAME: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_EMAIL: str = ""
    
    # File Storage
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    
    # AI Features
    OPENAI_API_KEY: Optional[str] = None
    AI_ENABLED: bool = False
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


settings = Settings()
