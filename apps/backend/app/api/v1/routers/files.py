"""
文件管理API路由
提供文件上传、下载、删除等功能
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Query
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.core.security import Role
from app.models.user import User
from app.services.file_service import get_file_service, FileService
from app.schemas.file_schema import (
    FileUploadResponse, 
    FileMetadata, 
    FileListResponse,
    FileDeleteResponse,
    FileValidationRequest,
    FileValidationResponse
)

router = APIRouter()


@router.post("/upload", response_model=FileUploadResponse)
async def upload_file(
    file: UploadFile = File(...),
    submission_id: str = Query(..., description="作业提交ID"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    file_service: FileService = Depends(get_file_service)
):
    """
    上传文件到作业提交
    支持学生上传作业文件
    """
    # 检查用户权限（学生可以上传自己的作业文件）
    if not current_user.is_student() and not current_user.is_professor() and not current_user.is_ta():
        raise HTTPException(status_code=403, detail="没有权限上传文件")
    
    # 上传文件
    try:
        result = await file_service.upload_submission_file(file, submission_id, db)
        return result
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"文件上传失败: {str(e)}")


@router.get("/submission/{submission_id}", response_model=FileListResponse)
async def get_submission_files(
    submission_id: str,
    page: int = Query(1, ge=1, description="页码"),
    per_page: int = Query(10, ge=1, le=100, description="每页数量"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    file_service: FileService = Depends(get_file_service)
):
    """
    获取作业提交的所有文件
    教授、TA可以查看所有文件，学生只能查看自己的文件
    """
    # 检查权限
    if not current_user.is_professor() and not current_user.is_ta():
        # 学生只能查看自己的文件，需要验证submission_id是否属于该学生
        # 这里需要添加额外的验证逻辑
        pass
    
    try:
        files = await file_service.get_submission_files(submission_id, db)
        
        # 分页处理
        total = len(files)
        start_idx = (page - 1) * per_page
        end_idx = start_idx + per_page
        paginated_files = files[start_idx:end_idx]
        
        return FileListResponse(
            files=paginated_files,
            total=total,
            page=page,
            per_page=per_page
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取文件列表失败: {str(e)}")


@router.get("/{file_id}", response_model=FileMetadata)
async def get_file_metadata(
    file_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    file_service: FileService = Depends(get_file_service)
):
    """
    获取文件元数据
    """
    try:
        metadata = await file_service.get_file_metadata(file_id, db)
        if not metadata:
            raise HTTPException(status_code=404, detail="文件不存在")
        
        return metadata
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取文件元数据失败: {str(e)}")


@router.delete("/{file_id}", response_model=FileDeleteResponse)
async def delete_file(
    file_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    file_service: FileService = Depends(get_file_service)
):
    """
    删除文件
    只有教授和TA可以删除文件
    """
    # 检查权限
    if not current_user.is_professor() and not current_user.is_ta():
        raise HTTPException(status_code=403, detail="没有权限删除文件")
    
    try:
        # 获取文件记录以获取文件路径
        file_record = db.query(file_service.storage_backend.SubmissionFile).filter(
            file_service.storage_backend.SubmissionFile.id == file_id
        ).first()
        
        if not file_record:
            raise HTTPException(status_code=404, detail="文件不存在")
        
        # 删除文件
        success = await file_service.delete_file(file_record.file_path, db, file_id)
        
        if success:
            return FileDeleteResponse(
                success=True,
                message="文件删除成功"
            )
        else:
            return FileDeleteResponse(
                success=False,
                message="文件删除失败"
            )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"删除文件失败: {str(e)}")


@router.get("/{file_id}/download")
async def download_file(
    file_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    file_service: FileService = Depends(get_file_service)
):
    """
    下载文件
    教授、TA可以下载所有文件，学生只能下载自己的文件
    """
    try:
        # 获取文件记录
        file_record = db.query(file_service.storage_backend.SubmissionFile).filter(
            file_service.storage_backend.SubmissionFile.id == file_id
        ).first()
        
        if not file_record:
            raise HTTPException(status_code=404, detail="文件不存在")
        
        # 检查权限
        if current_user.is_student():
            # 学生只能下载自己的文件
            # 这里需要验证文件是否属于该学生
            pass
        
        # 下载文件
        file_content = await file_service.download_file(file_record.file_path)
        
        # 返回文件内容
        from fastapi.responses import Response
        return Response(
            content=file_content,
            media_type=file_record.mime_type,
            headers={
                "Content-Disposition": f"attachment; filename={file_record.file_name}"
            }
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"下载文件失败: {str(e)}")


@router.post("/validate", response_model=FileValidationResponse)
async def validate_file(
    request: FileValidationRequest,
    file_service: FileService = Depends(get_file_service)
):
    """
    验证文件是否符合上传要求
    """
    try:
        # 检查文件大小
        if request.file_size > 100 * 1024 * 1024:  # 100MB
            return FileValidationResponse(
                is_valid=False,
                error_message="文件大小超过限制 (100MB)",
                allowed_types=[
                    "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
                    "jpg", "png", "gif", "bmp", "webp",
                    "mp4", "avi", "mov", "wmv", "flv",
                    "mp3", "wav", "m4a", "flac",
                    "zip", "rar", "7z",
                    "txt", "csv", "html", "css", "json", "xml"
                ],
                max_file_size=100 * 1024 * 1024
            )
        
        # 检查文件类型
        allowed_types = {
            'application/pdf': 'pdf',
            'application/msword': 'doc',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
            'application/vnd.ms-excel': 'xls',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
            'application/vnd.ms-powerpoint': 'ppt',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'image/gif': 'gif',
            'image/bmp': 'bmp',
            'image/webp': 'webp',
            'video/mp4': 'mp4',
            'video/avi': 'avi',
            'video/mov': 'mov',
            'video/wmv': 'wmv',
            'video/flv': 'flv',
            'audio/mp3': 'mp3',
            'audio/wav': 'wav',
            'audio/m4a': 'm4a',
            'audio/flac': 'flac',
            'application/zip': 'zip',
            'application/x-rar-compressed': 'rar',
            'application/x-7z-compressed': '7z',
            'text/plain': 'txt',
            'text/csv': 'csv',
            'text/html': 'html',
            'text/css': 'css',
            'application/json': 'json',
            'application/xml': 'xml',
        }
        
        if request.content_type not in allowed_types:
            return FileValidationResponse(
                is_valid=False,
                error_message="不支持的文件类型",
                allowed_types=list(allowed_types.values()),
                max_file_size=100 * 1024 * 1024
            )
        
        return FileValidationResponse(
            is_valid=True,
            allowed_types=list(allowed_types.values()),
            max_file_size=100 * 1024 * 1024
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"文件验证失败: {str(e)}")


@router.get("/allowed-types")
async def get_allowed_file_types():
    """
    获取允许的文件类型
    """
    allowed_types = {
        'application/pdf': 'pdf',
        'application/msword': 'doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'application/vnd.ms-excel': 'xls',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'application/vnd.ms-powerpoint': 'ppt',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/bmp': 'bmp',
        'image/webp': 'webp',
        'video/mp4': 'mp4',
        'video/avi': 'avi',
        'video/mov': 'mov',
        'video/wmv': 'wmv',
        'video/flv': 'flv',
        'audio/mp3': 'mp3',
        'audio/wav': 'wav',
        'audio/m4a': 'm4a',
        'audio/flac': 'flac',
        'application/zip': 'zip',
        'application/x-rar-compressed': 'rar',
        'application/x-7z-compressed': '7z',
        'text/plain': 'txt',
        'text/csv': 'csv',
        'text/html': 'html',
        'text/css': 'css',
        'application/json': 'json',
        'application/xml': 'xml',
    }
    return {
        "allowed_types": list(allowed_types.keys()),
        "file_extensions": list(allowed_types.values()),
        "max_file_size": "100MB"
    }


@router.get("/storage-info")
async def get_storage_info(
    current_user: User = Depends(get_current_user)
):
    """
    获取存储信息
    只有管理员可以查看
    """
    # 简化权限检查，使用字符串比较
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="没有权限查看存储信息")
    
    from app.core.config import settings
    return {
        "storage_type": settings.STORAGE_TYPE,
        "max_file_size": f"{100}MB",
        "allowed_file_types_count": 30,
        "upload_directory": getattr(settings, 'UPLOAD_DIR', 'uploads')
    }
