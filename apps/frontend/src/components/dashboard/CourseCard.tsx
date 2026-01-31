'use client';

import React from 'react';
import { Course } from '../../features/shared/types/common.types';
import { Users, Calendar, FileText, Eye } from 'lucide-react';
import Button from '../ui/Button';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{course.code}</p>
          
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-700">{course.description}</p>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.students.length} students</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Created {new Date(course.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div className="ml-4 flex flex-col space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
            onClick={() => window.location.href = `/courses/${course.id}`}
          >
            <Eye className="h-4 w-4" />
            <span>View</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center space-x-2"
            onClick={() => window.location.href = `/courses/${course.id}/assignments`}
          >
            <FileText className="h-4 w-4" />
            <span>Assignments</span>
          </Button>
        </div>
      </div>
    </div>
  );
};