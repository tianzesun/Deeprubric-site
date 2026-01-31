"""
文件相关的Pydantic模型
定义文件上传、下载和元数据的schema
"""

from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


class FileMetadata(BaseModel):
    """文件元数据"""
    id: str
    file_name: str
    file_size: int
    mime_type: str
    uploaded_at: datetime
    file_hash: Optional[str] = None
    
    class Config:
        from_attributes = True


class FileUploadResponse(BaseModel):
    """文件上传响应"""
    id: str
    file_name: str
    file_url: str
    file_size: int
    mime_type: str
    uploaded_at: datetime
    
    class Config:
        from_attributes = True


class FileDownloadResponse(BaseModel):
    """文件下载响应"""
    file_name: str
    content_type: str
    content_length: int
    content: bytes
    
    class Config:
        from_attributes = True


class FileListResponse(BaseModel):
    """文件列表响应"""
    files: List[FileMetadata]
    total: int
    page: int
    per_page: int


class FileUploadRequest(BaseModel):
    """文件上传请求"""
    submission_id: str = Field(..., description="作业提交ID")
    file_description: Optional[str] = Field(None, description="文件描述")


class FileDeleteResponse(BaseModel):
    """文件删除响应"""
    success: bool
    message: str


class FileValidationRequest(BaseModel):
    """文件验证请求"""
    file_name: str
    content_type: str
    file_size: int


class FileValidationResponse(BaseModel):
    """文件验证响应"""
    is_valid: bool
    error_message: Optional[str] = None
    allowed_types: List[str]
    max_file_size: int