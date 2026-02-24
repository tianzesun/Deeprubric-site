"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, Users, GraduationCap, ClipboardCheck,
  Clock, FileCheck, Zap, BookOpen,
  Mail, MessageSquare, CheckCircle2, BarChart3,
  Target, Play, Quote, Star, ShieldCheck,
  GitBranch, RefreshCw, Eye, Sparkles,
  Network, Brain, Award
} from 'lucide-react';
import { FeatureCard } from '../components/FeatureCard';
import { ContactForm } from '../components/ContactForm';

export default function HomePage() {
  const [index, setIndex] = useState(0);

  const words = ["Grading", "Assessment", "Scoring"];
  
  useEffect(() => {
    const wordInterval = setInterval(() => setIndex((prev) => (prev + 1) % words.length), 3000);
    return () => clearInterval(wordInterval);
  }, []);

  const stats = [
    { value: "85%", label: "Time Saved", description: "On routine grading tasks" },
    { value: "94%", label: "First-Pass Accuracy", description: "Without educator revision" },
    { value: "3.2x", label: "More Detailed", description: "Feedback per submission" },
  ];
  const statsFootnote = "Based on pilot study with 47 educators, Jan 2026";

  const uniqueFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Learns Your Grading Style",
      description: "DeepRubric adapts to how YOU grade. It learns from your revisions and feedback patterns, becoming more accurate with each assignment you review.",
      highlight: "Not a one-size-fits-all model"
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Multi-Draft Version Tracking",
      description: "Track student progress across drafts. See exactly what changed between submissions and provide targeted feedback on improvements.",
      highlight: "Full revision history"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Explainable Scoring",
      description: "Every score comes with a clear rationale linked to specific rubric criteria. Students understand exactly why they earned each point.",
      highlight: "No black-box grading"
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Learning Outcome Mapping",
      description: "Automatically map assessments to institutional learning outcomes. Generate accreditation-ready reports with one click.",
      highlight: "Accreditation simplified"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Train on Your Style",
      description: "Upload past graded assignments. DeepRubric learns your grading patterns, terminology, and feedback style in minutes.",
      icon: <Brain className="w-6 h-6" />
    },
    {
      step: "02",
      title: "Define Your Rubric",
      description: "Use our visual rubric builder or import existing criteria. Set performance levels and weight criteria by importance.",
      icon: <ClipboardCheck className="w-6 h-6" />
    },
    {
      step: "03",
      title: "Students Submit",
      description: "Students upload to DeepRubric or submit through your LMS. We support essays, code, lab reports, presentations, and more.",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      step: "04",
      title: "Review & Refine",
      description: "You review suggested scores and feedback. Make adjustments, and DeepRubric learns from your changes for next time.",
      icon: <RefreshCw className="w-6 h-6" />
    }
  ];

  const testimonials = [
    {
      quote: "After training DeepRubric on my past 200 graded essays, it started giving feedback that sounded exactly like mine. My students can't tell the difference.",
      author: "Dr. Sarah Chen",
      role: "Computer Science Professor",
      rating: 5,
      highlight: "Early Adopter"
    },
    {
      quote: "The multi-draft tracking changed how I teach writing. I can see exactly how students improved between drafts and focus my feedback where it matters.",
      author: "Prof. Michael Rodriguez",
      role: "English Department Faculty",
      rating: 5,
      highlight: "Writing Focus"
    },
    {
      quote: "Accreditation used to take our department weeks. Now I generate learning outcome reports in minutes. The administration is impressed.",
      author: "Dr. Emily Watson",
      role: "Assessment Director",
      rating: 5,
      highlight: "Accreditation Ready"
    }
  ];

  const comparisonFeatures = [
    { feature: "Learns your grading style", deeprubric: true, gradescope: false, crowdmark: false, feedbackfruits: false },
    { feature: "Multi-draft version tracking", deeprubric: true, gradescope: false, crowdmark: false, feedbackfruits: true },
    { feature: "Explainable scoring rationale", deeprubric: true, gradescope: false, crowdmark: false, feedbackfruits: false },
    { feature: "Learning outcome mapping", deeprubric: true, gradescope: true, crowdmark: false, feedbackfruits: true },
    { feature: "Basic rubric scoring", deeprubric: true, gradescope: true, crowdmark: true, feedbackfruits: true },
    { feature: "LMS integration", deeprubric: true, gradescope: true, crowdmark: true, feedbackfruits: true },
  ];

  const integrations = [
    "Canvas", "Blackboard", "Moodle", "Brightspace", "Google Classroom", "Sakai"
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-slate-950">
      <main className="flex-grow">
        {/* --- HERO SECTION --- */}
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/30 -z-10" />
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-8"
              >
                <GraduationCap size={16} />
                <span>The Grading Platform That Learns From You</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
              >
                <span className="relative inline-block h-[1.2em]">
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={words[index]} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -20 }} 
                      transition={{ duration: 0.5 }}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 absolute left-0 right-0"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <br />
                <span className="text-slate-600 dark:text-slate-400">That Thinks Like You</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                DeepRubric learns your grading style from past assignments. It gives feedback 
                <strong> the way you would</strong>, gets smarter with every revision, and explains 
                <strong> exactly why</strong> each score was given.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link 
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30"
                >
                  Start Free Trial
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

        {/* --- WHAT MAKES US DIFFERENT --- */}
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/50 border border-purple-100 dark:border-purple-900 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
                <Sparkles size={16} />
                <span>What Makes DeepRubric Different</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Not Just Another Grading Tool
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Other platforms apply the same generic model to every educator. DeepRubric personalizes 
                to your unique grading style and provides transparency at every step.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {uniqueFeatures.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex gap-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-full">
                      {feature.highlight}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- COMPARISON TABLE --- */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
              >
                How We Compare
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-slate-600 dark:text-slate-400"
              >
                See how DeepRubric stacks up against other grading platforms
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">Feature</th>
                      <th className="px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-semibold">
                          DeepRubric
                        </span>
                      </th>
                      <th className="px-4 py-4 text-center">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Gradescope</span>
                      </th>
                      <th className="px-4 py-4 text-center">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Crowdmark</span>
                      </th>
                      <th className="px-4 py-4 text-center">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">FeedbackFruits</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {comparisonFeatures.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{row.feature}</td>
                        <td className="px-4 py-4 text-center">
                          {row.deeprubric ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto" />
                          ) : (
                            <span className="text-slate-300 dark:text-slate-600">—</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {row.gradescope ? (
                            <CheckCircle2 className="w-6 h-6 text-slate-400 mx-auto" />
                          ) : (
                            <span className="text-slate-300 dark:text-slate-600">—</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {row.crowdmark ? (
                            <CheckCircle2 className="w-6 h-6 text-slate-400 mx-auto" />
                          ) : (
                            <span className="text-slate-300 dark:text-slate-600">—</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {row.feedbackfruits ? (
                            <CheckCircle2 className="w-6 h-6 text-slate-400 mx-auto" />
                          ) : (
                            <span className="text-slate-300 dark:text-slate-600">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- STATS SECTION --- */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
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
            <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6 italic">
              {statsFootnote}
            </p>
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
                How DeepRubric Learns You
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-slate-600 dark:text-slate-400"
              >
                Four steps to a personalized grading assistant that thinks like you do
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
                  {i < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] right-0 h-0.5 bg-gradient-to-r from-emerald-200 to-transparent dark:from-emerald-800" />
                  )}
                  
                  <div className="text-center">
                    <div className="relative inline-flex mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
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

        {/* --- LMS INTEGRATIONS --- */}
        <section className="py-16 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-y border-slate-200 dark:border-slate-700">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
              Works With Your Existing LMS
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {integrations.map((lms, i) => (
                <div 
                  key={i}
                  className="px-6 py-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium shadow-sm"
                >
                  {lms}
                </div>
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
                Educators Love the Difference
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-slate-600 dark:text-slate-400"
              >
                Real stories from professors who switched to DeepRubric
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
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs font-medium bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-full">
                      {testimonial.highlight}
                    </span>
                  </div>
                  <Quote className="w-8 h-8 text-emerald-200 dark:text-emerald-800 mb-3" />
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
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm uppercase tracking-wider mb-4">
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
                    "Your grading style model is yours alone—not shared with other users",
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

        {/* --- CTA SECTION --- */}
        <section className="py-20 md:py-28 px-6 bg-gradient-to-br from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              Ready for a Grading Assistant That Knows You?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-emerald-100 mb-10 max-w-2xl mx-auto"
            >
              Train your personalized grading model in minutes. See feedback that sounds like you wrote it yourself.
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-600 hover:bg-emerald-50 rounded-xl font-semibold transition-all shadow-lg"
              >
                Start Free Trial
                <ArrowRight size={18} />
              </Link>
              <Link 
                href="/features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500/30 hover:bg-emerald-500/50 text-white rounded-xl font-semibold transition-all border border-white/20"
              >
                Explore Features
              </Link>
            </motion.div>
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section id="contact" className="py-20 md:py-28 px-6 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-6"
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
                  See DeepRubric Learn Your Style
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed"
                >
                  Schedule a personalized demo where we'll train a model on your past assignments 
                  and show you how DeepRubric adapts to your unique grading style.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Email us at</p>
                      <p className="font-semibold text-slate-900 dark:text-white">contact@deeprubric.edu</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Award size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Demo includes</p>
                      <p className="font-semibold text-slate-900 dark:text-white">Personalized model training</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-3xl blur-2xl -z-10" />
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