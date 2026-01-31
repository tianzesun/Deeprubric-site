'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Target, 
  Users, 
  Shield, 
  Zap, 
  Clock, 
  BarChart3, 
  Brain, 
  Award,
  GraduationCap,
  FileText,
  MessageSquare,
  Settings,
  Sparkles,
  Star,
  Diamond,
  Rocket,
  Gem,
  Crown
} from 'lucide-react';

const FeatureCard = ({ 
  title, 
  description, 
  icon,
  color = "blue",
  index = 0
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  color?: string;
  index?: number;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl border border-slate-200/50 p-8 hover:shadow-2xl hover:border-slate-300/50 transition-all duration-500 transform hover:-translate-y-3 group relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className={`w-16 h-16 bg-gradient-to-br from-${color}-500 to-${color}-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300 relative`}>
        {/* Floating particles */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/20 rounded-full animate-pulse" />
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-white/30 rounded-full animate-pulse delay-1000" />
        {icon}
      </div>
      
      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed text-lg">
        {description}
      </p>
      
      {/* Decorative corner accents */}
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-indigo-200/50 rounded-br-2xl" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-indigo-200/50 rounded-tl-2xl" />
    </motion.div>
  );
};

const StatCard = ({ 
  label, 
  value, 
  description,
  index = 0
}: { 
  label: string; 
  value: string; 
  description: string; 
  index?: number;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="text-center group"
    >
      <motion.div 
        className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {value}
      </motion.div>
      <div className="text-sm font-semibold text-slate-600 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
        {label}
      </div>
      <div className="text-xs text-slate-500">{description}</div>
    </motion.div>
  );
};

const FloatingOrb = ({ delay = 0, size = "w-32 h-32", color = "from-indigo-400 to-purple-400" }: { delay?: number, size?: string, color?: string }) => (
  <motion.div
    className={`absolute ${size} bg-gradient-to-br ${color} rounded-full opacity-20 blur-xl`}
    animate={{
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
    style={{
      left: `${Math.random() * 80}%`,
      top: `${Math.random() * 80}%`
    }}
  />
);

export default function FeaturesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-400 mx-auto mb-4" />
          <p className="text-slate-400">Loading Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Floating background orbs */}
      <FloatingOrb delay={0} size="w-64 h-64" color="from-indigo-500/20 to-purple-500/20" />
      <FloatingOrb delay={1} size="w-48 h-48" color="from-pink-500/20 to-orange-500/20" />
      <FloatingOrb delay={2} size="w-40 h-40" color="from-blue-500/20 to-cyan-500/20" />
      <FloatingOrb delay={3} size="w-56 h-56" color="from-emerald-500/20 to-teal-500/20" />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Hero Section */}
      <section className="relative py-32 px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          <motion.div 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 px-6 py-3 rounded-full mb-8 border border-indigo-500/30 backdrop-blur-sm"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={20} className="animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Next-Generation Features
            </span>
            <Star size={16} className="animate-spin" />
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-black text-white mb-8 leading-[1.1]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block">Professional</span>
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Excellence
            </span>
            <span className="block mt-4">Reimagined</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            DeepRubric fuses artificial intelligence with human insight to create the most sophisticated, 
            fair, and transformative grading ecosystem ever built for education.
          </motion.p>
        </motion.div>
      </section>

      {/* Key Features Grid */}
      <main className="relative max-w-7xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          <FeatureCard
            title="Neural Intelligence"
            description="Harness the power of advanced neural networks that understand context, nuance, and academic rigor with human-like comprehension."
            icon={<Brain size={32} className="animate-pulse" />}
            color="indigo"
            index={0}
          />
          
          <FeatureCard
            title="Human Synergy"
            description="Seamlessly blend AI efficiency with expert human judgment. Our system intelligently routes complex responses for nuanced evaluation."
            icon={<Users size={32} className="animate-pulse" />}
            color="purple"
            index={1}
          />
          
          <FeatureCard
            title="Multi-Sensory Analysis"
            description="Grade text, code, mathematical expressions, diagrams, and multimedia content with specialized AI models trained for each modality."
            icon={<Zap size={32} className="animate-pulse" />}
            color="emerald"
            index={2}
          />
          
          <FeatureCard
            title="Instant Intelligence"
            description="Deliver real-time, actionable feedback that transforms the learning experience and accelerates student growth."
            icon={<MessageSquare size={32} className="animate-pulse" />}
            color="cyan"
            index={3}
          />
          
          <FeatureCard
            title="Equity Engine"
            description="Advanced bias detection algorithms continuously monitor and eliminate potential disparities, ensuring fair evaluation for all."
            icon={<Shield size={32} className="animate-pulse" />}
            color="rose"
            index={4}
          />
          
          <FeatureCard
            title="Adaptive Integration"
            description="Integrate seamlessly with any LMS and adapt to your institution's unique grading standards and pedagogical approaches."
            icon={<Settings size={32} className="animate-pulse" />}
            color="amber"
            index={5}
          />
        </div>

        {/* Statistics Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl shadow-2xl border border-slate-700/50 p-12 mb-20 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <StatCard
              label="Precision Rate"
              value="98.7%"
              description="Beyond human consistency"
              index={0}
            />
            <StatCard
              label="Lightning Fast"
              value="90s"
              description="Average response time"
              index={1}
            />
            <StatCard
              label="Bias Elimination"
              value="94.2%"
              description="Compared to traditional methods"
              index={2}
            />
            <StatCard
              label="Global Trust"
              value="1000+"
              description="Institutions worldwide"
              index={3}
            />
          </div>
        </motion.div>

        {/* Advanced Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-800/50 to-indigo-900/20 rounded-3xl shadow-2xl border border-slate-700/50 p-10 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
              <Diamond size={32} className="text-indigo-400" />
              Advanced Analytics
            </h2>
            <div className="space-y-8">
              <motion.div 
                className="flex items-start gap-6 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">Deep Learning Insights</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">AI-driven analytics that reveal hidden patterns in student performance and predict learning outcomes with unprecedented accuracy.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-6 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">Time Revolution</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">Transform grading workflows with 85% time reduction while maintaining the highest quality standards and academic rigor.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-6 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">Quality Excellence</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">Multi-layered quality assurance protocols ensure every assessment meets the highest academic standards with zero compromise.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-3xl p-10 border border-purple-500/30 backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
              <Crown size={32} className="text-yellow-400" />
              Educator Empowerment
            </h2>
            <div className="space-y-8">
              <motion.div 
                className="flex items-start gap-6 group"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">Intelligent Rubrics</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">AI-powered rubric creation that adapts to your course objectives and evolves with your teaching methodology.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-6 group"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-pink-300 transition-colors">Insightful Analytics</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">Comprehensive analytics that provide deep insights into student progress, class performance, and institutional outcomes.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start gap-6 group"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">Fort Knox Security</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">Military-grade encryption and zero-knowledge architecture ensure your data remains secure and private at all times.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl text-white p-12 text-center shadow-2xl border border-white/20"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white via-indigo-200 to-pink-200 bg-clip-text text-transparent">
              Ready for the Future?
            </h2>
            <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join the educational revolution. Institutions worldwide are already experiencing 
              unprecedented improvements in grading accuracy, efficiency, and student outcomes.
            </p>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.a 
              href="/contact" 
              className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3">
                <Rocket size={24} className="animate-pulse" />
                Request Demo
              </span>
            </motion.a>
            <motion.div 
              className="text-indigo-200 text-sm font-medium"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Limited spots available for early adopters
            </motion.div>
          </div>
          
          {/* Floating action elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-400/10 rounded-full blur-xl" />
        </motion.div>
      </main>
    </div>
  );
}
