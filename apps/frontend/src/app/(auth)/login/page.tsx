"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Added for redirection

import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useTheme } from '@/context/ThemeContext';
import toast from 'react-hot-toast';

export default function AuthPage() {
  const router = useRouter(); // ✅ Initialize router
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { login, register, isLoading, error: authError } = useAuth();
  const [localError, setLocalError] = useState('');
  const { theme } = useTheme();

  const validateForm = () => {
    if (!isLogin && !formData.name.trim()) {
      setLocalError('Please enter your full name');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setLocalError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return false;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return false;
    }
    setLocalError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!validateForm()) return;

    try {
      if (isLogin) {
        // ✅ 1. Await login and capture the returned redirect path
        const redirectPath = await login({ 
          email: formData.email, 
          password: formData.password 
        });
        
        // ✅ 2. Perform the redirect
        // Note: If your useAuth hook doesn't return the path yet, 
        // you can also use: router.push(authService.getDashboardRoute());
        router.push(redirectPath || '/dashboard');
        router.refresh();
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        setIsLogin(true);
        toast.success('Account created! Please sign in.');
      }
    } catch (err: any) {
      setLocalError(authError || 'Authentication failed');
    }
  };

  const displayError = localError || authError;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fcfdfe] dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      
      {/* Animated Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-500/20 blur-[120px] animate-pulse" />

      <motion.main 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-[440px] p-10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl rounded-[2.5rem] shadow-xl border border-white/20 dark:border-slate-800/50"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6"
          >
            <span className="text-white font-black text-2xl">D</span>
          </motion.div>
          <h2 className="text-2xl font-black tracking-tighter dark:text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <AuthInput 
                  icon={User} 
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={(e: any) => setFormData({...formData, name: e.target.value})}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          <AuthInput 
            icon={Mail} 
            placeholder="Email Address" 
            type="email" 
            value={formData.email}
            onChange={(e: any) => setFormData({...formData, email: e.target.value})}
          />

          <PasswordInput 
            placeholder="Password" 
            value={formData.password}
            show={showPassword}
            toggle={() => setShowPassword(!showPassword)}
            onChange={(e: any) => setFormData({...formData, password: e.target.value})}
          />

          {!isLogin && (
            <PasswordInput 
              placeholder="Confirm Password" 
              value={formData.confirmPassword}
              show={showConfirmPassword}
              toggle={() => setShowConfirmPassword(!showConfirmPassword)}
              onChange={(e: any) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          )}

          {isLogin && (
            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="font-bold">Remember me</span>
              </label>
              <a href="#" className="text-indigo-600 font-bold hover:underline">Forgot password?</a>
            </div>
          )}

         {displayError && (
  <motion.div 
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-400 px-4 py-3 rounded-2xl text-sm"
  >
    {typeof displayError === 'object' ? (displayError as any).msg : String(displayError)}
  </motion.div>
)}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200/50 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Get Started'}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="my-8 flex items-center gap-4 text-slate-400">
          <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800" />
          <span className="text-[10px] font-black uppercase">OR</span>
          <div className="h-[1px] flex-1 bg-slate-100 dark:bg-slate-800" />
        </div>

        <div className="space-y-3">
          <SocialButton icon="google" label="Continue with Google" />
          <SocialButton icon="microsoft" label="Continue with Microsoft" />
        </div>

        <p className="text-center mt-8 text-sm font-medium text-slate-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </motion.main>
    </div>
  );
}

// --- Helper Components ---

const AuthInput = ({ icon: Icon, ...props }: any) => (
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600 z-10" size={20} />
    <input 
      {...props}
      className="w-full bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all placeholder:text-slate-400"
    />
  </div>
);

const PasswordInput = ({ placeholder, value, onChange, show, toggle }: any) => (
  <div className="relative">
    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600 z-10" size={20} />
    <input 
      type={show ? "text" : "password"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl py-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
    />
    <button
      type="button"
      onClick={toggle}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
    >
      {show ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
);

const SocialButton = ({ icon, label }: { icon: string; label: string }) => (
  <button className="w-full py-3.5 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
    {icon === 'google' ? (
      <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
    ) : (
      <svg className="w-5 h-5" viewBox="0 0 24 24"><rect x="1" y="1" width="10" height="10" rx="2" fill="#F25022"/><rect x="1" y="13" width="10" height="10" rx="2" fill="#7FBA00"/><rect x="13" y="1" width="10" height="10" rx="2" fill="#00A4EF"/><rect x="13" y="13" width="10" height="10" rx="2" fill="#FFB900"/></svg>
    )}
    {label}
  </button>
);