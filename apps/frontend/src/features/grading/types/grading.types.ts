import { User } from '../../shared/types/common.types';
import { Assignment, AssignmentSubmission } from '../../assignment/types/assignment.types';

export interface Grade {
  id: string;
  submissionId: string;
  assignmentId: string;
  studentId: string;
  gradedBy: string;
  gradedAt: string;
  score: number;
  maxScore: number;
  feedback: string;
  rubricId?: string;
  rubricGrades: RubricGrade[];
  createdAt: string;
  updatedAt: string;
}

export interface RubricGrade {
  id: string;
  gradeId: string;
  criterionId: string;
  levelId: string;
  points: number;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}

export interface GradeReview {
  id: string;
  gradeId: string;
  requestedBy: string;
  requestedAt: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  decision?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GradeHistory {
  id: string;
  gradeId: string;
  changedBy: string;
  changedAt: string;
  oldValue: number;
  newValue: number;
  reason: string;
  createdAt: string;
}

export interface GradeFilter {
  assignmentId?: string;
  studentId?: string;
  gradedBy?: string;
  status?: 'pending' | 'graded' | 'reviewed';
  dateFrom?: string;
  dateTo?: string;
  scoreMin?: number;
  scoreMax?: number;
}

export interface GradeCreateData {
  submissionId: string;
  score: number;
  maxScore: number;
  feedback: string;
  rubricId?: string;
  rubricGrades: Omit<RubricGrade, 'id' | 'gradeId' | 'createdAt' | 'updatedAt'>[];
}

export interface GradeUpdateData extends Partial<GradeCreateData> {
  id: string;
}

export interface GradeReviewRequest {
  gradeId: string;
  reason: string;
}

export interface GradeBulkUpdate {
  gradeIds: string[];
  score?: number;
  feedback?: string;
  rubricGrades?: Omit<RubricGrade, 'id' | 'gradeId' | 'createdAt' | 'updatedAt'>[];
}

export interface GradeStatistics {
  totalGrades: number;
  averageScore: number;
  medianScore: number;
  standardDeviation: number;
  minScore: number;
  maxScore: number;
  gradeDistribution: {
    [key: string]: number; // Score range -> count
  };
  gradingProgress: {
    totalSubmissions: number;
    gradedSubmissions: number;
    pendingSubmissions: number;
    percentage: number;
  };
}

export interface GradeExport {
  format: 'csv' | 'excel' | 'pdf';
  includeFeedback: boolean;
  includeRubricDetails: boolean;
  includeStudentInfo: boolean;
  assignmentId?: string;
  courseId?: string;
  dateRange?: {
    from: string;
    to: string;
  };
}

export interface GradeImport {
  file: File;
  assignmentId: string;
  format: 'csv' | 'excel';
  mapping: {
    studentId: string;
    score: string;
    feedback?: string;
  };
  updateExisting: boolean;
}

export interface GradeDispute {
  id: string;
  gradeId: string;
  studentId: string;
  submittedAt: string;
  reason: string;
  status: 'pending' | 'under_review' | 'resolved';
  reviewedBy?: string;
  reviewedAt?: string;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
}