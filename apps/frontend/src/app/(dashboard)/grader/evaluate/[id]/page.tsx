"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Maximize2, 
  MessageSquarePlus, 
  CheckCircle, 
  Info,
  Save,
  Eye,
  Edit,
  Flag
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../../../context/ThemeContext';

export default function GradingView() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock Rubric Data
  const rubric = [
    { id: 'c1', title: 'Critical Thinking', max: 40, desc: 'Evidence of analytical reasoning and problem-solving approach' },
    { id: 'c2', title: 'Technical Accuracy', max: 30, desc: 'Correctness of the provided solution and technical implementation' },
    { id: 'c3', title: 'Structure & Flow', max: 20, desc: 'Logical organization of ideas and coherent argumentation' },
    { id: 'c4', title: 'Citations', max: 10, desc: 'Proper APA/MLA formatting and academic integrity' },
  ];

  const handleScore = (id: string, val: number) => {
    setScores(prev => ({ ...prev, [id]: val }));
  };

  const handleFeedback = (id: string, text: string) => {
    setFeedback(prev => ({ ...prev, [id]: text }));
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxScore = rubric.reduce((acc, item) => acc + item.max, 0);

  return (
    <div className="h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-50 dark:from-slate-950 dark:via-violet-950 dark:to-indigo-950 transition-colors duration-1000">
      
      {/* --- DYNAMIC BACKGROUND GLOWS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-500/10 dark:bg-violet-500/5 blur-[120px] animate-morph" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] animate-morph" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-r from-violet-400/5 to-indigo-400/5 rounded-full blur-[150px] animate-pulse" />

      {/* --- TOP BAR --- */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-20 border-b border-violet-100 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl flex items-center justify-between px-8 z-50 shadow-sm"
      >
        <div className="flex items-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            onClick={() => router.back()}
            className="p-3 hover:bg-violet-50 dark:hover:bg-zinc-800/60 rounded-2xl transition-all text-violet-600 dark:text-violet-400 shadow-sm"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <div>
            <h1 className="font-black text-xl tracking-tight dark:text-white">Marcus Wright — Thesis Draft</h1>
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Advanced Algorithms • CS501</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Current Grade</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-violet-600 dark:text-violet-400">{totalScore}</span>
              <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">/ {maxScore}</span>
            </div>
            <div className="w-32 h-1 bg-slate-200 dark:bg-zinc-700/50 rounded-full mt-2">
              <div 
                className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${(totalScore / maxScore) * 100}%` }}
              />
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-2xl font-black shadow-lg shadow-violet-200/50 dark:shadow-none transition-all flex items-center gap-3"
          >
            <Save size={20} />
            Submit Grade
          </motion.button>
        </div>
      </motion.header>

      {/* --- MAIN SPLIT VIEW --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: PDF/Document Viewer */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 bg-slate-50/50 dark:bg-zinc-900/50 relative overflow-hidden flex items-center justify-center p-8"
        >
          <div className="absolute top-4 right-4 flex gap-3 z-10">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-3 bg-white/90 dark:bg-zinc-900/90 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Maximize2 size={20} className="text-violet-600 dark:text-violet-400" />
            </motion.button>
          </div>
          
          {/* Mock PDF Document */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-4xl aspect-[1/1.414] bg-white shadow-2xl rounded-2xl p-12 overflow-y-auto border border-slate-100 dark:border-zinc-800/60"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Analysis of Distributed Systems</h2>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-black tracking-widest rounded-full">SUBMITTED</span>
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-black tracking-widest rounded-full">AI-SCANNED</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="mb-4 text-lg font-medium">This paper presents a comprehensive analysis of modern distributed systems architecture, focusing on scalability patterns and fault tolerance mechanisms in cloud-native environments.</p>
                
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Introduction</h3>
                <p className="mb-4">The proliferation of microservices and containerization has fundamentally changed how we architect software systems. Traditional monolithic applications are being replaced by distributed systems that offer superior scalability and maintainability.</p>
                
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Methodology</h3>
                <p className="mb-4">This analysis employs a comparative study of three major distributed system patterns: event-driven architecture, service mesh implementation, and serverless computing models. Each pattern is evaluated against performance, scalability, and operational complexity metrics.</p>
                
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Results</h3>
                <p className="mb-4">The findings indicate that event-driven architectures provide the best balance between performance and operational complexity, while serverless models excel in cost efficiency for variable workloads.</p>
              </div>
              
              {/* Highlighted sections for grading */}
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    className="p-6 bg-gradient-to-r from-violet-50/50 to-transparent border-l-4 border-violet-200 dark:border-violet-500/30 rounded-r-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-violet-600 dark:text-violet-400 tracking-widest">CRITICAL THINKING</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">Line 12-18</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 italic">"The analysis demonstrates a sophisticated understanding of distributed system trade-offs..."</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Interactive Rubric Sidebar */}
        <motion.aside 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-[480px] border-l border-violet-100 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm overflow-y-auto p-8 custom-scrollbar"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black tracking-tight dark:text-white">Assessment</h3>
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl"
            >
              <CheckCircle className="text-emerald-600 dark:text-emerald-400" size={24} />
            </motion.div>
          </div>

          <div className="space-y-6">
            {rubric.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-[2rem] border transition-all duration-500 ${
                  scores[item.id] !== undefined 
                    ? 'bg-gradient-to-br from-violet-50/80 to-indigo-50/80 border-violet-200 dark:border-violet-500/30 shadow-lg shadow-violet-200/30 dark:shadow-none' 
                    : 'bg-slate-50/50 dark:bg-zinc-800/40 border-slate-100 dark:border-zinc-700/50 hover:border-violet-200 dark:hover:border-violet-500/30'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-black text-lg tracking-tight dark:text-white">{item.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{item.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-violet-600 dark:text-violet-400">{scores[item.id] || 0}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">/ {item.max}</div>
                  </div>
                </div>
                
                {/* Score Input Slider/Buttons */}
                <div className="flex gap-4 items-center mb-4">
                  <input 
                    type="range"
                    min="0"
                    max={item.max}
                    value={scores[item.id] || 0}
                    onChange={(e) => handleScore(item.id, parseInt(e.target.value))}
                    className="flex-1 h-2 bg-slate-200 dark:bg-zinc-700 rounded-full accent-violet-600 dark:accent-violet-400 cursor-pointer"
                  />
                  <div className="flex gap-2">
                    {[0, item.max/4, item.max/2, (item.max*3)/4, item.max].map((val) => (
                      <motion.button
                        key={val}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleScore(item.id, val)}
                        className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${
                          scores[item.id] === val 
                            ? 'bg-violet-600 text-white shadow-lg shadow-violet-200/50 dark:shadow-none' 
                            : 'bg-slate-100 dark:bg-zinc-700/50 text-slate-600 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-500/20'
                        }`}
                      >
                        {val}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-200 dark:bg-zinc-700/50 rounded-full h-2 mb-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(scores[item.id] || 0) / item.max * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors"
                >
                  <MessageSquarePlus size={16} /> Add Feedback
                </motion.button>
                
                {/* Feedback Input */}
                {scores[item.id] !== undefined && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-4 bg-white/60 dark:bg-zinc-800/60 rounded-xl border border-slate-100 dark:border-zinc-700/50"
                  >
                    <textarea
                      placeholder="Enter detailed feedback..."
                      value={feedback[item.id] || ''}
                      onChange={(e) => handleFeedback(item.id, e.target.value)}
                      className="w-full bg-transparent border-none outline-none resize-none text-sm text-slate-600 dark:text-slate-300"
                      rows={3}
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* AI-Assisted Check */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 p-6 rounded-[2rem] bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl"
          >
             <div className="flex items-start gap-4">
               <motion.div 
                 animate={{ rotate: [0, 5, -5, 0] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="p-3 bg-white/20 rounded-xl"
               >
                 <Info size={24} />
               </motion.div>
               <div>
                 <p className="font-black text-lg tracking-tight">AI-Assisted Check</p>
                 <p className="text-sm opacity-90 mt-2">DeepRubric AI has scanned this document. No plagiarism detected. Critical thinking patterns identified and scored.</p>
                 <div className="flex gap-4 mt-4 text-xs font-black tracking-widest">
                   <span className="bg-white/20 px-3 py-1 rounded-full">✓ Plagiarism Check</span>
                   <span className="bg-white/20 px-3 py-1 rounded-full">✓ Pattern Analysis</span>
                   <span className="bg-white/20 px-3 py-1 rounded-full">✓ Quality Scan</span>
                 </div>
               </div>
             </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex gap-4"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="flex-1 p-4 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-100 dark:border-zinc-700/50 text-slate-600 dark:text-slate-300 font-black tracking-tight"
            >
              <div className="flex items-center justify-center gap-3">
                <Eye size={20} />
                <span>View Comments</span>
              </div>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="flex-1 p-4 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-100 dark:border-zinc-700/50 text-slate-600 dark:text-slate-300 font-black tracking-tight"
            >
              <div className="flex items-center justify-center gap-3">
                <Edit size={20} />
                <span>Edit Rubric</span>
              </div>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="flex-1 p-4 bg-rose-50 dark:bg-rose-500/20 rounded-xl border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 font-black tracking-tight"
            >
              <div className="flex items-center justify-center gap-3">
                <Flag size={20} />
                <span>Flag</span>
              </div>
            </motion.button>
          </motion.div>
        </motion.aside>
      </div>
    </div>
  );
}