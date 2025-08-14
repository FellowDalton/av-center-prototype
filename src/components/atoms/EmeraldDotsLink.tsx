"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface EmeraldDotsLinkProps {
  href: string;
  text: string;
  className?: string;
}

export const EmeraldDotsLink = React.forwardRef<
  HTMLAnchorElement,
  EmeraldDotsLinkProps
>(({ href, text, className }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Define dot positions with their animation groups (left to right)
  const dots = [
    { left: 0, top: 9, group: 0 },    // leftmost
    { left: 3, top: 9, group: 0 },    // left group
    { left: 6, top: 9, group: 1 },    // middle-left group
    { left: 7, top: 3, group: 1 },    // middle-left group
    { left: 7, top: 15, group: 1 },   // middle-left group
    { left: 9, top: 5, group: 2 },    // middle-right group
    { left: 9, top: 9, group: 2 },    // middle-right group
    { left: 9, top: 13, group: 2 },   // middle-right group
    { left: 11, top: 7, group: 3 },   // rightmost group
    { left: 11, top: 11, group: 3 },  // rightmost group
    { left: 13, top: 9, group: 3 },   // rightmost
  ];

  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        "inline-flex items-center gap-4 group",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-emerald-400 text-sm font-normal font-jetbrains group-hover:text-emerald-300 transition-colors">
        {text}
      </span>
      <div className="w-16 h-5 relative pointer-events-none">
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-emerald-500 rounded-full"
            style={{
              left: `${dot.left}px`,
              top: `${dot.top}px`,
            }}
            animate={{
              opacity: isHovered ? 0.8 : 0.3,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{
              duration: 0.15,
              delay: isHovered
                ? dot.group * 0.08
                : (3 - dot.group) * 0.08,
            }}
          />
        ))}
      </div>
    </Link>
  );
});

EmeraldDotsLink.displayName = "EmeraldDotsLink";