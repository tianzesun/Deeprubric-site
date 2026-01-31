"""
WebSocket API路由
提供实时协作功能的WebSocket端点
"""

from typing import Dict, Any, List
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException
from sqlalchemy.orm import Session
import json

from app.core.dependencies import get_db, get_current_user
from app.core.websocket_manager import websocket_manager, CollaborationMessage
from app.models.user import User

router = APIRouter()


@router.websocket("/collaboration/{assignment_id}")
async def collaboration_websocket(
    websocket: WebSocket,
    assignment_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    协作评分WebSocket端点
    支持多人同时评分同一个作业
    """
    # 检查用户权限
    if current_user.role not in ["professor", "ta"]:
        await websocket.close(code=1008, reason="没有权限参与协作评分")
        return
    
    # 建立连接
    connection = await websocket_manager.connect(
        websocket, 
        current_user.id, 
        current_user.role
    )
    
    # 加入协作会话
    session = await websocket_manager.join_collaboration_session(
        current_user.id, 
        assignment_id
    )
    
    try:
        # 发送会话信息给新加入的用户
        active_users = await websocket_manager.get_active_users_in_session(session.session_id)
        await websocket.send_text(json.dumps(
            CollaborationMessage.session_status_update(
                session.session_id,
                "session_joined",
                {
                    "assignment_id": assignment_id,
                    "active_users": active_users,
                    "current_grader": session.current_grader
                }
            )
        ))
        
        # 处理消息
        while True:
            try:
                data = await websocket.receive_text()
                message = json.loads(data)
                
                # 处理不同类型的消息
                message_type = message.get("type")
                
                if message_type == "grade_update":
                    await handle_grade_update(websocket, message, current_user, assignment_id)
                
                elif message_type == "criteria_comment_update":
                    await handle_criteria_comment_update(websocket, message, current_user, assignment_id)
                
                elif message_type == "file_annotation_update":
                    await handle_file_annotation_update(websocket, message, current_user, assignment_id)
                
                elif message_type == "request_current_grader":
                    await handle_request_current_grader(websocket, session.session_id)
                
                elif message_type == "release_grader_lock":
                    await handle_release_grader_lock(websocket, session.session_id, current_user.id)
                
                else:
                    # 转发未知消息到会话
                    await websocket_manager.broadcast_to_session(session.session_id, message)
                    
            except WebSocketDisconnect:
                break
            except Exception as e:
                await websocket.send_text(json.dumps(
                    CollaborationMessage.session_status_update(
                        session.session_id,
                        "error",
                        {"error": str(e)}
                    )
                ))
    
    finally:
        # 清理连接
        await websocket_manager.leave_collaboration_session(
            current_user.id, 
            session.session_id
        )
        await websocket_manager.disconnect(current_user.id)


@router.websocket("/notifications")
async def notification_websocket(
    websocket: WebSocket,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    通知WebSocket端点
    接收系统通知和课程相关消息
    """
    # 建立连接
    connection = await websocket_manager.connect(
        websocket, 
        current_user.id, 
        current_user.role
    )
    
    try:
        # 发送连接确认
        await websocket.send_text(json.dumps({
            "type": "connection_established",
            "user_id": current_user.id,
            "role": current_user.role,
            "timestamp": "2024-01-01T00:00:00Z"
        }))
        
        # 保持连接
        while True:
            try:
                data = await websocket.receive_text()
                message = json.loads(data)
                
                # 处理通知相关消息
                message_type = message.get("type")
                
                if message_type == "subscribe_course":
                    course_id = message.get("course_id")
                    connection.course_id = course_id
                    await websocket.send_text(json.dumps({
                        "type": "course_subscribed",
                        "course_id": course_id,
                        "timestamp": "2024-01-01T00:00:00Z"
                    }))
                
                elif message_type == "subscribe_assignment":
                    assignment_id = message.get("assignment_id")
                    connection.assignment_id = assignment_id
                    await websocket.send_text(json.dumps({
                        "type": "assignment_subscribed",
                        "assignment_id": assignment_id,
                        "timestamp": "2024-01-01T00:00:00Z"
                    }))
                
            except WebSocketDisconnect:
                break
            except Exception as e:
                await websocket.send_text(json.dumps({
                    "type": "error",
                    "error": str(e),
                    "timestamp": "2024-01-01T00:00:00Z"
                }))
    
    finally:
        await websocket_manager.disconnect(current_user.id)


async def handle_grade_update(
    websocket: WebSocket, 
    message: Dict[str, Any], 
    current_user: User, 
    assignment_id: str
):
    """处理评分更新消息"""
    try:
        criteria_scores = message.get("criteria_scores", {})
        total_score = message.get("total_score", 0.0)
        feedback = message.get("feedback", "")
        
        # 广播评分更新
        grade_update_message = CollaborationMessage.grade_update(
            assignment_id=assignment_id,
            user_id=current_user.id,
            criteria_scores=criteria_scores,
            total_score=total_score,
            feedback=feedback
        )
        
        await websocket_manager.broadcast_to_session(f"collab_{assignment_id}", grade_update_message)
        
    except Exception as e:
        await websocket.send_text(json.dumps(
            CollaborationMessage.session_status_update(
                f"collab_{message.get('assignment_id', assignment_id)}",
                "error",
                {"error": f"评分更新失败: {str(e)}"}
            )
        ))


async def handle_criteria_comment_update(
    websocket: WebSocket, 
    message: Dict[str, Any], 
    current_user: User, 
    assignment_id: str
):
    """处理评分标准评论更新消息"""
    try:
        criteria_id = message.get("criteria_id", "")
        comment = message.get("comment", "")
        
        # 广播评论更新
        comment_update_message = CollaborationMessage.criteria_comment_update(
            assignment_id=assignment_id,
            user_id=current_user.id,
            criteria_id=criteria_id,
            comment=comment
        )
        
        await websocket_manager.broadcast_to_session(f"collab_{assignment_id}", comment_update_message)
        
    except Exception as e:
        await websocket.send_text(json.dumps(
            CollaborationMessage.session_status_update(
                f"collab_{message.get('assignment_id', assignment_id)}",
                "error",
                {"error": f"评论更新失败: {str(e)}"}
            )
        ))


async def handle_file_annotation_update(
    websocket: WebSocket, 
    message: Dict[str, Any], 
    current_user: User, 
    assignment_id: str
):
    """处理文件标注更新消息"""
    try:
        file_id = message.get("file_id", "")
        annotation = message.get("annotation", {})
        
        # 广播文件标注更新
        annotation_update_message = CollaborationMessage.file_annotation_update(
            assignment_id=assignment_id,
            user_id=current_user.id,
            file_id=file_id,
            annotation=annotation
        )
        
        await websocket_manager.broadcast_to_session(f"collab_{assignment_id}", annotation_update_message)
        
    except Exception as e:
        await websocket.send_text(json.dumps(
            CollaborationMessage.session_status_update(
                f"collab_{message.get('assignment_id', assignment_id)}",
                "error",
                {"error": f"文件标注更新失败: {str(e)}"}
            )
        ))


async def handle_request_current_grader(
    websocket: WebSocket, 
    session_id: str
):
    """处理请求当前评分者消息"""
    try:
        session = await websocket_manager.get_session_info(session_id)
        if session:
            await websocket.send_text(json.dumps(
                CollaborationMessage.session_status_update(
                    session_id,
                    "current_grader_info",
                    {
                        "current_grader": session.current_grader,
                        "active_users": session.active_users
                    }
                )
            ))
    except Exception as e:
        await websocket.send_text(json.dumps(
            CollaborationMessage.session_status_update(
                session_id,
                "error",
                {"error": f"获取当前评分者失败: {str(e)}"}
            )
        ))


async def handle_release_grader_lock(
    websocket: WebSocket, 
    session_id: str, 
    user_id: str
):
    """处理释放评分者锁消息"""
    try:
        await websocket_manager.set_current_grader(session_id, "")
        
        await websocket.send_text(json.dumps(
            CollaborationMessage.session_status_update(
                session_id,
                "grader_lock_released",
                {"released_by": user_id}
            )
        ))
    except Exception as e:
        await websocket.send_text(json.dumps(
            CollaborationMessage.session_status_update(
                session_id,
                "error",
                {"error": f"释放评分者锁失败: {str(e)}"}
            )
        ))


@router.get("/collaboration/{assignment_id}/status")
async def get_collaboration_status(
    assignment_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    获取协作会话状态
    """
    session_id = f"collab_{assignment_id}"
    session = await websocket_manager.get_session_info(session_id)
    
    if not session:
        return {
            "session_id": session_id,
            "assignment_id": assignment_id,
            "status": "inactive",
            "active_users": [],
            "current_grader": None
        }
    
    active_users = await websocket_manager.get_active_users_in_session(session_id)
    
    return {
        "session_id": session.session_id,
        "assignment_id": session.assignment_id,
        "status": "active",
        "active_users": active_users,
        "current_grader": session.current_grader,
        "last_activity": session.last_activity.isoformat()
    }


@router.post("/collaboration/{assignment_id}/lock")
async def request_grader_lock(
    assignment_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    请求评分者锁
    确保同一时间只有一个用户可以修改评分
    """
    if current_user.role not in ["professor", "ta"]:
        raise HTTPException(status_code=403, detail="没有权限请求评分者锁")
    
    session_id = f"collab_{assignment_id}"
    await websocket_manager.set_current_grader(session_id, current_user.id)
    
    return {
        "success": True,
        "message": "已获得评分者锁",
        "grader_id": current_user.id,
        "session_id": session_id
    }


@router.post("/collaboration/{assignment_id}/unlock")
async def release_grader_lock(
    assignment_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    释放评分者锁
    """
    session_id = f"collab_{assignment_id}"
    await websocket_manager.set_current_grader(session_id, "")
    
    return {
        "success": True,
        "message": "已释放评分者锁",
        "session_id": session_id
    }