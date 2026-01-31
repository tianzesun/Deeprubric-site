export interface User {
  id: string;
  email: string;
  name: string;
  role: 'professor' | 'ta' | 'student' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  professorId: string;
  createdAt: string;
  updatedAt: string;
  students: User[];
  tas: User[];
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

export type UserRole = 'professor' | 'ta' | 'student' | 'admin';

export interface FileUpload {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  userId: string;
}

export interface SearchParams {
  q?: string;
  filters?: Record<string, any>;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}