"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            No per student fees. No hidden costs. Pay only for what you use.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Individual Instructor
            </h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">$12</span>
              <span className="text-slate-500 dark:text-slate-400"> / month</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              {[
                "Unlimited courses",
                "Unlimited students",
                "Unlimited submissions",
                "Full AI grading and feedback",
                "Academic integrity detection",
                "Course analytics and insights",
                "Email support"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              href="/#contact"
              className="block w-full text-center py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all"
            >
              Start Free Trial
            </Link>
            
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3">
              No credit card required. 30 day money back guarantee.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-slate-900 border-2 border-emerald-500 rounded-2xl p-8 relative"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full">
              Recommended
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Department / Institution
            </h3>
            <div className="mb-6">
              <span className="text-slate-500 dark:text-slate-400">Custom pricing for </span>
              <span className="text-4xl font-bold text-slate-900 dark:text-white">teams</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              {[
                "Everything in Individual",
                "Unlimited instructor accounts",
                "Administrative dashboard",
                "Institutional analytics",
                "SSO integration",
                "Dedicated success manager",
                "Priority phone support",
                "Custom contract terms"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              href="/#contact"
              className="block w-full text-center py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all"
            >
              Contact Sales
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 max-w-2xl mx-auto text-center"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            30 Day Money Back Guarantee
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            If you are not completely satisfied with DeepRubric for any reason within your first 30 days, 
            we will refund your payment in full. No questions asked.
          </p>
          <Link 
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all"
          >
            Start Your Free Trial
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}