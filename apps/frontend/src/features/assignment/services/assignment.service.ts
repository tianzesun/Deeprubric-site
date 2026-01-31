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
import { assignmentApi } from '../api/assignment.api';
import toast from 'react-hot-toast';

export class AssignmentService {
  /**
   * Get assignments with optional filtering
   */
  async getAssignments(filters?: AssignmentFilter): Promise<Assignment[]> {
    try {
      return await assignmentApi.getAssignments(filters);
    } catch (error: any) {
      console.error('Error fetching assignments:', error);
      toast.error('Failed to load assignments');
      throw error;
    }
  }

  /**
   * Get a specific assignment by ID
   */
  async getAssignment(id: string): Promise<Assignment> {
    try {
      return await assignmentApi.getAssignment(id);
    } catch (error: any) {
      console.error('Error fetching assignment:', error);
      toast.error('Failed to load assignment');
      throw error;
    }
  }

  /**
   * Create a new assignment
   */
  async createAssignment(data: AssignmentCreateData): Promise<Assignment> {
    try {
      const assignment = await assignmentApi.createAssignment(data);
      toast.success('Assignment created successfully');
      return assignment;
    } catch (error: any) {
      console.error('Error creating assignment:', error);
      toast.error('Failed to create assignment');
      throw error;
    }
  }

  /**
   * Update an existing assignment
   */
  async updateAssignment(data: AssignmentUpdateData): Promise<Assignment> {
    try {
      const assignment = await assignmentApi.updateAssignment(data);
      toast.success('Assignment updated successfully');
      return assignment;
    } catch (error: any) {
      console.error('Error updating assignment:', error);
      toast.error('Failed to update assignment');
      throw error;
    }
  }

  /**
   * Delete an assignment
   */
  async deleteAssignment(id: string): Promise<void> {
    try {
      await assignmentApi.deleteAssignment(id);
      toast.success('Assignment deleted successfully');
    } catch (error: any) {
      console.error('Error deleting assignment:', error);
      toast.error('Failed to delete assignment');
      throw error;
    }
  }

  /**
   * Publish an assignment
   */
  async publishAssignment(id: string): Promise<Assignment> {
    try {
      const assignment = await assignmentApi.publishAssignment(id);
      toast.success('Assignment published successfully');
      return assignment;
    } catch (error: any) {
      console.error('Error publishing assignment:', error);
      toast.error('Failed to publish assignment');
      throw error;
    }
  }

  /**
   * Close an assignment
   */
  async closeAssignment(id: string): Promise<Assignment> {
    try {
      const assignment = await assignmentApi.closeAssignment(id);
      toast.success('Assignment closed successfully');
      return assignment;
    } catch (error: any) {
      console.error('Error closing assignment:', error);
      toast.error('Failed to close assignment');
      throw error;
    }
  }

  /**
   * Get submissions for an assignment
   */
  async getSubmissions(assignmentId: string): Promise<AssignmentSubmission[]> {
    try {
      return await assignmentApi.getSubmissions(assignmentId);
    } catch (error: any) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to load submissions');
      throw error;
    }
  }

  /**
   * Get a specific submission
   */
  async getSubmission(id: string): Promise<AssignmentSubmission> {
    try {
      return await assignmentApi.getSubmission(id);
    } catch (error: any) {
      console.error('Error fetching submission:', error);
      toast.error('Failed to load submission');
      throw error;
    }
  }

  /**
   * Create a submission
   */
  async createSubmission(data: AssignmentSubmissionCreateData): Promise<AssignmentSubmission> {
    try {
      const submission = await assignmentApi.createSubmission(data);
      toast.success('Assignment submitted successfully');
      return submission;
    } catch (error: any) {
      console.error('Error creating submission:', error);
      toast.error('Failed to submit assignment');
      throw error;
    }
  }

  /**
   * Update a submission
   */
  async updateSubmission(data: AssignmentSubmissionUpdateData): Promise<AssignmentSubmission> {
    try {
      const submission = await assignmentApi.updateSubmission(data);
      toast.success('Submission updated successfully');
      return submission;
    } catch (error: any) {
      console.error('Error updating submission:', error);
      toast.error('Failed to update submission');
      throw error;
    }
  }

  /**
   * Delete a submission
   */
  async deleteSubmission(id: string): Promise<void> {
    try {
      await assignmentApi.deleteSubmission(id);
      toast.success('Submission deleted successfully');
    } catch (error: any) {
      console.error('Error deleting submission:', error);
      toast.error('Failed to delete submission');
      throw error;
    }
  }

  /**
   * Grade a submission
   */
  async gradeSubmission(data: AssignmentGradeData): Promise<AssignmentSubmission> {
    try {
      const submission = await assignmentApi.gradeSubmission(data);
      toast.success('Assignment graded successfully');
      return submission;
    } catch (error: any) {
      console.error('Error grading submission:', error);
      toast.error('Failed to grade assignment');
      throw error;
    }
  }

  /**
   * Get assignment statistics
   */
  async getAssignmentStats(assignmentId: string): Promise<{
    totalSubmissions: number;
    gradedSubmissions: number;
    pendingSubmissions: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
  }> {
    try {
      return await assignmentApi.getAssignmentStats(assignmentId);
    } catch (error: any) {
      console.error('Error fetching assignment stats:', error);
      toast.error('Failed to load assignment statistics');
      throw error;
    }
  }

  /**
   * Upload an attachment
   */
  async uploadAttachment(assignmentId: string, file: File): Promise<any> {
    try {
      const result = await assignmentApi.uploadAttachment(assignmentId, file);
      toast.success('Attachment uploaded successfully');
      return result;
    } catch (error: any) {
      console.error('Error uploading attachment:', error);
      toast.error('Failed to upload attachment');
      throw error;
    }
  }

  /**
   * Delete an attachment
   */
  async deleteAttachment(assignmentId: string, attachmentId: string): Promise<void> {
    try {
      await assignmentApi.deleteAttachment(assignmentId, attachmentId);
      toast.success('Attachment deleted successfully');
    } catch (error: any) {
      console.error('Error deleting attachment:', error);
      toast.error('Failed to delete attachment');
      throw error;
    }
  }

  /**
   * Download an attachment
   */
  async downloadAttachment(assignmentId: string, attachmentId: string): Promise<Blob> {
    try {
      return await assignmentApi.downloadAttachment(assignmentId, attachmentId);
    } catch (error: any) {
      console.error('Error downloading attachment:', error);
      toast.error('Failed to download attachment');
      throw error;
    }
  }

  /**
   * Get assignments for a specific course
   */
  async getAssignmentsByCourse(courseId: string): Promise<Assignment[]> {
    return this.getAssignments({ courseId });
  }

  /**
   * Get assignments by status
   */
  async getAssignmentsByStatus(status: Assignment['status']): Promise<Assignment[]> {
    return this.getAssignments({ status });
  }

  /**
   * Get upcoming assignments (due in the next 7 days)
   */
  async getUpcomingAssignments(): Promise<Assignment[]> {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return this.getAssignments({
      dueDateFrom: now.toISOString(),
      dueDateTo: nextWeek.toISOString(),
    });
  }

  /**
   * Get overdue assignments
   */
  async getOverdueAssignments(): Promise<Assignment[]> {
    const now = new Date();
    return this.getAssignments({
      dueDateTo: now.toISOString(),
    });
  }

  /**
   * Check if assignment is overdue
   */
  isAssignmentOverdue(assignment: Assignment): boolean {
    return new Date(assignment.dueDate) < new Date();
  }

  /**
   * Get assignment progress (submissions vs total students)
   */
  getAssignmentProgress(assignment: Assignment): {
    submitted: number;
    total: number;
    percentage: number;
  } {
    const submitted = assignment.submissions.length;
    const total = assignment.course.students.length;
    const percentage = total > 0 ? (submitted / total) * 100 : 0;
    
    return {
      submitted,
      total,
      percentage: Math.round(percentage),
    };
  }

  /**
   * Get assignment grading progress
   */
  getGradingProgress(assignment: Assignment): {
    graded: number;
    total: number;
    percentage: number;
  } {
    const graded = assignment.submissions.filter(s => s.status === 'graded').length;
    const total = assignment.submissions.length;
    const percentage = total > 0 ? (graded / total) * 100 : 0;
    
    return {
      graded,
      total,
      percentage: Math.round(percentage),
    };
  }
}