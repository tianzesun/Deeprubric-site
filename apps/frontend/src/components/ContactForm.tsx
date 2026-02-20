'use client';

import React from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Send, Loader2, CheckCircle2, X, Building2, User, Mail } from 'lucide-react';
import { submitContactForm } from '../app/actions/contact';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit"
      disabled={pending}
      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={18} />
          Sending...
        </>
      ) : (
        <>
          Request Demo <Send size={18} />
        </>
      )}
    </button>
  );
}

export const ContactForm: React.FC = () => {
  const [state, formAction] = useActionState(submitContactForm, null);

  if (state?.success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          Thank You!
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          We've received your request and will be in touch within 24 hours.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-6 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg flex items-center justify-between">
          <span className="text-sm font-medium">{state.error}</span>
          <button 
            type="button" 
            onClick={() => window.location.reload()}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-800/50 rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
      
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <User size={14} /> Full Name
        </label>
        <input 
          required 
          type="text" 
          name="fullName"
          placeholder="Enter your name" 
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:text-white placeholder:text-slate-400" 
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <Building2 size={14} /> Institution
        </label>
        <input 
          required 
          type="text" 
          name="institution"
          placeholder="University or organization name" 
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:text-white placeholder:text-slate-400" 
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <Mail size={14} /> Email Address
        </label>
        <input 
          required 
          type="email" 
          name="email"
          placeholder="your.email@institution.edu" 
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:text-white placeholder:text-slate-400" 
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          How can we help?
        </label>
        <textarea 
          required 
          name="message"
          rows={4} 
          placeholder="Tell us about your assessment needs, the size of your institution, or any questions you have..." 
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:text-white resize-none placeholder:text-slate-400" 
        />
      </div>

      <SubmitButton />
      
      <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
        By submitting, you agree to our privacy policy. We'll never share your information.
      </p>
    </form>
  );
};