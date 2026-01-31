"use client";

import React, { useState } from "react";
import { Plus, Trash2, MoreHorizontal, Settings2, Wand2 } from "lucide-react";

interface RubricLevel {
  id: string;
  label: string; // e.g., "Exceeds Expectations"
  points: number;
}

interface MatrixCriterion {
  id: string;
  title: string;
  description: string;
  levels: RubricLevel[];
}

export const RubricMatrix = () => {
  // Default levels for the matrix
  const [levels, setLevels] = useState<RubricLevel[]>([
    { id: "l1", label: "Poor", points: 1 },
    { id: "l2", label: "Fair", points: 3 },
    { id: "l3", label: "Excellent", points: 5 },
  ]);

  const [criteria, setCriteria] = useState<MatrixCriterion[]>([
    {
      id: "c1",
      title: "Analysis",
      description: "Depth and quality of analysis",
      levels: [
        { id: "l1", label: "Poor", points: 1 },
        { id: "l2", label: "Fair", points: 3 },
        { id: "l3", label: "Excellent", points: 5 },
      ]
    },
    {
      id: "c2", 
      title: "Evidence",
      description: "Quality and relevance of supporting evidence",
      levels: [
        { id: "l1", label: "Poor", points: 1 },
        { id: "l2", label: "Fair", points: 3 },
        { id: "l3", label: "Excellent", points: 5 },
      ]
    }
  ]);

  const addCriterion = () => {
    const newId = `c${criteria.length + 1}`;
    setCriteria([...criteria, {
      id: newId,
      title: '',
      description: '',
      levels: levels.map(l => ({ ...l }))
    }]);
  };

  const removeCriterion = (id: string) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  const updateCriterion = (id: string, field: keyof MatrixCriterion, value: any) => {
    setCriteria(criteria.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const updateLevel = (criterionId: string, levelId: string, field: keyof RubricLevel, value: any) => {
    setCriteria(criteria.map(c => 
      c.id === criterionId 
        ? {
            ...c,
            levels: c.levels.map(l => 
              l.id === levelId ? { ...l, [field]: value } : l
            )
          }
        : c
    ));
  };

  const addLevel = () => {
    const newLevelId = `l${levels.length + 1}`;
    const newLevel = { id: newLevelId, label: `Level ${levels.length + 1}`, points: 1 };
    
    setLevels([...levels, newLevel]);
    setCriteria(criteria.map(c => ({
      ...c,
      levels: [...c.levels, { ...newLevel }]
    })));
  };

  const removeLevel = (levelId: string) => {
    setLevels(levels.filter(l => l.id !== levelId));
    setCriteria(criteria.map(c => ({
      ...c,
      levels: c.levels.filter(l => l.id !== levelId)
    })));
  };

  const handleAIDescription = (criterionId: string, levelId: string) => {
    // Mock AI description generation
    const mockDescriptions = {
      "Poor": "The work demonstrates significant gaps in understanding and execution.",
      "Fair": "The work shows basic understanding with some areas needing improvement.",
      "Excellent": "The work demonstrates exceptional understanding and execution."
    };
    
    const level = levels.find(l => l.id === levelId);
    const description = level ? mockDescriptions[level.label as keyof typeof mockDescriptions] : "AI-generated description";
    
    // In a real implementation, this would update the description field
    console.log(`AI suggestion for ${criterionId} - ${level?.label}: ${description}`);
  };

  return (
    <div className="w-full overflow-x-auto pb-4">
      <table className="w-full border-separate border-spacing-x-4 border-spacing-y-0 min-w-[800px]">
        <thead>
          <tr>
            <th className="w-1/4 pb-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">
              Criterion
            </th>
            {levels.map((level) => (
              <th key={level.id} className="pb-4 text-center group">
                <div className="bg-gray-100 rounded-t-xl p-3 border-x border-t border-gray-200">
                  <input 
                    value={level.label}
                    onChange={(e) => {
                      const newLabel = e.target.value;
                      setLevels(levels.map(l => l.id === level.id ? { ...l, label: newLabel } : l));
                      setCriteria(criteria.map(c => ({
                        ...c,
                        levels: c.levels.map(l => l.id === level.id ? { ...l, label: newLabel } : l)
                      })));
                    }}
                    className="bg-transparent text-center font-bold text-gray-700 w-full border-none focus:ring-0 p-0 text-sm"
                    placeholder="Level name"
                  />
                  <div className="text-xs text-blue-600 font-mono mt-1">
                    <input 
                      type="number" 
                      value={level.points}
                      onChange={(e) => {
                        const newPoints = parseInt(e.target.value) || 0;
                        setLevels(levels.map(l => l.id === level.id ? { ...l, points: newPoints } : l));
                        setCriteria(criteria.map(c => ({
                          ...c,
                          levels: c.levels.map(l => l.id === level.id ? { ...l, points: newPoints } : l)
                        })));
                      }}
                      className="bg-transparent w-12 text-center border-none focus:ring-0 p-0" 
                    /> pts
                  </div>
                </div>
                <div className="mt-1 flex justify-center">
                  <button 
                    onClick={() => removeLevel(level.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remove level"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </th>
            ))}
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody className="space-y-4">
          {criteria.map((criterion) => (
            <tr key={criterion.id} className="group">
              <td className="bg-white border border-gray-200 rounded-xl p-4 align-top shadow-sm">
                <input 
                  value={criterion.title}
                  onChange={(e) => updateCriterion(criterion.id, 'title', e.target.value)}
                  className="font-bold text-gray-900 border-none focus:ring-0 w-full p-0 mb-1" 
                  placeholder="Criterion Title"
                />
                <textarea 
                  value={criterion.description}
                  onChange={(e) => updateCriterion(criterion.id, 'description', e.target.value)}
                  className="text-xs text-gray-500 border-none focus:ring-0 w-full p-0 resize-none" 
                  placeholder="Overall goal for this item..."
                  rows={2}
                />
              </td>
              
              {criterion.levels.map((level) => (
                <td key={level.id} className="bg-white border border-gray-200 rounded-xl p-4 align-top shadow-sm transition-all focus-within:border-blue-400">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-gray-600">{level.label}</span>
                    <button 
                      onClick={() => handleAIDescription(criterion.id, level.id)}
                      className="text-blue-500 hover:text-blue-700 p-1"
                      title="AI generate description"
                    >
                      <Wand2 size={14} />
                    </button>
                  </div>
                  <textarea 
                    className="text-sm text-gray-600 border-none focus:ring-0 w-full h-24 p-0 resize-none" 
                    placeholder={`Describe ${level.label} performance...`}
                  />
                </td>
              ))}
              
              <td className="text-center">
                <button 
                  onClick={() => removeCriterion(criterion.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove criterion"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <button 
          className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors px-2"
          onClick={addCriterion}
        >
          <Plus size={18} /> Add Criterion Row
        </button>
        
        <button 
          className="flex items-center gap-2 text-gray-600 font-medium hover:text-gray-800 transition-colors px-2"
          onClick={addLevel}
        >
          <Plus size={18} /> Add Level Column
        </button>
      </div>
    </div>
  );
};