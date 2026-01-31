/**
 * 考试管理API接口
 */

import { 
  Exam, 
  ExamQuestion, 
  ExamSubmission, 
  ExamAnalytics, 
  ExamFilter, 
  CreateExamRequest, 
  UpdateExamRequest, 
  CreateQuestionRequest, 
  SubmitExamRequest,
  ExamStatus,
  ExamReport
} from '../types/exam.types';

// API基础配置
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// 获取认证头
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// 考试管理API
export const examApi = {
  // 获取考试列表
  async getExams(filter?: ExamFilter): Promise<{ exams: Exam[]; total: number; page: number; page_size: number }> {
    try {
      const params = new URLSearchParams();
      if (filter) {
        if (filter.course_id) params.append('course_id', filter.course_id);
        if (filter.status) params.append('status', filter.status);
        if (filter.search) params.append('search', filter.search);
        if (filter.sort_by) params.append('sort_by', filter.sort_by);
        if (filter.sort_order) params.append('sort_order', filter.sort_order);
        if (filter.page) params.append('page', filter.page.toString());
        if (filter.page_size) params.append('page_size', filter.page_size.toString());
        if (filter.date_range) {
          params.append('start_date', filter.date_range.start);
          params.append('end_date', filter.date_range.end);
        }
      }

      const response = await fetch(`${API_BASE_URL}/exams?${params.toString()}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('获取考试列表失败:', error);
      throw error;
    }
  },

  // 获取单个考试详情
  async getExam(examId: string): Promise<Exam> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/${examId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('获取考试详情失败:', error);
      throw error;
    }
  },

  // 创建考试
  async createExam(examData: CreateExamRequest): Promise<Exam> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(examData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('创建考试失败:', error);
      throw error;
    }
  },

  // 更新考试
  async updateExam(examId: string, examData: UpdateExamRequest): Promise<Exam> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/${examId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(examData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('更新考试失败:', error);
      throw error;
    }
  },

  // 删除考试
  async deleteExam(examId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/${examId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('删除考试失败:', error);
      throw error;
    }
  },

  // 发布考试
  async publishExam(examId: string): Promise<Exam> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/${examId}/publish`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('发布考试失败:', error);
      throw error;
    }
  },

  // 取消发布考试
  async unpublishExam(examId: string): Promise<Exam> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/${examId}/unpublish`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('取消发布考试失败:', error);
      throw error;
    }
  },

  // 获取考试状态
  async getExamStatus(examId: string): Promise<ExamStatus> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/${examId}/status`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('获取考试状态失败:', error);
      throw error;
    }
  },

  // 获取考试分析数据
  async getExamAnalytics(examId: string): Promise<ExamAnalytics> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/${examId}/analytics`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('获取考试分析数据失败:', error);
      throw error;
    }
  },

  // 获取考试报告
  async getExamReport(examId: string): Promise<ExamReport> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/${examId}/report`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('获取考试报告失败:', error);
      throw error;
    }
  },

  // 导出考试报告
  async exportExamReport(examId: string, format: 'pdf' | 'excel' = 'pdf'): Promise<Blob> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/${examId}/export?format=${format}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('导出考试报告失败:', error);
      throw error;
    }
  },
};

// 考试问题管理API
export const examQuestionApi = {
  // 获取考试问题列表
  async getQuestions(examId: string): Promise<ExamQuestion[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/${examId}/questions`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('获取考试问题列表失败:', error);
      throw error;
    }
  },

  // 获取单个问题详情
  async getQuestion(questionId: string): Promise<ExamQuestion> {
    try {
      const response = await fetch(`${API_BASE_URL}/questions/${questionId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('获取问题详情失败:', error);
      throw error;
    }
  },

  // 创建问题
  async createQuestion(examId: string, questionData: CreateQuestionRequest): Promise<ExamQuestion> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/${examId}/questions`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(questionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('创建问题失败:', error);
      throw error;
    }
  },

  // 更新问题
  async updateQuestion(questionId: string, questionData: Partial<CreateQuestionRequest>): Promise<ExamQuestion> {
    try {
      const response = await fetch(`${API_BASE_URL}/questions/${questionId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(questionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('更新问题失败:', error);
      throw error;
    }
  },

  // 删除问题
  async deleteQuestion(questionId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/questions/${questionId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('删除问题失败:', error);
      throw error;
    }
  },

  // 重新排序问题
  async reorderQuestions(examId: string, questionOrder: { question_id: string; order: number }[]): Promise<ExamQuestion[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/${examId}/questions/reorder`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ questions: questionOrder }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('重新排序问题失败:', error);
      throw error;
    }
  },
};

// 考试提交管理API
export const examSubmissionApi = {
  // 开始考试
  async startExam(examId: string): Promise<{ submission_id: string; start_time: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/${examId}/start`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('开始考试失败:', error);
      throw error;
    }
  },

  // 提交答案（保存草稿）
  async saveAnswer(submissionId: string, questionId: string, answer: any): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/submissions/${submissionId}/answers/${questionId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ answer }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('保存答案失败:', error);
      throw error;
    }
  },

  // 提交考试
  async submitExam(submissionId: string, submitData: SubmitExamRequest): Promise<ExamSubmission> {
    try {
      const response = await fetch(`${API_BASE_URL}/submissions/${submissionId}/submit`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('提交考试失败:', error);
      throw error;
    }
  },

  // 获取提交状态
  async getSubmissionStatus(submissionId: string): Promise<{ is_completed: boolean; current_question: number; time_spent: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/submissions/${submissionId}/status`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('获取提交状态失败:', error);
      throw error;
    }
  },

  // 获取考试提交列表
  async getSubmissions(examId: string, page = 1, pageSize = 20): Promise<{ submissions: ExamSubmission[]; total: number }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString(),
      });

      const response = await fetch(`${API_BASE_URL}/exams/${examId}/submissions?${params.toString()}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('获取考试提交列表失败:', error);
      throw error;
    }
  },

  // 获取单个提交详情
  async getSubmission(submissionId: string): Promise<ExamSubmission> {
    try {
      const response = await fetch(`${API_BASE_URL}/submissions/${submissionId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('获取提交详情失败:', error);
      throw error;
    }
  },

  // 评分提交
  async gradeSubmission(submissionId: string, scores: { question_id: string; score: number; feedback?: string }[]): Promise<ExamSubmission> {
    try {
      const response = await fetch(`${API_BASE_URL}/submissions/${submissionId}/grade`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ scores }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('评分提交失败:', error);
      throw error;
    }
  },

  // 批量评分
  async batchGradeSubmissions(examId: string, submissions: { submission_id: string; scores: { question_id: string; score: number; feedback?: string }[] }[]): Promise<{ success: number; failed: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/${examId}/submissions/batch-grade`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ submissions }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('批量评分失败:', error);
      throw error;
    }
  },

  // 导出提交数据
  async exportSubmissions(examId: string, format: 'csv' | 'excel' = 'csv'): Promise<Blob> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/${examId}/submissions/export?format=${format}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('导出提交数据失败:', error);
      throw error;
    }
  },
};

// 考试统计API
export const examStatsApi = {
  // 获取课程考试统计
  async getCourseStats(courseId: string): Promise<{
    total_exams: number;
    active_exams: number;
    completed_exams: number;
    total_submissions: number;
    average_completion_rate: number;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}/exams/stats`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('获取课程考试统计失败:', error);
      throw error;
    }
  },

  // 获取用户考试统计
  async getUserStats(userId?: string): Promise<{
    total_exams_created: number;
    total_submissions_graded: number;
    average_grading_time: number;
    grading_completion_rate: number;
  }> {
    try {
      const url = userId 
        ? `${API_BASE_URL}/users/${userId}/exams/stats`
        : `${API_BASE_URL}/exams/stats/me`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('获取用户考试统计失败:', error);
      throw error;
    }
  },

  // 获取系统考试统计
  async getSystemStats(): Promise<{
    total_exams: number;
    total_submissions: number;
    average_completion_rate: number;
    average_score: number;
    active_exams: number;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/exams/stats/system`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('获取系统考试统计失败:', error);
      throw error;
    }
  },
};

// 导出所有API
export default {
  exam: examApi,
  question: examQuestionApi,
  submission: examSubmissionApi,
  stats: examStatsApi,
};