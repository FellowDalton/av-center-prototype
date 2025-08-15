"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface Dot {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  displacedX: number;
  displacedY: number;
  baseColor: string;
  targetOpacity: number;
  currentOpacity: number;
  opacitySpeed: number;
  baseRadius: number;
  currentRadius: number;
}

export default function BackgroundDotsCanvas(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const dotsRef = useRef<Dot[]>([]);
  const gridRef = useRef<Record<string, number[]>>({});
  const canvasSizeRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const mousePositionRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const DOT_SPACING = 15;
  const BASE_OPACITY_MIN = 0.3;
  const BASE_OPACITY_MAX = 0.4;
  const BASE_RADIUS = 1.2;

  // Mouse interaction zones
  const DENSITY_RADIUS = 150; // Outer zone where dots become denser
  const REPULSION_RADIUS = 75; // Inner zone where dots repel
  const DENSITY_RADIUS_SQ = DENSITY_RADIUS * DENSITY_RADIUS;
  const REPULSION_RADIUS_SQ = REPULSION_RADIUS * REPULSION_RADIUS;

  const OPACITY_BOOST = 0.5;
  const RADIUS_BOOST = 2;
  const GRID_CELL_SIZE = Math.max(50, Math.floor(DENSITY_RADIUS / 1.5));
  const ATTRACTION_STRENGTH = 0.5; // For density zone
  const REPULSION_STRENGTH = 0.4; // For inner repulsion
  const MIN_DOT_DISTANCE = 8;
  const VIEWPORT_BUFFER = 100; // Extra pixels to render beyond viewport

  const handleMouseMove = useCallback((event: globalThis.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      mousePositionRef.current = { x: null, y: null };
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;
    mousePositionRef.current = { x: canvasX, y: canvasY };
  }, []);

  const createDots = useCallback(() => {
    const { width, height } = canvasSizeRef.current;
    if (width === 0 || height === 0) return;

    const newDots: Dot[] = [];
    const newGrid: Record<string, number[]> = {};
    const cols = Math.ceil(width / DOT_SPACING);
    const rows = Math.ceil(height / DOT_SPACING);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * DOT_SPACING + DOT_SPACING / 2;
        const y = j * DOT_SPACING + DOT_SPACING / 2;
        const cellX = Math.floor(x / GRID_CELL_SIZE);
        const cellY = Math.floor(y / GRID_CELL_SIZE);
        const cellKey = `${cellX}_${cellY}`;

        if (!newGrid[cellKey]) {
          newGrid[cellKey] = [];
        }

        const dotIndex = newDots.length;
        newGrid[cellKey].push(dotIndex);

        const baseOpacity =
          Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) +
          BASE_OPACITY_MIN;
        newDots.push({
          x,
          y,
          originalX: x,
          originalY: y,
          displacedX: x,
          displacedY: y,
          baseColor: "156,163,175", // Store as RGB string for performance
          targetOpacity: baseOpacity,
          currentOpacity: baseOpacity,
          opacitySpeed: Math.random() * 0.005 + 0.002,
          baseRadius: BASE_RADIUS,
          currentRadius: BASE_RADIUS,
        });
      }
    }
    dotsRef.current = newDots;
    gridRef.current = newGrid;
  }, [
    DOT_SPACING,
    GRID_CELL_SIZE,
    BASE_OPACITY_MIN,
    BASE_OPACITY_MAX,
    BASE_RADIUS,
  ]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    const width = container ? container.clientWidth : window.innerWidth;
    const height = container ? container.clientHeight : window.innerHeight;

    if (
      canvas.width !== width ||
      canvas.height !== height ||
      canvasSizeRef.current.width !== width ||
      canvasSizeRef.current.height !== height
    ) {
      canvas.width = width;
      canvas.height = height;
      canvasSizeRef.current = { width, height };
      createDots();
    }
  }, [createDots]);

  const animateDots = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const dots = dotsRef.current;
    const grid = gridRef.current;
    const { width, height } = canvasSizeRef.current;
    const { x: mouseX, y: mouseY } = mousePositionRef.current;

    if (!ctx || !dots || !grid || width === 0 || height === 0) {
      animationFrameId.current = requestAnimationFrame(animateDots);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Find dots near mouse for interaction
    const activeDotIndices = new Set<number>();
    if (mouseX !== null && mouseY !== null) {
      const mouseCellX = Math.floor(mouseX / GRID_CELL_SIZE);
      const mouseCellY = Math.floor(mouseY / GRID_CELL_SIZE);
      const searchRadius = Math.ceil(DENSITY_RADIUS / GRID_CELL_SIZE);
      for (let i = -searchRadius; i <= searchRadius; i++) {
        for (let j = -searchRadius; j <= searchRadius; j++) {
          const checkCellX = mouseCellX + i;
          const checkCellY = mouseCellY + j;
          const cellKey = `${checkCellX}_${checkCellY}`;
          if (grid[cellKey]) {
            grid[cellKey].forEach((dotIndex) => activeDotIndices.add(dotIndex));
          }
        }
      }
    }

    dots.forEach((dot, index) => {
      // Skip dots outside viewport buffer for performance
      if (
        dot.x < -VIEWPORT_BUFFER ||
        dot.x > width + VIEWPORT_BUFFER ||
        dot.y < -VIEWPORT_BUFFER ||
        dot.y > height + VIEWPORT_BUFFER
      ) {
        return;
      }

      dot.currentOpacity += dot.opacitySpeed;
      if (
        dot.currentOpacity >= dot.targetOpacity ||
        dot.currentOpacity <= BASE_OPACITY_MIN
      ) {
        dot.opacitySpeed = -dot.opacitySpeed;
        dot.currentOpacity = Math.max(
          BASE_OPACITY_MIN,
          Math.min(dot.currentOpacity, BASE_OPACITY_MAX)
        );
        dot.targetOpacity =
          Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) +
          BASE_OPACITY_MIN;
      }

      let interactionFactor = 0;
      dot.currentRadius = dot.baseRadius;

      // Calculate two-zone displacement
      let displacementX = 0;
      let displacementY = 0;

      if (mouseX !== null && mouseY !== null && activeDotIndices.has(index)) {
        const dx = dot.originalX - mouseX;
        const dy = dot.originalY - mouseY;
        const distSq = dx * dx + dy * dy;

        if (distSq < DENSITY_RADIUS_SQ && distSq > 0) {
          const distance = Math.sqrt(distSq);

          // Visual interaction factor (opacity and size)
          interactionFactor = Math.max(0, 1 - distance / DENSITY_RADIUS);
          interactionFactor = interactionFactor * interactionFactor;

          if (distSq < REPULSION_RADIUS_SQ) {
            // Inner zone: repel dots
            const repulsionInfluence = Math.max(
              0,
              1 - distance / REPULSION_RADIUS
            );
            const repulsionFactor =
              repulsionInfluence * repulsionInfluence * REPULSION_STRENGTH;

            // Push dots away from mouse
            displacementX = dx * repulsionFactor;
            displacementY = dy * repulsionFactor;

            // Ensure minimum distance
            const targetX = dot.originalX + displacementX;
            const targetY = dot.originalY + displacementY;
            const newDx = targetX - mouseX;
            const newDy = targetY - mouseY;
            const newDistSq = newDx * newDx + newDy * newDy;

            if (newDistSq < MIN_DOT_DISTANCE * MIN_DOT_DISTANCE) {
              const angle = Math.atan2(dy, dx);
              displacementX =
                mouseX + Math.cos(angle) * MIN_DOT_DISTANCE - dot.originalX;
              displacementY =
                mouseY + Math.sin(angle) * MIN_DOT_DISTANCE - dot.originalY;
            }
          } else {
            // Outer zone: attract dots (create density)
            const attractionInfluence = Math.max(
              0,
              (distance - REPULSION_RADIUS) /
                (DENSITY_RADIUS - REPULSION_RADIUS)
            );
            const attractionFactor =
              (1 - attractionInfluence) * ATTRACTION_STRENGTH;

            // Pull dots towards mouse edge (but not into repulsion zone)
            displacementX = -dx * attractionFactor * 0.3;
            displacementY = -dy * attractionFactor * 0.3;
          }
        }
      }

      // Smooth interpolation to target position
      const lerpFactor = 0.15;
      dot.displacedX =
        dot.displacedX +
        (dot.originalX + displacementX - dot.displacedX) * lerpFactor;
      dot.displacedY =
        dot.displacedY +
        (dot.originalY + displacementY - dot.displacedY) * lerpFactor;

      // Update actual position
      dot.x = dot.displacedX;
      dot.y = dot.displacedY;

      const finalOpacity = Math.min(
        1,
        dot.currentOpacity + interactionFactor * OPACITY_BOOST
      );
      dot.currentRadius = dot.baseRadius + interactionFactor * RADIUS_BOOST;

      // Use cached RGB values for better performance
      ctx.beginPath();
      ctx.fillStyle = `rgba(${dot.baseColor}, ${finalOpacity.toFixed(3)})`;
      ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(animateDots);
  }, [
    GRID_CELL_SIZE,
    DENSITY_RADIUS,
    DENSITY_RADIUS_SQ,
    REPULSION_RADIUS,
    REPULSION_RADIUS_SQ,
    OPACITY_BOOST,
    RADIUS_BOOST,
    BASE_OPACITY_MIN,
    BASE_OPACITY_MAX,
    ATTRACTION_STRENGTH,
    REPULSION_STRENGTH,
    MIN_DOT_DISTANCE,
    VIEWPORT_BUFFER,
  ]);

  useEffect(() => {
    handleResize();
    const handleMouseLeave = () => {
      mousePositionRef.current = { x: null, y: null };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    animationFrameId.current = requestAnimationFrame(animateDots);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleResize, handleMouseMove, animateDots]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none opacity-90"
      />
      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #000000 90%), radial-gradient(ellipse at center, transparent 45%, #000000 95%)",
        }}
      />
    </>
  );
}
