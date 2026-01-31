'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { signUp } from '../app/actions/auth';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Loader2, 
  CheckCircle2, 
  XCircle,
  GraduationCap,
  Building2,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../components/ToastProvider';

interface SignupFormProps {
  onSuccess?: () => void;
  onLogin?: () => void;
}

export function SignupForm({ onSuccess, onLogin }: SignupFormProps) {
  const [state, formAction] = useFormState(signUp, {
    success: false,
    message: '',
    errors: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    // Password confirmation validation
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    
    if (password !== confirmPassword) {
      showError('Passwords do not match', 'Please make sure both passwords are identical.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await fetch('/api/auth/signup', {
        method: 'POST',
        body: formData,
      });
      
      const data = await result.json();
      
      if (data.success) {
        showSuccess('Account created!', 'Your account has been created successfully. Please check your email for verification.');
        onSuccess?.();
      } else {
        showError('Registration failed', data.message || 'Please check your information and try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      showError('Network error', 'Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Join DeepRubric</h1>
          <p className="text-gray-600 dark:text-gray-300">Create your account to get started</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <User size={18} />
              Full Name
            </label>
            <input
              required
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
            />
            {state.errors?.fullName && (
              <p className="text-red-500 text-sm">{state.errors.fullName}</p>
            )}
          </div>

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
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
            />
            {state.errors?.email && (
              <p className="text-red-500 text-sm">{state.errors.email}</p>
            )}
          </div>

          {/* Institution Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Building2 size={18} />
              Institution
            </label>
            <input
              required
              type="text"
              name="institution"
              placeholder="Your university or school"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
            />
            {state.errors?.institution && (
              <p className="text-red-500 text-sm">{state.errors.institution}</p>
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
                placeholder="Create a strong password"
                minLength={8}
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
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
            <p className="text-xs text-gray-500 dark:text-gray-400">Password must be at least 8 characters long</p>
            {state.errors?.password && (
              <p className="text-red-500 text-sm">{state.errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Lock size={18} />
              Confirm Password
            </label>
            <div className="relative">
              <input
                required
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm your password"
                minLength={8}
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white" />
                ) : (
                  <Eye size={20} className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="space-y-2">
            <label className="flex items-start gap-3">
              <input 
                type="checkbox" 
                name="terms"
                required
                className="mt-1 text-green-600 focus:ring-green-500"
              />
              <div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to the{' '}
                  <a href="/terms" className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium">
                    Privacy Policy
                  </a>
                </span>
                {state.errors?.terms && (
                  <p className="text-red-500 text-sm mt-1">{state.errors.terms}</p>
                )}
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Creating Account...
              </>
            ) : (
              'Create Account'
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

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <button
              onClick={onLogin}
              className="font-medium text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
            >
              Sign in here
            </button>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <AlertCircle size={16} />
            <span>Your data is encrypted and secure. We never share your information.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simplified signup form for header integration
export function SimpleSignupForm({ onSuccess }: { onSuccess?: () => void }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess('Account created!', 'Please check your email for verification.');
        onSuccess?.();
      } else {
        showError('Registration failed', data.message || 'Please check your information.');
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
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          minLength={8}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}