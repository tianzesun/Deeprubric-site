import axios, { AxiosResponse } from 'axios';
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

export const assignmentApi = {
  // Assignment management
  getAssignments: async (filters?: AssignmentFilter): Promise<Assignment[]> => {
    const response: AxiosResponse<Assignment[]> = await api.get('/assignments', { params: filters });
    return response.data;
  },

  getAssignment: async (id: string): Promise<Assignment> => {
    const response: AxiosResponse<Assignment> = await api.get(`/assignments/${id}`);
    return response.data;
  },

  createAssignment: async (data: AssignmentCreateData): Promise<Assignment> => {
    const response: AxiosResponse<Assignment> = await api.post('/assignments', data);
    return response.data;
  },

  updateAssignment: async (data: AssignmentUpdateData): Promise<Assignment> => {
    const response: AxiosResponse<Assignment> = await api.put(`/assignments/${data.id}`, data);
    return response.data;
  },

  deleteAssignment: async (id: string): Promise<void> => {
    await api.delete(`/assignments/${id}`);
  },

  publishAssignment: async (id: string): Promise<Assignment> => {
    const response: AxiosResponse<Assignment> = await api.post(`/assignments/${id}/publish`);
    return response.data;
  },

  closeAssignment: async (id: string): Promise<Assignment> => {
    const response: AxiosResponse<Assignment> = await api.post(`/assignments/${id}/close`);
    return response.data;
  },

  // Submission management
  getSubmissions: async (assignmentId: string): Promise<AssignmentSubmission[]> => {
    const response: AxiosResponse<AssignmentSubmission[]> = await api.get(`/assignments/${assignmentId}/submissions`);
    return response.data;
  },

  getSubmission: async (id: string): Promise<AssignmentSubmission> => {
    const response: AxiosResponse<AssignmentSubmission> = await api.get(`/submissions/${id}`);
    return response.data;
  },

  createSubmission: async (data: AssignmentSubmissionCreateData): Promise<AssignmentSubmission> => {
    const response: AxiosResponse<AssignmentSubmission> = await api.post('/submissions', data);
    return response.data;
  },

  updateSubmission: async (data: AssignmentSubmissionUpdateData): Promise<AssignmentSubmission> => {
    const response: AxiosResponse<AssignmentSubmission> = await api.put(`/submissions/${data.id}`, data);
    return response.data;
  },

  deleteSubmission: async (id: string): Promise<void> => {
    await api.delete(`/submissions/${id}`);
  },

  // Grading
  gradeSubmission: async (data: AssignmentGradeData): Promise<AssignmentSubmission> => {
    const response: AxiosResponse<AssignmentSubmission> = await api.post(`/submissions/${data.submissionId}/grade`, data);
    return response.data;
  },

  getAssignmentStats: async (assignmentId: string): Promise<{
    totalSubmissions: number;
    gradedSubmissions: number;
    pendingSubmissions: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
  }> => {
    const response: AxiosResponse<any> = await api.get(`/assignments/${assignmentId}/stats`);
    return response.data;
  },

  // File management
  uploadAttachment: async (assignmentId: string, file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response: AxiosResponse<any> = await api.post(`/assignments/${assignmentId}/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteAttachment: async (assignmentId: string, attachmentId: string): Promise<void> => {
    await api.delete(`/assignments/${assignmentId}/attachments/${attachmentId}`);
  },

  downloadAttachment: async (assignmentId: string, attachmentId: string): Promise<Blob> => {
    const response: AxiosResponse<Blob> = await api.get(`/assignments/${assignmentId}/attachments/${attachmentId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  },
};