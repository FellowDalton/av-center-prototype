"use client"

import * as React from "react"
import { cn } from "@/lib/utils/cn"
import { CaseStudySlider } from "./CaseStudySlider"
import { CaseStudyContent } from "./CaseStudyContent"
import { type CaseStudyCardProps } from "@/components/ui/CaseStudyCard"

interface CaseStudySectionProps {
  caseStudies?: CaseStudyCardProps[]
  title?: string
  linkText?: string
  linkHref?: string
}

export const CaseStudySection = React.forwardRef<
  HTMLElement,
  CaseStudySectionProps & React.HTMLAttributes<HTMLElement>
>(
  (
    { 
      caseStudies,
      title,
      linkText,
      linkHref,
      className,
      ...props 
    },
    ref
  ) => {
    const [carouselApi, setCarouselApi] = React.useState<any>()

    return (
      <section
        ref={ref}
        className={cn(
          "w-full py-20 md:py-32 bg-black",
          className
        )}
        {...props}
      >
        {/* Header - constrained to max-width */}
        <div className="max-w-[1188px] mx-auto px-6 md:px-8">
          <div className="w-full mb-8">
            <CaseStudySlider.Header carouselApi={carouselApi} />
          </div>
        </div>
        
        {/* Content with asymmetric layout */}
        <div className="max-w-[1188px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left content - stays within container */}
            <div className="lg:col-span-4 px-6 md:px-8">
              <CaseStudyContent
                title={title}
                linkText={linkText}
                linkHref={linkHref}
              />
            </div>

            {/* Right slider - extends to edge */}
            <div className="lg:col-span-8 px-6 md:px-8 lg:px-0">
              {/* Calculate overflow to right edge on large screens */}
              <div className="lg:-mr-[calc((100vw-1188px)/2-32px)]">
                <CaseStudySlider 
                  caseStudies={caseStudies} 
                  showHeader={false}
                  onApiChange={setCarouselApi}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
)

CaseStudySection.displayName = "CaseStudySection"