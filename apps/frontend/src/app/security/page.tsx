'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Lock, Eye, ChevronDown, ChevronUp, FileCheck, Globe, Database, 
  Users, Shield, Key, Zap, Fingerprint, Network, AlertTriangle, CheckCircle,
  Sparkles, Star, Diamond, Rocket, Gem, Crown, Target, Users2, ShieldCheck, 
  BadgeCheck, LockKeyhole, Globe2, DatabaseBackup, Monitor, Code, Cpu
} from 'lucide-react';

const SecurityPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-green-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4" />
          <p className="text-green-400 font-mono">Initializing Security Protocol...</p>
        </div>
      </div>
    );
  }

  const faqs = [
    {
      question: "How is my data encrypted?",
      answer: "All data is encrypted at rest using AES-256 and in transit via TLS 1.3. We use industry-standard protocols to ensure your information remains private.",
      icon: LockKeyhole
    },
    {
      question: "Is DeepRubric compliant with data protection regulations?",
      answer: "Yes, our platform is designed to meet global data protection requirements. We never share user data with third parties for marketing purposes.",
      icon: BadgeCheck
    },
    {
      question: "Where are your servers located?",
      answer: "Our primary infrastructure is hosted on secure AWS regions in the United States, utilizing multiple availability zones for high reliability.",
      icon: Globe2
    },
    {
      question: "How do you handle data backups?",
      answer: "We perform automated encrypted backups every 6 hours with 30-day retention. All backups are stored in geographically separate locations for disaster recovery.",
      icon: DatabaseBackup
    },
    {
      question: "What security certifications do you have?",
      answer: "We maintain SOC 2 Type II compliance and undergo regular third-party security audits. Our infrastructure follows NIST cybersecurity framework guidelines.",
      icon: ShieldCheck
    },
    {
      question: "Can I export my data?",
      answer: "Yes, you can export all your grading data in multiple formats including CSV, JSON, and PDF. Data export requests are processed within 24 hours.",
      icon: Monitor
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: "Military-Grade Encryption",
      description: "End-to-end AES-256 encryption for all grading data and student information with zero-knowledge architecture.",
      color: "from-green-500 to-emerald-500",
      index: 0
    },
    {
      icon: Eye,
      title: "Privacy by Design",
      description: "Zero-access architecture ensures only authorized educators view grades. We cannot access your data.",
      color: "from-cyan-500 to-blue-500",
      index: 1
    },
    {
      icon: FileCheck,
      title: "Global Compliance",
      description: "Full FERPA, GDPR, and HIPAA compliance to protect international student rights and healthcare data.",
      color: "from-purple-500 to-pink-500",
      index: 2
    },
    {
      icon: Database,
      title: "Fort Knox Infrastructure",
      description: "Enterprise-grade AWS infrastructure with multi-zone redundancy and quantum-resistant cryptography.",
      color: "from-indigo-500 to-blue-500",
      index: 3
    },
    {
      icon: Users,
      title: "Granular Access Control",
      description: "Role-based permissions with biometric authentication and real-time access monitoring.",
      color: "from-red-500 to-orange-500",
      index: 4
    },
    {
      icon: Shield,
      title: "AI-Powered Monitoring",
      description: "24/7 automated threat detection with machine learning algorithms and instant incident response.",
      color: "from-yellow-500 to-amber-500",
      index: 5
    }
  ];

  const securityBadges = [
    { icon: Key, label: "AES-256 Encryption", color: "from-green-500 to-emerald-500" },
    { icon: Globe, label: "Global Compliance", color: "from-blue-500 to-cyan-500" },
    { icon: Zap, label: "24/7 Monitoring", color: "from-purple-500 to-indigo-500" },
    { icon: Shield, label: "SOC 2 Compliant", color: "from-amber-500 to-orange-500" },
    { icon: Fingerprint, label: "Biometric Auth", color: "from-pink-500 to-rose-500" },
    { icon: Network, label: "Zero Trust", color: "from-cyan-500 to-blue-500" },
    { icon: Code, label: "Open Source Audit", color: "from-gray-500 to-slate-500" },
    { icon: Cpu, label: "Quantum Ready", color: "from-violet-500 to-purple-500" }
  ];

  const FloatingOrb = ({ delay = 0, size = "w-32 h-32", color = "from-green-400 to-emerald-400" }: { delay?: number, size?: string, color?: string }) => (
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating background orbs */}
      <FloatingOrb delay={0} size="w-64 h-64" color="from-slate-500/20 to-slate-600/20" />
      <FloatingOrb delay={1} size="w-48 h-48" color="from-gray-500/20 to-slate-500/20" />
      <FloatingOrb delay={2} size="w-40 h-40" color="from-zinc-500/20 to-gray-500/20" />
      <FloatingOrb delay={3} size="w-56 h-56" color="from-neutral-500/20 to-zinc-500/20" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 py-20 px-4 shadow-2xl backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div 
            className="bg-gradient-to-r from-slate-500/20 to-gray-500/20 text-slate-300 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-slate-500/30 shadow-2xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ShieldAlert size={48} className="animate-pulse text-slate-400" />
          </motion.div>
          <motion.h1 
            className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block">Security &</span>
            <span className="block bg-gradient-to-r from-slate-400 via-gray-400 to-zinc-400 bg-clip-text text-transparent">
              Trust
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Enterprise-grade protection for every classroom and institution. Your data's security is our highest priority.
          </motion.p>
        </div>
      </motion.div>

      <main className="relative max-w-6xl mx-auto py-20 px-6 space-y-16">
        {/* Core Pillars */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-black mb-12 text-center bg-gradient-to-r from-slate-400 via-gray-400 to-zinc-400 bg-clip-text text-transparent"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Our Security Commitment
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-3xl border border-slate-700/50 shadow-2xl hover:shadow-xl hover:border-slate-500/50 transition-all duration-500 transform hover:-translate-y-3 group relative overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-8 shadow-lg transform group-hover:scale-110 transition-transform duration-300 relative`}>
                  {/* Floating particles */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/20 rounded-full animate-pulse" />
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-white/30 rounded-full animate-pulse delay-1000" />
                  <feature.icon size={36} className="text-white" />
                </div>
                <motion.h3 
                  className="text-2xl font-black text-white mb-4 group-hover:text-slate-300 transition-colors"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {feature.title}
                </motion.h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {feature.description}
                </p>
                
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-slate-400/30 rounded-br-3xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-slate-400/30 rounded-tl-3xl" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Security Badges */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-10 border border-slate-700/50 shadow-2xl"
        >
          <motion.h3 
            className="text-3xl font-black mb-8 text-center text-white"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Security Standards
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {securityBadges.map((badge, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-2xl border border-slate-600/50 hover:border-slate-400/50 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${badge.color} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform`}>
                  <badge.icon size={24} className="text-white" />
                </div>
                <span className="text-sm font-bold text-slate-200 text-center block">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Interactive FAQ */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-black mb-12 bg-gradient-to-r from-slate-400 via-gray-400 to-zinc-400 bg-clip-text text-transparent"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Security FAQ
          </motion.h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl hover:shadow-xl hover:border-slate-500/50 transition-all duration-300"
              >
                <motion.button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-8 text-left hover:bg-gradient-to-r hover:from-slate-500/10 hover:to-gray-500/10 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-gray-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <faq.icon size={24} className="text-white" />
                    </div>
                    <span className="font-black text-white text-xl">{faq.question}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400 font-medium">Click to expand</span>
                    {openFaq === index ? (
                      <motion.div animate={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                        <ChevronUp size={24} className="text-slate-400" />
                      </motion.div>
                    ) : (
                      <motion.div animate={{ rotate: 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown size={24} className="text-slate-500" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-8 text-slate-300"
                    >
                      <p className="leading-relaxed text-lg">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-slate-600 via-gray-600 to-zinc-600 rounded-3xl p-10 text-white shadow-2xl border border-white/20"
        >
          <div className="max-w-4xl mx-auto text-center relative">
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.h3 
                className="text-4xl font-black mb-6 bg-gradient-to-r from-white via-slate-200 to-gray-200 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Have Security Questions?
              </motion.h3>
              <p className="text-xl text-slate-100 mb-8 leading-relaxed">
                Our security team is available 24/7 to address any concerns or questions you may have about data protection.
              </p>
              <motion.button 
                className="bg-white text-slate-600 px-10 py-4 rounded-3xl font-black text-lg hover:bg-slate-100 transition-all shadow-lg shadow-slate-900/30 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-3 justify-center">
                  <ShieldCheck size={24} className="animate-pulse" />
                  Contact Security Team
                </span>
              </motion.button>
            </motion.div>
            
            {/* Floating action elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gray-400/10 rounded-full blur-xl" />
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default SecurityPage;
