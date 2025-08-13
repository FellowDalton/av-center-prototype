'use client';

import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device supports mouse (not touch-only)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    
    if (!hasPointer) {
      return; // Don't track mouse on touch devices
    }

    // Direct mouse position update with RAF throttling
    let rafId: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) {
        return;
      }
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        rafId = null;
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return mousePosition;
}