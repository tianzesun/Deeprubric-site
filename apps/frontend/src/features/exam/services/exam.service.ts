/**
 * 考试管理服务层
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
import { examApi, examQuestionApi, examSubmissionApi, examStatsApi } from '../api/exam.api';

// 考试服务
class ExamService {
  // 获取考试列表
  async getExams(filter?: ExamFilter): Promise<{ exams: Exam[]; total: number; page: number; page_size: number }> {
    try {
      return await examApi.getExams(filter);
    } catch (error) {
      console.error('获取考试列表失败:', error);
      throw new Error('获取考试列表失败');
    }
  }

  // 获取单个考试详情
  async getExam(examId: string): Promise<Exam> {
    try {
      return await examApi.getExam(examId);
    } catch (error) {
      console.error('获取考试详情失败:', error);
      throw new Error('获取考试详情失败');
    }
  }

  // 创建考试
  async createExam(examData: CreateExamRequest): Promise<Exam> {
    try {
      return await examApi.createExam(examData);
    } catch (error) {
      console.error('创建考试失败:', error);
      throw new Error('创建考试失败');
    }
  }

  // 更新考试
  async updateExam(examId: string, examData: UpdateExamRequest): Promise<Exam> {
    try {
      return await examApi.updateExam(examId, examData);
    } catch (error) {
      console.error('更新考试失败:', error);
      throw new Error('更新考试失败');
    }
  }

  // 删除考试
  async deleteExam(examId: string): Promise<void> {
    try {
      await examApi.deleteExam(examId);
    } catch (error) {
      console.error('删除考试失败:', error);
      throw new Error('删除考试失败');
    }
  }

  // 发布考试
  async publishExam(examId: string): Promise<Exam> {
    try {
      return await examApi.publishExam(examId);
    } catch (error) {
      console.error('发布考试失败:', error);
      throw new Error('发布考试失败');
    }
  }

  // 取消发布考试
  async unpublishExam(examId: string): Promise<Exam> {
    try {
      return await examApi.unpublishExam(examId);
    } catch (error) {
      console.error('取消发布考试失败:', error);
      throw new Error('取消发布考试失败');
    }
  }

  // 获取考试状态
  async getExamStatus(examId: string): Promise<ExamStatus> {
    try {
      return await examApi.getExamStatus(examId);
    } catch (error) {
      console.error('获取考试状态失败:', error);
      throw new Error('获取考试状态失败');
    }
  }

  // 获取考试分析数据
  async getExamAnalytics(examId: string): Promise<ExamAnalytics> {
    try {
      return await examApi.getExamAnalytics(examId);
    } catch (error) {
      console.error('获取考试分析数据失败:', error);
      throw new Error('获取考试分析数据失败');
    }
  }

  // 获取考试报告
  async getExamReport(examId: string): Promise<ExamReport> {
    try {
      return await examApi.getExamReport(examId);
    } catch (error) {
      console.error('获取考试报告失败:', error);
      throw new Error('获取考试报告失败');
    }
  }

  // 导出考试报告
  async exportExamReport(examId: string, format: 'pdf' | 'excel' = 'pdf'): Promise<Blob> {
    try {
      return await examApi.exportExamReport(examId, format);
    } catch (error) {
      console.error('导出考试报告失败:', error);
      throw new Error('导出考试报告失败');
    }
  }
}

// 考试问题服务
class ExamQuestionService {
  // 获取考试问题列表
  async getQuestions(examId: string): Promise<ExamQuestion[]> {
    try {
      return await examQuestionApi.getQuestions(examId);
    } catch (error) {
      console.error('获取考试问题列表失败:', error);
      throw new Error('获取考试问题列表失败');
    }
  }

  // 获取单个问题详情
  async getQuestion(questionId: string): Promise<ExamQuestion> {
    try {
      return await examQuestionApi.getQuestion(questionId);
    } catch (error) {
      console.error('获取问题详情失败:', error);
      throw new Error('获取问题详情失败');
    }
  }

  // 创建问题
  async createQuestion(examId: string, questionData: CreateQuestionRequest): Promise<ExamQuestion> {
    try {
      return await examQuestionApi.createQuestion(examId, questionData);
    } catch (error) {
      console.error('创建问题失败:', error);
      throw new Error('创建问题失败');
    }
  }

  // 更新问题
  async updateQuestion(questionId: string, questionData: Partial<CreateQuestionRequest>): Promise<ExamQuestion> {
    try {
      return await examQuestionApi.updateQuestion(questionId, questionData);
    } catch (error) {
      console.error('更新问题失败:', error);
      throw new Error('更新问题失败');
    }
  }

  // 删除问题
  async deleteQuestion(questionId: string): Promise<void> {
    try {
      await examQuestionApi.deleteQuestion(questionId);
    } catch (error) {
      console.error('删除问题失败:', error);
      throw new Error('删除问题失败');
    }
  }

  // 重新排序问题
  async reorderQuestions(examId: string, questionOrder: { question_id: string; order: number }[]): Promise<ExamQuestion[]> {
    try {
      return await examQuestionApi.reorderQuestions(examId, questionOrder);
    } catch (error) {
      console.error('重新排序问题失败:', error);
      throw new Error('重新排序问题失败');
    }
  }
}

// 考试提交服务
class ExamSubmissionService {
  // 开始考试
  async startExam(examId: string): Promise<{ submission_id: string; start_time: string }> {
    try {
      return await examSubmissionApi.startExam(examId);
    } catch (error) {
      console.error('开始考试失败:', error);
      throw new Error('开始考试失败');
    }
  }

  // 保存答案（草稿）
  async saveAnswer(submissionId: string, questionId: string, answer: any): Promise<void> {
    try {
      await examSubmissionApi.saveAnswer(submissionId, questionId, answer);
    } catch (error) {
      console.error('保存答案失败:', error);
      throw new Error('保存答案失败');
    }
  }

  // 提交考试
  async submitExam(submissionId: string, submitData: SubmitExamRequest): Promise<ExamSubmission> {
    try {
      return await examSubmissionApi.submitExam(submissionId, submitData);
    } catch (error) {
      console.error('提交考试失败:', error);
      throw new Error('提交考试失败');
    }
  }

  // 获取提交状态
  async getSubmissionStatus(submissionId: string): Promise<{ is_completed: boolean; current_question: number; time_spent: number }> {
    try {
      return await examSubmissionApi.getSubmissionStatus(submissionId);
    } catch (error) {
      console.error('获取提交状态失败:', error);
      throw new Error('获取提交状态失败');
    }
  }

  // 获取考试提交列表
  async getSubmissions(examId: string, page = 1, pageSize = 20): Promise<{ submissions: ExamSubmission[]; total: number }> {
    try {
      return await examSubmissionApi.getSubmissions(examId, page, pageSize);
    } catch (error) {
      console.error('获取考试提交列表失败:', error);
      throw new Error('获取考试提交列表失败');
    }
  }

  // 获取单个提交详情
  async getSubmission(submissionId: string): Promise<ExamSubmission> {
    try {
      return await examSubmissionApi.getSubmission(submissionId);
    } catch (error) {
      console.error('获取提交详情失败:', error);
      throw new Error('获取提交详情失败');
    }
  }

  // 评分提交
  async gradeSubmission(submissionId: string, scores: { question_id: string; score: number; feedback?: string }[]): Promise<ExamSubmission> {
    try {
      return await examSubmissionApi.gradeSubmission(submissionId, scores);
    } catch (error) {
      console.error('评分提交失败:', error);
      throw new Error('评分提交失败');
    }
  }

  // 批量评分
  async batchGradeSubmissions(examId: string, submissions: { submission_id: string; scores: { question_id: string; score: number; feedback?: string }[] }[]): Promise<{ success: number; failed: number }> {
    try {
      return await examSubmissionApi.batchGradeSubmissions(examId, submissions);
    } catch (error) {
      console.error('批量评分失败:', error);
      throw new Error('批量评分失败');
    }
  }

  // 导出提交数据
  async exportSubmissions(examId: string, format: 'csv' | 'excel' = 'csv'): Promise<Blob> {
    try {
      return await examSubmissionApi.exportSubmissions(examId, format);
    } catch (error) {
      console.error('导出提交数据失败:', error);
      throw new Error('导出提交数据失败');
    }
  }
}

// 考试统计服务
class ExamStatsService {
  // 获取课程考试统计
  async getCourseStats(courseId: string): Promise<{
    total_exams: number;
    active_exams: number;
    completed_exams: number;
    total_submissions: number;
    average_completion_rate: number;
  }> {
    try {
      return await examStatsApi.getCourseStats(courseId);
    } catch (error) {
      console.error('获取课程考试统计失败:', error);
      throw new Error('获取课程考试统计失败');
    }
  }

  // 获取用户考试统计
  async getUserStats(userId?: string): Promise<{
    total_exams_created: number;
    total_submissions_graded: number;
    average_grading_time: number;
    grading_completion_rate: number;
  }> {
    try {
      return await examStatsApi.getUserStats(userId);
    } catch (error) {
      console.error('获取用户考试统计失败:', error);
      throw new Error('获取用户考试统计失败');
    }
  }

  // 获取系统考试统计
  async getSystemStats(): Promise<{
    total_exams: number;
    total_submissions: number;
    average_completion_rate: number;
    average_score: number;
    active_exams: number;
  }> {
    try {
      return await examStatsApi.getSystemStats();
    } catch (error) {
      console.error('获取系统考试统计失败:', error);
      throw new Error('获取系统考试统计失败');
    }
  }
}

// 导出服务实例
export const examService = new ExamService();
export const examQuestionService = new ExamQuestionService();
export const examSubmissionService = new ExamSubmissionService();
export const examStatsService = new ExamStatsService();

// 导出服务类
export {
  ExamService,
  ExamQuestionService,
  ExamSubmissionService,
  ExamStatsService
};
