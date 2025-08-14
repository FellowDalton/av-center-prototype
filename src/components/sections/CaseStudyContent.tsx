"use client"

import * as React from "react"
import { cn } from "@/lib/utils/cn"
import Link from "next/link"
import { DotsArrow } from "@/components/atoms/DotsArrow"

interface CaseStudyContentProps {
  title?: string
  linkText?: string
  linkHref?: string
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
          "flex flex-col justify-center gap-6",
          className
        )}
        {...props}
      >
        {/* Main heading */}
        <h2 className="text-white text-3xl md:text-[36px] font-neulis font-normal leading-[1.3] max-w-[478px]">
          {title}
        </h2>

        {/* See all cases link with animated dots */}
        <Link 
          href={linkHref}
          className="group inline-flex items-center gap-12 relative"
        >
          <span className="text-emerald-400 text-sm font-jetbrains font-normal hover:text-emerald-300 transition-colors">
            {linkText}
          </span>
          
          {/* Animated dot pattern */}
          <div className="absolute left-0 top-0 w-32 h-5 pointer-events-none">
            <DotsArrow />
          </div>
        </Link>
      </div>
    )
  }
)

CaseStudyContent.displayName = "CaseStudyContent"