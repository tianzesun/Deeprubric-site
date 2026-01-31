'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { resetPassword } from '../app/actions/auth';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  CheckCircle2, 
  XCircle,
  Key,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../components/ToastProvider';

interface PasswordResetFormProps {
  onSuccess?: () => void;
  onLogin?: () => void;
}

export function PasswordResetForm({ onSuccess, onLogin }: PasswordResetFormProps) {
  const [state, formAction] = useFormState(resetPassword, {
    success: false,
    message: '',
    errors: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    
    setIsSubmitting(true);
    
    try {
      const result = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        body: formData,
      });
      
      const data = await result.json();
      
      if (data.success) {
        showSuccess('Reset link sent!', 'Please check your email for password reset instructions.');
        setStep('reset');
      } else {
        showError('Reset failed', data.message || 'Please check your email and try again.');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      showError('Network error', 'Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReset = async (e: React.FormEvent) => {
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
      const result = await fetch('/api/auth/reset-password', {
        method: 'POST',
        body: formData,
      });
      
      const data = await result.json();
      
      if (data.success) {
        showSuccess('Password updated!', 'Your password has been successfully updated.');
        onSuccess?.();
      } else {
        showError('Reset failed', data.message || 'Please check your information and try again.');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      showError('Network error', 'Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'email') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Key size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reset Password</h1>
            <p className="text-gray-600 dark:text-gray-300">Enter your email to receive reset instructions</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmitEmail} className="space-y-6">
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
              />
              {state.errors?.email && (
                <p className="text-red-500 text-sm">{state.errors.email}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Sending Reset Link...
                </>
              ) : (
                'Send Reset Link'
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

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <button
              onClick={onLogin}
              className="text-sm text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300 font-medium"
            >
              Back to Login
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <AlertCircle size={16} />
              <span>We'll send a secure link to reset your password</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Set New Password</h1>
          <p className="text-gray-600 dark:text-gray-300">Enter your new password below</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmitReset} className="space-y-6">
          {/* Password Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Lock size={18} />
              New Password
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter new password"
                minLength={8}
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
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
              Confirm New Password
            </label>
            <div className="relative">
              <input
                required
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm new password"
                minLength={8}
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin mr-2" />
                Updating Password...
              </>
            ) : (
              'Update Password'
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

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <button
            onClick={onLogin}
            className="text-sm text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300 font-medium"
          >
            Back to Login
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <AlertCircle size={16} />
            <span>Your password will be securely updated</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simplified password reset form for header integration
export function SimplePasswordResetForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess('Reset link sent!', 'Please check your email for instructions.');
        onSuccess?.();
      } else {
        showError('Reset failed', data.message || 'Please check your email.');
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
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50"
      >
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </button>
    </form>
  );
}