'use client';

import { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, SpringOptions } from 'framer-motion';

// Markham standard magnetic cursor physics
const MAGNETIC_CONFIG: SpringOptions = {
  stiffness: 150,
  damping: 15,
  mass: 0.1
};

const MAGNETIC_STRENGTH = 0.3;

export function useMagneticEffect() {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useSpring(0, MAGNETIC_CONFIG);
  const y = useSpring(0, MAGNETIC_CONFIG);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      x.set(distanceX * MAGNETIC_STRENGTH);
      y.set(distanceY * MAGNETIC_STRENGTH);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  return { ref, x, y };
}