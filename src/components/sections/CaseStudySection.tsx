"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { CaseStudySlider } from "./CaseStudySlider";
import { type CaseStudyCardProps } from "@/components/ui/CaseStudyCard";
import { type CarouselApi } from "@/components/ui/carousel";

interface CaseStudySectionProps {
  caseStudies?: CaseStudyCardProps[];
  title?: string;
  linkText?: string;
  linkHref?: string;
}

export const CaseStudySection = React.forwardRef<
  HTMLElement,
  CaseStudySectionProps & React.HTMLAttributes<HTMLElement>
>(({ caseStudies, title, linkText, linkHref, className, ...props }, ref) => {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();

  return (
    <section
      ref={ref}
      className={cn("w-full py-20 md:py-24", className)}
      {...props}
    >
      {/* Header - constrained to max-width */}
      <div className="max-w-[1220px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="w-full mb-8">
          <CaseStudySlider.Header carouselApi={carouselApi} />
        </div>
      </div>

      {/* Full-width slider with content as first slide */}
      <div className="w-full overflow-hidden">
        {/* Add left padding to align start position with SectionContainer */}
        <div className="">
          <CaseStudySlider
            caseStudies={caseStudies}
            showHeader={false}
            onApiChange={setCarouselApi}
            includeContentSlide={true}
            contentTitle={title}
            contentLinkText={linkText}
            contentLinkHref={linkHref}
          />
        </div>
      </div>
    </section>
  );
});

CaseStudySection.displayName = "CaseStudySection";
