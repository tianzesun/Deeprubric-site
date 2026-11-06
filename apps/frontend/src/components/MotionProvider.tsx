'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';

// Honour the visitor's "reduce motion" OS setting for every Framer Motion animation.
// LazyMotion + the slim `m` components ship only the DOM animation features we use;
// `strict` throws if a full `motion.*` component sneaks back in and re-adds the weight.
export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
);
