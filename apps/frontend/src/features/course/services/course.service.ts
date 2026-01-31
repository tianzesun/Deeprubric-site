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
import { courseApi } from '../api/course.api';
import toast from 'react-hot-toast';

export class CourseService {
  /**
   * Get courses with optional filtering
   */
  async getCourses(filters?: CourseFilter): Promise<Course[]> {
    try {
      return await courseApi.getCourses(filters);
    } catch (error: any) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
      throw error;
    }
  }

  /**
   * Get a specific course by ID
   */
  async getCourse(id: string): Promise<Course> {
    try {
      return await courseApi.getCourse(id);
    } catch (error: any) {
      console.error('Error fetching course:', error);
      toast.error('Failed to load course');
      throw error;
    }
  }

  /**
   * Create a new course
   */
  async createCourse(data: CourseCreateData): Promise<Course> {
    try {
      const course = await courseApi.createCourse(data);
      toast.success('Course created successfully');
      return course;
    } catch (error: any) {
      console.error('Error creating course:', error);
      toast.error('Failed to create course');
      throw error;
    }
  }

  /**
   * Update an existing course
   */
  async updateCourse(data: CourseUpdateData): Promise<Course> {
    try {
      const course = await courseApi.updateCourse(data);
      toast.success('Course updated successfully');
      return course;
    } catch (error: any) {
      console.error('Error updating course:', error);
      toast.error('Failed to update course');
      throw error;
    }
  }

  /**
   * Delete a course
   */
  async deleteCourse(id: string): Promise<void> {
    try {
      await courseApi.deleteCourse(id);
      toast.success('Course deleted successfully');
    } catch (error: any) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
      throw error;
    }
  }

  /**
   * Activate a course
   */
  async activateCourse(id: string): Promise<Course> {
    try {
      const course = await courseApi.activateCourse(id);
      toast.success('Course activated successfully');
      return course;
    } catch (error: any) {
      console.error('Error activating course:', error);
      toast.error('Failed to activate course');
      throw error;
    }
  }

  /**
   * Deactivate a course
   */
  async deactivateCourse(id: string): Promise<Course> {
    try {
      const course = await courseApi.deactivateCourse(id);
      toast.success('Course deactivated successfully');
      return course;
    } catch (error: any) {
      console.error('Error deactivating course:', error);
      toast.error('Failed to deactivate course');
      throw error;
    }
  }

  /**
   * Get course enrollments
   */
  async getEnrollments(courseId: string): Promise<CourseEnrollment[]> {
    try {
      return await courseApi.getEnrollments(courseId);
    } catch (error: any) {
      console.error('Error fetching enrollments:', error);
      toast.error('Failed to load enrollments');
      throw error;
    }
  }

  /**
   * Get a specific enrollment
   */
  async getEnrollment(id: string): Promise<CourseEnrollment> {
    try {
      return await courseApi.getEnrollment(id);
    } catch (error: any) {
      console.error('Error fetching enrollment:', error);
      toast.error('Failed to load enrollment');
      throw error;
    }
  }

  /**
   * Enroll a student in a course
   */
  async enrollStudent(data: EnrollmentData): Promise<CourseEnrollment> {
    try {
      const enrollment = await courseApi.enrollStudent(data);
      toast.success('Student enrolled successfully');
      return enrollment;
    } catch (error: any) {
      console.error('Error enrolling student:', error);
      toast.error('Failed to enroll student');
      throw error;
    }
  }

  /**
   * Unenroll a student from a course
   */
  async unenrollStudent(enrollmentId: string): Promise<void> {
    try {
      await courseApi.unenrollStudent(enrollmentId);
      toast.success('Student unenrolled successfully');
    } catch (error: any) {
      console.error('Error unenrolling student:', error);
      toast.error('Failed to unenroll student');
      throw error;
    }
  }

  /**
   * Get course TAs
   */
  async getTAs(courseId: string): Promise<CourseTA[]> {
    try {
      return await courseApi.getTAs(courseId);
    } catch (error: any) {
      console.error('Error fetching TAs:', error);
      toast.error('Failed to load TAs');
      throw error;
    }
  }

  /**
   * Get a specific TA assignment
   */
  async getTA(id: string): Promise<CourseTA> {
    try {
      return await courseApi.getTA(id);
    } catch (error: any) {
      console.error('Error fetching TA:', error);
      toast.error('Failed to load TA');
      throw error;
    }
  }

  /**
   * Assign a TA to a course
   */
  async assignTA(data: TAAssignmentData): Promise<CourseTA> {
    try {
      const taAssignment = await courseApi.assignTA(data);
      toast.success('TA assigned successfully');
      return taAssignment;
    } catch (error: any) {
      console.error('Error assigning TA:', error);
      toast.error('Failed to assign TA');
      throw error;
    }
  }

  /**
   * Remove a TA from a course
   */
  async removeTA(assignmentId: string): Promise<void> {
    try {
      await courseApi.removeTA(assignmentId);
      toast.success('TA removed successfully');
    } catch (error: any) {
      console.error('Error removing TA:', error);
      toast.error('Failed to remove TA');
      throw error;
    }
  }

  /**
   * Update TA permissions
   */
  async updateTA(assignmentId: string, permissions: string[]): Promise<CourseTA> {
    try {
      const taAssignment = await courseApi.updateTA(assignmentId, permissions);
      toast.success('TA permissions updated successfully');
      return taAssignment;
    } catch (error: any) {
      console.error('Error updating TA permissions:', error);
      toast.error('Failed to update TA permissions');
      throw error;
    }
  }

  /**
   * Get course statistics
   */
  async getCourseStats(courseId: string): Promise<{
    totalStudents: number;
    totalTAs: number;
    totalAssignments: number;
    activeAssignments: number;
    totalSubmissions: number;
    gradedSubmissions: number;
  }> {
    try {
      return await courseApi.getCourseStats(courseId);
    } catch (error: any) {
      console.error('Error fetching course stats:', error);
      toast.error('Failed to load course statistics');
      throw error;
    }
  }

  /**
   * Search courses
   */
  async searchCourses(query: string, filters?: CourseFilter): Promise<Course[]> {
    try {
      return await courseApi.searchCourses(query, filters);
    } catch (error: any) {
      console.error('Error searching courses:', error);
      toast.error('Failed to search courses');
      throw error;
    }
  }

  /**
   * Bulk enroll students
   */
  async bulkEnrollStudents(courseId: string, studentIds: string[]): Promise<CourseEnrollment[]> {
    try {
      const enrollments = await courseApi.bulkEnrollStudents(courseId, studentIds);
      toast.success(`${enrollments.length} students enrolled successfully`);
      return enrollments;
    } catch (error: any) {
      console.error('Error bulk enrolling students:', error);
      toast.error('Failed to bulk enroll students');
      throw error;
    }
  }

  /**
   * Bulk assign TAs
   */
  async bulkAssignTAs(courseId: string, taIds: string[], permissions: string[]): Promise<CourseTA[]> {
    try {
      const taAssignments = await courseApi.bulkAssignTAs(courseId, taIds, permissions);
      toast.success(`${taAssignments.length} TAs assigned successfully`);
      return taAssignments;
    } catch (error: any) {
      console.error('Error bulk assigning TAs:', error);
      toast.error('Failed to bulk assign TAs');
      throw error;
    }
  }

  /**
   * Upload course material
   */
  async uploadCourseMaterial(courseId: string, file: File): Promise<any> {
    try {
      const result = await courseApi.uploadCourseMaterial(courseId, file);
      toast.success('Course material uploaded successfully');
      return result;
    } catch (error: any) {
      console.error('Error uploading course material:', error);
      toast.error('Failed to upload course material');
      throw error;
    }
  }

  /**
   * Get course materials
   */
  async getCourseMaterials(courseId: string): Promise<any[]> {
    try {
      return await courseApi.getCourseMaterials(courseId);
    } catch (error: any) {
      console.error('Error fetching course materials:', error);
      toast.error('Failed to load course materials');
      throw error;
    }
  }

  /**
   * Delete course material
   */
  async deleteCourseMaterial(courseId: string, materialId: string): Promise<void> {
    try {
      await courseApi.deleteCourseMaterial(courseId, materialId);
      toast.success('Course material deleted successfully');
    } catch (error: any) {
      console.error('Error deleting course material:', error);
      toast.error('Failed to delete course material');
      throw error;
    }
  }

  /**
   * Download course material
   */
  async downloadCourseMaterial(courseId: string, materialId: string): Promise<Blob> {
    try {
      return await courseApi.downloadCourseMaterial(courseId, materialId);
    } catch (error: any) {
      console.error('Error downloading course material:', error);
      toast.error('Failed to download course material');
      throw error;
    }
  }

  /**
   * Get courses by professor
   */
  async getCoursesByProfessor(professorId: string): Promise<Course[]> {
    return this.getCourses({ professorId });
  }

  /**
   * Get active courses
   */
  async getActiveCourses(): Promise<Course[]> {
    return this.getCourses({ isActive: true });
  }

  /**
   * Get courses by code
   */
  async getCoursesByCode(code: string): Promise<Course[]> {
    return this.getCourses({ code });
  }

  /**
   * Check if student is enrolled in course
   */
  isStudentEnrolled(course: Course, studentId: string): boolean {
    return course.students.some(student => student.id === studentId);
  }

  /**
   * Check if TA is assigned to course
   */
  isTAAssigned(course: Course, taId: string): boolean {
    return course.tas.some(ta => ta.id === taId);
  }

  /**
   * Get course progress (assignments and submissions)
   */
  getCourseProgress(course: Course): {
    totalAssignments: number;
    activeAssignments: number;
    totalSubmissions: number;
    gradedSubmissions: number;
    completionPercentage: number;
  } {
    const totalAssignments = course.assignments.length;
    const activeAssignments = course.assignments.filter(a => a.status === 'published').length;
    const totalSubmissions = course.assignments.reduce((acc, a) => acc + a.totalPoints, 0);
    const gradedSubmissions = course.assignments.filter(a => a.status === 'closed').length;
    const completionPercentage = totalAssignments > 0 ? (gradedSubmissions / totalAssignments) * 100 : 0;

    return {
      totalAssignments,
      activeAssignments,
      totalSubmissions,
      gradedSubmissions,
      completionPercentage: Math.round(completionPercentage),
    };
  }

  /**
   * Get course enrollment count
   */
  getEnrollmentCount(course: Course): number {
    return course.students.length;
  }

  /**
   * Get course TA count
   */
  getTACount(course: Course): number {
    return course.tas.length;
  }
}