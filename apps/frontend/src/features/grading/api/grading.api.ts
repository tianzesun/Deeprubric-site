import axios, { AxiosResponse } from 'axios';
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export const gradingApi = {
  // Grade management
  getGrades: async (filters?: GradeFilter): Promise<Grade[]> => {
    const response: AxiosResponse<Grade[]> = await api.get('/grades', { params: filters });
    return response.data;
  },

  getGrade: async (id: string): Promise<Grade> => {
    const response: AxiosResponse<Grade> = await api.get(`/grades/${id}`);
    return response.data;
  },

  createGrade: async (data: GradeCreateData): Promise<Grade> => {
    const response: AxiosResponse<Grade> = await api.post('/grades', data);
    return response.data;
  },

  updateGrade: async (data: GradeUpdateData): Promise<Grade> => {
    const response: AxiosResponse<Grade> = await api.put(`/grades/${data.id}`, data);
    return response.data;
  },

  deleteGrade: async (id: string): Promise<void> => {
    await api.delete(`/grades/${id}`);
  },

  // Bulk operations
  bulkUpdateGrades: async (data: GradeBulkUpdate): Promise<Grade[]> => {
    const response: AxiosResponse<Grade[]> = await api.post('/grades/bulk-update', data);
    return response.data;
  },

  // Grade review and disputes
  requestGradeReview: async (data: GradeReviewRequest): Promise<GradeReview> => {
    const response: AxiosResponse<GradeReview> = await api.post('/grade-reviews', data);
    return response.data;
  },

  getGradeReviews: async (gradeId?: string): Promise<GradeReview[]> => {
    const response: AxiosResponse<GradeReview[]> = await api.get('/grade-reviews', { params: { gradeId } });
    return response.data;
  },

  updateGradeReview: async (id: string, decision: string, reviewedBy: string): Promise<GradeReview> => {
    const response: AxiosResponse<GradeReview> = await api.put(`/grade-reviews/${id}`, {
      decision,
      reviewedBy
    });
    return response.data;
  },

  // Grade history
  getGradeHistory: async (gradeId: string): Promise<GradeHistory[]> => {
    const response: AxiosResponse<GradeHistory[]> = await api.get(`/grades/${gradeId}/history`);
    return response.data;
  },

  // Grade statistics
  getGradeStatistics: async (assignmentId: string): Promise<GradeStatistics> => {
    const response: AxiosResponse<GradeStatistics> = await api.get(`/grades/${assignmentId}/statistics`);
    return response.data;
  },

  // Grade export/import
  exportGrades: async (data: GradeExport): Promise<Blob> => {
    const response: AxiosResponse<Blob> = await api.post('/grades/export', data, {
      responseType: 'blob',
    });
    return response.data;
  },

  importGrades: async (data: GradeImport): Promise<any> => {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('assignmentId', data.assignmentId);
    formData.append('format', data.format);
    formData.append('mapping', JSON.stringify(data.mapping));
    formData.append('updateExisting', data.updateExisting.toString());
    
    const response: AxiosResponse<any> = await api.post('/grades/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Grade disputes
  submitGradeDispute: async (dispute: Omit<GradeDispute, 'id' | 'status' | 'submittedAt' | 'createdAt' | 'updatedAt'>): Promise<GradeDispute> => {
    const response: AxiosResponse<GradeDispute> = await api.post('/grade-disputes', dispute);
    return response.data;
  },

  getGradeDisputes: async (gradeId?: string): Promise<GradeDispute[]> => {
    const response: AxiosResponse<GradeDispute[]> = await api.get('/grade-disputes', { params: { gradeId } });
    return response.data;
  },

  updateGradeDispute: async (id: string, resolution: string, reviewedBy: string): Promise<GradeDispute> => {
    const response: AxiosResponse<GradeDispute> = await api.put(`/grade-disputes/${id}`, {
      resolution,
      reviewedBy,
      status: 'resolved'
    });
    return response.data;
  },

  // Grade analytics
  getGradeAnalytics: async (courseId: string, assignmentId?: string): Promise<{
    overallStats: GradeStatistics;
    perAssignment: { [assignmentId: string]: GradeStatistics };
    perStudent: { [studentId: string]: GradeStatistics };
    trends: {
      averageScores: { date: string; score: number }[];
      gradingSpeed: { date: string; submissions: number }[];
    };
  }> => {
    const response: AxiosResponse<any> = await api.get('/grades/analytics', { 
      params: { courseId, assignmentId } 
    });
    return response.data;
  },

  // Grade validation
  validateGrade: async (data: GradeCreateData): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> => {
    const response: AxiosResponse<any> = await api.post('/grades/validate', data);
    return response.data;
  },

  // Grade notifications
  getGradeNotifications: async (userId: string): Promise<{
    id: string;
    type: 'grade_submitted' | 'grade_updated' | 'review_requested' | 'dispute_submitted';
    gradeId: string;
    message: string;
    read: boolean;
    createdAt: string;
  }[]> => {
    const response: AxiosResponse<any[]> = await api.get(`/grades/notifications/${userId}`);
    return response.data;
  },

  markNotificationRead: async (notificationId: string): Promise<void> => {
    await api.put(`/grades/notifications/${notificationId}/read`);
  },

  // Grade templates
  getGradeTemplates: async (courseId: string): Promise<{
    id: string;
    name: string;
    courseId: string;
    template: GradeCreateData;
    createdAt: string;
    updatedAt: string;
  }[]> => {
    const response: AxiosResponse<any[]> = await api.get(`/grades/templates/${courseId}`);
    return response.data;
  },

  createGradeTemplate: async (template: {
    name: string;
    courseId: string;
    template: GradeCreateData;
  }): Promise<any> => {
    const response: AxiosResponse<any> = await api.post('/grades/templates', template);
    return response.data;
  },

  applyGradeTemplate: async (templateId: string, gradeIds: string[]): Promise<Grade[]> => {
    const response: AxiosResponse<Grade[]> = await api.post(`/grades/templates/${templateId}/apply`, {
      gradeIds
    });
    return response.data;
  },
};