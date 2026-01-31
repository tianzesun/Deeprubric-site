import { useState, useEffect, useRef, useCallback } from 'react';

interface CollaborationUser {
  user_id: string;
  role: string;
  joined_at: string;
}

interface CollaborationSession {
  session_id: string;
  assignment_id: string;
  status: string;
  active_users: CollaborationUser[];
  current_grader: string | null;
  last_activity: string;
}

interface GradeUpdateMessage {
  type: 'grade_update';
  assignment_id: string;
  user_id: string;
  criteria_scores: Record<string, number>;
  total_score: number;
  feedback: string;
  timestamp: string;
}

interface CriteriaCommentMessage {
  type: 'criteria_comment_update';
  assignment_id: string;
  user_id: string;
  criteria_id: string;
  comment: string;
  timestamp: string;
}

interface FileAnnotationMessage {
  type: 'file_annotation_update';
  assignment_id: string;
  user_id: string;
  file_id: string;
  annotation: any;
  timestamp: string;
}

interface SessionStatusMessage {
  type: 'session_status_update';
  session_id: string;
  status: string;
  details: any;
  timestamp: string;
}

type CollaborationMessage = 
  | GradeUpdateMessage 
  | CriteriaCommentMessage 
  | FileAnnotationMessage 
  | SessionStatusMessage;

export interface UseCollaborationOptions {
  assignmentId: string;
  onGradeUpdate?: (message: GradeUpdateMessage) => void;
  onCriteriaCommentUpdate?: (message: CriteriaCommentMessage) => void;
  onFileAnnotationUpdate?: (message: FileAnnotationMessage) => void;
  onSessionStatusUpdate?: (message: SessionStatusMessage) => void;
}

export function useCollaboration(options: UseCollaborationOptions) {
  const { assignmentId, onGradeUpdate, onCriteriaCommentUpdate, onFileAnnotationUpdate, onSessionStatusUpdate } = options;
  
  const [isConnected, setIsConnected] = useState(false);
  const [session, setSession] = useState<CollaborationSession | null>(null);
  const [activeUsers, setActiveUsers] = useState<CollaborationUser[]>([]);
  const [currentGrader, setCurrentGrader] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  
  const websocketRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    if (websocketRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    const token = localStorage.getItem('auth_token');
    if (!token) {
      setConnectionError('未登录，无法连接协作会话');
      return;
    }

    try {
      const wsUrl = `${process.env.NEXT_PUBLIC_API_WS_URL || 'ws://localhost:8000'}/api/v1/collaboration/${assignmentId}`;
      websocketRef.current = new WebSocket(wsUrl);

      websocketRef.current.onopen = () => {
        console.log('WebSocket连接已建立');
        setIsConnected(true);
        setConnectionError(null);
        reconnectAttempts.current = 0;
      };

      websocketRef.current.onmessage = (event) => {
        try {
          const message: CollaborationMessage = JSON.parse(event.data);
          handleMessage(message);
        } catch (error) {
          console.error('解析WebSocket消息失败:', error);
        }
      };

      websocketRef.current.onclose = (event) => {
        console.log('WebSocket连接已关闭:', event.code, event.reason);
        setIsConnected(false);
        
        // 自动重连
        if (reconnectAttempts.current < maxReconnectAttempts && event.code !== 1000) {
          reconnectAttempts.current++;
          const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 10000);
          
          reconnectTimeout.current = setTimeout(() => {
            console.log(`尝试重新连接 (${reconnectAttempts.current}/${maxReconnectAttempts})`);
            connect();
          }, delay);
        } else {
          setConnectionError('协作连接已断开');
        }
      };

      websocketRef.current.onerror = (error) => {
        console.error('WebSocket错误:', error);
        setConnectionError('连接协作会话时发生错误');
      };

    } catch (error) {
      console.error('创建WebSocket连接失败:', error);
      setConnectionError('无法连接到协作服务器');
    }
  }, [assignmentId]);

  const disconnect = useCallback(() => {
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = null;
    }

    if (websocketRef.current) {
      websocketRef.current.close(1000, '用户主动断开连接');
      websocketRef.current = null;
    }
    
    setIsConnected(false);
    setSession(null);
    setActiveUsers([]);
    setCurrentGrader(null);
  }, []);

  const handleMessage = useCallback((message: any) => {
    switch (message.type) {
      case 'grade_update':
        onGradeUpdate?.(message);
        console.log(`评分已更新: ${message.user_id}, 总分: ${message.total_score}`);
        break;

      case 'criteria_comment_update':
        onCriteriaCommentUpdate?.(message);
        console.log(`评论已更新: ${message.user_id}, 标准: ${message.criteria_id}`);
        break;

      case 'file_annotation_update':
        onFileAnnotationUpdate?.(message);
        console.log(`文件标注已更新: ${message.user_id}`);
        break;

      case 'session_status_update':
        handleSessionStatusUpdate(message);
        onSessionStatusUpdate?.(message);
        break;

      default:
        console.log('未知的协作消息类型:', message.type);
    }
  }, [onGradeUpdate, onCriteriaCommentUpdate, onFileAnnotationUpdate, onSessionStatusUpdate]);

  const handleSessionStatusUpdate = useCallback((message: SessionStatusMessage) => {
    switch (message.status) {
      case 'session_joined':
        setSession({
          session_id: message.session_id,
          assignment_id: message.details.assignment_id,
          status: 'active',
          active_users: message.details.active_users || [],
          current_grader: message.details.current_grader,
          last_activity: new Date().toISOString()
        });
        setActiveUsers(message.details.active_users || []);
        setCurrentGrader(message.details.current_grader);
        break;

      case 'user_joined':
        setActiveUsers(prev => [...prev, {
          user_id: message.details.user_id,
          role: message.details.role,
          joined_at: new Date().toISOString()
        }]);
        console.log(`新用户加入协作会话: ${message.details.user_id} (${message.details.role})`);
        break;

      case 'user_left':
        setActiveUsers(prev => prev.filter(user => user.user_id !== message.details.user_id));
        console.log(`用户离开协作会话: ${message.details.user_id}`);
        break;

      case 'current_grader_changed':
        setCurrentGrader(message.details.current_grader);
        if (message.details.current_grader) {
          console.log(`当前评分者变更: 现在由 ${message.details.current_grader} 进行评分`);
        } else {
          console.log('评分者锁已释放, 现在可以开始评分');
        }
        break;

      case 'grader_lock_released':
        setCurrentGrader(null);
        console.log(`评分者锁已释放, 由 ${message.details.released_by} 释放`);
        break;

      case 'error':
        console.error(`协作会话错误: ${message.details.error}`);
        break;

      default:
        console.log('未知的会话状态:', message.status);
    }
  }, []);

  const requestGraderLock = useCallback(async () => {
    if (!websocketRef.current || websocketRef.current.readyState !== WebSocket.OPEN) {
      console.error('无法请求评分者锁, 请先连接到协作会话');
      return false;
    }

    const message = {
      type: 'request_grader_lock',
      assignment_id: assignmentId
    };

    websocketRef.current.send(JSON.stringify(message));
    return true;
  }, [assignmentId]);

  const releaseGraderLock = useCallback(async () => {
    if (!websocketRef.current || websocketRef.current.readyState !== WebSocket.OPEN) {
      console.error('无法释放评分者锁, 请先连接到协作会话');
      return false;
    }

    const message = {
      type: 'release_grader_lock',
      assignment_id: assignmentId
    };

    websocketRef.current.send(JSON.stringify(message));
    return true;
  }, [assignmentId]);

  const sendGradeUpdate = useCallback((criteriaScores: Record<string, number>, totalScore: number, feedback: string) => {
    if (!websocketRef.current || websocketRef.current.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket未连接，无法发送评分更新');
      return false;
    }

    const message: GradeUpdateMessage = {
      type: 'grade_update',
      assignment_id: assignmentId,
      user_id: 'current_user', // 这里应该从auth context获取
      criteria_scores: criteriaScores,
      total_score: totalScore,
      feedback: feedback,
      timestamp: new Date().toISOString()
    };

    websocketRef.current.send(JSON.stringify(message));
    return true;
  }, [assignmentId]);

  const sendCriteriaCommentUpdate = useCallback((criteriaId: string, comment: string) => {
    if (!websocketRef.current || websocketRef.current.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket未连接，无法发送评论更新');
      return false;
    }

    const message: CriteriaCommentMessage = {
      type: 'criteria_comment_update',
      assignment_id: assignmentId,
      user_id: 'current_user', // 这里应该从auth context获取
      criteria_id: criteriaId,
      comment: comment,
      timestamp: new Date().toISOString()
    };

    websocketRef.current.send(JSON.stringify(message));
    return true;
  }, [assignmentId]);

  const sendFileAnnotationUpdate = useCallback((fileId: string, annotation: any) => {
    if (!websocketRef.current || websocketRef.current.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket未连接，无法发送文件标注');
      return false;
    }

    const message: FileAnnotationMessage = {
      type: 'file_annotation_update',
      assignment_id: assignmentId,
      user_id: 'current_user', // 这里应该从auth context获取
      file_id: fileId,
      annotation: annotation,
      timestamp: new Date().toISOString()
    };

    websocketRef.current.send(JSON.stringify(message));
    return true;
  }, [assignmentId]);

  const getSessionStatus = useCallback(async (): Promise<CollaborationSession | null> => {
    try {
      const response = await fetch(`/api/v1/collaboration/${assignmentId}/status`);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error('获取协作会话状态失败:', error);
    }
    return null;
  }, [assignmentId]);

  // 自动连接
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  // 清理重连定时器
  useEffect(() => {
    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, []);

  return {
    // 状态
    isConnected,
    session,
    activeUsers,
    currentGrader,
    connectionError,
    
    // 操作
    connect,
    disconnect,
    requestGraderLock,
    releaseGraderLock,
    sendGradeUpdate,
    sendCriteriaCommentUpdate,
    sendFileAnnotationUpdate,
    getSessionStatus,
    
    // 便捷方法
    isCurrentUserGrader: currentGrader === 'current_user', // 这里应该从auth context获取
    canGrade: isConnected && (currentGrader === null || currentGrader === 'current_user')
  };
}