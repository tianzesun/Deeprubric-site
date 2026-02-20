'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Brain, Users, Zap, Shield, BarChart3, Clock,
  Award, GraduationCap, FileText, Settings, CheckCircle2,
  ArrowRight, Sparkles
} from 'lucide-react';

const FeatureCard = ({ 
  title, 
  description, 
  icon,
  index = 0
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  index?: number;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 group"
    >
      <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
        {value}
      </div>
      <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
        {label}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400">{description}</div>
    </motion.div>
  );
};

export default function FeaturesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Evaluation",
      description: "Advanced language models analyze student submissions with nuanced understanding of context, subject matter, and learning objectives."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Human-in-the-Loop Workflow",
      description: "Educators review and approve AI suggestions, maintaining full control while benefiting from increased efficiency."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Rapid Assessment",
      description: "Process large volumes of submissions in a fraction of the time, with consistent quality across all evaluations."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bias Detection",
      description: "Built-in algorithms identify and flag potential biases, ensuring fair and equitable assessment for all students."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Comprehensive dashboards reveal insights into student progress, class trends, and curriculum effectiveness."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Flexible Integration",
      description: "Connect seamlessly with your existing LMS and institutional systems through robust APIs and standard protocols."
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-8"
            >
              <Sparkles size={16} />
              <span>Platform Features</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              A Smarter Way to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Assess Learning
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              DeepRubric combines the efficiency of artificial intelligence with the expertise 
              of educators, creating a powerful assessment platform that saves time while 
              maintaining academic rigor.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard
              label="Accuracy Rate"
              value="98%"
              description="Aligned with expert evaluators"
              index={0}
            />
            <StatCard
              label="Time Saved"
              value="85%"
              description="On routine assessment tasks"
              index={1}
            />
            <StatCard
              label="Response Time"
              value="<90s"
              description="Average per submission"
              index={2}
            />
            <StatCard
              label="Institutions"
              value="500+"
              description="Trust DeepRubric globally"
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* For Educators */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  For Educators
                </h2>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Intelligent Rubric Creation",
                    description: "Build assessment rubrics that align with your course objectives. Our AI suggests criteria based on your learning outcomes."
                  },
                  {
                    title: "Consistent Feedback",
                    description: "Deliver detailed, personalized feedback to every student with AI assistance that maintains your voice and standards."
                  },
                  {
                    title: "Progress Tracking",
                    description: "Monitor student development over time with intuitive dashboards and actionable insights."
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* For Institutions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/50 rounded-xl flex items-center justify-center text-violet-600 dark:text-violet-400">
                  <Award className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  For Institutions
                </h2>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Scalable Assessment",
                    description: "Handle growing enrollment without compromising evaluation quality or overburdening faculty."
                  },
                  {
                    title: "Data-Driven Insights",
                    description: "Gain institutional-level analytics on student performance, curriculum effectiveness, and resource allocation."
                  },
                  {
                    title: "Compliance Ready",
                    description: "Meet FERPA, GDPR, and institutional data governance requirements with built-in security measures."
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6"
          >
            Ready to Transform Your Assessment Workflow?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-slate-600 dark:text-slate-400 mb-8"
          >
            Join institutions worldwide that are saving time and improving assessment consistency with DeepRubric.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/25 hover:shadow-xl"
            >
              Request a Demo
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}