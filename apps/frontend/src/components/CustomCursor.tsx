'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, SpringOptions } from 'framer-motion';

// Markham standard custom cursor physics
const CURSOR_CONFIG: SpringOptions = {
  stiffness: 800,
  damping: 35,
  mass: 0.1
};

const CURSOR_BASE_SIZE = 8;
const CURSOR_HOVER_SCALE = 2.5;

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useSpring(0, CURSOR_CONFIG);
  const mouseY = useSpring(0, CURSOR_CONFIG);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') !== null || 
        target.closest('a') !== null ||
        target.hasAttribute('data-cursor-hover')
      );
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: CURSOR_BASE_SIZE,
          height: CURSOR_BASE_SIZE,
          border: '2px solid currentColor',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? CURSOR_HOVER_SCALE : 1,
        }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      />
    </>
  );
}