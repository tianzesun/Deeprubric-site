"use client";

import React from 'react';

interface GradeBadgeProps {
  grade: string;
  variant?: 'pass' | 'fail' | 'neutral';
}

export const GradeBadge: React.FC<GradeBadgeProps> = ({ grade, variant = 'neutral' }) => {
  let badgeClasses = "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium";

  switch (variant) {
    case 'pass':
      badgeClasses += " bg-green-100 text-green-800";
      break;
    case 'fail':
      badgeClasses += " bg-red-100 text-red-800";
      break;
    case 'neutral':
    default:
      badgeClasses += " bg-gray-100 text-gray-800";
      break;
  }

  return (
    <span className={badgeClasses}>
      {grade}
    </span>
  );
};