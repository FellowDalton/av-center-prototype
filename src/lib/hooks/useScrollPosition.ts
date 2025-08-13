"use client";

import { useState, useEffect, useCallback } from "react";

export interface ScrollPosition {
  x: number;
  y: number;
  direction: "up" | "down" | null;
  isScrolled: boolean;
  isVisible: boolean;
}

interface UseScrollPositionOptions {
  throttleMs?: number;
  threshold?: number;
  hideOnScrollDown?: boolean;
}

export function useScrollPosition(options: UseScrollPositionOptions = {}): ScrollPosition {
  const { throttleMs = 16, threshold = 10, hideOnScrollDown = true } = options;

  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: null,
    isScrolled: false,
    isVisible: true,
  });

  const [lastScrollY, setLastScrollY] = useState(0);
  const [ticking, setTicking] = useState(false);

  const updateScrollPosition = useCallback(() => {
    const currentScrollY = window.scrollY;
    const currentScrollX = window.scrollX;

    const direction = 
      currentScrollY > lastScrollY ? "down" : 
      currentScrollY < lastScrollY ? "up" : 
      scrollPosition.direction;

    const isScrolled = currentScrollY > threshold;
    const isVisible = hideOnScrollDown ? 
      (currentScrollY <= threshold || direction === "up") : 
      true;

    setScrollPosition({
      x: currentScrollX,
      y: currentScrollY,
      direction,
      isScrolled,
      isVisible,
    });

    setLastScrollY(currentScrollY);
    setTicking(false);
  }, [lastScrollY, scrollPosition.direction, threshold, hideOnScrollDown]);

  const onScroll = useCallback(() => {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      setTicking(true);
    }
  }, [ticking, updateScrollPosition]);

  useEffect(() => {
    // Set initial position
    setScrollPosition({
      x: window.scrollX,
      y: window.scrollY,
      direction: null,
      isScrolled: window.scrollY > threshold,
      isVisible: true,
    });
    setLastScrollY(window.scrollY);

    // Throttled scroll listener
    let timeoutId: NodeJS.Timeout;
    const throttledOnScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(onScroll, throttleMs);
    };

    window.addEventListener("scroll", throttledOnScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledOnScroll);
      clearTimeout(timeoutId);
    };
  }, [onScroll, throttleMs, threshold]);

  return scrollPosition;
}

export default useScrollPosition;