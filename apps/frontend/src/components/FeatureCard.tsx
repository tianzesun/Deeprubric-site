import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Globe, Server } from 'lucide-react';

interface FeatureProps {
  title: string;
  description: string;
  iconType: 'shield' | 'lock' | 'globe' | 'server';
  index: number;
}

const iconMap = {
  lock: <Lock className="text-indigo-500 dark:text-indigo-400 w-5 h-5" />,
  globe: <Globe className="text-indigo-500 dark:text-indigo-400 w-5 h-5" />,
  shield: <Shield className="text-indigo-500 dark:text-indigo-400 w-5 h-5" />,
  server: <Server className="text-indigo-500 dark:text-indigo-400 w-5 h-5" />,
};

export const FeatureCard: React.FC<FeatureProps> = ({ title, description, iconType, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all"
    >
      <div className="mb-3 p-2.5 w-fit rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
        {iconMap[iconType]}
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        {description}
      </p>
    </motion.div>
  );
};