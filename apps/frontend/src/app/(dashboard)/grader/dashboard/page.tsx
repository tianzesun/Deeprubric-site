"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  MessageSquare, 
  Star,
  ChevronRight,
  Zap,
  Eye,
  Edit3,
  Flag,
  Users
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { UserProfile } from '../../../components/dashboard/UserProfile';
import { LogoutButton } from '@deeprubric/ui';

export default function GraderDashboard() {
  const { isDark } = useTheme();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-50 dark:from-slate-950 dark:via-violet-950 dark:to-indigo-950 transition-colors duration-1000">
      
      {/* --- DYNAMIC BACKGROUND GLOWS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-500/10 dark:bg-violet-500/5 blur-[120px] animate-morph" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] animate-morph" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-r from-violet-400/5 to-indigo-400/5 rounded-full blur-[150px] animate-pulse" />

      {/* --- GRADER SIDEBAR (Violet Theme) --- */}
      <aside className="fixed left-6 top-6 bottom-6 w-64 z-50">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="h-full bg-white/70 dark:bg-zinc-900/40 backdrop-blur-2xl border border-violet-100 dark:border-zinc-800/40 rounded-[2.5rem] shadow-xl flex flex-col p-6"
        >
          <div className="flex items-center gap-3 mb-10 px-2">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-10 h-10 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-200/50 dark:shadow-none"
            >
              <Zap className="text-white" size={20} />
            </motion.div>
            <span className="text-xl font-black tracking-tighter dark:text-white">Grader<span className="bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">Pro</span></span>
          </div>

          <nav className="flex-1 space-y-1">
            <GraderNavItem icon={FileText} label="Queue" count={12} active />
            <GraderNavItem icon={CheckCircle2} label="Completed" />
            <GraderNavItem icon={MessageSquare} label="Feedback" />
            <GraderNavItem icon={Flag} label="Flagged" />
          </nav>

          <div className="space-y-4 pt-6 mt-6 border-t border-violet-50 dark:border-zinc-800/60">
            <UserProfile name="Alex Grader" email="ta_alex@univ.edu" />
            <LogoutButton />
          </div>
        </motion.div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="pl-80 pr-12 py-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex justify-between items-end"
        >
          <div>
            <h2 className="text-sm font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest">Grading Queue</h2>
            <h1 className="text-5xl font-black tracking-tight dark:text-white mt-1">Assignments</h1>
          </div>
          <div className="flex bg-white/80 dark:bg-zinc-900/80 p-2 rounded-2xl border border-violet-100 dark:border-zinc-800/60 shadow-sm backdrop-blur-sm">
            <div className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-xs font-black tracking-widest">Pending</div>
            <div className="px-4 py-2 text-slate-400 dark:text-slate-500 text-xs font-black tracking-widest">Flagged</div>
          </div>
        </motion.div>

        {/* Grading Queue Table */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-[3rem] p-10 border border-violet-50 dark:border-zinc-800/60"
        >
          <div className="space-y-4">
            <QueueItem 
              student="Marcus Wright" 
              submission="Thesis_Draft_V2.pdf" 
              time="2h ago" 
              priority="High" 
              setSelectedSubmission={setSelectedSubmission}
            />
            <QueueItem 
              student="Elena Rodriguez" 
              submission="Case_Study_Analysis.docx" 
              time="5h ago" 
              priority="Medium" 
              setSelectedSubmission={setSelectedSubmission}
            />
            <QueueItem 
              student="Kevin Park" 
              submission="Final_Project_Submission.pdf" 
              time="1d ago" 
              priority="Low" 
              setSelectedSubmission={setSelectedSubmission}
            />
          </div>
        </motion.section>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8"
        >
          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-violet-100 dark:border-zinc-800/60">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-violet-100 dark:bg-violet-500/20 rounded-xl flex items-center justify-center">
                <FileText className="text-violet-600 dark:text-violet-400" size={20} />
              </div>
              <span className="text-xs font-black text-slate-400 dark:text-slate-500 tracking-widest">TOTAL</span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">12</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Submissions</div>
          </div>

          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-violet-100 dark:border-zinc-800/60">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={20} />
              </div>
              <span className="text-xs font-black text-slate-400 dark:text-slate-500 tracking-widest">COMPLETED</span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">8</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Graded</div>
          </div>

          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-violet-100 dark:border-zinc-800/60">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-xl flex items-center justify-center">
                <Clock className="text-amber-600 dark:text-amber-400" size={20} />
              </div>
              <span className="text-xs font-black text-slate-400 dark:text-slate-500 tracking-widest">AVERAGE TIME</span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">12m</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Per submission</div>
          </div>

          <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-violet-100 dark:border-zinc-800/60">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-rose-100 dark:bg-rose-500/20 rounded-xl flex items-center justify-center">
                <Flag className="text-rose-600 dark:text-rose-400" size={20} />
              </div>
              <span className="text-xs font-black text-slate-400 dark:text-slate-500 tracking-widest">FLAGGED</span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">1</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Needs review</div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

// --- Specialized Grader Components ---

const GraderNavItem = ({ icon: Icon, label, count, active = false }: any) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`flex items-center justify-between px-4 py-4 rounded-2xl cursor-pointer transition-all ${
      active ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-200/50 dark:shadow-none' : 'text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50'
    }`}
  >
    <div className="flex items-center gap-4">
      <Icon size={20} />
      <span className="font-black text-sm tracking-tight">{label}</span>
    </div>
    {count && <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${active ? 'bg-white/20' : 'bg-violet-100 text-violet-600 dark:text-violet-400'}`}>{count}</span>}
  </motion.div>
);

const QueueItem = ({ student, submission, time, priority, setSelectedSubmission }: any) => (
  <motion.div 
    whileHover={{ x: 10 }}
    className="group flex items-center justify-between p-6 rounded-[2rem] bg-white/80 dark:bg-zinc-900/80 border border-transparent hover:border-violet-200 dark:hover:border-violet-500/30 transition-all cursor-pointer shadow-sm"
  >
    <div className="flex items-center gap-6">
      <div className="w-14 h-14 bg-violet-50 dark:bg-violet-500/10 rounded-2xl flex items-center justify-center text-violet-600 dark:text-violet-400 shadow-lg">
        <FileText size={24} />
      </div>
      <div>
        <h4 className="font-black text-lg tracking-tight dark:text-white">{student}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{submission} • <span className="text-violet-500 dark:text-violet-400">{time}</span></p>
      </div>
    </div>
    
    <div className="flex items-center gap-8">
      <div className="text-right hidden md:block">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Priority</p>
        <span className={`text-xs font-black tracking-tight ${priority === 'High' ? 'text-rose-500 dark:text-rose-400' : priority === 'Medium' ? 'text-amber-500 dark:text-amber-400' : 'text-emerald-500 dark:text-emerald-400'}`}>
          {priority}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <button className="w-10 h-10 bg-slate-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-500/20 dark:hover:text-violet-300 transition-all">
            <Eye size={18} />
          </button>
          <button className="w-10 h-10 bg-slate-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-500/20 dark:hover:text-violet-300 transition-all">
            <Edit3 size={18} />
          </button>
        </div>
        <div className="w-12 h-12 rounded-full border border-slate-100 dark:border-zinc-800 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-indigo-600 group-hover:text-white transition-all">
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  </motion.div>
);