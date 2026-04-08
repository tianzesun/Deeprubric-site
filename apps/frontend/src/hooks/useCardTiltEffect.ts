'use client';

import { useEffect, useRef } from 'react';
import { motion, useSpring, SpringOptions } from 'framer-motion';

// Markham standard 3D card tilt physics
const TILT_CONFIG: SpringOptions = {
  stiffness: 300,
  damping: 30,
  mass: 0.2
};

const MAX_TILT = 15;
const PERSPECTIVE = 1000;
const MAX_LIFT = 6;

export function useCardTiltEffect() {
  const ref = useRef<HTMLDivElement>(null);
  
  const rotateX = useSpring(0, TILT_CONFIG);
  const rotateY = useSpring(0, TILT_CONFIG);
  const lift = useSpring(0, TILT_CONFIG);
  const glareX = useSpring(50, TILT_CONFIG);
  const glareY = useSpring(50, TILT_CONFIG);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const percentX = mouseX / rect.width;
      const percentY = mouseY / rect.height;
      
      rotateX.set(-(percentY - 0.5) * MAX_TILT * 2);
      rotateY.set((percentX - 0.5) * MAX_TILT * 2);
      lift.set(MAX_LIFT);
      
      glareX.set(percentX * 100);
      glareY.set(percentY * 100);
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
      lift.set(0);
      glareX.set(50);
      glareY.set(50);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [rotateX, rotateY, lift, glareX, glareY]);

  return { 
    ref, 
    rotateX, 
    rotateY, 
    lift,
    glareX,
    glareY,
    perspective: PERSPECTIVE
  };
}