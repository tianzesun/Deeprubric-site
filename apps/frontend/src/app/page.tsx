"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, Zap, Users, Brain, Sparkles, 
  Play, ChevronUp, Activity, X, CheckCircle2,
  Terminal, ShieldCheck, Lock, Globe, Database,
  Mail, MessageSquare, Send, Loader2 
} from 'lucide-react';
import { FeatureCard } from '../components/FeatureCard';
import { ScrollHint } from '../components/ScrollHint';
import { ContactForm } from '../components/ContactForm';

import { useTerminalLogs } from '../hooks/useTerminalLogs';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [uptime, setUptime] = useState(99.982);
  const [index, setIndex] = useState(0);
  const aiLog = useTerminalLogs();

  const words = ["Grading", "Curriculum", "Assessment"];
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const wordInterval = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 3000);
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); clearInterval(wordInterval); };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 dark:bg-[#020617] transition-colors duration-1000 relative overflow-x-hidden">


      {/* --- HERO --- */}
      <main className="flex-grow">
        <section className="relative py-24 px-6 text-center z-10">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-8 leading-[1.1]">
            Human-in-the-Loop <br/>
            <span className="block h-[1.2em] relative">
              <AnimatePresence mode="wait">
                <motion.span key={words[index]} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.6 }} className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500 absolute left-0 right-0">
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="block mt-4">Architecture</span>
          </h1>
        </section>

        {/* --- SECURITY & TRUST SECTION --- */}
        <section className="py-20 bg-slate-100/50 dark:bg-slate-900/20 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-md">
                <div className="flex items-center gap-2 text-indigo-500 font-black text-xs uppercase tracking-widest mb-4">
                  <ShieldCheck size={16} /> Enterprise Grade Security
                </div>
                <h2 className="text-3xl font-black dark:text-white mb-6">Your data, <span className="text-slate-400">permanently shielded.</span></h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">We utilize 256-bit encryption and zero-knowledge architecture to ensure that even we can't see your sensitive academic data without permission.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                <FeatureCard
                  title="AES-256"
                  description="At Rest & Transit"
                  iconType="lock"
                  index={0}
                />
                <FeatureCard
                  title="GDPR"
                  description="Global Privacy"
                  iconType="globe"
                  index={1}
                />
                <FeatureCard
                  title="SOC2"
                  description="Type II Certified"
                  iconType="shield"
                  index={2}
                />
                <FeatureCard
                  title="Self-Host"
                  description="On-Prem Options"
                  iconType="server"
                  index={3}
                />
              </div>
            </div>
          </div>
          
          {/* Scroll Hint */}
          <div className="mt-12 flex justify-center">
            <Link 
              href="/features" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all shadow-lg"
            >
              Explore Features
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* --- LIVE NEURAL LOGS --- */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto bg-[#0a0f1d] rounded-[2.5rem] p-8 border border-slate-800 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="text-emerald-500" size={18} />
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Neural Security Logs</span>
            </div>
            <div className="space-y-2 font-mono text-[13px]">
              <AnimatePresence mode="popLayout">
                {aiLog.map((log, i) => (
                  <motion.div key={log + i} initial={{ opacity: 0 }} animate={{ opacity: 1 - i * 0.2 }} className="text-emerald-500/80 flex gap-4">
                    <span className="text-slate-700 select-none">{">"}</span> {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* --- CONTACT US SECTION --- */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Branding Side */}
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4"
                >
                  <MessageSquare size={12} /> Communication Node
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter dark:text-white leading-tight">
                  Deploy Human-in-the-Loop <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">at your Institution.</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-6 text-lg font-medium max-w-md">
                  Request a sandbox environment or speak with our technical integration team.
                </p>
                
                <div className="mt-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Node</p>
                      <p className="font-bold dark:text-white">protocol@deeprubric.ai</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 blur-3xl -z-10" />
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
                  <ContactForm />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}