"use client"

import * as React from "react"
import { cn } from "@/lib/utils/cn"
import Link from "next/link"
import Image from "next/image"

export interface CaseStudyCardProps {
  id: string
  title: string
  client: string
  year: number
  category: string
  videoUrl: string
  thumbnailUrl: string
  slug: string
}

export const CaseStudyCard = React.forwardRef<
  HTMLDivElement,
  CaseStudyCardProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    { 
      title, 
      client, 
      videoUrl, 
      thumbnailUrl, 
      slug,
      className,
      ...props 
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [isVideoLoaded, setIsVideoLoaded] = React.useState(false)
    const videoRef = React.useRef<HTMLVideoElement>(null)

    // Preload video when component mounts
    React.useEffect(() => {
      if (videoRef.current) {
        videoRef.current.load()
      }
    }, [videoUrl])

    React.useEffect(() => {
      if (isHovered && videoRef.current && isVideoLoaded) {
        videoRef.current.play().catch((e) => {
          console.log("Video autoplay failed:", e)
        })
      } else if (!isHovered && videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }, [isHovered, isVideoLoaded])

    return (
      <Link href={`/cases/${slug}`} className="block">
        <div
          ref={ref}
          className={cn(
            "relative w-[279px] h-[426px] overflow-hidden bg-gray-900 cursor-pointer group",
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          {/* Background Image - Always visible when not hovering */}
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className={cn(
              "object-cover transition-opacity duration-500",
              isHovered && isVideoLoaded ? "opacity-0" : "opacity-100"
            )}
          />
          
          {/* Background Video - Only visible on hover */}
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
              isHovered && isVideoLoaded ? "opacity-100" : "opacity-0"
            )}
            src={videoUrl}
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => {
              console.log(`Video loaded: ${videoUrl}`)
              setIsVideoLoaded(true)
            }}
            onError={(e) => {
              console.error(`Video failed to load: ${videoUrl}`, e)
            }}
          />

          {/* Gradient Overlay */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-70"
          )} />

          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end overflow-hidden">
            {/* Single container for both texts that moves together */}
            <div className={cn(
              "transition-transform duration-500 ease-out",
              isHovered ? "translate-y-0" : "translate-y-[calc(100%-22px)]"
            )}>
              {/* Client name on top */}
              <p className={cn(
                "text-base font-jetbrains font-normal leading-normal transition-all duration-500",
                isHovered ? "text-emerald-400 mb-2" : "text-white mb-3"
              )}>
                {client}
              </p>
              
              {/* Title below client - initially hidden below the card edge */}
              <h3 className="text-white text-2xl font-neulis font-normal leading-normal">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    )
  }
)

CaseStudyCard.displayName = "CaseStudyCard"