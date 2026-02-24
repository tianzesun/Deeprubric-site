"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, Users, Brain, Sparkles, 
  Terminal, ShieldCheck, Lock, Globe, Database,
  Mail, MessageSquare, CheckCircle2, BarChart3,
  Clock, Award, GraduationCap, FileCheck, Zap,
  Timer, Target, BookOpen, TrendingUp, Play,
  Quote, Star, ChevronRight, X, AlertCircle
} from 'lucide-react';
import { FeatureCard } from '../components/FeatureCard';
import { ContactForm } from '../components/ContactForm';
import { useTerminalLogs } from '../hooks/useTerminalLogs';

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const aiLog = useTerminalLogs();

  const words = ["Grading", "Assessment", "Evaluation"];
  
  useEffect(() => {
    const wordInterval = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 3000);
    return () => clearInterval(wordInterval);
  }, []);

  const stats = [
    { value: "85%", label: "Time Saved", description: "On routine grading tasks" },
    { value: "98%", label: "Accuracy Rate", description: "Consistent with expert evaluators" },
    { value: "500+", label: "Institutions", description: "Worldwide trust DeepRubric" },
    { value: "2M+", label: "Assignments", description: "Processed monthly" },
  ];

  const painPoints = [
    {
      icon: <Timer className="w-8 h-8" />,
      title: "Grading Takes Forever",
      description: "Educators spend 10+ hours weekly on grading—time that could be spent teaching, mentoring, or developing curriculum."
    },
    {
      icon: <AlertCircle className="w-8 h-8" />,
      title: "Inconsistent Evaluation",
      description: "Human grading varies based on fatigue, time of day, and implicit biases. Students deserve fair, consistent assessment."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Limited Feedback Depth",
      description: "With tight deadlines, detailed feedback becomes impossible. Students get a grade but miss the learning opportunity."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Scaling Challenges",
      description: "As class sizes grow, maintaining quality assessment becomes unsustainable without sacrificing educator wellbeing."
    }
  ];

  const solutions = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Efficiency",
      description: "Cut grading time by 85%. Our AI handles initial assessment while you focus on high-value feedback and instruction."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Consistent & Fair",
      description: "Every submission evaluated against the same rubric criteria. No fatigue, no bias—just consistent, objective assessment."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Rich, Actionable Feedback",
      description: "Generate detailed, personalized feedback for every student. Help them understand not just what, but why and how to improve."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Scale Without Compromise",
      description: "Handle 30 or 300 students with the same care and attention. Grow your program without growing your workload."
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Upload Your Rubric",
      description: "Define your assessment criteria using our intuitive rubric builder or import existing standards.",
      icon: <FileCheck className="w-6 h-6" />
    },
    {
      step: "02",
      title: "Submit Assignments",
      description: "Students submit work through the platform or integrate with your existing LMS.",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      step: "03",
      title: "AI Initial Review",
      description: "Our AI analyzes each submission against your rubric, providing scores and feedback suggestions.",
      icon: <Brain className="w-6 h-6" />
    },
    {
      step: "04",
      title: "Educator Oversight",
      description: "Review, adjust, and approve. You maintain full control—AI assists, you decide.",
      icon: <GraduationCap className="w-6 h-6" />
    }
  ];

  const testimonials = [
    {
      quote: "DeepRubric has transformed how I teach. I spend 60% less time grading and 100% more time engaging with my students.",
      author: "Dr. Sarah Chen",
      role: "Professor of Computer Science",
      institution: "Stanford University",
      rating: 5
    },
    {
      quote: "The consistency of feedback has dramatically improved student satisfaction. They finally understand why they received their grade.",
      author: "Prof. Michael Rodriguez",
      role: "Department Chair, English",
      institution: "UCLA",
      rating: 5
    },
    {
      quote: "We scaled our online program from 500 to 2,000 students without hiring additional graders. The ROI is undeniable.",
      author: "Dr. Emily Watson",
      role: "Director of Online Learning",
      institution: "University of Michigan",
      rating: 5
    }
  ];

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced language models trained on academic standards provide consistent, fair evaluation across all submissions."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Human Oversight",
      description: "Educators maintain full control with built-in review workflows, ensuring AI assists rather than replaces professional judgment."
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Customizable Rubrics",
      description: "Create and adapt assessment criteria that align with your curriculum, learning objectives, and institutional standards."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Actionable Analytics",
      description: "Gain insights into student performance patterns, identify learning gaps, and track progress over time."
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-slate-950">
      {/* --- HERO SECTION --- */}
      <main className="flex-grow">
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-950 dark:to-teal-950/30 -z-10" />
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-900 text-sky-700 dark:text-sky-400 text-sm font-medium mb-8"
              >
                <GraduationCap size={16} />
                <span>Built for Educators, by Educators</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
              >
                Stop Grading.
                <br />
                <span className="relative inline-block h-[1.2em]">
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={words[index]} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -20 }} 
                      transition={{ duration: 0.5 }}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-600 absolute left-0 right-0"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-slate-600 dark:text-slate-400"> Start Teaching.</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                DeepRubric gives you <strong>85% of your grading time back</strong> while delivering 
                <strong> more consistent, detailed feedback</strong> to every student. 
                AI handles the tedious work—you focus on what matters: teaching.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link 
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30"
                >
                  Get Your Time Back — Free Demo
                  <ArrowRight size={18} />
                </Link>
                <Link 
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-semibold transition-all"
                >
                  <Play size={18} />
                  See How It Works
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- PAIN POINTS SECTION --- */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Sound Familiar?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                These are the challenges educators face every single day. You're not alone.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {painPoints.map((point, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/30 hover:border-red-200 dark:hover:border-red-800/50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {point.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SOLUTION SECTION --- */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6">
                <CheckCircle2 size={16} />
                <span>The Solution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                DeepRubric Changes Everything
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                We built DeepRubric to solve these exact problems—so you can focus on education, not administration.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {solutions.map((solution, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-5 p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-slate-900 border border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    {solution.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- STATS SECTION --- */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- HOW IT WORKS SECTION --- */}
        <section id="how-it-works" className="py-20 md:py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
              >
                How It Works
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-slate-600 dark:text-slate-400"
              >
                Four simple steps to transform your assessment workflow
              </motion.p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {howItWorks.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Connector line */}
                  {i < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] right-0 h-0.5 bg-gradient-to-r from-indigo-200 to-transparent dark:from-indigo-800" />
                  )}
                  
                  <div className="text-center">
                    <div className="relative inline-flex mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- TESTIMONIALS SECTION --- */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
              >
                Trusted by Educators Worldwide
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-slate-600 dark:text-slate-400"
              >
                See what educators are saying about DeepRubric
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-indigo-200 dark:text-indigo-800 mb-3" />
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400">
                      {testimonial.institution}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
              >
                Built for Modern Education
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-slate-600 dark:text-slate-400"
              >
                A comprehensive platform designed by educators, for educators—combining the efficiency of AI with the nuance of human judgment.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SECURITY & TRUST SECTION --- */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-4">
                  <ShieldCheck size={18} /> Enterprise Security
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                  Your Data, Protected
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  We understand the sensitivity of academic data. DeepRubric employs industry-leading 
                  security measures to ensure your institution's information remains private and protected.
                </p>
                <ul className="space-y-3">
                  {[
                    "End-to-end encryption for all data in transit and at rest",
                    "SOC 2 Type II compliant infrastructure",
                    "GDPR and FERPA aligned data handling",
                    "Role-based access controls and audit logs"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                <FeatureCard title="AES-256" description="Encryption" iconType="lock" index={0} />
                <FeatureCard title="SOC 2" description="Compliant" iconType="shield" index={1} />
                <FeatureCard title="GDPR" description="Ready" iconType="globe" index={2} />
                <FeatureCard title="FERPA" description="Aligned" iconType="server" index={3} />
              </div>
            </div>
          </div>
        </section>

        {/* --- LIVE LOGS SECTION --- */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                See It In Action
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Watch as DeepRubric processes submissions with AI-powered analysis
              </p>
            </div>
            
            <div className="bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-2xl">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm font-medium text-slate-400 ml-2">Processing Log</span>
              </div>
              <div className="space-y-2 font-mono text-sm">
                <AnimatePresence mode="popLayout">
                  {aiLog.map((log, i) => (
                    <motion.div 
                      key={log + i} 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 - i * 0.15 }} 
                      className="text-emerald-400 flex gap-3"
                    >
                      <span className="text-slate-600 select-none">$</span> 
                      <span className="text-slate-300">{log}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-sky-600 to-teal-600">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to Transform Your Grading?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto"
            >
              Join 500+ institutions that have reclaimed their time with DeepRubric. 
              Get started with a personalized demo today.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl font-semibold transition-all shadow-lg"
              >
                Request Your Free Demo
                <ArrowRight size={18} />
              </Link>
              <Link 
                href="/features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-500/30 hover:bg-indigo-500/50 text-white rounded-xl font-semibold transition-all border border-white/20"
              >
                Explore All Features
              </Link>
            </motion.div>
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="py-20 md:py-28 px-6 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Info Side */}
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6"
                >
                  <MessageSquare size={16} /> Get Started
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6"
                >
                  Transform Assessment at Your Institution
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed"
                >
                  Schedule a personalized demo to see how DeepRubric can streamline your assessment 
                  workflow while maintaining academic integrity and educator control.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Email us at</p>
                      <p className="font-semibold text-slate-900 dark:text-white">contact@deeprubric.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Response time</p>
                      <p className="font-semibold text-slate-900 dark:text-white">Within 24 hours</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Form Side */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 rounded-3xl blur-2xl -z-10" />
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-10 rounded-2xl shadow-xl">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                    Request a Demo
                  </h3>
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
<task_progress>- [x] Start the development server
- [x] Analyze current homepage content
- [x] Understand the project's core value proposition
- [ ] Redesign homepage to clearly communicate value
- [ ] Test the changes</task_progress>