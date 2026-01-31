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
import { gradingApi } from '../api/grading.api';
import toast from 'react-hot-toast';

export class GradingService {
  /**
   * Get grades with optional filtering
   */
  async getGrades(filters?: GradeFilter): Promise<Grade[]> {
    try {
      return await gradingApi.getGrades(filters);
    } catch (error: any) {
      console.error('Error fetching grades:', error);
      toast.error('Failed to load grades');
      throw error;
    }
  }

  /**
   * Get a specific grade by ID
   */
  async getGrade(id: string): Promise<Grade> {
    try {
      return await gradingApi.getGrade(id);
    } catch (error: any) {
      console.error('Error fetching grade:', error);
      toast.error('Failed to load grade');
      throw error;
    }
  }

  /**
   * Create a new grade
   */
  async createGrade(data: GradeCreateData): Promise<Grade> {
    try {
      const grade = await gradingApi.createGrade(data);
      toast.success('Grade created successfully');
      return grade;
    } catch (error: any) {
      console.error('Error creating grade:', error);
      toast.error('Failed to create grade');
      throw error;
    }
  }

  /**
   * Update an existing grade
   */
  async updateGrade(data: GradeUpdateData): Promise<Grade> {
    try {
      const grade = await gradingApi.updateGrade(data);
      toast.success('Grade updated successfully');
      return grade;
    } catch (error: any) {
      console.error('Error updating grade:', error);
      toast.error('Failed to update grade');
      throw error;
    }
  }

  /**
   * Delete a grade
   */
  async deleteGrade(id: string): Promise<void> {
    try {
      await gradingApi.deleteGrade(id);
      toast.success('Grade deleted successfully');
    } catch (error: any) {
      console.error('Error deleting grade:', error);
      toast.error('Failed to delete grade');
      throw error;
    }
  }

  /**
   * Bulk update grades
   */
  async bulkUpdateGrades(data: GradeBulkUpdate): Promise<Grade[]> {
    try {
      const grades = await gradingApi.bulkUpdateGrades(data);
      toast.success(`${grades.length} grades updated successfully`);
      return grades;
    } catch (error: any) {
      console.error('Error bulk updating grades:', error);
      toast.error('Failed to bulk update grades');
      throw error;
    }
  }

  /**
   * Request a grade review
   */
  async requestGradeReview(data: GradeReviewRequest): Promise<GradeReview> {
    try {
      const review = await gradingApi.requestGradeReview(data);
      toast.success('Grade review requested successfully');
      return review;
    } catch (error: any) {
      console.error('Error requesting grade review:', error);
      toast.error('Failed to request grade review');
      throw error;
    }
  }

  /**
   * Get grade reviews
   */
  async getGradeReviews(gradeId?: string): Promise<GradeReview[]> {
    try {
      return await gradingApi.getGradeReviews(gradeId);
    } catch (error: any) {
      console.error('Error fetching grade reviews:', error);
      toast.error('Failed to load grade reviews');
      throw error;
    }
  }

  /**
   * Update a grade review
   */
  async updateGradeReview(id: string, decision: string, reviewedBy: string): Promise<GradeReview> {
    try {
      const review = await gradingApi.updateGradeReview(id, decision, reviewedBy);
      toast.success('Grade review updated successfully');
      return review;
    } catch (error: any) {
      console.error('Error updating grade review:', error);
      toast.error('Failed to update grade review');
      throw error;
    }
  }

  /**
   * Get grade history
   */
  async getGradeHistory(gradeId: string): Promise<GradeHistory[]> {
    try {
      return await gradingApi.getGradeHistory(gradeId);
    } catch (error: any) {
      console.error('Error fetching grade history:', error);
      toast.error('Failed to load grade history');
      throw error;
    }
  }

  /**
   * Get grade statistics
   */
  async getGradeStatistics(assignmentId: string): Promise<GradeStatistics> {
    try {
      return await gradingApi.getGradeStatistics(assignmentId);
    } catch (error: any) {
      console.error('Error fetching grade statistics:', error);
      toast.error('Failed to load grade statistics');
      throw error;
    }
  }

  /**
   * Export grades
   */
  async exportGrades(data: GradeExport): Promise<Blob> {
    try {
      return await gradingApi.exportGrades(data);
    } catch (error: any) {
      console.error('Error exporting grades:', error);
      toast.error('Failed to export grades');
      throw error;
    }
  }

  /**
   * Import grades
   */
  async importGrades(data: GradeImport): Promise<any> {
    try {
      const result = await gradingApi.importGrades(data);
      toast.success('Grades imported successfully');
      return result;
    } catch (error: any) {
      console.error('Error importing grades:', error);
      toast.error('Failed to import grades');
      throw error;
    }
  }

  /**
   * Submit a grade dispute
   */
  async submitGradeDispute(dispute: Omit<GradeDispute, 'id' | 'status' | 'submittedAt' | 'createdAt' | 'updatedAt'>): Promise<GradeDispute> {
    try {
      const result = await gradingApi.submitGradeDispute(dispute);
      toast.success('Grade dispute submitted successfully');
      return result;
    } catch (error: any) {
      console.error('Error submitting grade dispute:', error);
      toast.error('Failed to submit grade dispute');
      throw error;
    }
  }

  /**
   * Get grade disputes
   */
  async getGradeDisputes(gradeId?: string): Promise<GradeDispute[]> {
    try {
      return await gradingApi.getGradeDisputes(gradeId);
    } catch (error: any) {
      console.error('Error fetching grade disputes:', error);
      toast.error('Failed to load grade disputes');
      throw error;
    }
  }

  /**
   * Update a grade dispute
   */
  async updateGradeDispute(id: string, resolution: string, reviewedBy: string): Promise<GradeDispute> {
    try {
      const dispute = await gradingApi.updateGradeDispute(id, resolution, reviewedBy);
      toast.success('Grade dispute resolved successfully');
      return dispute;
    } catch (error: any) {
      console.error('Error updating grade dispute:', error);
      toast.error('Failed to update grade dispute');
      throw error;
    }
  }

  /**
   * Get grade analytics
   */
  async getGradeAnalytics(courseId: string, assignmentId?: string): Promise<{
    overallStats: GradeStatistics;
    perAssignment: { [assignmentId: string]: GradeStatistics };
    perStudent: { [studentId: string]: GradeStatistics };
    trends: {
      averageScores: { date: string; score: number }[];
      gradingSpeed: { date: string; submissions: number }[];
    };
  }> {
    try {
      return await gradingApi.getGradeAnalytics(courseId, assignmentId);
    } catch (error: any) {
      console.error('Error fetching grade analytics:', error);
      toast.error('Failed to load grade analytics');
      throw error;
    }
  }

  /**
   * Validate a grade
   */
  async validateGrade(data: GradeCreateData): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    try {
      return await gradingApi.validateGrade(data);
    } catch (error: any) {
      console.error('Error validating grade:', error);
      toast.error('Failed to validate grade');
      throw error;
    }
  }

  /**
   * Get grade notifications
   */
  async getGradeNotifications(userId: string): Promise<{
    id: string;
    type: 'grade_submitted' | 'grade_updated' | 'review_requested' | 'dispute_submitted';
    gradeId: string;
    message: string;
    read: boolean;
    createdAt: string;
  }[]> {
    try {
      return await gradingApi.getGradeNotifications(userId);
    } catch (error: any) {
      console.error('Error fetching grade notifications:', error);
      toast.error('Failed to load grade notifications');
      throw error;
    }
  }

  /**
   * Mark notification as read
   */
  async markNotificationRead(notificationId: string): Promise<void> {
    try {
      await gradingApi.markNotificationRead(notificationId);
    } catch (error: any) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to mark notification as read');
      throw error;
    }
  }

  /**
   * Get grade templates
   */
  async getGradeTemplates(courseId: string): Promise<{
    id: string;
    name: string;
    courseId: string;
    template: GradeCreateData;
    createdAt: string;
    updatedAt: string;
  }[]> {
    try {
      return await gradingApi.getGradeTemplates(courseId);
    } catch (error: any) {
      console.error('Error fetching grade templates:', error);
      toast.error('Failed to load grade templates');
      throw error;
    }
  }

  /**
   * Create a grade template
   */
  async createGradeTemplate(template: {
    name: string;
    courseId: string;
    template: GradeCreateData;
  }): Promise<any> {
    try {
      const result = await gradingApi.createGradeTemplate(template);
      toast.success('Grade template created successfully');
      return result;
    } catch (error: any) {
      console.error('Error creating grade template:', error);
      toast.error('Failed to create grade template');
      throw error;
    }
  }

  /**
   * Apply a grade template
   */
  async applyGradeTemplate(templateId: string, gradeIds: string[]): Promise<Grade[]> {
    try {
      const grades = await gradingApi.applyGradeTemplate(templateId, gradeIds);
      toast.success(`${grades.length} grades updated with template`);
      return grades;
    } catch (error: any) {
      console.error('Error applying grade template:', error);
      toast.error('Failed to apply grade template');
      throw error;
    }
  }

  /**
   * Calculate grade distribution
   */
  calculateGradeDistribution(grades: Grade[]): { [key: string]: number } {
    const distribution: { [key: string]: number } = {};
    
    grades.forEach(grade => {
      const percentage = Math.round((grade.score / grade.maxScore) * 100);
      let range = '';
      
      if (percentage >= 90) range = 'A (90-100%)';
      else if (percentage >= 80) range = 'B (80-89%)';
      else if (percentage >= 70) range = 'C (70-79%)';
      else if (percentage >= 60) range = 'D (60-69%)';
      else range = 'F (<60%)';
      
      distribution[range] = (distribution[range] || 0) + 1;
    });
    
    return distribution;
  }

  /**
   * Calculate grade statistics
   */
  calculateStatistics(grades: Grade[]): GradeStatistics {
    if (grades.length === 0) {
      return {
        totalGrades: 0,
        averageScore: 0,
        medianScore: 0,
        standardDeviation: 0,
        minScore: 0,
        maxScore: 0,
        gradeDistribution: {},
        gradingProgress: {
          totalSubmissions: 0,
          gradedSubmissions: 0,
          pendingSubmissions: 0,
          percentage: 0
        }
      };
    }

    const scores = grades.map(g => g.score);
    const total = scores.reduce((a, b) => a + b, 0);
    const average = total / scores.length;
    
    const sortedScores = [...scores].sort((a, b) => a - b);
    const median = sortedScores[Math.floor(sortedScores.length / 2)];
    
    const minScore = Math.min(...scores);
    const maxScore = Math.max(...scores);
    
    const variance = scores.reduce((acc, score) => acc + Math.pow(score - average, 2), 0) / scores.length;
    const standardDeviation = Math.sqrt(variance);
    
    const distribution = this.calculateGradeDistribution(grades);
    
    return {
      totalGrades: grades.length,
      averageScore: Math.round(average * 100) / 100,
      medianScore: median,
      standardDeviation: Math.round(standardDeviation * 100) / 100,
      minScore,
      maxScore,
      gradeDistribution: distribution,
      gradingProgress: {
        totalSubmissions: grades.length,
        gradedSubmissions: grades.length,
        pendingSubmissions: 0,
        percentage: 100
      }
    };
  }

  /**
   * Get grading speed (grades per hour)
   */
  calculateGradingSpeed(grades: Grade[]): number {
    if (grades.length === 0) return 0;
    
    const now = new Date();
    const oldestGrade = new Date(Math.min(...grades.map(g => new Date(g.gradedAt).getTime())));
    const hoursDiff = (now.getTime() - oldestGrade.getTime()) / (1000 * 60 * 60);
    
    return hoursDiff > 0 ? grades.length / hoursDiff : 0;
  }

  /**
   * Check if grade is within acceptable range
   */
  isGradeValid(grade: Grade, assignmentMaxScore: number): boolean {
    return grade.score >= 0 && grade.score <= assignmentMaxScore;
  }

  /**
   * Get grade trend analysis
   */
  analyzeGradeTrends(grades: Grade[]): {
    improving: Grade[];
    declining: Grade[];
    stable: Grade[];
  } {
    // Simple trend analysis based on score changes over time
    const sortedGrades = [...grades].sort((a, b) => new Date(a.gradedAt).getTime() - new Date(b.gradedAt).getTime());
    
    const trends = {
      improving: [] as Grade[],
      declining: [] as Grade[],
      stable: [] as Grade[]
    };

    if (sortedGrades.length < 2) {
      trends.stable = sortedGrades;
      return trends;
    }

    for (let i = 1; i < sortedGrades.length; i++) {
      const prev = sortedGrades[i - 1];
      const curr = sortedGrades[i];
      const change = curr.score - prev.score;
      
      if (change > 0) trends.improving.push(curr);
      else if (change < 0) trends.declining.push(curr);
      else trends.stable.push(curr);
    }

    return trends;
  }
}