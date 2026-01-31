import { useState, useEffect, useCallback } from 'react';
import { 
  Grade, 
  GradeFilter, 
  GradeCreateData, 
  GradeUpdateData,
  GradeReview,
  GradeHistory,
  GradeStatistics,
  GradeExport,
  GradeImport,
  GradeDispute,
  GradeReviewRequest,
  GradeBulkUpdate
} from '../types/grading.types';
import { GradingService } from '../services/grading.service';

export interface UseGradingReturn {
  grades: Grade[];
  submissions: any[];
  loading: boolean;
  error: string | null;
  getGrades: (filters?: GradeFilter) => Promise<void>;
  getGrade: (id: string) => Promise<Grade>;
  createGrade: (data: GradeCreateData) => Promise<Grade>;
  updateGrade: (data: GradeUpdateData) => Promise<Grade>;
  deleteGrade: (id: string) => Promise<void>;
  bulkUpdateGrades: (data: GradeBulkUpdate) => Promise<Grade[]>;
  gradeSubmission: (data: any) => Promise<any>;
  getSubmissions: (assignmentId?: string) => Promise<any[]>;
  getSubmission: (id: string) => Promise<any>;
  requestGradeReview: (data: GradeReviewRequest) => Promise<GradeReview>;
  getGradeReviews: (gradeId?: string) => Promise<GradeReview[]>;
  updateGradeReview: (id: string, decision: string, reviewedBy: string) => Promise<GradeReview>;
  getGradeHistory: (gradeId: string) => Promise<GradeHistory[]>;
  getGradeStatistics: (assignmentId: string) => Promise<GradeStatistics>;
  exportGrades: (data: GradeExport) => Promise<Blob>;
  importGrades: (data: GradeImport) => Promise<any>;
  submitGradeDispute: (dispute: Omit<GradeDispute, 'id' | 'status' | 'submittedAt' | 'createdAt' | 'updatedAt'>) => Promise<GradeDispute>;
  getGradeDisputes: (gradeId?: string) => Promise<GradeDispute[]>;
  updateGradeDispute: (id: string, resolution: string, reviewedBy: string) => Promise<GradeDispute>;
  getGradeAnalytics: (courseId: string, assignmentId?: string) => Promise<any>;
  validateGrade: (data: GradeCreateData) => Promise<any>;
  getGradeNotifications: (userId: string) => Promise<any[]>;
  markNotificationRead: (notificationId: string, userId: string) => Promise<void>;
  getGradeTemplates: (courseId: string) => Promise<any[]>;
  createGradeTemplate: (template: any) => Promise<any>;
  applyGradeTemplate: (templateId: string, gradeIds: string[]) => Promise<Grade[]>;
  calculateGradeDistribution: (grades: Grade[]) => { [key: string]: number };
  calculateStatistics: (grades: Grade[]) => GradeStatistics;
  calculateGradingSpeed: (grades: Grade[]) => number;
  isGradeValid: (grade: Grade, assignmentMaxScore: number) => boolean;
  analyzeGradeTrends: (grades: Grade[]) => {
    improving: Grade[];
    declining: Grade[];
    stable: Grade[];
  };
}

export const useGrading = (): UseGradingReturn => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const service = new GradingService();

  const getGrades = useCallback(async (filters?: GradeFilter) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getGrades(filters);
      setGrades(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load grades');
    } finally {
      setLoading(false);
    }
  }, [service]);

  const getSubmissions = useCallback(async (assignmentId?: string): Promise<any[]> => {
    setLoading(true);
    setError(null);
    try {
      // For now, return empty array since service doesn't have this method
      setSubmissions([]);
      return [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load submissions');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getSubmission = useCallback(async (id: string) => {
    try {
      // For now, return empty object since service doesn't have this method
      return {};
    } catch (err) {
      throw err;
    }
  }, []);

  const gradeSubmission = useCallback(async (data: any) => {
    try {
      // For now, return empty object since service doesn't have this method
      return {};
    } catch (err) {
      throw err;
    }
  }, []);

  const getGrade = useCallback(async (id: string): Promise<Grade> => {
    try {
      return await service.getGrade(id);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const createGrade = useCallback(async (data: GradeCreateData): Promise<Grade> => {
    try {
      const result = await service.createGrade(data);
      // Refresh the list
      await getGrades();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getGrades]);

  const updateGrade = useCallback(async (data: GradeUpdateData): Promise<Grade> => {
    try {
      const result = await service.updateGrade(data);
      // Refresh the list
      await getGrades();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getGrades]);

  const deleteGrade = useCallback(async (id: string): Promise<void> => {
    try {
      await service.deleteGrade(id);
      // Refresh the list
      await getGrades();
    } catch (err) {
      throw err;
    }
  }, [service, getGrades]);

  const bulkUpdateGrades = useCallback(async (data: GradeBulkUpdate): Promise<Grade[]> => {
    try {
      const result = await service.bulkUpdateGrades(data);
      // Refresh the list
      await getGrades();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getGrades]);

  const requestGradeReview = useCallback(async (data: GradeReviewRequest): Promise<GradeReview> => {
    try {
      return await service.requestGradeReview(data);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const getGradeReviews = useCallback(async (gradeId?: string): Promise<GradeReview[]> => {
    try {
      return await service.getGradeReviews(gradeId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const updateGradeReview = useCallback(async (id: string, decision: string, reviewedBy: string): Promise<GradeReview> => {
    try {
      const result = await service.updateGradeReview(id, decision, reviewedBy);
      // Refresh the list if needed
      await getGradeReviews();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getGradeReviews]);

  const getGradeHistory = useCallback(async (gradeId: string): Promise<GradeHistory[]> => {
    try {
      return await service.getGradeHistory(gradeId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const getGradeStatistics = useCallback(async (assignmentId: string): Promise<GradeStatistics> => {
    try {
      return await service.getGradeStatistics(assignmentId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const exportGrades = useCallback(async (data: GradeExport): Promise<Blob> => {
    try {
      return await service.exportGrades(data);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const importGrades = useCallback(async (data: GradeImport): Promise<any> => {
    try {
      const result = await service.importGrades(data);
      // Refresh the list
      await getGrades();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getGrades]);

  const getGradeDisputes = useCallback(async (gradeId?: string): Promise<GradeDispute[]> => {
    try {
      return await service.getGradeDisputes(gradeId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const submitGradeDispute = useCallback(async (dispute: Omit<GradeDispute, 'id' | 'status' | 'submittedAt' | 'createdAt' | 'updatedAt'>): Promise<GradeDispute> => {
    try {
      const result = await service.submitGradeDispute(dispute);
      // Refresh the list if needed
      await getGradeDisputes();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getGradeDisputes]);

  const updateGradeDispute = useCallback(async (id: string, resolution: string, reviewedBy: string): Promise<GradeDispute> => {
    try {
      const result = await service.updateGradeDispute(id, resolution, reviewedBy);
      // Refresh the list if needed
      await getGradeDisputes();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getGradeDisputes]);

  const getGradeAnalytics = useCallback(async (courseId: string, assignmentId?: string) => {
    try {
      return await service.getGradeAnalytics(courseId, assignmentId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const validateGrade = useCallback(async (data: GradeCreateData) => {
    try {
      return await service.validateGrade(data);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const getGradeNotifications = useCallback(async (userId: string) => {
    try {
      return await service.getGradeNotifications(userId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const markNotificationRead = useCallback(async (notificationId: string, userId: string) => {
    try {
      await service.markNotificationRead(notificationId);
      // Refresh notifications if needed
      await getGradeNotifications(userId);
    } catch (err) {
      throw err;
    }
  }, [service, getGradeNotifications]);

  const getGradeTemplates = useCallback(async (courseId: string) => {
    try {
      return await service.getGradeTemplates(courseId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const createGradeTemplate = useCallback(async (template: any) => {
    try {
      const result = await service.createGradeTemplate(template);
      // Refresh the list if needed
      await getGradeTemplates(template.courseId);
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getGradeTemplates]);

  const applyGradeTemplate = useCallback(async (templateId: string, gradeIds: string[]): Promise<Grade[]> => {
    try {
      const result = await service.applyGradeTemplate(templateId, gradeIds);
      // Refresh the list
      await getGrades();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getGrades]);

  const calculateGradeDistribution = useCallback((grades: Grade[]): { [key: string]: number } => {
    return service.calculateGradeDistribution(grades);
  }, [service]);

  const calculateStatistics = useCallback((grades: Grade[]): GradeStatistics => {
    return service.calculateStatistics(grades);
  }, [service]);

  const calculateGradingSpeed = useCallback((grades: Grade[]): number => {
    return service.calculateGradingSpeed(grades);
  }, [service]);

  const isGradeValid = useCallback((grade: Grade, assignmentMaxScore: number): boolean => {
    return service.isGradeValid(grade, assignmentMaxScore);
  }, [service]);

  const analyzeGradeTrends = useCallback((grades: Grade[]) => {
    return service.analyzeGradeTrends(grades);
  }, [service]);

  // Load grades and submissions on mount
  useEffect(() => {
    getGrades();
    getSubmissions();
  }, [getGrades, getSubmissions]);

  return {
    grades,
    submissions,
    loading,
    error,
    getGrades,
    getGrade,
    createGrade,
    updateGrade,
    deleteGrade,
    bulkUpdateGrades,
    gradeSubmission,
    getSubmissions,
    getSubmission,
    requestGradeReview,
    getGradeReviews,
    updateGradeReview,
    getGradeHistory,
    getGradeStatistics,
    exportGrades,
    importGrades,
    submitGradeDispute,
    getGradeDisputes,
    updateGradeDispute,
    getGradeAnalytics,
    validateGrade,
    getGradeNotifications,
    markNotificationRead,
    getGradeTemplates,
    createGradeTemplate,
    applyGradeTemplate,
    calculateGradeDistribution,
    calculateStatistics,
    calculateGradingSpeed,
    isGradeValid,
    analyzeGradeTrends,
  };
};