"use client";

import React, { useState } from "react";
import { Plus, Trash2, Save, Wand2, Grid, List } from "lucide-react";
import { ActionButton } from "@deeprubric/ui";
import { RubricMatrix } from "./RubricMatrix";

interface RubricCriterion {
  id: string;
  title: string;
  weight: number;
  description: string;
}

export const RubricBuilder = () => {
  const [title, setTitle] = useState("New Essay Rubric");
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [criteria, setCriteria] = useState<RubricCriterion[]>([
    { id: '1', title: 'Clarity', weight: 25, description: 'How clear is the thesis?' },
    { id: '2', title: 'Organization', weight: 20, description: 'Logical flow and structure of the essay' },
    { id: '3', title: 'Evidence', weight: 30, description: 'Quality and relevance of supporting evidence' },
    { id: '4', title: 'Grammar', weight: 15, description: 'Grammar, spelling, and punctuation' },
    { id: '5', title: 'Critical Thinking', weight: 10, description: 'Depth of analysis and critical engagement' },
  ]);

  const addCriterion = () => {
    const newId = (criteria.length + 1).toString();
    setCriteria([...criteria, {
      id: newId,
      title: '',
      weight: 10,
      description: ''
    }]);
  };

  const removeCriterion = (id: string) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  const updateCriterion = (id: string, field: keyof RubricCriterion, value: any) => {
    setCriteria(criteria.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const getTotalPoints = () => {
    return criteria.reduce((sum, c) => sum + c.weight, 0);
  };

  const rebalancePoints = () => {
    const equalWeight = Math.floor(100 / criteria.length);
    const remainder = 100 - (equalWeight * criteria.length);
    
    setCriteria(criteria.map((c, index) => ({
      ...c,
      weight: index === 0 ? equalWeight + remainder : equalWeight
    })));
  };

  const handleAISuggest = async () => {
    // This would call your backend AI endpoint
    console.log('AI suggestion requested for:', title);
    // Mock AI response for now
    const mockSuggestions = [
      { title: 'Thesis Statement', weight: 20, description: 'Clear and arguable thesis' },
      { title: 'Research Quality', weight: 25, description: 'Depth and credibility of sources' },
      { title: 'Argument Development', weight: 30, description: 'Logical progression and coherence' },
      { title: 'Writing Mechanics', weight: 15, description: 'Grammar, syntax, and style' },
      { title: 'Originality', weight: 10, description: 'Unique insights and perspective' },
    ];
    
    setCriteria(mockSuggestions.map((s, index) => ({ ...s, id: (index + 1).toString() })));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1 mr-4">
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold text-gray-900 border-none focus:ring-0 w-full p-0"
              placeholder="Rubric Title..."
            />
            <p className="text-sm text-gray-500">Define your grading criteria below.</p>
          </div>
          <div className="flex space-x-3">
            <ActionButton 
              variant="secondary" 
              className="flex items-center gap-2"
              onClick={handleAISuggest}
            >
              <Wand2 size={18} /> AI Suggest
            </ActionButton>
            <ActionButton 
              variant="primary" 
              className="flex items-center gap-2"
              onClick={() => console.log('Saving rubric:', { title, criteria })}
            >
              <Save size={18} /> Save Template
            </ActionButton>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center justify-center space-x-4 bg-gray-50 rounded-xl p-2">
          <button
            onClick={() => setIsMatrixMode(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              !isMatrixMode 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <List size={18} />
            Simple Mode
          </button>
          <button
            onClick={() => setIsMatrixMode(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isMatrixMode 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Grid size={18} />
            Matrix Mode
          </button>
        </div>
      </div>

      {/* Points Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-blue-700">Total Points: {getTotalPoints()}</span>
          <button 
            onClick={rebalancePoints}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Rebalance Points
          </button>
        </div>
      </div>

      {/* Mode-Specific Content */}
      {isMatrixMode ? (
        <RubricMatrix />
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 px-6 text-sm font-semibold text-gray-500">
            <div className="col-span-4">CRITERION NAME</div>
            <div className="col-span-5">DESCRIPTION / EXPECTATIONS</div>
            <div className="col-span-2 text-center">POINTS</div>
            <div className="col-span-1"></div>
          </div>

          {criteria.map((criterion) => (
            <div 
              key={criterion.id}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm grid grid-cols-12 gap-4 items-center group transition-all hover:border-blue-300"
            >
              <div className="col-span-4">
                <input 
                  value={criterion.title}
                  onChange={(e) => updateCriterion(criterion.id, 'title', e.target.value)}
                  className="w-full font-medium border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-200 focus:border-transparent"
                  placeholder="e.g. Grammar"
                />
              </div>
              <div className="col-span-5">
                <textarea 
                  rows={1}
                  value={criterion.description}
                  onChange={(e) => updateCriterion(criterion.id, 'description', e.target.value)}
                  className="w-full text-sm border-gray-200 rounded-lg p-2 resize-none focus:ring-2 focus:ring-blue-200 focus:border-transparent" 
                  placeholder="What does 'Good' look like?"
                />
              </div>
              <div className="col-span-2">
                <input 
                  type="number" 
                  value={criterion.weight}
                  onChange={(e) => updateCriterion(criterion.id, 'weight', parseInt(e.target.value) || 0)}
                  className="w-full text-center border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-200 focus:border-transparent" 
                  defaultValue={10} 
                />
              </div>
              <div className="col-span-1 flex justify-end">
                <button 
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  onClick={() => removeCriterion(criterion.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}

          {/* Add New Criterion Button */}
          <button 
            className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center gap-2 font-medium"
            onClick={addCriterion}
          >
            <Plus size={20} /> Add New Criterion
          </button>
        </div>
      )}
    </div>
  );
};