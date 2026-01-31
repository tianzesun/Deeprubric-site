'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, FileText, Cookie, Globe2, DatabaseBackup, Fingerprint, Users as UsersIcon, Video as VideoIcon, Network } from 'lucide-react';

const ComplianceCard = ({ 
  title, 
  description, 
  href, 
  readTime, 
  icon,
  index = 0
}: { 
  title: string; 
  description: string; 
  href: string; 
  readTime: string; 
  icon: React.ReactNode; 
  index?: number;
}) => {
  return (
    <motion.a 
      href={href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
          {title}
        </h3>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {readTime}
        </span>
      </div>
      <p className="text-slate-600 leading-relaxed mb-6">
        {description}
      </p>
      <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors flex items-center gap-2">
        View Document →
      </span>
    </motion.a>
  );
};

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-indigo-100 text-indigo-700 px-6 py-3 rounded-full mb-8">
            <Lock size={20} />
            <span className="text-sm font-semibold uppercase tracking-wide">Global Compliance</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
            Trust & Compliance
          </h1>
          
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            At DeepRubric, we are committed to full transparency. Our platform is built to meet 
            the rigorous data security standards required by academic institutions worldwide.
          </p>
        </div>
      </section>

      {/* Document Grid */}
      <main className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ComplianceCard
            title="Privacy Policy"
            description="How we collect, use, and protect your personal and educational data with military-grade encryption."
            href="/privacy"
            readTime="2 MIN READ"
            icon={<ShieldCheck size={24} className="text-indigo-600" />}
            index={0}
          />
          
          <ComplianceCard
            title="Terms of Service"
            description="The rules, responsibilities, and academic integrity guidelines for our platform with global compliance."
            href="/terms"
            readTime="4 MIN READ"
            icon={<FileText size={24} className="text-indigo-600" />}
            index={1}
          />
          
          <ComplianceCard
            title="Cookie Policy"
            description="Details on how we use cookies to provide a seamless grading experience with privacy by design."
            href="/cookies"
            readTime="1 MIN READ"
            icon={<Cookie size={24} className="text-indigo-600" />}
            index={2}
          />
        </div>

        {/* Compliance Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-4">
              <ShieldCheck size={24} className="text-indigo-600" />
              Global Standards
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Globe2 size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">FERPA Compliance</h3>
                  <p className="text-slate-600">Full compliance with Family Educational Rights and Privacy Act ensuring student data protection in the US.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <DatabaseBackup size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">GDPR Ready</h3>
                  <p className="text-slate-600">General Data Protection Regulation compliance for European Union data protection and privacy.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Fingerprint size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">HIPAA Compatible</h3>
                  <p className="text-slate-600">Health Insurance Portability and Accountability Act compliance for healthcare education data.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-4">
              <UsersIcon size={24} className="text-indigo-600" />
              Institutional Trust
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <UsersIcon size={20} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Audit Trails</h3>
                  <p className="text-slate-600">Complete audit trails for all grading activities with immutable logging and compliance reporting.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <VideoIcon size={20} className="text-pink-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Data Sovereignty</h3>
                  <p className="text-slate-600">Choose your data residency location with regional compliance and sovereignty guarantees.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Network size={20} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Zero Trust Architecture</h3>
                  <p className="text-slate-600">Enterprise-grade zero trust security model with continuous authentication and authorization.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Support CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Need Compliance Assistance?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl">
            Our compliance team is ready to assist with institutional data protection agreements, 
            regulatory requirements, and custom compliance documentation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/contact" 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Contact Compliance Team
            </a>
            <span className="text-slate-500 text-sm font-medium self-center">
              Available for enterprise and institutional partners
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
