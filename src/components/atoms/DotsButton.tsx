"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface EmeraldDotsButtonProps {
  direction?: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  isActive?: boolean;
}

export const EmeraldDotsButton = React.forwardRef<
  HTMLButtonElement,
  EmeraldDotsButtonProps
>(
  (
    {
      direction = "right",
      onClick,
      disabled = false,
      className,
      isActive = false,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    // Define dot positions for arrow pattern pointing right
    const rightArrowPositions = [
      { x: 8.4, y: 3.6 }, // top-left - group 0
      { x: 8.4, y: 18 }, // bottom-left - group 0
      { x: 10.8, y: 6 }, // middle-top-left - group 1
      { x: 10.8, y: 15.6 }, // middle-bottom-left - group 1
      { x: 13.2, y: 8.4 }, // middle-top-right - group 2
      { x: 13.2, y: 13.2 }, // middle-bottom-right - group 2
      { x: 15.6, y: 10.8 }, // rightmost - group 3
    ];

    // For left arrow, flip the x coordinates
    const leftArrowPositions = rightArrowPositions.map((pos) => ({
      x: 24 - pos.x,
      y: pos.y,
    }));

    const dotPositions =
      direction === "right" ? rightArrowPositions : leftArrowPositions;

    // Group dots by their animation sequence (left to right for arrows)
    const getAnimationGroup = (index: number) => {
      if (index <= 1) return 0; // leftmost group
      if (index <= 3) return 1; // middle-left group
      if (index <= 5) return 2; // middle-right group
      return 3; // rightmost
    };

    // Use either prop-based isActive or internal hover state
    const shouldAnimate = isActive || isHovered;

    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-emerald-dots-button
        className={cn(
          "relative w-6 h-6 transition-opacity duration-300",
          disabled && "opacity-30 cursor-not-allowed",
          !disabled && "cursor-pointer",
          className
        )}
        aria-label={direction === "left" ? "Previous" : "Next"}
        {...props}
      >
        <div className="relative w-full h-full">
          {dotPositions.map((pos, i) => {
            const animationGroup = getAnimationGroup(i);

            return (
              <motion.div
                key={i}
                className="absolute w-[2.4px] h-[2.4px] opacity-40 bg-emerald-400 rounded-full"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                }}
                animate={{
                  opacity: shouldAnimate ? 0.8 : 0.3,
                  scale: shouldAnimate ? 1.2 : 1,
                }}
                transition={{
                  duration: 0.15,
                  delay: shouldAnimate
                    ? animationGroup * 0.08
                    : (3 - animationGroup) * 0.08,
                }}
              />
            );
          })}
        </div>
      </button>
    );
  }
);

EmeraldDotsButton.displayName = "EmeraldDotsButton";

export default EmeraldDotsButton;
