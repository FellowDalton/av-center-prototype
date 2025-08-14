'use client';

import { motion, Transition } from 'framer-motion';
import { useMousePosition } from '@/lib/hooks/useMousePosition';
import { useState, useEffect } from 'react';

export interface CursorFollowerProps {
  size?: number;
  color?: string;
  blendMode?: 'difference' | 'multiply' | 'screen';
  springConfig?: Transition;
  adaptiveSize?: boolean;
  hideOnTouch?: boolean;
}

export default function CursorFollower({
  size = 12,
  color = '#10b981',
  blendMode,
  springConfig = {
    stiffness: 500,
    damping: 28,
  },
  adaptiveSize = true,
  hideOnTouch = true,
}: CursorFollowerProps) {
  const mousePosition = useMousePosition();
  const [isPressed, setIsPressed] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Check for touch device
  useEffect(() => {
    const checkTouch = () => {
      const hasPointer = window.matchMedia('(pointer: fine)').matches;
      setIsTouchDevice(!hasPointer);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Track mouse press state
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isTouchDevice]);

  // Track hovered elements for adaptive sizing
  useEffect(() => {
    if (isTouchDevice || !adaptiveSize) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if hovering over EmeraldDotsButton or its children
      const emeraldButton = target.closest('[data-emerald-dots-button]');
      
      if (emeraldButton) {
        setHoveredElement('emerald-dots');
      } else if (target.matches('a, button, [role="button"], input, select, textarea')) {
        setHoveredElement('interactive');
      } else if (target.matches('p, span, h1, h2, h3, h4, h5, h6, [contenteditable]')) {
        setHoveredElement('text');
      } else {
        setHoveredElement(null);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice, adaptiveSize]);

  // Hide on touch devices if specified
  if (hideOnTouch && isTouchDevice) {
    return null;
  }

  // Calculate adaptive size
  const getAdaptiveSize = () => {
    let baseSize = size;
    
    if (isPressed) {
      baseSize *= 0.8; // Shrink when pressed
    } else if (hoveredElement === 'emerald-dots') {
      baseSize *= 0.5; // Small when hovering emerald dots buttons
    } else if (hoveredElement === 'interactive') {
      baseSize *= 1.5; // Grow on interactive elements
    } else if (hoveredElement === 'text') {
      baseSize *= 0.3; // Shrink to thin line for text selection
    }
    
    return baseSize;
  };

  const currentSize = getAdaptiveSize();

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
      style={{
        width: currentSize,
        height: currentSize,
        backgroundColor: color,
        ...(blendMode && { mixBlendMode: blendMode }),
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: hoveredElement === 'text' ? [1, 0.1] : 1, // Height scale for text cursor
        opacity: mousePosition.x === 0 && mousePosition.y === 0 ? 0 : 1,
      }}
      transition={springConfig}
      initial={{ opacity: 0 }}
    />
  );
}