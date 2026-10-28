'use client';

import { MotionConfig } from 'framer-motion';

// Honour the visitor's "reduce motion" OS setting for every Framer Motion animation
export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
