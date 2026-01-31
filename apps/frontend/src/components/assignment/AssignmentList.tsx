'use client';

import React from 'react';
import { Assignment } from '../../features/assignment/types/assignment.types';
import { FileText, Calendar, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';

interface AssignmentListProps {
  assignments: Assignment[];
  loading?: boolean;
}

export const AssignmentList: React.FC<AssignmentListProps> = ({ assignments, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments yet</h3>
        <p className="text-gray-600 mb-6">Create your first assignment to get started.</p>
        <Button
          variant="primary"
          className="flex items-center space-x-2 mx-auto"
        >
          <FileText className="h-4 w-4" />
          <span>Create Assignment</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Assignments</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {assignments.map((assignment) => {
          const dueDate = new Date(assignment.dueDate);
          const isOverdue = dueDate < new Date();
          const submissionCount = assignment.submissions.length;
          const gradedCount = assignment.submissions.filter(s => s.status === 'graded').length;
          
          return (
            <div key={assignment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{assignment.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      assignment.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : assignment.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {assignment.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{assignment.course.name}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Due: {dueDate.toLocaleDateString()} at {dueDate.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{submissionCount} submissions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4" />
                      <span>{gradedCount} graded</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>{assignment.totalPoints} points</span>
                    </div>
                  </div>

                  {isOverdue && (
                    <div className="mt-2 flex items-center space-x-2 text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Overdue</span>
                    </div>
                  )}
                </div>
                
                <div className="ml-4 flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                    onClick={() => window.location.href = `/assignments/${assignment.id}`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>View</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex items-center space-x-2"
                    onClick={() => window.location.href = `/assignments/${assignment.id}/submissions`}
                  >
                    <Users className="h-4 w-4" />
                    <span>Submissions</span>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};