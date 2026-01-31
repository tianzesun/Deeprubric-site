"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface UserProfileProps {
  name: string;
  email: string;
  avatarUrl?: string;
}

export const UserProfile = ({ name, email, avatarUrl }: UserProfileProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-3 rounded-3xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100/50 dark:border-slate-700/30 transition-all hover:bg-white dark:hover:bg-slate-800/50 cursor-pointer group"
    >
      {/* Avatar Container */}
      <div className="relative">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200 dark:shadow-none overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            name.charAt(0)
          )}
        </div>
        {/* Online Indicator */}
        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-slate-900 dark:text-white truncate tracking-tight">
          {name}
        </p>
        <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate uppercase tracking-wider">
          {email}
        </p>
      </div>
    </motion.div>
  );
};