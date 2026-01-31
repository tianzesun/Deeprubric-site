"""
WebSocket 管理器
提供实时协作功能，支持多人同时评分和实时通知
"""

from typing import Dict, List, Set, Optional, Any
from dataclasses import dataclass, asdict
from datetime import datetime
import json
import asyncio
from fastapi import WebSocket, WebSocketDisconnect
from app.core.logging import logger


@dataclass
class UserConnection:
    """用户连接信息"""
    user_id: str
    websocket: WebSocket
    role: str
    course_id: Optional[str] = None
    assignment_id: Optional[str] = None
    joined_at: datetime = None
    
    def __post_init__(self):
        if self.joined_at is None:
            self.joined_at = datetime.utcnow()


@dataclass
class CollaborationSession:
    """协作会话信息"""
    session_id: str
    assignment_id: str
    active_users: List[str]
    current_grader: Optional[str] = None
    last_activity: datetime = None
    
    def __post_init__(self):
        if self.last_activity is None:
            self.last_activity = datetime.utcnow()


class WebSocketManager:
    """WebSocket 连接管理器"""
    
    def __init__(self):
        self.active_connections: Dict[str, UserConnection] = {}
        self.collaboration_sessions: Dict[str, CollaborationSession] = {}
        self.user_sessions: Dict[str, Set[str]] = {}  # user_id -> session_ids
        self.lock = asyncio.Lock()
    
    async def connect(self, websocket: WebSocket, user_id: str, role: str) -> UserConnection:
        """建立WebSocket连接"""
        await websocket.accept()
        
        connection = UserConnection(
            user_id=user_id,
            websocket=websocket,
            role=role
        )
        
        async with self.lock:
            self.active_connections[user_id] = connection
            if user_id not in self.user_sessions:
                self.user_sessions[user_id] = set()
        
        logger.info(f"用户 {user_id} ({role}) 已连接")
        return connection
    
    async def disconnect(self, user_id: str):
        """断开WebSocket连接"""
        async with self.lock:
            if user_id in self.active_connections:
                connection = self.active_connections.pop(user_id)
                
                # 清理用户会话
                if user_id in self.user_sessions:
                    for session_id in self.user_sessions[user_id]:
                        await self.leave_collaboration_session(user_id, session_id)
                    del self.user_sessions[user_id]
        
        logger.info(f"用户 {user_id} 已断开连接")
    
    async def join_collaboration_session(self, user_id: str, assignment_id: str) -> CollaborationSession:
        """加入协作会话"""
        session_id = f"collab_{assignment_id}"
        
        async with self.lock:
            # 创建或获取协作会话
            if session_id not in self.collaboration_sessions:
                self.collaboration_sessions[session_id] = CollaborationSession(
                    session_id=session_id,
                    assignment_id=assignment_id,
                    active_users=[]
                )
            
            session = self.collaboration_sessions[session_id]
            
            # 添加用户到会话
            if user_id not in session.active_users:
                session.active_users.append(user_id)
                session.last_activity = datetime.utcnow()
            
            # 添加会话到用户
            if user_id in self.user_sessions:
                self.user_sessions[user_id].add(session_id)
            
            # 通知其他用户
            await self.broadcast_to_session(
                session_id,
                {
                    "type": "user_joined",
                    "user_id": user_id,
                    "role": getattr(self.active_connections.get(user_id), 'role', 'unknown'),
                    "timestamp": session.last_activity.isoformat()
                }
            )
        
        logger.info(f"用户 {user_id} 加入协作会话 {session_id}")
        return session
    
    async def leave_collaboration_session(self, user_id: str, session_id: str):
        """离开协作会话"""
        async with self.lock:
            if session_id in self.collaboration_sessions:
                session = self.collaboration_sessions[session_id]
                
                # 从会话中移除用户
                if user_id in session.active_users:
                    session.active_users.remove(user_id)
                    session.last_activity = datetime.utcnow()
                
                # 如果会话为空，删除会话
                if not session.active_users:
                    del self.collaboration_sessions[session_id]
                else:
                    # 通知其他用户
                    await self.broadcast_to_session(
                        session_id,
                        {
                            "type": "user_left",
                            "user_id": user_id,
                            "timestamp": session.last_activity.isoformat()
                        }
                    )
            
            # 从用户会话中移除
            if user_id in self.user_sessions and session_id in self.user_sessions[user_id]:
                self.user_sessions[user_id].remove(session_id)
    
    async def set_current_grader(self, session_id: str, user_id: str):
        """设置当前评分者"""
        async with self.lock:
            if session_id in self.collaboration_sessions:
                session = self.collaboration_sessions[session_id]
                session.current_grader = user_id
                session.last_activity = datetime.utcnow()
                
                # 通知所有用户
                await self.broadcast_to_session(
                    session_id,
                    {
                        "type": "current_grader_changed",
                        "current_grader": user_id,
                        "timestamp": session.last_activity.isoformat()
                    }
                )
    
    async def broadcast_to_session(self, session_id: str, message: Dict[str, Any]):
        """向协作会话中的所有用户广播消息"""
        async with self.lock:
            if session_id in self.collaboration_sessions:
                session = self.collaboration_sessions[session_id]
                
                for user_id in session.active_users:
                    if user_id in self.active_connections:
                        try:
                            await self.active_connections[user_id].websocket.send_text(
                                json.dumps(message)
                            )
                        except Exception as e:
                            logger.error(f"发送消息给用户 {user_id} 失败: {e}")
                            # 移除断开连接的用户
                            await self.disconnect(user_id)
    
    async def send_personal_message(self, message: Dict[str, Any], user_id: str):
        """发送私有消息给指定用户"""
        async with self.lock:
            if user_id in self.active_connections:
                try:
                    await self.active_connections[user_id].websocket.send_text(
                        json.dumps(message)
                    )
                except Exception as e:
                    logger.error(f"发送私有消息给用户 {user_id} 失败: {e}")
                    await self.disconnect(user_id)
    
    async def broadcast_to_course(self, course_id: str, message: Dict[str, Any]):
        """向课程中的所有用户广播消息"""
        async with self.lock:
            for connection in self.active_connections.values():
                if connection.course_id == course_id:
                    try:
                        await connection.websocket.send_text(json.dumps(message))
                    except Exception as e:
                        logger.error(f"发送消息给用户 {connection.user_id} 失败: {e}")
                        await self.disconnect(connection.user_id)
    
    async def get_session_info(self, session_id: str) -> Optional[CollaborationSession]:
        """获取会话信息"""
        async with self.lock:
            return self.collaboration_sessions.get(session_id)
    
    async def get_active_users_in_session(self, session_id: str) -> List[Dict[str, Any]]:
        """获取会话中的活跃用户列表"""
        async with self.lock:
            if session_id in self.collaboration_sessions:
                session = self.collaboration_sessions[session_id]
                users_info = []
                
                for user_id in session.active_users:
                    if user_id in self.active_connections:
                        connection = self.active_connections[user_id]
                        users_info.append({
                            "user_id": user_id,
                            "role": connection.role,
                            "joined_at": connection.joined_at.isoformat()
                        })
                
                return users_info
            return []
    
    async def cleanup_inactive_sessions(self, max_idle_time: int = 3600):
        """清理非活跃会话"""
        async with self.lock:
            current_time = datetime.utcnow()
            sessions_to_remove = []
            
            for session_id, session in self.collaboration_sessions.items():
                if (current_time - session.last_activity).total_seconds() > max_idle_time:
                    sessions_to_remove.append(session_id)
            
            for session_id in sessions_to_remove:
                del self.collaboration_sessions[session_id]
                logger.info(f"清理非活跃会话: {session_id}")


# 全局WebSocket管理器实例
websocket_manager = WebSocketManager()


class CollaborationMessage:
    """协作消息类型定义"""
    
    @staticmethod
    def grade_update(assignment_id: str, user_id: str, criteria_scores: Dict[str, int], 
                    total_score: float, feedback: str) -> Dict[str, Any]:
        """评分更新消息"""
        return {
            "type": "grade_update",
            "assignment_id": assignment_id,
            "user_id": user_id,
            "criteria_scores": criteria_scores,
            "total_score": total_score,
            "feedback": feedback,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    @staticmethod
    def criteria_comment_update(assignment_id: str, user_id: str, 
                               criteria_id: str, comment: str) -> Dict[str, Any]:
        """评分标准评论更新消息"""
        return {
            "type": "criteria_comment_update",
            "assignment_id": assignment_id,
            "user_id": user_id,
            "criteria_id": criteria_id,
            "comment": comment,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    @staticmethod
    def file_annotation_update(assignment_id: str, user_id: str,
                              file_id: str, annotation: Dict[str, Any]) -> Dict[str, Any]:
        """文件标注更新消息"""
        return {
            "type": "file_annotation_update",
            "assignment_id": assignment_id,
            "user_id": user_id,
            "file_id": file_id,
            "annotation": annotation,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    @staticmethod
    def session_status_update(session_id: str, status: str, 
                            details: Dict[str, Any]) -> Dict[str, Any]:
        """会话状态更新消息"""
        return {
            "type": "session_status_update",
            "session_id": session_id,
            "status": status,
            "details": details,
            "timestamp": datetime.utcnow().isoformat()
        }