'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, AlertTriangle, Clock, ShieldCheck, Database, 
  RefreshCw, CheckCircle, ExternalLink, Mail, 
  Sparkles, Star, Diamond, Rocket, Gem, Crown, Target, Users2, 
  Shield, Users, Zap, Clock as ClockIcon, BarChart3, Brain, Award, GraduationCap,
  MessageSquare, Settings, Globe, Database as DatabaseIcon, Fingerprint, Network,
  AlertTriangle as AlertTriangleIcon, CheckCircle as CheckCircleIcon, LockKeyhole, Globe2, DatabaseBackup,
  Monitor, Code, Cpu, BookOpen, Video, Users as UsersIcon, Video as VideoIcon,
  ArrowRight, ArrowUpRight, RefreshCcw, Check, CircleCheck, Shield as ShieldIcon,
  Lock, Eye, Fingerprint as FingerprintIcon, DatabaseBackup as DatabaseBackupIcon,
  Globe2 as Globe2Icon, Users2 as Users2Icon, CalendarCheck, ShieldAlert, UserCheck,
  Building2, DollarSign, AlertCircle, Check as CheckIcon, UserPlus, Scale
} from 'lucide-react';

const MaintenanceMode = ({ estimatedBackTime = "2:00 PM EST" }) => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

  // Simulate progress and countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 0.5;
        if (newProgress >= 100) {
          // Auto-refresh when progress completes
          window.location.reload();
          return 100;
        }
        return newProgress;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate time remaining (mock)
  useEffect(() => {
    const updateTimeRemaining = () => {
      const now = new Date();
      const targetTime = new Date();
      targetTime.setHours(14, 0, 0, 0); // 2:00 PM

      const diff = targetTime - now;
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeRemaining(`${hours}h ${minutes}m remaining`);
      } else {
        setTimeRemaining('Should be back soon');
      }
    };

    updateTimeRemaining();
    const timer = setInterval(updateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Floating background orbs */}
      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full opacity-20 blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 0,
          ease: "easeInOut"
        }}
        style={{
          left: '10%',
          top: '20%'
        }}
      />
      <motion.div
        className="absolute w-48 h-48 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full opacity-20 blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1,
          ease: "easeInOut"
        }}
        style={{
          right: '10%',
          bottom: '20%'
        }}
      />
      <motion.div
        className="absolute w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full opacity-20 blur-xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 2,
          ease: "easeInOut"
        }}
        style={{
          left: '50%',
          top: '60%'
        }}
      />

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

      <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
        <div className="max-w-lg w-full text-center relative">
          {/* Animated Icon */}
          <div className="mb-8 relative inline-block">
            <motion.div 
              className="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/20 border border-purple-400/30"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Wrench size={48} className="text-white animate-spin" style={{animationDuration: '3s'}} />
            </motion.div>
            <motion.div 
              className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-xl border-4 border-white animate-pulse"
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <AlertTriangle size={20} className="text-white" />
            </motion.div>
            {/* Rotating maintenance indicator */}
            <motion.div 
              className="absolute inset-0 border-4 border-purple-400/30 rounded-3xl animate-spin opacity-20"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>

          {/* Main Messaging */}
          <div className="mb-8">
            <motion.h1 
              className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              DeepRubric is Improving
            </motion.h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md mx-auto">
              We're currently performing scheduled maintenance to ensure your educational records remain secure, optimized, and compliant with FERPA regulations.
            </p>
          </div>

          {/* Status Card */}
          <motion.div 
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-slate-900/50 border border-slate-700/50 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between text-sm mb-6">
              <span className="text-slate-400 font-semibold uppercase tracking-wider">Estimated Return</span>
              <span className="text-gradient-to-r from-purple-400 to-pink-400 font-bold text-lg">{estimatedBackTime}</span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${Math.min(progress, 85)}%` }}
                  animate={{ width: `${Math.min(progress, 85)}%` }}
                  transition={{ duration: 3 }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>Maintenance in progress...</span>
                <span>{timeRemaining}</span>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <motion.div 
                className="flex items-center space-x-2 text-emerald-400"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ShieldCheck size={16} className="animate-pulse" />
                <span>Data Protected</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2 text-blue-400"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <DatabaseBackup size={16} className="animate-pulse" />
                <span>State Machines Locked</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Reassurance Section */}
          <div className="space-y-6">
            <motion.div 
              className="bg-gradient-to-br from-slate-800/30 to-indigo-900/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="font-black text-white mb-3 flex items-center justify-center">
                <CheckCircle size={20} className="text-emerald-400 mr-2" />
                Your Data is Completely Safe
              </h3>
              <div className="text-sm text-slate-300 space-y-2">
                <p>• All grade state machines are locked and immutable</p>
                <p>• No data modifications are possible during maintenance</p>
                <p>• Your assignments and grades are preserved exactly as they were</p>
                <p>• FERPA compliance is actively maintained throughout</p>
              </div>
            </motion.div>

            {/* Contact and Status Links */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.a 
                href="https://status.deeprubric.com"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={18} className="mr-2" />
                Check Live Status Page
              </motion.a>

              <motion.a 
                href="mailto:support@deeprubric.com?subject=Maintenance Inquiry"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-semibold rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-slate-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={18} className="mr-2" />
                Contact Support
              </motion.a>
            </motion.div>

            {/* Footer Message */}
            <motion.div 
              className="pt-6 border-t border-slate-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-xs text-slate-400 leading-relaxed">
                Thank you for your patience. DeepRubric prioritizes the security and integrity of your educational data above all else.
                We appreciate your understanding during this brief maintenance period.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceMode;
