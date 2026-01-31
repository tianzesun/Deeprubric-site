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
  lock: <Lock className="text-blue-500" />,
  globe: <Globe className="text-emerald-500" />,
  shield: <Shield className="text-indigo-500" />,
  server: <Server className="text-amber-500" />,
};

export const FeatureCard: React.FC<FeatureProps> = ({ title, description, iconType, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="p-6 bg-white/70 backdrop-blur-md border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
    >
      <div className="mb-4 p-3 w-fit rounded-xl bg-slate-50">
        {iconMap[iconType]}
      </div>
      <h3 className="font-bold text-slate-900">{title}</h3>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
        {description}
      </p>
    </motion.div>
  );
};
