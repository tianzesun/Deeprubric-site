'use client';

import React, { useActionState } from 'react'; // Renamed and moved to 'react'
import { useFormStatus } from 'react-dom';
import { Send, Loader2, CheckCircle2, X, School, User } from 'lucide-react';
import { submitContactForm } from '../app/actions/contact';

// Sub-component for better performance (avoids re-rendering the whole form)
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit"
      disabled={pending}
      className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={18} />
          Initializing...
        </>
      ) : (
        <>
          Initialize Contact <Send size={18} />
        </>
      )}
    </button>
  );
}

export const ContactForm: React.FC = () => {
  // useActionState is the official replacement for useFormState
  const [state, formAction] = useActionState(submitContactForm, null);

  if (state?.success) {
    return (
      <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-black dark:text-white mb-2 text-slate-900">Transmission Received</h3>
        <p className="text-slate-500 dark:text-slate-400 font-medium italic">"Our team will calibrate a response shortly."</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-8 px-6 py-2 border border-slate-200 dark:border-slate-700 rounded-full text-indigo-500 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors"
        >
          New Transmission
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl flex items-center justify-between animate-in slide-in-from-top-2">
          <span className="text-sm font-bold tracking-tight">{state.error}</span>
          <button 
            type="button" 
            onClick={() => window.location.reload()}
            className="p-1 hover:bg-red-500/20 rounded-md transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            <User size={12} /> Identity
          </label>
          <input 
            required 
            type="text" 
            name="fullName"
            placeholder="Full Name" 
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all dark:text-white placeholder:text-slate-300" 
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            <School size={12} /> Institution
          </label>
          <input 
            required 
            type="text" 
            name="institution"
            placeholder="University Name" 
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all dark:text-white placeholder:text-slate-300" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Message Payload</label>
        <textarea 
          required 
          name="message"
          rows={4} 
          placeholder="Inquiry details..." 
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 rounded-2xl py-4 px-6 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all dark:text-white resize-none placeholder:text-slate-300" 
        />
      </div>

      <SubmitButton />
    </form>
  );
};