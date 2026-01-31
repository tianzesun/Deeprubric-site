import { User } from '../../shared/types/common.types';

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  professorId: string;
  professor: User;
  createdAt: string;
  updatedAt: string;
  students: User[];
  tas: User[];
  assignments: Assignment[];
  rubrics: Rubric[];
  isActive: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  totalPoints: number;
  status: 'draft' | 'published' | 'closed';
  submissionType: 'file' | 'text' | 'url' | 'multiple';
  allowedFileTypes: string[];
  maxFileSize: number;
  instructions: string;
}

export interface Rubric {
  id: string;
  name: string;
  description: string;
  courseId: string;
  criteria: RubricCriterion[];
  totalPoints: number;
  createdAt: string;
  updatedAt: string;
}

export interface RubricCriterion {
  id: string;
  rubricId: string;
  name: string;
  description: string;
  points: number;
  order: number;
  levels: RubricLevel[];
}

export interface RubricLevel {
  id: string;
  criterionId: string;
  name: string;
  description: string;
  points: number;
  order: number;
}

export interface CourseEnrollment {
  id: string;
  courseId: string;
  studentId: string;
  student: User;
  enrolledAt: string;
  status: 'active' | 'dropped';
}

export interface CourseTA {
  id: string;
  courseId: string;
  taId: string;
  ta: User;
  assignedAt: string;
  permissions: string[];
}

export interface CourseFilter {
  professorId?: string;
  search?: string;
  isActive?: boolean;
  code?: string;
}

export interface CourseCreateData {
  name: string;
  code: string;
  description: string;
  professorId: string;
  isActive: boolean;
}

export interface CourseUpdateData extends Partial<CourseCreateData> {
  id: string;
}

export interface EnrollmentData {
  courseId: string;
  studentId: string;
}

export interface TAAssignmentData {
  courseId: string;
  taId: string;
  permissions: string[];
}