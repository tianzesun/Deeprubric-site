/**
 * 考试管理Hook
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  Exam, 
  ExamFilter, 
  CreateExamRequest, 
  UpdateExamRequest 
} from '../types/exam.types';
import { examService } from '../services/exam.service';

export interface UseExamsOptions {
  courseId?: string;
  autoFetch?: boolean;
  pageSize?: number;
}

export function useExams(options: UseExamsOptions = {}) {
  const { courseId, autoFetch = true, pageSize = 20 } = options;
  
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const fetchExams = useCallback(async (filter?: ExamFilter) => {
    setLoading(true);
    setError(null);
    
    try {
      const filterOptions = {
        ...filter,
        course_id: courseId,
        page: filter?.page || page,
        page_size: filter?.page_size || pageSize,
      };

      const result = await examService.getExams(filterOptions);
      setExams(result.exams);
      setTotal(result.total);
      setPage(result.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取考试列表失败');
      console.error('获取考试列表失败:', err);
    } finally {
      setLoading(false);
    }
  }, [courseId, page, pageSize]);

  const createExam = useCallback(async (examData: CreateExamRequest): Promise<Exam> => {
    setLoading(true);
    setError(null);
    
    try {
      const newExam = await examService.createExam(examData);
      setExams(prev => [newExam, ...prev]);
      setTotal(prev => prev + 1);
      return newExam;
    } catch (err) {
      setError(err instanceof Error ? err.message : '创建考试失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateExam = useCallback(async (examId: string, examData: UpdateExamRequest): Promise<Exam> => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedExam = await examService.updateExam(examId, examData);
      setExams(prev => prev.map(exam => exam.id === examId ? updatedExam : exam));
      return updatedExam;
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新考试失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteExam = useCallback(async (examId: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await examService.deleteExam(examId);
      setExams(prev => prev.filter(exam => exam.id !== examId));
      setTotal(prev => prev - 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除考试失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const publishExam = useCallback(async (examId: string): Promise<Exam> => {
    setLoading(true);
    setError(null);
    
    try {
      const publishedExam = await examService.publishExam(examId);
      setExams(prev => prev.map(exam => exam.id === examId ? publishedExam : exam));
      return publishedExam;
    } catch (err) {
      setError(err instanceof Error ? err.message : '发布考试失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const unpublishExam = useCallback(async (examId: string): Promise<Exam> => {
    setLoading(true);
    setError(null);
    
    try {
      const unpublishedExam = await examService.unpublishExam(examId);
      setExams(prev => prev.map(exam => exam.id === examId ? unpublishedExam : exam));
      return unpublishedExam;
    } catch (err) {
      setError(err instanceof Error ? err.message : '取消发布考试失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchExams = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      fetchExams();
      return;
    }

    fetchExams({
      search: searchTerm,
      course_id: courseId,
      page: 1,
      page_size: pageSize,
    });
  }, [fetchExams, courseId, pageSize]);

  const filterExams = useCallback(async (filter: ExamFilter) => {
    fetchExams({
      ...filter,
      course_id: courseId,
      page: 1,
      page_size: pageSize,
    });
  }, [fetchExams, courseId, pageSize]);

  const goToPage = useCallback(async (pageNumber: number) => {
    setPage(pageNumber);
    fetchExams({
      course_id: courseId,
      page: pageNumber,
      page_size: pageSize,
    });
  }, [fetchExams, courseId, pageSize]);

  // 自动获取数据
  useEffect(() => {
    if (autoFetch) {
      fetchExams();
    }
  }, [autoFetch, fetchExams]);

  return {
    // 数据
    exams,
    loading,
    error,
    total,
    page,
    pageSize,

    // 操作
    fetchExams,
    createExam,
    updateExam,
    deleteExam,
    publishExam,
    unpublishExam,
    searchExams,
    filterExams,
    goToPage,

    // 便捷方法
    refresh: () => fetchExams(),
    clearError: () => setError(null),
  };
}

// 单个考试Hook
export function useExam(examId: string) {
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExam = useCallback(async () => {
    if (!examId) return;

    setLoading(true);
    setError(null);
    
    try {
      const examData = await examService.getExam(examId);
      setExam(examData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取考试详情失败');
      console.error('获取考试详情失败:', err);
    } finally {
      setLoading(false);
    }
  }, [examId]);

  const updateExam = useCallback(async (examData: UpdateExamRequest): Promise<Exam> => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedExam = await examService.updateExam(examId, examData);
      setExam(updatedExam);
      return updatedExam;
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新考试失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [examId]);

  const deleteExam = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await examService.deleteExam(examId);
      setExam(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除考试失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [examId]);

  const publishExam = useCallback(async (): Promise<Exam> => {
    setLoading(true);
    setError(null);
    
    try {
      const publishedExam = await examService.publishExam(examId);
      setExam(publishedExam);
      return publishedExam;
    } catch (err) {
      setError(err instanceof Error ? err.message : '发布考试失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [examId]);

  const unpublishExam = useCallback(async (): Promise<Exam> => {
    setLoading(true);
    setError(null);
    
    try {
      const unpublishedExam = await examService.unpublishExam(examId);
      setExam(unpublishedExam);
      return unpublishedExam;
    } catch (err) {
      setError(err instanceof Error ? err.message : '取消发布考试失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [examId]);

  useEffect(() => {
    fetchExam();
  }, [fetchExam]);

  return {
    // 数据
    exam,
    loading,
    error,

    // 操作
    fetchExam,
    updateExam,
    deleteExam,
    publishExam,
    unpublishExam,

    // 便捷方法
    refresh: fetchExam,
    clearError: () => setError(null),
  };
}