import axios, { AxiosResponse } from 'axios';
import { 
  Course, 
  CourseFilter, 
  CourseCreateData, 
  CourseUpdateData,
  CourseEnrollment,
  CourseTA,
  EnrollmentData,
  TAAssignmentData
} from '../types/course.types';

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
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

type WrappedResponse<T> = { data: T } | T;

const unwrapResponse = <T>(response: AxiosResponse<WrappedResponse<T>>): T => {
  // If backend returns { data: [...] }, extract it
  if ((response.data as any).data !== undefined) {
    return (response.data as any).data as T;
  }
  return response.data as T;
};

export const courseApi = {
  getCourses: async (filters?: CourseFilter): Promise<Course[]> => {
    const response = await api.get<WrappedResponse<Course[]>>('/courses', { params: filters ?? {} });
    return unwrapResponse(response);
  },

  getCourse: async (id: string): Promise<Course> => {
    const response = await api.get<WrappedResponse<Course>>(`/courses/${id}`);
    return unwrapResponse(response);
  },

  createCourse: async (data: CourseCreateData): Promise<Course> => {
    const response = await api.post<WrappedResponse<Course>>('/courses', data);
    return unwrapResponse(response);
  },

  updateCourse: async (data: CourseUpdateData): Promise<Course> => {
    const response = await api.put<WrappedResponse<Course>>(`/courses/${data.id}`, data);
    return unwrapResponse(response);
  },

  deleteCourse: async (id: string): Promise<void> => {
    await api.delete(`/courses/${id}`);
  },

  activateCourse: async (id: string): Promise<Course> => {
    const response = await api.post<WrappedResponse<Course>>(`/courses/${id}/activate`);
    return unwrapResponse(response);
  },

  deactivateCourse: async (id: string): Promise<Course> => {
    const response = await api.post<WrappedResponse<Course>>(`/courses/${id}/deactivate`);
    return unwrapResponse(response);
  },

  // Enrollments, TAs, materials...
  // Follow same pattern as above using unwrapResponse()
};
