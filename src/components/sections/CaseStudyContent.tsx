"use client"

import * as React from "react"
import { cn } from "@/lib/utils/cn"
import Link from "next/link"

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
            <svg
              width="131"
              height="20"
              viewBox="0 0 131 20"
              fill="none"
              className="absolute inset-0"
            >
              {/* Arrow dots animation */}
              <circle cx="122" cy="5" r="1" fill="#13BC7F" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0s"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 2,0; 0,0"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="120" cy="3" r="1" fill="#13BC7F" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.1s"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 2,0; 0,0"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.1s"
                />
              </circle>
              <circle cx="126" cy="9" r="1" fill="#13BC7F" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.2s"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 2,0; 0,0"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.2s"
                />
              </circle>
              <circle cx="113" cy="9" r="1" fill="#13BC7F" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.3s"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 2,0; 0,0"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.3s"
                />
              </circle>
              <circle cx="116" cy="9" r="1" fill="#13BC7F" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.4s"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 2,0; 0,0"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.4s"
                />
              </circle>
              <circle cx="119" cy="9" r="1" fill="#13BC7F" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.5s"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 2,0; 0,0"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.5s"
                />
              </circle>
              <circle cx="122" cy="9" r="1" fill="#13BC7F" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.6s"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 2,0; 0,0"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.6s"
                />
              </circle>
              <circle cx="124" cy="11" r="1" fill="#13BC7F" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.7s"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 2,0; 0,0"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.7s"
                />
              </circle>
              <circle cx="122" cy="13" r="1" fill="#13BC7F" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.8s"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 2,0; 0,0"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.8s"
                />
              </circle>
              <circle cx="120" cy="15" r="1" fill="#13BC7F" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.9s"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 2,0; 0,0"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="0.9s"
                />
              </circle>
              <circle cx="124" cy="7" r="1" fill="#13BC7F" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="1.0s"
                />
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 2,0; 0,0"
                  dur="1.5s"
                  repeatCount="indefinite"
                  begin="1.0s"
                />
              </circle>
            </svg>
          </div>
        </Link>
      </div>
    )
  }
)

CaseStudyContent.displayName = "CaseStudyContent"