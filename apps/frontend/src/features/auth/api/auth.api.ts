import axios, { AxiosResponse } from 'axios';
import { 
  LoginCredentials, 
  RegisterData, 
  ForgotPasswordData, 
  ResetPasswordData, 
  AuthResponse,
  User
} from '../types/auth.types';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../constants/auth.constants';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --------------------
// Request Interceptor
// --------------------
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --------------------
// Response Interceptor
// --------------------
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if (status === 401 && typeof window !== 'undefined') {
      // Token expired or invalid
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      if (!window.location.pathname.includes('/auth/login')) {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// --------------------
// Authentication API
// --------------------
export const authApi = {
  /**
   * Login
   * FastAPI OAuth2PasswordRequestForm expects 'username' & 'password' in x-www-form-urlencoded
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const params = new URLSearchParams();
    params.append('username', credentials.email);
    params.append('password', credentials.password);

    const response: AxiosResponse<AuthResponse> = await api.post('/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data;
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/register', userData);
    return response.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    // Optional backend logout
    await api.post('/logout').catch(() => console.warn('Backend logout failed'));
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  },

  /**
   * Refresh access token
   */
  refreshToken: async (): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/refresh');
    return response.data;
  },

  /**
   * Forgot password
   */
  forgotPassword: async (data: ForgotPasswordData): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await api.post('/forgot-password', data);
    return response.data;
  },

  /**
   * Reset password
   */
  resetPassword: async (data: ResetPasswordData): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await api.post('/reset-password', data);
    return response.data;
  },

  /**
   * Get current logged-in user
   */
  getCurrentUser: async (): Promise<User> => {
    const response: AxiosResponse<User> = await api.get('/users/me');
    return response.data;
  },

  /**
   * Update current user profile
   */
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response: AxiosResponse<User> = await api.put('/users/me', userData);
    return response.data;
  },
};
