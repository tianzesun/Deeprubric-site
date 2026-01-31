import { User, LoginCredentials, RegisterData, AuthState } from '../types/auth.types';
import { authApi } from '../api/auth.api';
import { createAuthPolicy } from '../policy/auth.permission';
import {
  TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
  AUTH_MESSAGES
} from '../constants/auth.constants';
import toast from 'react-hot-toast';

class AuthService {
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  private listeners: Array<(state: AuthState) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
    }
  }

  // =====================
  // State Accessors
  // =====================
  public getState(): AuthState {
    return { ...this.state };
  }

  public isAuthenticated(): boolean {
    return this.state.isAuthenticated;
  }

  public isLoading(): boolean {
    return this.state.isLoading;
  }

  // =====================
  // Role & Policy
  // =====================
  public getDashboardRoute(): string {
    if (!this.state.user) return '/login';
    return createAuthPolicy(this.state.user).getDashboardRoute();
  }

  public isAdmin(): boolean {
    return this.state.user
      ? createAuthPolicy(this.state.user).isAdmin()
      : false;
  }

  // =====================
  // Core Auth Logic
  // =====================
  /**
   * Login
   * - Authenticates user
   * - Stores token + user
   * - Updates state
   * - RETURNS the dashboard route string
   */
  async login(credentials: LoginCredentials): Promise<string> {
    this.updateState({ isLoading: true, error: null });

    try {
      const response = await authApi.login(credentials);

      if (!response?.user || !response?.access_token) {
        throw new Error('Invalid login response: missing user or token');
      }

      // Persist auth
      this.saveAuth(response.user, response.access_token);

      // Update state
      this.updateState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });

      toast.success(AUTH_MESSAGES.LOGIN_SUCCESS);

      // ✅ Return dashboard route as string
      return this.getDashboardRoute();
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.detail ||
        error.message ||
        AUTH_MESSAGES.LOGIN_ERROR;

      this.updateState({
        isLoading: false,
        error: errorMsg,
      });

      toast.error(errorMsg);
      throw error;
    }
  }

  async register(data: RegisterData): Promise<void> {
    this.updateState({ isLoading: true, error: null });

    try {
      await authApi.register(data);
      toast.success(AUTH_MESSAGES.REGISTER_SUCCESS);
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.detail ||
        AUTH_MESSAGES.REGISTER_ERROR;

      this.updateState({ error: errorMsg });
      toast.error(errorMsg);
      throw error;
    } finally {
      this.updateState({ isLoading: false });
    }
  }

  async logout(): Promise<void> {
    try {
      await authApi.logout().catch(() => {});
    } finally {
      this.clearAuth();
      toast.success(AUTH_MESSAGES.LOGOUT_SUCCESS);

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  }

  // =====================
  // Persistence
  // =====================
  private loadFromStorage() {
    try {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      const userData = localStorage.getItem(USER_STORAGE_KEY);

      if (token && userData) {
        this.state.user = JSON.parse(userData);
        this.state.isAuthenticated = true;
      }
    } catch {
      this.clearAuth();
    }
  }

  private saveAuth(user: User, token: string) {
    if (typeof window === 'undefined') return;

    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

    const secure = process.env.NODE_ENV === 'production' ? 'Secure;' : '';
    document.cookie = `token=${token}; Path=/; Max-Age=86400; SameSite=Lax; ${secure}`;
  }

  private clearAuth() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      document.cookie = `token=; Path=/; Max-Age=0; SameSite=Lax;`;
    }

    this.updateState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }

  // =====================
  // Observer Pattern
  // =====================
  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private updateState(partialState: Partial<AuthState>) {
    this.state = { ...this.state, ...partialState };
    this.notify();
  }

  private notify() {
    const snapshot = { ...this.state };
    this.listeners.forEach(listener => listener(snapshot));
  }
}

export const authService = new AuthService();
