/**
 * Auth and Role constants for DeepRubric
 * -------------------------------
 * - AUTH_ROUTES: authentication-related pages only
 * - ROLE_ROUTES: dashboards for each role
 * - PERMISSIONS & ROLE_PERMISSIONS: role-based access control
 * - Storage keys & messages
 */

// --------------------
// Auth Pages
// --------------------
export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
} as const;

// --------------------
// Role-based Dashboards
// --------------------
export const ROLE_ROUTES = {
  ADMIN: '/admin/dashboard',
  PROFESSOR: '/professor/dashboard',
  GRADER: '/grader/dashboard',
  STUDENT: '/student/dashboard',
} as const;

// --------------------
// Permissions
// --------------------
export const PERMISSIONS = {
  // General
  READ: 'READ',
  WRITE: 'WRITE',
  DELETE: 'DELETE',
  ADMIN: 'ADMIN',

  // Specific
  MANAGE_USERS: 'MANAGE_USERS',
  MANAGE_COURSES: 'MANAGE_COURSES',
  MANAGE_ASSIGNMENTS: 'MANAGE_ASSIGNMENTS',
  MANAGE_RUBRICS: 'MANAGE_RUBRICS',
  GRADE_ASSIGNMENTS: 'GRADE_ASSIGNMENTS',
  VIEW_GRADES: 'VIEW_GRADES',
  SUBMIT_ASSIGNMENTS: 'SUBMIT_ASSIGNMENTS',
  VIEW_COURSES: 'VIEW_COURSES',
  MANAGE_EXAMS: 'MANAGE_EXAMS',
  VIEW_REPORTS: 'VIEW_REPORTS',
  MANAGE_AI_MODELS: 'MANAGE_AI_MODELS',
  VIEW_SECURITY_LOGS: 'VIEW_SECURITY_LOGS',
  MANAGE_PLAGIARISM: 'MANAGE_PLAGIARISM',
  MANAGE_COLLABORATION: 'MANAGE_COLLABORATION',
  VIEW_CALENDAR: 'VIEW_CALENDAR',
} as const;

// --------------------
// Role-based Permissions Mapping
// --------------------
export const ROLE_PERMISSIONS = {
  admin: [
    PERMISSIONS.READ,
    PERMISSIONS.WRITE,
    PERMISSIONS.DELETE,
    PERMISSIONS.ADMIN,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_COURSES,
    PERMISSIONS.MANAGE_ASSIGNMENTS,
    PERMISSIONS.MANAGE_RUBRICS,
    PERMISSIONS.GRADE_ASSIGNMENTS,
    PERMISSIONS.VIEW_GRADES,
    PERMISSIONS.SUBMIT_ASSIGNMENTS,
    PERMISSIONS.VIEW_COURSES,
    PERMISSIONS.MANAGE_EXAMS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.MANAGE_AI_MODELS,
    PERMISSIONS.VIEW_SECURITY_LOGS,
    PERMISSIONS.MANAGE_PLAGIARISM,
    PERMISSIONS.MANAGE_COLLABORATION,
    PERMISSIONS.VIEW_CALENDAR,
  ],
  professor: [
    PERMISSIONS.READ,
    PERMISSIONS.WRITE,
    PERMISSIONS.MANAGE_COURSES,
    PERMISSIONS.MANAGE_ASSIGNMENTS,
    PERMISSIONS.MANAGE_RUBRICS,
    PERMISSIONS.GRADE_ASSIGNMENTS,
    PERMISSIONS.VIEW_GRADES,
    PERMISSIONS.VIEW_COURSES,
    PERMISSIONS.MANAGE_EXAMS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_SECURITY_LOGS,
    PERMISSIONS.MANAGE_PLAGIARISM,
    PERMISSIONS.MANAGE_COLLABORATION,
    PERMISSIONS.VIEW_CALENDAR,
  ],
  ta: [
    PERMISSIONS.READ,
    PERMISSIONS.GRADE_ASSIGNMENTS,
    PERMISSIONS.VIEW_GRADES,
    PERMISSIONS.VIEW_COURSES,
    PERMISSIONS.MANAGE_COLLABORATION,
    PERMISSIONS.VIEW_CALENDAR,
  ],
  student: [
    PERMISSIONS.READ,
    PERMISSIONS.SUBMIT_ASSIGNMENTS,
    PERMISSIONS.VIEW_GRADES,
    PERMISSIONS.VIEW_COURSES,
    PERMISSIONS.VIEW_CALENDAR,
  ],
} as const;

// --------------------
// Storage Keys
// --------------------
export const TOKEN_STORAGE_KEY = 'auth_token';
export const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';
export const USER_STORAGE_KEY = 'user_data';

// --------------------
// Auth Messages
// --------------------
export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in',
  LOGIN_ERROR: 'Invalid email or password',
  REGISTER_SUCCESS: 'Account created successfully',
  REGISTER_ERROR: 'Failed to create account',
  LOGOUT_SUCCESS: 'Successfully logged out',
  FORGOT_PASSWORD_SUCCESS: 'Password reset link sent to your email',
  RESET_PASSWORD_SUCCESS: 'Password reset successfully',
  TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
  UNAUTHORIZED: 'You do not have permission to access this resource',
} as const;
