"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRight, GraduationCap, ClipboardCheck,
  BookOpen, Mail, MessageSquare, CheckCircle2,
  Play, ShieldCheck,
  GitBranch, RefreshCw, Eye, Sparkles,
  Network, Brain, Award, AlertTriangle,
  FileText, Users, Clock
} from 'lucide-react';
import { FeatureCard } from '../components/FeatureCard';
import { ContactForm } from '../components/ContactForm';

export default function HomePage() {

  const stats = [
    { value: "85%", label: "Time Saved", description: "On routine grading tasks" },
    { value: "94%", label: "First-Pass Accuracy", description: "Against rubric criteria" },
    { value: "3.2x", label: "More Detailed", description: "Feedback per submission" },
  ];
  const statsFootnote = "Based on pilot study with 47 educators, Jan 2026";

  const uniqueFeatures = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Suggested Scores with Rationale",
      description: "DeepRubric evaluates each submission against your rubric and suggests a score — with a clear written explanation of why, tied to specific criteria. You stay in control; AI does the heavy lifting.",
      highlight: "Every score is explained"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Auto-Generated Student Feedback",
      description: "Students receive detailed, constructive written feedback on every submission — not just a number. DeepRubric drafts it instantly; you review, edit, and send.",
      highlight: "Better feedback, less effort"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Academic Integrity Detection",
      description: "Catch AI-generated content, plagiarism between students, and suspicious similarity to online sources — all in one comprehensive integrity report per submission.",
      highlight: "AI + plagiarism detection"
    },
    {
      icon: <GitBranch className="w-8 h-8" />,
      title: "Multi-Draft Version Tracking",
      description: "Track student progress across drafts. See exactly what changed between submissions and provide targeted feedback on specific improvements.",
      highlight: "Full revision history"
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Learning Outcome Mapping",
      description: "Automatically map assessments to institutional learning outcomes. Generate accreditation-ready reports with one click — no manual compilation.",
      highlight: "Accreditation simplified"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Transparent, Auditable Grading",
      description: "Every score links back to a rubric criterion and a written rationale. Students understand exactly why they earned each point. No black-box decisions.",
      highlight: "No black-box grading"
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Define Your Rubric",
      description: "Use our visual rubric builder or import existing criteria. Set performance levels and weight criteria by importance.",
      icon: <ClipboardCheck className="w-6 h-6" />
    },
    {
      step: "02",
      title: "Students Submit",
      description: "Students upload directly to DeepRubric or submit through your LMS. We support essays, code, lab reports, presentations, and more.",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      step: "03",
      title: "AI Grades & Flags",
      description: "DeepRubric scores each submission against your rubric, generates written feedback, and runs academic integrity checks — in seconds.",
      icon: <Brain className="w-6 h-6" />
    },
    {
      step: "04",
      title: "You Review & Publish",
      description: "Review AI-suggested scores and feedback, make any adjustments, then publish to students with one click.",
      icon: <RefreshCw className="w-6 h-6" />
    }
  ];

  const useCases = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Essay Grading at Scale",
      description: "English instructor with 150 students per semester. Previously spent 6 hours per grading session. Now spends 45 minutes reviewing AI suggestions.",
      metric: "87% time reduction"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "AI Plagiarism Detection",
      description: "Computer science TA noticed suspicious code patterns. DeepRubric's integrity check flagged 12 submissions with AI-generated content that matched no existing database.",
      metric: "12 incidents caught"
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Accreditation Reporting",
      description: "Nursing program needed to map 400+ student assignments to 23 learning outcomes for accreditation. Generated complete report in under an hour.",
      metric: "3 weeks → 1 hour"
    }
  ];

  const comparisonFeatures = [
    { feature: "AI-suggested scores with rationale",     deeprubric: true,  gradescope: false, crowdmark: false, feedbackfruits: false },
    { feature: "Auto-generated written feedback",        deeprubric: true,  gradescope: false, crowdmark: false, feedbackfruits: false },
    { feature: "AI-generated content detection",        deeprubric: true,  gradescope: false, crowdmark: false, feedbackfruits: false },
    { feature: "Plagiarism & similarity detection",      deeprubric: true,  gradescope: false, crowdmark: false, feedbackfruits: true  },
    { feature: "Multi-draft version tracking",           deeprubric: true,  gradescope: false, crowdmark: false, feedbackfruits: true  },
    { feature: "Learning outcome mapping",               deeprubric: true,  gradescope: true,  crowdmark: false, feedbackfruits: true  },
    { feature: "Basic rubric scoring",                   deeprubric: true,  gradescope: true,  crowdmark: true,  feedbackfruits: true  },
    { feature: "LMS integration",                        deeprubric: true,  gradescope: true,  crowdmark: true,  feedbackfruits: true  },
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
                <span>AI-Powered Grading for Modern Educators</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight"
              >
                <span className="text-emerald-600 dark:text-emerald-400">AI Grades Your Papers.</span>
                <br />
                <span className="text-slate-700 dark:text-slate-300">You Review the Results.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                DeepRubric grades submissions against your rubric, writes detailed student feedback, 
                and detects AI-generated content and plagiarism — all before you open the first paper.
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
                Gradescope and Crowdmark digitize grading. DeepRubric automates it — with AI scoring, 
                written feedback, and academic integrity built in from the start.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {uniqueFeatures.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex flex-col gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors group"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3 text-sm">
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
                        {(['deeprubric', 'gradescope', 'crowdmark', 'feedbackfruits'] as const).map((platform) => (
                          <td key={platform} className="px-4 py-4 text-center">
                            {row[platform] ? (
                              <CheckCircle2 className={`w-6 h-6 mx-auto ${platform === 'deeprubric' ? 'text-emerald-500' : 'text-slate-400'}`} />
                            ) : (
                              <span className="text-slate-300 dark:text-slate-600">—</span>
                            )}
                          </td>
                        ))}
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
                How DeepRubric Works
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-slate-600 dark:text-slate-400"
              >
                From rubric to published grades in four simple steps
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

        {/* --- USE CASES SECTION --- */}
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
                Real Problems, Solved
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-slate-600 dark:text-slate-400"
              >
                How educators are actually using DeepRubric
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {useCases.map((useCase, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      {useCase.icon}
                    </div>
                    <span className="px-3 py-1 text-xs font-bold bg-emerald-600 text-white rounded-full">
                      {useCase.metric}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {useCase.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                These examples are based on common educator workflows. Your results may vary based on course size and rubric complexity.
              </p>
            </motion.div>
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
                    "Student submissions are never used to train AI models",
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
              Grade Smarter. Catch Cheating. Give Better Feedback.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-emerald-100 mb-10 max-w-2xl mx-auto"
            >
              Set up your rubric, let AI do the grading, and publish results in a fraction of the time.
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
                  See DeepRubric in Action
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed"
                >
                  Schedule a personalized demo. Bring a real assignment — we'll run it through 
                  DeepRubric live and show you AI scoring, feedback generation, and integrity 
                  detection in action.
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
                      <p className="font-semibold text-slate-900 dark:text-white">contact@deeprubric.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Award size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Demo includes</p>
                      <p className="font-semibold text-slate-900 dark:text-white">Live AI grading on your own assignment</p>
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