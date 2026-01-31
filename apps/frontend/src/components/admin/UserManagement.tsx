"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserX, ShieldCheck, Search, MoreHorizontal, AlertCircle } from 'lucide-react';

// Mock Data
const initialUsers = [
  { id: '1', name: 'John Doe', email: 'john@univ.edu', role: 'Student', status: 'Active' },
  { id: '2', name: 'Sarah Smith', email: 'sarah@univ.edu', role: 'Professor', status: 'Active' },
  { id: '3', name: 'Mike Ross', email: 'mike@univ.edu', role: 'Student', status: 'Suspended' },
];

export const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const toggleStatus = (id: string) => {
    setUsers(users.map(u => u.id === id 
      ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } 
      : u
    ));
    setSelectedUser(null);
  };

  return (
    <section className="glass-effect rounded-[3rem] p-10 shadow-sm border border-rose-50 dark:border-zinc-800/60">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold dark:text-white">User Registry</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="bg-zinc-100 dark:bg-zinc-800/50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-rose-500 transition-all outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-left text-xs uppercase font-bold text-zinc-400 border-b border-zinc-100 dark:border-zinc-800">
            <tr>
              <th className="px-4 py-4">User</th>
              <th className="px-4 py-4">Role</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/50">
            {users.map((user) => (
              <tr key={user.id} className="group hover:bg-rose-50/20 dark:hover:bg-rose-500/5 transition-colors">
                <td className="px-4 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm dark:text-white">{user.name}</p>
                      <p className="text-xs text-zinc-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-6 text-sm font-medium dark:text-zinc-300">{user.role}</td>
                <td className="px-4 py-6">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                    user.status === 'Active' 
                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10' 
                    : 'bg-rose-100 text-rose-600 dark:bg-rose-500/10'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-6 text-right">
                  <button 
                    onClick={() => setSelectedUser(user)}
                    className="p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-xl transition-all text-zinc-400 hover:text-rose-600"
                  >
                    <UserX size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 shadow-2xl border border-rose-100 dark:border-zinc-800"
            >
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-500/20 rounded-2xl flex items-center justify-center text-rose-600 mb-6">
                <AlertCircle size={32} />
              </div>
              <h4 className="text-2xl font-black dark:text-white mb-2">Change User Status?</h4>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8">
                You are about to change <b>{selectedUser.name}'s</b> access to the system. This will take effect immediately.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 py-4 rounded-2xl font-bold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => toggleStatus(selectedUser.id)}
                  className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 shadow-lg shadow-rose-200 dark:shadow-none transition-all"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};