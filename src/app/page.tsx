// This file represents the main landing page for DeepRubric.
// Goal: To function as a best-in-class marketing showcase that feels immediate, trustworthy, and technologically superior.
import DashboardLayout from '@/components/DashboardLayout';
import { IntegrityScoreGauge } from '@/components/widgets/IntegrityScoreGauge';
import PerformanceGraph from '@/components/widgets/PerformanceGraph';
import { Suspense } from 'react';
import React, { Suspense, lazy } from 'react';

// 1. Dynamic Imports for Performance: Only load heavy components when needed.
// This gives the initial page load an *instantaneous* feel.
const LazyDashboardComponent = lazy(() => import('@/components/dashboard-summary-section'));

export default function DeepRubricDashboardPage() {
    return (
        <DashboardLayout>
            {/* HERO SECTION: The immediate value proposition */}
            <div className="lg:col-span-3">
                <IntegrityScoreGauge 
                    score={94} 
                    label="System Integrity Score" 
                    maxVal={100} 
                    description="Industry leading grading consistency, surpassing current market benchmarks." 
                />
            </div>

            {/* ROW 2: CORE FUNCTIONALITY WIDGETS */}
            <div className="lg:col-span-2 space-y-6">
                {/* Widget 1: Role Management */}
                <div className="p-6 bg-white shadow-xl rounded-xl border border-indigo-200 flex flex-col">
                    <h3 className="text-xl font-bold text-indigo-700 mb-2">🎯 Role-Based Workflow</h3>
                    <p className="text-gray-600 mb-4 text-sm">Seamless role switching between Professor, TA, and Admin roles.</p>
                    <div className="flex gap-3">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm transition duration-150">
                            [Prof] Create Course
                        </button>
                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm transition duration-150">
                            [Student] View Progress
                        </button>
                    </div>
                </div>

                {/* Widget 2: Grading Efficiency */}
                <div className="p-6 bg-white shadow-xl rounded-xl border border-green-200 flex flex-col">
                    <h3 className="text-xl font-bold text-green-700 mb-2">📚 Grading Efficiency</h3>
                    <p className="text-gray-600 mb-4 text-sm">AI assistance reduces grading time by an estimated 40%.</p>
                    <div className="text-2xl font-bold text-green-600">
                        40% Time Saved
                    </div>
                </div>
            </div>

            {/* ROW 3: VISUALIZATION (Lazy Loaded) */}
            <div className="lg:col-span-3">
                <Suspense fallback={<div className="p-6 bg-white shadow-xl rounded-xl border border-gray-200 flex items-center justify-center h-full"><div className="animate-pulse text-indigo-500">Loading deep metrics...</div></div>}>
                    <LazyPerformanceGraph 
                        data={[{time: "1hr ago", value: 85}, {time: "4hr ago", value: 78}, {time: "Today", value: 94}]} 
                        label="Average Score Trend (Last 24h)" 
                    />
                </Suspense>
            </div>
        </DashboardLayout>
    );
}