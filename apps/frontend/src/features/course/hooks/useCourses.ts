import { useState, useEffect, useCallback } from 'react';
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
import { CourseService } from '../services/course.service';

export interface UseCoursesReturn {
  courses: Course[];
  loading: boolean;
  error: string | null;
  getCourses: (filters?: CourseFilter) => Promise<void>;
  getCourse: (id: string) => Promise<Course>;
  createCourse: (data: CourseCreateData) => Promise<Course>;
  updateCourse: (data: CourseUpdateData) => Promise<Course>;
  deleteCourse: (id: string) => Promise<void>;
  activateCourse: (id: string) => Promise<Course>;
  deactivateCourse: (id: string) => Promise<Course>;
  getEnrollments: (courseId: string) => Promise<CourseEnrollment[]>;
  getEnrollment: (id: string) => Promise<CourseEnrollment>;
  enrollStudent: (data: EnrollmentData) => Promise<CourseEnrollment>;
  unenrollStudent: (enrollmentId: string) => Promise<void>;
  getTAs: (courseId: string) => Promise<CourseTA[]>;
  getTA: (id: string) => Promise<CourseTA>;
  assignTA: (data: TAAssignmentData) => Promise<CourseTA>;
  removeTA: (assignmentId: string) => Promise<void>;
  updateTA: (assignmentId: string, permissions: string[]) => Promise<CourseTA>;
  getCourseStats: (courseId: string) => Promise<any>;
  searchCourses: (query: string, filters?: CourseFilter) => Promise<Course[]>;
  bulkEnrollStudents: (courseId: string, studentIds: string[]) => Promise<CourseEnrollment[]>;
  bulkAssignTAs: (courseId: string, taIds: string[], permissions: string[]) => Promise<CourseTA[]>;
  uploadCourseMaterial: (courseId: string, file: File) => Promise<any>;
  getCourseMaterials: (courseId: string) => Promise<any[]>;
  deleteCourseMaterial: (courseId: string, materialId: string) => Promise<void>;
  downloadCourseMaterial: (courseId: string, materialId: string) => Promise<Blob>;
  getCoursesByProfessor: (professorId: string) => Promise<Course[]>;
  getActiveCourses: () => Promise<Course[]>;
  getCoursesByCode: (code: string) => Promise<Course[]>;
  isStudentEnrolled: (course: Course, studentId: string) => boolean;
  isTAAssigned: (course: Course, taId: string) => boolean;
  getCourseProgress: (course: Course) => {
    totalAssignments: number;
    activeAssignments: number;
    totalSubmissions: number;
    gradedSubmissions: number;
    completionPercentage: number;
  };
  getEnrollmentCount: (course: Course) => number;
  getTACount: (course: Course) => number;
}

export const useCourses = (): UseCoursesReturn => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const service = new CourseService();

  const getCourses = useCallback(async (filters?: CourseFilter) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.getCourses(filters);
      setCourses(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  }, [service]);

  const getCourse = useCallback(async (id: string): Promise<Course> => {
    try {
      return await service.getCourse(id);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const createCourse = useCallback(async (data: CourseCreateData): Promise<Course> => {
    try {
      const result = await service.createCourse(data);
      // Refresh the list
      await getCourses();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getCourses]);

  const updateCourse = useCallback(async (data: CourseUpdateData): Promise<Course> => {
    try {
      const result = await service.updateCourse(data);
      // Refresh the list
      await getCourses();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getCourses]);

  const deleteCourse = useCallback(async (id: string): Promise<void> => {
    try {
      await service.deleteCourse(id);
      // Refresh the list
      await getCourses();
    } catch (err) {
      throw err;
    }
  }, [service, getCourses]);

  const activateCourse = useCallback(async (id: string): Promise<Course> => {
    try {
      const result = await service.activateCourse(id);
      // Refresh the list
      await getCourses();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getCourses]);

  const deactivateCourse = useCallback(async (id: string): Promise<Course> => {
    try {
      const result = await service.deactivateCourse(id);
      // Refresh the list
      await getCourses();
      return result;
    } catch (err) {
      throw err;
    }
  }, [service, getCourses]);

  const getEnrollments = useCallback(async (courseId: string): Promise<CourseEnrollment[]> => {
    try {
      return await service.getEnrollments(courseId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const getEnrollment = useCallback(async (id: string): Promise<CourseEnrollment> => {
    try {
      return await service.getEnrollment(id);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const enrollStudent = useCallback(async (data: EnrollmentData): Promise<CourseEnrollment> => {
    try {
      const enrollment = await service.enrollStudent(data);
      // Refresh the course to update enrollment count
      await getCourses();
      return enrollment;
    } catch (err) {
      throw err;
    }
  }, [service, getCourses]);

  const unenrollStudent = useCallback(async (enrollmentId: string): Promise<void> => {
    try {
      await service.unenrollStudent(enrollmentId);
      // Refresh the course to update enrollment count
      await getCourses();
    } catch (err) {
      throw err;
    }
  }, [service, getCourses]);

  const getTAs = useCallback(async (courseId: string): Promise<CourseTA[]> => {
    try {
      return await service.getTAs(courseId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const getTA = useCallback(async (id: string): Promise<CourseTA> => {
    try {
      return await service.getTA(id);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const assignTA = useCallback(async (data: TAAssignmentData): Promise<CourseTA> => {
    try {
      const taAssignment = await service.assignTA(data);
      // Refresh the course to update TA count
      await getCourses();
      return taAssignment;
    } catch (err) {
      throw err;
    }
  }, [service, getCourses]);

  const removeTA = useCallback(async (assignmentId: string): Promise<void> => {
    try {
      await service.removeTA(assignmentId);
      // Refresh the course to update TA count
      await getCourses();
    } catch (err) {
      throw err;
    }
  }, [service, getCourses]);

  const updateTA = useCallback(async (assignmentId: string, permissions: string[]): Promise<CourseTA> => {
    try {
      const taAssignment = await service.updateTA(assignmentId, permissions);
      // Refresh the course to update TA information
      await getCourses();
      return taAssignment;
    } catch (err) {
      throw err;
    }
  }, [service, getCourses]);

  const getCourseStats = useCallback(async (courseId: string) => {
    try {
      return await service.getCourseStats(courseId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const searchCourses = useCallback(async (query: string, filters?: CourseFilter): Promise<Course[]> => {
    try {
      return await service.searchCourses(query, filters);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const bulkEnrollStudents = useCallback(async (courseId: string, studentIds: string[]): Promise<CourseEnrollment[]> => {
    try {
      const enrollments = await service.bulkEnrollStudents(courseId, studentIds);
      // Refresh the course to update enrollment count
      await getCourses();
      return enrollments;
    } catch (err) {
      throw err;
    }
  }, [service, getCourses]);

  const bulkAssignTAs = useCallback(async (courseId: string, taIds: string[], permissions: string[]): Promise<CourseTA[]> => {
    try {
      const taAssignments = await service.bulkAssignTAs(courseId, taIds, permissions);
      // Refresh the course to update TA count
      await getCourses();
      return taAssignments;
    } catch (err) {
      throw err;
    }
  }, [service, getCourses]);

  const uploadCourseMaterial = useCallback(async (courseId: string, file: File) => {
    try {
      return await service.uploadCourseMaterial(courseId, file);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const getCourseMaterials = useCallback(async (courseId: string): Promise<any[]> => {
    try {
      return await service.getCourseMaterials(courseId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const deleteCourseMaterial = useCallback(async (courseId: string, materialId: string) => {
    try {
      await service.deleteCourseMaterial(courseId, materialId);
      // Refresh the course materials
      await getCourseMaterials(courseId);
    } catch (err) {
      throw err;
    }
  }, [service, getCourseMaterials]);

  const downloadCourseMaterial = useCallback(async (courseId: string, materialId: string): Promise<Blob> => {
    try {
      return await service.downloadCourseMaterial(courseId, materialId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const getCoursesByProfessor = useCallback(async (professorId: string): Promise<Course[]> => {
    try {
      return await service.getCoursesByProfessor(professorId);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const getActiveCourses = useCallback(async (): Promise<Course[]> => {
    try {
      return await service.getActiveCourses();
    } catch (err) {
      throw err;
    }
  }, [service]);

  const getCoursesByCode = useCallback(async (code: string): Promise<Course[]> => {
    try {
      return await service.getCoursesByCode(code);
    } catch (err) {
      throw err;
    }
  }, [service]);

  const isStudentEnrolled = useCallback((course: Course, studentId: string): boolean => {
    return service.isStudentEnrolled(course, studentId);
  }, [service]);

  const isTAAssigned = useCallback((course: Course, taId: string): boolean => {
    return service.isTAAssigned(course, taId);
  }, [service]);

  const getCourseProgress = useCallback((course: Course) => {
    return service.getCourseProgress(course);
  }, [service]);

  const getEnrollmentCount = useCallback((course: Course): number => {
    return service.getEnrollmentCount(course);
  }, [service]);

  const getTACount = useCallback((course: Course): number => {
    return service.getTACount(course);
  }, [service]);

  // Load courses on mount
  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return {
    courses,
    loading,
    error,
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    activateCourse,
    deactivateCourse,
    getEnrollments,
    getEnrollment,
    enrollStudent,
    unenrollStudent,
    getTAs,
    getTA,
    assignTA,
    removeTA,
    updateTA,
    getCourseStats,
    searchCourses,
    bulkEnrollStudents,
    bulkAssignTAs,
    uploadCourseMaterial,
    getCourseMaterials,
    deleteCourseMaterial,
    downloadCourseMaterial,
    getCoursesByProfessor,
    getActiveCourses,
    getCoursesByCode,
    isStudentEnrolled,
    isTAAssigned,
    getCourseProgress,
    getEnrollmentCount,
    getTACount,
  };
};