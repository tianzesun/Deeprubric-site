"""
应用依赖注入
提供数据库会话、当前用户等依赖
"""

from typing import Generator
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import SessionLocal
from app.core.security import verify_token
from app.models.user import User

security = HTTPBearer()


def get_db() -> Generator:
    """获取数据库会话"""
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """获取当前用户"""
    try:
        token = credentials.credentials
        payload = verify_token(token)
        user_id = payload.get("sub")
        
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="无效的认证凭据",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        user = db.query(User).filter(User.id == user_id).first()
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="用户不存在",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="认证失败",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    """获取当前活跃用户"""
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="用户已被禁用")
    return current_user


def get_current_professor(current_user: User = Depends(get_current_user)) -> User:
    """获取当前教授用户"""
    if not current_user.is_professor():
        raise HTTPException(status_code=403, detail="权限不足，需要教授权限")
    return current_user


def get_current_ta(current_user: User = Depends(get_current_user)) -> User:
    """获取当前TA用户"""
    if not current_user.is_ta():
        raise HTTPException(status_code=403, detail="权限不足，需要TA权限")
    return current_user


def get_current_student(current_user: User = Depends(get_current_user)) -> User:
    """获取当前学生用户"""
    if not current_user.is_student():
        raise HTTPException(status_code=403, detail="权限不足，需要学生权限")
    return current_user


def get_current_admin(current_user: User = Depends(get_current_user)) -> User:
    """获取当前管理员用户"""
    if not current_user.is_admin():
        raise HTTPException(status_code=403, detail="权限不足，需要管理员权限")
    return current_user


def get_current_staff(current_user: User = Depends(get_current_user)) -> User:
    """获取当前教职工用户（教授或TA）"""
    if not (current_user.is_professor() or current_user.is_ta()):
        raise HTTPException(status_code=403, detail="权限不足，需要教职工权限")
    return current_user