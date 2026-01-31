"use client";

import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Plus, Trash2, GripVertical, Save, CheckCircle } from 'lucide-react';

interface Criterion {
  id: string;
  label: string;
  points: number;
}

export const RubricCreator = () => {
  const [criteria, setCriteria] = useState<Criterion[]>([
    { id: '1', label: 'Critical Analysis', points: 40 },
    { id: '2', label: 'Citations & Formatting', points: 20 },
  ]);

  const addCriterion = () => {
    const newId = (criteria.length + 1).toString();
    setCriteria([...criteria, { id: newId, label: 'New Criterion', points: 10 }]);
  };

  const removeCriterion = (id: string) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  return (
    <section className="glass-effect rounded-[3rem] p-10 border border-emerald-50 dark:border-emerald-900/30">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-3xl font-black dark:text-white tracking-tight">Rubric Builder</h3>
          <p className="text-slate-500 dark:text-emerald-500/60 text-sm font-medium">Design your grading scale for the Final Thesis</p>
        </div>
        <button 
          onClick={addCriterion}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-200 dark:shadow-none"
        >
          <Plus size={20} /> Add Row
        </button>
      </div>

      {/* DRAGGABLE LIST */}
      <Reorder.Group axis="y" values={criteria} onReorder={setCriteria} className="space-y-4">
        {criteria.map((item) => (
          <Reorder.Item 
            key={item.id} 
            value={item}
            className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-emerald-950/20 border border-slate-100 dark:border-emerald-800/30 rounded-2xl group transition-all hover:border-emerald-500/50"
          >
            <div className="cursor-grab active:cursor-grabbing text-slate-300 dark:text-emerald-800">
              <GripVertical size={20} />
            </div>
            
            <input 
              type="text" 
              value={item.label}
              onChange={(e) => {
                const newLabel = e.target.value;
                setCriteria(criteria.map(c => c.id === item.id ? {...c, label: newLabel} : c));
              }}
              className="flex-1 bg-transparent border-none outline-none font-bold dark:text-white placeholder:text-slate-300"
              placeholder="Criterion Name (e.g. Grammar)"
            />

            <div className="flex items-center gap-2 bg-white dark:bg-emerald-900/40 px-4 py-2 rounded-xl border border-slate-200 dark:border-emerald-700/50">
              <input 
                type="number" 
                value={item.points}
                onChange={(e) => {
                  const newPoints = parseInt(e.target.value) || 0;
                  setCriteria(criteria.map(c => c.id === item.id ? {...c, points: newPoints} : c));
                }}
                className="w-12 bg-transparent border-none outline-none text-center font-black text-emerald-600 dark:text-emerald-400"
              />
              <span className="text-[10px] font-black uppercase text-slate-400">pts</span>
            </div>

            <button 
              onClick={() => removeCriterion(item.id)}
              className="p-2 text-slate-300 hover:text-rose-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* FOOTER ACTIONS */}
      <div className="mt-12 pt-8 border-t border-slate-100 dark:border-emerald-900/30 flex justify-between items-center">
        <div className="text-sm font-bold">
          <span className="text-slate-400">Total Weight:</span>
          <span className="ml-2 text-emerald-600 dark:text-emerald-400 text-xl">
            {criteria.reduce((acc, curr) => acc + Number(curr.points), 0)}%
          </span>
        </div>
        <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-emerald-500 text-white dark:text-emerald-950 rounded-[2rem] font-black hover:scale-105 transition-all">
          <Save size={20} /> Publish Rubric
        </button>
      </div>
    </section>
  );
};