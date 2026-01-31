"use client";

import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// Mock data representing system load over the last 24 hours
const loadData = [
  { time: '00:00', load: 12 }, { time: '04:00', load: 18 },
  { time: '08:00', load: 45 }, { time: '12:00', load: 85 },
  { time: '16:00', load: 60 }, { time: '20:00', load: 35 },
  { time: '23:59', load: 20 },
];

const memoryData = [
  { name: 'Used', value: 400, color: '#e11d48' }, // Rose 600
  { name: 'Cached', value: 300, color: '#fb7185' }, // Rose 400
  { name: 'Free', value: 300, color: '#fda4af' }, // Rose 300
];

export const SystemHealthCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* AREA CHART: Server Load */}
      <div className="lg:col-span-2 glass-effect p-8 rounded-[2.5rem] h-[400px]">
        <h3 className="text-xl font-bold mb-6 dark:text-white">CPU Load (24h)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={loadData}>
            <defs>
              <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.1} />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '12px', color: '#fff' }}
            />
            <Area 
              type="monotone" 
              dataKey="load" 
              stroke="#e11d48" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorLoad)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* PIE CHART: Memory Allocation */}
      <div className="glass-effect p-8 rounded-[2.5rem] flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold mb-6 dark:text-white self-start">Memory Dist.</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={memoryData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {memoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2 w-full">
          {memoryData.map((item) => (
            <div key={item.name} className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-500 uppercase tracking-widest">{item.name}</span>
              <span className="dark:text-white">{item.value} GB</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};