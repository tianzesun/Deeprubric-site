"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
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
        <LogOut size={20} />
      </div>
      <span className="font-bold text-sm">Sign Out</span>
    </motion.button>
  );
};