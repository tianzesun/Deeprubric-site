"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

import { authService } from "../services/auth.service";
import { AuthState, LoginCredentials, RegisterData, User } from "../types/auth.types";
import { createAuthPolicy } from "../policy/auth.permission";

/**
 * Core authentication hook
 * Provides reactive auth state and auth actions
 */
export const useAuth = () => {
  const router = useRouter();

  // Initialize from service snapshot
  const [state, setState] = useState<AuthState>(() => authService.getState());

  // Subscribe ONCE to AuthService
  useEffect(() => {
    const unsubscribe = authService.subscribe(setState);
    return unsubscribe;
  }, []);

  // =====================
  // Auth Actions
  // =====================

  /**
   * Login
   * Returns User so caller can decide redirect
   */
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<User> => {
      return await authService.login(credentials);
    },
    []
  );

  const register = useCallback(
    async (data: RegisterData): Promise<void> => {
      await authService.register(data);
    },
    []
  );

  const logout = useCallback(async () => {
    await authService.logout();
    router.push("/login");
  }, [router]);

  // =====================
  // Role & Permission Helpers
  // =====================

  const roleHelpers = useMemo(() => {
    const policy = createAuthPolicy(state.user);

    return {
      isAuthenticated: state.isAuthenticated,
      isAdmin: policy.isAdmin(),
      isProfessor: policy.isProfessor(),
      isGrader: policy.isGrader(),
      isStudent: policy.isStudent(),
    };
  }, [state.user, state.isAuthenticated]);

  // =====================
  // Routing Helpers
  // =====================

  const getDashboardRoute = useCallback((): string => {
    return authService.getDashboardRoute();
  }, []);

  return {
    // Raw auth state
    ...state,

    // Role helpers
    ...roleHelpers,

    // Actions
    login,
    register,
    logout,

    // Routing
    getDashboardRoute,
  };
};

/**
 * Lightweight auth status hook
 * Non-reactive snapshot for guards & middleware-like checks
 */
export const useAuthStatus = () => {
  return useMemo(() => {
    const state = authService.getState();
    const policy = createAuthPolicy(state.user);

    return {
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      isAdmin: policy.isAdmin(),
      isProfessor: policy.isProfessor(),
      isGrader: policy.isGrader(),
      isStudent: policy.isStudent(),
    };
  }, []);
};
