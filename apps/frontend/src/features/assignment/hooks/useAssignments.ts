import { useState, useEffect, useCallback } from 'react';
import { 
  Assignment, 
  AssignmentFilter, 
  AssignmentCreateData, 
  AssignmentUpdateData,
  AssignmentSubmission,
  AssignmentSubmissionCreateData,
  AssignmentSubmissionUpdateData,
  AssignmentGradeData
} from '../types/assignment.types';
import { AssignmentService } from '../services/assignment.service';

export interface UseAssignmentsReturn {
  assignments: Assignment[];
  loading: boolean;
  error: string | null;
  getAssignments: (filters?: AssignmentFilter) => Promise<void>;
  getAssignment: (id: string) => Promise<Assignment>;
  createAssignment: (data: AssignmentCreateData) => Promise<Assignment>;
  updateAssignment: (data: AssignmentUpdateData) => Promise<Assignment>;
  deleteAssignment: (id: string) => Promise<void>;
  publishAssignment: (id: string) => Promise<Assignment>;
  closeAssignment: (id: string) => Promise<Assignment>;
  getSubmissions: (assignmentId: string) => Promise<AssignmentSubmission[]>;
  getSubmission: (id: string) => Promise<AssignmentSubmission>;
  createSubmission: (data: AssignmentSubmissionCreateData) => Promise<AssignmentSubmission>;
  updateSubmission: (data: AssignmentSubmissionUpdateData) => Promise<AssignmentSubmission>;
  deleteSubmission: (id: string) => Promise<void>;
  gradeSubmission: (data: AssignmentGradeData) => Promise<AssignmentSubmission>;
  getAssignmentStats: (assignmentId: string) => Promise<any>;
  uploadAttachment: (assignmentId: string, file: File) => Promise<any>;
  deleteAttachment: (assignmentId: string, attachmentId: string) => Promise<void>;
  downloadAttachment: (assignmentId: string, attachmentId: string) => Promise<Blob>;
  getAssignmentsByCourse: (courseId: string) => Promise<Assignment[]>;
  getAssignmentsByStatus: (status: Assignment['status']) => Promise<Assignment[]>;
  getUpcomingAssignments: () => Promise<Assignment[]>;
  getOverdueAssignments: () => Promise<Assignment[]>;
  isAssignmentOverdue: (assignment: Assignment) => boolean;
  getAssignmentProgress: (assignment: Assignment) => {
    submitted: number;
    total: number;
    percentage: number;
  };
  getGradingProgress: (assignment: Assignment) => {
    graded: number;
    total: number;
    percentage: number;
  };
}

export const useAssignments = (): UseAssignmentsReturn => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const service = new AssignmentService();

  const getAssignments = useCallback(async (filters?: AssignmentFilter) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getAssignments(filters);
      setAssignments(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load assignments');
    } finally {
      setLoading(false);
    }
  }, [service]);

  const getAssignment = useCallback(async (id: string): Promise<Assignment> => {
    try {
      return await service.getAssignment(id);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const createAssignment = useCallback(async (data: AssignmentCreateData): Promise<Assignment> => {
    try {
      const result = await service.createAssignment(data);
      // Refresh the list
      await getAssignments();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getAssignments]);

  const updateAssignment = useCallback(async (data: AssignmentUpdateData): Promise<Assignment> => {
    try {
      const result = await service.updateAssignment(data);
      // Refresh the list
      await getAssignments();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getAssignments]);

  const deleteAssignment = useCallback(async (id: string): Promise<void> => {
    try {
      await service.deleteAssignment(id);
      // Refresh the list
      await getAssignments();
    } catch (err) {
      throw err;
    }
  }, [service, getAssignments]);

  const publishAssignment = useCallback(async (id: string): Promise<Assignment> => {
    try {
      const result = await service.publishAssignment(id);
      // Refresh the list
      await getAssignments();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getAssignments]);

  const closeAssignment = useCallback(async (id: string): Promise<Assignment> => {
    try {
      const result = await service.closeAssignment(id);
      // Refresh the list
      await getAssignments();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getAssignments]);

  const getSubmissions = useCallback(async (assignmentId: string): Promise<AssignmentSubmission[]> => {
    try {
      return await service.getSubmissions(assignmentId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const getSubmission = useCallback(async (id: string): Promise<AssignmentSubmission> => {
    try {
      return await service.getSubmission(id);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const createSubmission = useCallback(async (data: AssignmentSubmissionCreateData): Promise<AssignmentSubmission> => {
    try {
      const result = await service.createSubmission(data);
      // Refresh the assignments list to update submission counts
      await getAssignments();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getAssignments]);

  const updateSubmission = useCallback(async (data: AssignmentSubmissionUpdateData): Promise<AssignmentSubmission> => {
    try {
      const result = await service.updateSubmission(data);
      // Refresh the assignments list to update submission counts
      await getAssignments();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getAssignments]);

  const deleteSubmission = useCallback(async (id: string): Promise<void> => {
    try {
      await service.deleteSubmission(id);
      // Refresh the assignments list to update submission counts
      await getAssignments();
    } catch (err) {
      throw err;
    }
  }, [service, getAssignments]);

  const gradeSubmission = useCallback(async (data: AssignmentGradeData): Promise<AssignmentSubmission> => {
    try {
      const result = await service.gradeSubmission(data);
      // Refresh the assignments list to update grading counts
      await getAssignments();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getAssignments]);

  const getAssignmentStats = useCallback(async (assignmentId: string) => {
    try {
      return await service.getAssignmentStats(assignmentId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const uploadAttachment = useCallback(async (assignmentId: string, file: File) => {
    try {
      return await service.uploadAttachment(assignmentId, file);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const deleteAttachment = useCallback(async (assignmentId: string, attachmentId: string) => {
    try {
      await service.deleteAttachment(assignmentId, attachmentId);
      // Refresh the assignments list to update attachments
      await getAssignments();
    } catch (err) {
      throw err;
    }
  }, [service, getAssignments]);

  const downloadAttachment = useCallback(async (assignmentId: string, attachmentId: string): Promise<Blob> => {
    try {
      return await service.downloadAttachment(assignmentId, attachmentId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const getAssignmentsByCourse = useCallback(async (courseId: string): Promise<Assignment[]> => {
    try {
      return await service.getAssignmentsByCourse(courseId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const getAssignmentsByStatus = useCallback(async (status: Assignment['status']): Promise<Assignment[]> => {
    try {
      return await service.getAssignmentsByStatus(status);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const getUpcomingAssignments = useCallback(async (): Promise<Assignment[]> => {
    try {
      return await service.getUpcomingAssignments();
    } catch (err) {
      throw err;
    }
  }, [service]);

  const getOverdueAssignments = useCallback(async (): Promise<Assignment[]> => {
    try {
      return await service.getOverdueAssignments();
    } catch (err) {
      throw err;
    }
  }, [service]);

  const isAssignmentOverdue = useCallback((assignment: Assignment): boolean => {
    return service.isAssignmentOverdue(assignment);
  }, [service]);

  const getAssignmentProgress = useCallback((assignment: Assignment) => {
    return service.getAssignmentProgress(assignment);
  }, [service]);

  const getGradingProgress = useCallback((assignment: Assignment) => {
    return service.getGradingProgress(assignment);
  }, [service]);

  // Load assignments on mount
  useEffect(() => {
    getAssignments();
  }, [getAssignments]);

  return {
    assignments,
    loading,
    error,
    getAssignments,
    getAssignment,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    publishAssignment,
    closeAssignment,
    getSubmissions,
    getSubmission,
    createSubmission,
    updateSubmission,
    deleteSubmission,
    gradeSubmission,
    getAssignmentStats,
    uploadAttachment,
    deleteAttachment,
    downloadAttachment,
    getAssignmentsByCourse,
    getAssignmentsByStatus,
    getUpcomingAssignments,
    getOverdueAssignments,
    isAssignmentOverdue,
    getAssignmentProgress,
    getGradingProgress,
  };
};