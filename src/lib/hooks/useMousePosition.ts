'use client';

import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  const updateMousePosition = useCallback((e: MouseEvent) => {
    // Use requestAnimationFrame for performance optimization
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  useEffect(() => {
    // Check if device supports mouse (not touch-only)
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    
    if (!hasPointer) {
      return; // Don't track mouse on touch devices
    }

    // Add throttling to prevent excessive updates
    let throttleId: number | null = null;
    
    const throttledUpdate = (e: MouseEvent) => {
      if (throttleId) {
        return;
      }
      
      throttleId = requestAnimationFrame(() => {
        updateMousePosition(e);
        throttleId = null;
      });
    };

    window.addEventListener('mousemove', throttledUpdate);
    window.addEventListener('mouseenter', throttledUpdate);

    return () => {
      window.removeEventListener('mousemove', throttledUpdate);
      window.removeEventListener('mouseenter', throttledUpdate);
      
      if (throttleId) {
        cancelAnimationFrame(throttleId);
      }
    };
  }, [updateMousePosition]);

  return mousePosition;
}