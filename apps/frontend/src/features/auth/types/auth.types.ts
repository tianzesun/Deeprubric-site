/**
 * DeepRubric Authentication Types
 * -------------------------------
 * Used across frontend services, hooks, and API calls
 */

// --------------------
// User Model
// --------------------
export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'admin' | 'professor' | 'grader' | 'student';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// --------------------
// Auth Payloads
// --------------------
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'professor' | 'grader' | 'student';
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

// --------------------
// Auth Service State
// --------------------
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// --------------------
// Backend Response Models
// --------------------
export interface AuthResponse {
  access_token: string;
  token_type: 'bearer';
  user: User;
}

// --------------------
// JWT Payload for decoding (if needed)
// --------------------
export interface TokenPayload {
  sub: string;        // typically user email
  role: 'admin' | 'professor' | 'grader' | 'student';
  is_superuser?: boolean; // optional for backend superuser flag
  exp: number;
  iat: number;
}
