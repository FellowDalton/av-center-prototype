"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  CaseStudyCard,
  type CaseStudyCardProps,
} from "@/components/ui/CaseStudyCard";
import { EmeraldDotsButton } from "@/components/atoms/DotsButton";
import { CaseStudyContent } from "./CaseStudyContent";

interface CaseStudyHeaderProps {
  carouselApi?: CarouselApi;
}

const CaseStudyHeader = React.forwardRef<
  HTMLDivElement,
  CaseStudyHeaderProps & React.HTMLAttributes<HTMLDivElement>
>(({ carouselApi, className, ...props }, ref) => {
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!carouselApi) return;

    const updateScrollButtons = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    updateScrollButtons();
    carouselApi.on("select", updateScrollButtons);
    carouselApi.on("reInit", updateScrollButtons);

    return () => {
      carouselApi.off("select", updateScrollButtons);
      carouselApi.off("reInit", updateScrollButtons);
    };
  }, [carouselApi]);

  const onPrev = React.useCallback(() => {
    carouselApi?.scrollPrev();
  }, [carouselApi]);

  const onNext = React.useCallback(() => {
    carouselApi?.scrollNext();
  }, [carouselApi]);
  return (
    <div
      ref={ref}
      className={cn(
        "w-full flex items-center justify-between gap-2 mb-8",
        className
      )}
      {...props}
    >
      {/* Left side with label and line */}
      <div className="flex items-center gap-2 flex-1">
        {/* Emerald dot */}
        <div className="w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0" />

        {/* Cases label */}
        <span className="text-white text-base font-jetbrains font-medium whitespace-nowrap">
          Cases
        </span>

        {/* Decorative line */}
        <div className="flex-1 h-[0.5px] bg-gray-400/40" />
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-5 pl-6">
        <EmeraldDotsButton
          direction="left"
          onClick={onPrev}
          disabled={!canScrollPrev}
        />
        <EmeraldDotsButton
          direction="right"
          onClick={onNext}
          disabled={!canScrollNext}
        />
      </div>
    </div>
  );
});

CaseStudyHeader.displayName = "CaseStudyHeader";

interface CaseStudySliderProps {
  caseStudies?: CaseStudyCardProps[];
  showHeader?: boolean;
  onApiChange?: (api: CarouselApi) => void;
  includeContentSlide?: boolean;
  contentTitle?: string;
  contentLinkText?: string;
  contentLinkHref?: string;
}

const CaseStudySliderComponent = React.forwardRef<
  HTMLDivElement,
  CaseStudySliderProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      caseStudies = [],
      showHeader = true,
      onApiChange,
      includeContentSlide = true,
      contentTitle,
      contentLinkText,
      contentLinkHref,
      className,
      ...props
    },
    ref
  ) => {
    const [api, setApi] = React.useState<CarouselApi>();

    React.useEffect(() => {
      if (!api) return;

      // Call onApiChange when api is available
      if (onApiChange) {
        onApiChange(api);
      }
    }, [api, onApiChange]);

    // Sample data if no case studies provided - using actual files from public folder
    const defaultCaseStudies: CaseStudyCardProps[] = [
      {
        id: "1",
        title: "Fleksibel kantine og innovative møderum",
        client: "Universal Robots",
        year: 2024,
        category: "Conference",
        videoUrl: "/case_video-1.mp4",
        thumbnailUrl: "/case-image-1.png",
        slug: "universal-robots-case",
      },
      {
        id: "2",
        title: "Digital transformation og moderne arbejdsplads",
        client: "Würth",
        year: 2024,
        category: "Corporate",
        videoUrl: "/case-video-2.mp4",
        thumbnailUrl: "/case-image-2.png",
        slug: "wurth-case",
      },
      {
        id: "3",
        title: "Bæredygtig produktion og grøn teknologi",
        client: "Universal Robots",
        year: 2023,
        category: "Technology",
        videoUrl: "/case_video-1.mp4", // Reusing video 1
        thumbnailUrl: "/case-image-1.png", // Reusing image 1
        slug: "universal-robots-sustainability",
      },
      {
        id: "4",
        title: "Effektiv lagerstyring og automatisering",
        client: "Würth",
        year: 2023,
        category: "Logistics",
        videoUrl: "/case-video-2.mp4", // Reusing video 2
        thumbnailUrl: "/case-image-2.png", // Reusing image 2
        slug: "wurth-automation",
      },
      {
        id: "5",
        title: "Bæredygtig produktion og grøn teknologi",
        client: "Universal Robots",
        year: 2023,
        category: "Technology",
        videoUrl: "/case_video-1.mp4", // Reusing video 1
        thumbnailUrl: "/case-image-1.png", // Reusing image 1
        slug: "universal-robots-sustainability",
      },
      {
        id: "6",
        title: "Effektiv lagerstyring og automatisering",
        client: "Würth",
        year: 2023,
        category: "Logistics",
        videoUrl: "/case-video-2.mp4", // Reusing video 2
        thumbnailUrl: "/case-image-2.png", // Reusing image 2
        slug: "wurth-automation",
      },
      {
        id: "7",
        title: "Bæredygtig produktion og grøn teknologi",
        client: "Universal Robots",
        year: 2023,
        category: "Technology",
        videoUrl: "/case_video-1.mp4", // Reusing video 1
        thumbnailUrl: "/case-image-1.png", // Reusing image 1
        slug: "universal-robots-sustainability",
      },
      {
        id: "8",
        title: "Effektiv lagerstyring og automatisering",
        client: "Würth",
        year: 2023,
        category: "Logistics",
        videoUrl: "/case-video-2.mp4", // Reusing video 2
        thumbnailUrl: "/case-image-2.png", // Reusing image 2
        slug: "wurth-automation",
      },
    ];

    const displayCaseStudies =
      caseStudies.length > 0 ? caseStudies : defaultCaseStudies;

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {showHeader && <CaseStudyHeader carouselApi={api} />}

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            slidesToScroll: 1,
            containScroll: "trimSnaps",
          }}
          className="w-full"
        >
          <CarouselContent className="pr-6">
            {/* Content slide as first item with custom width */}
            {includeContentSlide && (
              <CarouselItem
                key="content-slide"
                className="basis-auto pl-10 md:pl-12 lg:pl-16 first-carousel-item"
              >
                <div className="h-full flex">
                  <CaseStudyContent
                    title={contentTitle}
                    linkText={contentLinkText}
                    linkHref={contentLinkHref}
                    className="w-full"
                    style={{ width: "578px" }}
                  />
                </div>
              </CarouselItem>
            )}

            {/* Case study cards */}
            {displayCaseStudies.map((caseStudy, index) => (
              <CarouselItem
                key={caseStudy.id}
                className={cn(
                  "basis-auto pl-6",
                  index === displayCaseStudies.length - 1 && "pr-6"
                )}
              >
                <CaseStudyCard {...caseStudy} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <style jsx global>{`
          @media screen and (min-width: 1188px) {
            .first-carousel-item {
              padding-left: calc((100vw - 1188px) / 2 + 60px) !important;
            }
          }
        `}</style>
      </div>
    );
  }
);

CaseStudySliderComponent.displayName = "CaseStudySlider";

// Export the slider with the header as a sub-component
export const CaseStudySlider = Object.assign(CaseStudySliderComponent, {
  Header: CaseStudyHeader,
});
