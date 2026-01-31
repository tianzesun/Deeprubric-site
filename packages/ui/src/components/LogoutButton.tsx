"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // 1. Clear all local session data
    localStorage.clear();
    
    // 2. Clear the cookie (Crucial for the Middleware!)
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // 3. Redirect
    router.push('/login');
  };

  return (
    <motion.button
      whileHover={{ x: 5, backgroundColor: "rgba(244, 63, 94, 0.1)" }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogout}
      className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl cursor-pointer transition-all text-slate-400 hover:text-rose-500 group"
    >
      <div className="p-2 rounded-xl group-hover:bg-rose-50 dark:group-hover:bg-rose-500/10 transition-colors">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="font-bold text-sm">Sign Out</span>
    </motion.button>
  );
};
