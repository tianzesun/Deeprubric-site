import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ScrollHintProps {
  text?: string;
  className?: string;
}

export const ScrollHint: React.FC<ScrollHintProps> = ({ 
  text = "Learn More", 
  className = '' 
}) => {
  return (
    <motion.div
      className={`flex flex-col items-center gap-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-10 h-10 border-2 border-slate-300 dark:border-slate-600 rounded-full flex items-center justify-center"
      >
        <ChevronDown className="text-slate-400 dark:text-slate-500" size={20} />
      </motion.div>
      <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
        {text}
      </span>
    </motion.div>
  );
};