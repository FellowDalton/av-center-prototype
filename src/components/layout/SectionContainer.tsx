"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "full";
  children: React.ReactNode;
  className?: string;
}

export const SectionContainer = React.forwardRef<
  HTMLDivElement,
  SectionContainerProps
>(({ variant = "default", children, className, ...props }, ref) => {
  const containerClasses = {
    default: "max-w-[1188px] mx-auto px-6 md:px-8",
    full: "w-full",
  };

  return (
    <div
      ref={ref}
      className={cn(containerClasses[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
});

SectionContainer.displayName = "SectionContainer";

export default SectionContainer;