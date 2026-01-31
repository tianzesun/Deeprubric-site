"""
文件存储服务
提供安全的文件上传、存储和访问功能
支持多种云存储后端（AWS S3、阿里云OSS、本地存储）
"""

import os
import uuid
import hashlib
from datetime import datetime, timedelta
from typing import Optional, Dict, Any, List
from pathlib import Path
from urllib.parse import quote

from fastapi import UploadFile, HTTPException
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.logging import logger
from app.models.submission import SubmissionFile
from app.schemas.file_schema import FileUploadResponse, FileMetadata


class FileStorageBackend:
    """文件存储后端接口"""
    
    async def upload_file(self, file: UploadFile, file_path: str) -> str:
        """上传文件"""
        raise NotImplementedError
    
    async def download_file(self, file_path: str) -> bytes:
        """下载文件"""
        raise NotImplementedError
    
    async def delete_file(self, file_path: str) -> bool:
        """删除文件"""
        raise NotImplementedError
    
    async def get_file_url(self, file_path: str, expires_in: int = 3600) -> str:
        """获取文件访问URL"""
        raise NotImplementedError
    
    def get_file_path(self, original_filename: str, submission_id: str) -> str:
        """生成文件存储路径"""
        raise NotImplementedError


class LocalFileStorage(FileStorageBackend):
    """本地文件存储实现"""
    
    def __init__(self, base_path: str = "uploads"):
        self.base_path = Path(base_path)
        self.base_path.mkdir(parents=True, exist_ok=True)
    
    def get_file_path(self, original_filename: str, submission_id: str) -> str:
        """生成本地文件存储路径"""
        # 使用UUID和时间戳确保文件名唯一
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        file_extension = Path(original_filename).suffix
        unique_filename = f"{submission_id}_{timestamp}_{uuid.uuid4().hex}{file_extension}"
        return str(self.base_path / "submissions" / submission_id / unique_filename)
    
    async def upload_file(self, file: UploadFile, file_path: str) -> str:
        """上传文件到本地存储"""
        try:
            # 确保目录存在
            Path(file_path).parent.mkdir(parents=True, exist_ok=True)
            
            # 保存文件
            with open(file_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)
            
            return file_path
        except Exception as e:
            logger.error(f"本地文件上传失败: {e}")
            raise HTTPException(status_code=500, detail="文件上传失败")
    
    async def download_file(self, file_path: str) -> bytes:
        """从本地存储下载文件"""
        try:
            with open(file_path, "rb") as file:
                return file.read()
        except FileNotFoundError:
            raise HTTPException(status_code=404, detail="文件不存在")
        except Exception as e:
            logger.error(f"本地文件下载失败: {e}")
            raise HTTPException(status_code=500, detail="文件下载失败")
    
    async def delete_file(self, file_path: str) -> bool:
        """删除本地文件"""
        try:
            Path(file_path).unlink(missing_ok=True)
            return True
        except Exception as e:
            logger.error(f"本地文件删除失败: {e}")
            return False
    
    async def get_file_url(self, file_path: str, expires_in: int = 3600) -> str:
        """获取本地文件访问URL"""
        # 本地存储直接返回文件路径
        return f"/api/v1/files/download?path={quote(file_path)}"


class S3FileStorage(FileStorageBackend):
    """AWS S3文件存储实现"""
    
    def __init__(self, bucket_name: str, region: str = "us-east-1"):
        self.bucket_name = bucket_name
        self.region = region
        # 这里需要安装 boto3: pip install boto3
        try:
            import boto3
            self.s3_client = boto3.client(
                's3',
                region_name=region,
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
            )
        except ImportError:
            logger.error("boto3未安装，无法使用S3存储")
            raise HTTPException(status_code=500, detail="S3存储配置错误")
    
    def get_file_path(self, original_filename: str, submission_id: str) -> str:
        """生成S3文件存储路径"""
        timestamp = datetime.now().strftime("%Y/%m/%d")
        file_extension = Path(original_filename).suffix
        unique_filename = f"{submission_id}_{timestamp}_{uuid.uuid4().hex}{file_extension}"
        return f"submissions/{submission_id}/{unique_filename}"
    
    async def upload_file(self, file: UploadFile, file_path: str) -> str:
        """上传文件到S3"""
        try:
            content = await file.read()
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=file_path,
                Body=content,
                ContentType=file.content_type or 'application/octet-stream'
            )
            return file_path
        except Exception as e:
            logger.error(f"S3文件上传失败: {e}")
            raise HTTPException(status_code=500, detail="文件上传失败")
    
    async def download_file(self, file_path: str) -> bytes:
        """从S3下载文件"""
        try:
            response = self.s3_client.get_object(Bucket=self.bucket_name, Key=file_path)
            return response['Body'].read()
        except Exception as e:
            logger.error(f"S3文件下载失败: {e}")
            raise HTTPException(status_code=404, detail="文件不存在")
    
    async def delete_file(self, file_path: str) -> bool:
        """删除S3文件"""
        try:
            self.s3_client.delete_object(Bucket=self.bucket_name, Key=file_path)
            return True
        except Exception as e:
            logger.error(f"S3文件删除失败: {e}")
            return False
    
    async def get_file_url(self, file_path: str, expires_in: int = 3600) -> str:
        """获取S3文件预签名URL"""
        try:
            url = self.s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': self.bucket_name, 'Key': file_path},
                ExpiresIn=expires_in
            )
            return url
        except Exception as e:
            logger.error(f"S3文件URL生成失败: {e}")
            raise HTTPException(status_code=500, detail="文件URL生成失败")


class FileService:
    """文件服务主类"""
    
    def __init__(self, storage_backend: FileStorageBackend):
        self.storage_backend = storage_backend
    
    async def validate_file(self, file: UploadFile) -> Dict[str, Any]:
        """验证文件"""
        # 检查文件大小
        if file.size and file.size > settings.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413, 
                detail=f"文件大小超过限制 ({settings.MAX_FILE_SIZE / 1024 / 1024}MB)"
            )
        
        # 检查文件类型
        if file.content_type and not self._is_allowed_type(file.content_type):
            raise HTTPException(
                status_code=415, 
                detail="不支持的文件类型"
            )
        
        # 生成文件元数据
        file_hash = await self._calculate_file_hash(file)
        
        return {
            "original_filename": file.filename,
            "content_type": file.content_type,
            "size": file.size,
            "file_hash": file_hash,
            "is_valid": True
        }
    
    async def upload_submission_file(
        self, 
        file: UploadFile, 
        submission_id: str,
        db: Session
    ) -> FileUploadResponse:
        """上传作业文件"""
        # 验证文件
        validation_result = await self.validate_file(file)
        if not validation_result["is_valid"]:
            raise HTTPException(status_code=400, detail="文件验证失败")
        
        # 生成存储路径
        file_path = self.storage_backend.get_file_path(file.filename or "unknown", submission_id)
        
        # 上传文件
        stored_path = await self.storage_backend.upload_file(file, file_path)
        
        # 保存文件记录到数据库
        file_record = SubmissionFile(
            submission_id=submission_id,
            file_name=file.filename,
            file_path=stored_path,
            file_url="",  # 稍后生成
            file_size=validation_result["size"],
            mime_type=validation_result["content_type"],
            file_hash=validation_result["file_hash"],
            uploaded_at=datetime.utcnow()
        )
        
        db.add(file_record)
        db.commit()
        db.refresh(file_record)
        
        # 生成访问URL
        file_url = await self.storage_backend.get_file_url(stored_path)
        file_record.file_url = file_url
        db.commit()
        
        return FileUploadResponse(
            id=file_record.id,
            file_name=file.filename,
            file_url=file_url,
            file_size=file_record.file_size,
            mime_type=file_record.mime_type,
            uploaded_at=file_record.uploaded_at
        )
    
    async def download_file(self, file_path: str) -> bytes:
        """下载文件"""
        return await self.storage_backend.download_file(file_path)
    
    async def delete_file(self, file_path: str, db: Session, file_id: str) -> bool:
        """删除文件"""
        # 从存储后端删除文件
        success = await self.storage_backend.delete_file(file_path)
        
        if success:
            # 从数据库删除记录
            db.query(SubmissionFile).filter(SubmissionFile.id == file_id).delete()
            db.commit()
        
        return success
    
    async def get_file_metadata(self, file_id: str, db: Session) -> Optional[FileMetadata]:
        """获取文件元数据"""
        file_record = db.query(SubmissionFile).filter(SubmissionFile.id == file_id).first()
        if not file_record:
            return None
        
        return FileMetadata(
            id=file_record.id,
            file_name=file_record.file_name,
            file_size=file_record.file_size,
            mime_type=file_record.mime_type,
            uploaded_at=file_record.uploaded_at,
            file_hash=file_record.file_hash
        )
    
    async def get_submission_files(self, submission_id: str, db: Session) -> List[FileMetadata]:
        """获取作业的所有文件"""
        file_records = db.query(SubmissionFile).filter(
            SubmissionFile.submission_id == submission_id
        ).all()
        
        return [
            FileMetadata(
                id=file_record.id,
                file_name=file_record.file_name,
                file_size=file_record.file_size,
                mime_type=file_record.mime_type,
                uploaded_at=file_record.uploaded_at,
                file_hash=file_record.file_hash
            )
            for file_record in file_records
        ]
    
    def _is_allowed_type(self, content_type: str) -> bool:
        """检查是否为允许的文件类型"""
        allowed_types = settings.ALLOWED_FILE_TYPES
        return content_type in allowed_types
    
    async def _calculate_file_hash(self, file: UploadFile) -> str:
        """计算文件哈希值"""
        await file.seek(0)
        content = await file.read()
        file_hash = hashlib.md5(content).hexdigest()
        await file.seek(0)  # 重置文件指针
        return file_hash


# 创建文件服务实例
def get_file_service() -> FileService:
    """根据配置创建文件服务实例"""
    storage_type = settings.STORAGE_TYPE.lower()
    
    if storage_type == "s3":
        backend = S3FileStorage(
            bucket_name=settings.S3_BUCKET_NAME,
            region=settings.AWS_REGION
        )
    elif storage_type == "oss":
        # 阿里云OSS实现（需要安装 aliyun-python-sdk-oss2）
        raise NotImplementedError("阿里云OSS存储尚未实现")
    else:  # local
        backend = LocalFileStorage(settings.UPLOAD_DIR)
    
    return FileService(backend)