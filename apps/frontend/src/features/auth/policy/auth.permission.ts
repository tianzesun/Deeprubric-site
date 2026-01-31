import { PERMISSIONS, ROLE_PERMISSIONS, ROLE_ROUTES } from '../constants/auth.constants';
import { User } from '../types/auth.types';

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

/**
 * AuthPolicy encapsulates all permission checks and role-based routes
 */
export class AuthPolicy {
  private user: User | null;

  constructor(user: User | null) {
    this.user = user;
  }

  // --------------------
  // Permission Checks
  // --------------------
  hasPermission(permission: Permission): boolean {
    if (!this.user) return false;
    const userPermissions = ROLE_PERMISSIONS[this.user.role as keyof typeof ROLE_PERMISSIONS];
    return userPermissions.includes(permission);
  }

  hasAnyPermission(permissions: Permission[]): boolean {
    return permissions.some(p => this.hasPermission(p));
  }

  hasAllPermissions(permissions: Permission[]): boolean {
    return permissions.every(p => this.hasPermission(p));
  }

  // --------------------
  // Resource-based access
  // --------------------
  canAccess(resource: string, action: 'read' | 'write' | 'delete'): boolean {
    if (!this.user) return false;

    const resourcePermissions: Record<string, Permission> = {
      users: PERMISSIONS.MANAGE_USERS,
      courses: PERMISSIONS.MANAGE_COURSES,
      assignments: PERMISSIONS.MANAGE_ASSIGNMENTS,
      rubrics: PERMISSIONS.MANAGE_RUBRICS,
      grades: PERMISSIONS.VIEW_GRADES,
      exams: PERMISSIONS.MANAGE_EXAMS,
      reports: PERMISSIONS.VIEW_REPORTS,
      ai: PERMISSIONS.MANAGE_AI_MODELS,
      security: PERMISSIONS.VIEW_SECURITY_LOGS,
      plagiarism: PERMISSIONS.MANAGE_PLAGIARISM,
      collaboration: PERMISSIONS.MANAGE_COLLABORATION,
      calendar: PERMISSIONS.VIEW_CALENDAR,
    };

    const requiredPermission = resourcePermissions[resource];
    if (!requiredPermission) return this.hasPermission(PERMISSIONS.READ);

    // Map action to permission
    const actionPermission =
      action === 'write' ? PERMISSIONS.WRITE :
      action === 'delete' ? PERMISSIONS.DELETE :
      PERMISSIONS.READ;

    return this.hasPermission(requiredPermission) && this.hasPermission(actionPermission);
  }

  // --------------------
  // Role-specific helpers
  // --------------------
  canManageCourse(): boolean {
    return this.isAdmin() || this.isProfessor();
  }

  canGradeCourse(): boolean {
    return this.isAdmin() || this.isProfessor() || this.isGrader();
  }

  canViewCourseGrades(): boolean {
    return this.isAuthenticated(); // All roles can view their allowed grades
  }

  // --------------------
  // Dashboard Route
  // --------------------
  getDashboardRoute(): string {
    if (!this.user) return '/auth/login';

    switch (this.user.role) {
      case 'admin': return ROLE_ROUTES.ADMIN;
      case 'professor': return ROLE_ROUTES.PROFESSOR;
      case 'grader': return ROLE_ROUTES.GRADER;
      case 'student': return ROLE_ROUTES.STUDENT;
      default: return '/auth/login'; // fallback: login
    }
  }

  // --------------------
  // Role checks
  // --------------------
  isAuthenticated(): boolean { return this.user !== null; }
  isAdmin(): boolean { return this.user?.role === 'admin'; }
  isProfessor(): boolean { return this.user?.role === 'professor'; }
  isGrader(): boolean { return this.user?.role === 'grader'; }
  isStudent(): boolean { return this.user?.role === 'student'; }
}

// --------------------
// Factory & Convenience Functions
// --------------------
export function createAuthPolicy(user: User | null): AuthPolicy {
  return new AuthPolicy(user);
}

export function hasPermission(user: User | null, permission: Permission): boolean {
  return createAuthPolicy(user).hasPermission(permission);
}

export function canAccess(user: User | null, resource: string, action: 'read' | 'write' | 'delete'): boolean {
  return createAuthPolicy(user).canAccess(resource, action);
}
