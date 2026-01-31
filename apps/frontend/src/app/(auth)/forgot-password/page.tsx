"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, Key } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement forgot password API call
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to send reset email');
      // }
      
      setMessage('If an account with that email exists, we have sent a password reset link.');
      setEmail('');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#f8fafc] dark:bg-[#020617] transition-colors duration-500">
      
      {/* --- DYNAMIC BACKGROUND GLOWS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 dark:bg-indigo-500/10 blur-[120px] animate-morph" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-500/20 dark:bg-rose-500/10 blur-[120px] animate-morph" />

      {/* --- FORGOT PASSWORD CARD --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md p-1 bg-white/40 dark:bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/50 dark:border-white/10 shadow-2xl"
      >
        <div className="bg-white/80 dark:bg-slate-900/80 rounded-[2.3rem] p-10">
          
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none mx-auto mb-6"
            >
              <Key className="text-white" size={24} />
            </motion.div>
            <h1 className="text-3xl font-black tracking-tighter dark:text-white">Reset Password</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all placeholder:text-slate-400 placeholder:font-medium"
                placeholder="Email address"
              />
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-400 px-4 py-3 rounded-2xl"
              >
                {error}
              </motion.div>
            )}

            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-2xl"
              >
                {message}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800" />
            <span className="text-[10px] font-black uppercase text-slate-400">OR</span>
            <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800" />
          </div>

          {/* Back to Login */}
          <button
            onClick={() => window.location.href = '/login'}
            className="w-full py-4 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Sign In
          </button>
        </div>
      </motion.div>
    </div>
  );
}