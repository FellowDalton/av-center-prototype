"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface SectionContainerProps {
  variant?: "default" | "full";
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const SectionContainer = React.forwardRef<
  HTMLDivElement,
  SectionContainerProps
>(({ variant = "default", children, className, as: Component = "div", ...props }, ref) => {
  const containerClasses = {
    default: "max-w-[1188px] mx-auto px-6 md:px-8",
    full: "w-full",
  };

  return (
    <Component
      ref={ref}
      className={cn(containerClasses[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
});

SectionContainer.displayName = "SectionContainer";

export default SectionContainer;