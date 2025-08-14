"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { EmeraldDotsLink } from "@/components/atoms/EmeraldDotsLink";

interface CaseStudyContentProps {
  title?: string;
  linkText?: string;
  linkHref?: string;
}

export const CaseStudyContent = React.forwardRef<
  HTMLDivElement,
  CaseStudyContentProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      title = "Et lille udpluk af erfaringer gennem 20 år med lyd og billeder",
      linkText = "Se all cases",
      linkHref = "/cases",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-8 h-full min-h-[400px] pb-8",
          className
        )}
        {...props}
      >
        {/* Main heading */}
        <h2 className="text-white text-4xl font-neulis font-normal leading-[1.2] max-w-[578px]">
          {title}
        </h2>

        {/* See all cases link with dots pattern from Figma */}
        <EmeraldDotsLink href={linkHref} text={linkText} />
      </div>
    );
  }
);

CaseStudyContent.displayName = "CaseStudyContent";
