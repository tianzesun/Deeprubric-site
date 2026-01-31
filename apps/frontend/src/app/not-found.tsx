'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Star, Diamond, Rocket, Gem, Crown, Target, Users2, 
  Shield, Users, Zap, Clock, BarChart3, Brain, Award, GraduationCap,
  MessageSquare, Settings, Globe, Database, Fingerprint, Network,
  AlertTriangle, CheckCircle, LockKeyhole, Globe2, DatabaseBackup,
  Monitor, Code, Cpu, BookOpen, Video, Users as UsersIcon, Video as VideoIcon,
  ArrowRight, ArrowUpRight, RefreshCcw, Check, CircleCheck, Shield as ShieldIcon,
  Lock, Eye, Fingerprint as FingerprintIcon, DatabaseBackup as DatabaseBackupIcon,
  Globe2 as Globe2Icon, Users2 as Users2Icon, CalendarCheck, ShieldAlert, UserCheck,
  Building2, DollarSign, AlertCircle, Check as CheckIcon, UserPlus, Scale,
  Home, ArrowLeft, Search, Map, Compass, Navigation, Globe as GlobeIcon,
  Building, GraduationCap as GraduationCapIcon, User, Folder, File, FileText as FileTextIcon
} from 'lucide-react';

export default function Custom404() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-400 mx-auto mb-4" />
          <p className="text-slate-400">Loading Navigation Protocol...</p>
        </div>
      </div>
    );
  }

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
        <div className="relative z-10 max-w-md w-full text-center">
          {/* 404 Icon */}
          <motion.div 
            className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/25"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.966-5.605-2.445C5.023 11.876 4 10.243 4 8.5 4 5.462 6.462 3 9.5 3c1.743 0 3.376 1.023 4.605 2.555C15.29 6.966 16 8.34 16 10c0 .743-.156 1.445-.428 2.083"/>
            </svg>
          </motion.div>

          {/* 404 Title */}
          <motion.h1 
            className="text-6xl md:text-8xl font-black text-white mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.h1>
          <motion.h2 
            className="text-2xl font-semibold text-slate-300 mb-4"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Page Not Found
          </motion.h2>

          {/* 404 Message */}
          <motion.p 
            className="text-lg text-slate-400 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.a 
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={20} className="mr-2" />
              Go Home
            </motion.a>

            <motion.a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-semibold rounded-2xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 transform hover:scale-105 border border-slate-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} className="mr-2" />
              Go Back
            </motion.a>
          </motion.div>

          {/* Popular Pages */}
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Popular Pages</h3>
            <div className="grid grid-cols-2 gap-3">
              <motion.a 
                href="/features"
                className="p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-sm hover:from-slate-700/50 hover:to-slate-800/50 transition-all duration-300 text-center group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center mb-2">
                  <Sparkles size={16} className="text-purple-400 group-hover:text-purple-300 transition-colors" />
                </div>
                <div className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Features</div>
              </motion.a>
              <motion.a 
                href="/security"
                className="p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-sm hover:from-slate-700/50 hover:to-slate-800/50 transition-all duration-300 text-center group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center mb-2">
                  <ShieldIcon size={16} className="text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                </div>
                <div className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Security</div>
              </motion.a>
              <motion.a 
                href="/compliance"
                className="p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-sm hover:from-slate-700/50 hover:to-slate-800/50 transition-all duration-300 text-center group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center mb-2">
                  <CheckIcon size={16} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                </div>
                <div className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Compliance</div>
              </motion.a>
              <motion.a 
                href="/support"
                className="p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-sm hover:from-slate-700/50 hover:to-slate-800/50 transition-all duration-300 text-center group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center mb-2">
                  <MessageSquare size={16} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                </div>
                <div className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Support</div>
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation Help */}
          <motion.div 
            className="mt-8 p-6 bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-2xl border border-slate-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Compass size={16} className="text-indigo-400" />
              <span className="text-sm font-semibold text-slate-300">Need Help?</span>
            </div>
            <p className="text-xs text-slate-400">
              Use the navigation above or contact our support team if you need assistance finding what you're looking for.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
