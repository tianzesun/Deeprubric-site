import { User } from '../../shared/types/common.types';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  course: Course;
  rubricId: string | null;
  rubric: Rubric | null;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  totalPoints: number;
  status: 'draft' | 'published' | 'closed' | 'pending' | 'submitted' | 'graded' | 'late';
  submissionType: 'file' | 'text' | 'url' | 'multiple';
  allowedFileTypes: string[];
  maxFileSize: number; // in MB
  instructions: string;
  attachments: AssignmentAttachment[];
  submissions: AssignmentSubmission[];
  courseName?: string;
  professorName?: string;
  submittedAt?: string;
  grade?: number;
  maxScore?: number;
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

export interface AssignmentAttachment {
  id: string;
  assignmentId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  student: User;
  content: string;
  files: SubmissionFile[];
  submittedAt: string;
  updatedAt: string;
  status: 'pending' | 'graded' | 'feedback_provided';
  score: number | null;
  feedback: string;
  gradedAt: string | null;
  gradedBy: User | null;
  rubricScores: RubricScore[];
}

export interface SubmissionFile {
  id: string;
  submissionId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface RubricScore {
  id: string;
  submissionId: string;
  criterionId: string;
  criterion: RubricCriterion;
  levelId: string | null;
  level: RubricLevel | null;
  pointsAwarded: number;
  feedback: string;
  scoredAt: string;
  scoredBy: User | null;
}

export interface AssignmentFilter {
  courseId?: string;
  status?: Assignment['status'];
  dueDateFrom?: string;
  dueDateTo?: string;
  search?: string;
}

export interface AssignmentCreateData {
  title: string;
  description: string;
  courseId: string;
  rubricId?: string;
  dueDate: string;
  totalPoints: number;
  status: 'draft' | 'published';
  submissionType: Assignment['submissionType'];
  allowedFileTypes: string[];
  maxFileSize: number;
  instructions: string;
}

export interface AssignmentUpdateData extends Partial<AssignmentCreateData> {
  id: string;
}

export interface AssignmentSubmissionCreateData {
  assignmentId: string;
  content: string;
  files?: File[];
}

export interface AssignmentSubmissionUpdateData {
  id: string;
  content?: string;
  files?: File[];
}

export interface AssignmentGradeData {
  submissionId: string;
  score: number;
  feedback: string;
  rubricScores?: {
    criterionId: string;
    levelId?: string;
    pointsAwarded: number;
    feedback: string;
  }[];
}