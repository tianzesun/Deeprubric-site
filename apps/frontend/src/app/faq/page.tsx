"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How accurate is the AI grading?",
    answer: "DeepRubric achieves 94% first-pass accuracy against human professor grading. You always have final approval over every score and can adjust any suggestion. The AI gets better over time as you review and adjust scores."
  },
  {
    question: "Does this work with my existing LMS?",
    answer: "Yes. DeepRubric integrates natively with Canvas, Blackboard, Moodle, Brightspace, Google Classroom and Sakai. Assignments sync automatically, grades are pushed back seamlessly."
  },
  {
    question: "Will student submissions be used to train AI?",
    answer: "Absolutely not. This is our most important promise. Student submissions are never used for model training. They are encrypted, stored securely, and permanently deleted 12 months after your course ends."
  },
  {
    question: "How much does it cost?",
    answer: "$12 per month per instructor. Unlimited courses, unlimited students, unlimited submissions. Your first 100 submissions are free, and paid plans come with a 30 day money back guarantee. Bulk pricing available for departments and institutions. No per student fees ever."
  },
  {
    question: "Should I tell students that AI helps with grading?",
    answer: "Yes, and we make it easy. DeepRubric drafts feedback specific to each submission, not generic templates, but you review and approve every comment and score before students see it. Many institutions require disclosure of AI use in assessment, so we recommend telling students how DeepRubric is used in your course and following your institution's policy."
  },
  {
    question: "What types of assignments work?",
    answer: "Essays, reports, lab journals, code assignments, presentations, math problems, and any open response format. We support PDF, Word, Google Docs, Jupyter Notebooks, and plain text."
  },
  {
    question: "Is this FERPA compliant?",
    answer: "Yes. DeepRubric is fully FERPA compliant, SOC 2 Type II audited, and GDPR ready. We sign data processing agreements for institutions that require them."
  },
  {
    question: "Can I try this without talking to sales?",
    answer: "Yes. Sign up for free, use it for your next assignment completely free with up to 100 submissions. No demo required, no credit card required."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Everything you need to know about DeepRubric
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
            >
              <button
                id={`faq-question-${i}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
              >
                <span className="font-semibold text-slate-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  aria-hidden="true"
                  className="flex-shrink-0 text-slate-400"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              
              <motion.div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                inert={openIndex !== i}
                initial={false}
                animate={{ 
                  height: openIndex === i ? 'auto' : 0,
                  opacity: openIndex === i ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}