'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { signIn } from '../app/actions/auth';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Loader2, 
  CheckCircle2, 
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../components/ToastProvider';

interface LoginFormProps {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
  onSignup?: () => void;
}

export function LoginForm({ onSuccess, onForgotPassword, onSignup }: LoginFormProps) {
  const [state, formAction] = useFormState(signIn, {
    success: false,
    message: '',
    errors: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    setIsSubmitting(true);
    
    try {
      const result = await fetch('/api/auth/signin', {
        method: 'POST',
        body: formData,
      });
      
      const data = await result.json();
      
      if (data.success) {
        showSuccess('Welcome back!', 'You have successfully logged in.');
        onSuccess?.();
      } else {
        showError('Login failed', data.message || 'Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      showError('Network error', 'Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-300">Sign in to your DeepRubric account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Mail size={18} />
              Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
            />
            {state.errors?.email && (
              <p className="text-red-500 text-sm">{state.errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Lock size={18} />
              Password
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white" />
                ) : (
                  <Eye size={20} className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white" />
                )}
              </button>
            </div>
            {state.errors?.password && (
              <p className="text-red-500 text-sm">{state.errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" name="remember" className="mr-2 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Remember me</span>
            </label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Status Message */}
          {state.message && (
            <div className={`flex items-center gap-3 p-4 rounded-lg ${
              state.success 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {state.success ? (
                <CheckCircle2 size={20} />
              ) : (
                <XCircle size={20} />
              )}
              <span>{state.message}</span>
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="mt-6 flex items-center">
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
          <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <button
              onClick={onSignup}
              className="font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Sign up here
            </button>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <AlertCircle size={16} />
            <span>Your data is encrypted and secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simplified login form for header integration
export function SimpleLoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess('Welcome back!', 'You have successfully logged in.');
        onSuccess?.();
      } else {
        showError('Login failed', data.message || 'Please check your credentials.');
      }
    } catch (error) {
      showError('Network error', 'Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}