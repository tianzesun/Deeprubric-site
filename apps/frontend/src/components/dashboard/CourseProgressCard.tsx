"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MoreVertical } from 'lucide-react';

interface ProgressProps {
  title: string;
  courseCode: string;
  progress: number; // 0 to 100
  color: string;
}

export const CourseProgressCard = ({ title, courseCode, progress, color }: ProgressProps) => {
  // SVG Circle math
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-effect p-6 rounded-[2.5rem] flex flex-col justify-between h-64 relative overflow-hidden group"
    >
      {/* Background Glow Overlay */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 blur-[80px] opacity-20 transition-colors ${color}`} />

      <div className="flex justify-between items-start relative z-10">
        <div>
          <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">
            {courseCode}
          </span>
          <h3 className="text-lg font-bold mt-1 leading-tight dark:text-white">
            {title}
          </h3>
        </div>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="flex items-end justify-between relative z-10">
        {/* Animated Progress Circle */}
        <div className="relative flex items-center justify-center">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-100 dark:text-slate-800"
            />
            <motion.circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={color}
            />
          </svg>
          <span className="absolute text-sm font-black dark:text-white">
            {progress}%
          </span>
        </div>

        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300"
        >
          <ArrowUpRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};