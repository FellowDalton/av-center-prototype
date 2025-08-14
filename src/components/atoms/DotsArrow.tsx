"use client"

import * as React from "react"
import { cn } from "@/lib/utils/cn"

type DotsArrowProps = React.SVGAttributes<SVGElement>

export const DotsArrow = React.forwardRef<SVGSVGElement, DotsArrowProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width="131"
        height="20"
        viewBox="0 0 131 20"
        fill="none"
        className={cn("absolute inset-0", className)}
        {...props}
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
    )
  }
)

DotsArrow.displayName = "DotsArrow"