"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  title?: string;
  textBlend?: boolean;
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  title,
  textBlend,
}: ScrollExpandMediaProps): React.ReactElement => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    setScrollProgress(0);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    let rafId: number | null = null;
    const handleWheel = (e: Event): void => {
      const wheelEvent = e as WheelEvent;
      if (mediaFullyExpanded && wheelEvent.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const performUpdate = () => {
          const scrollDelta = wheelEvent.deltaY * 0.0009;
          setScrollProgress((prev) => {
            const next = Math.min(Math.max(prev + scrollDelta, 0), 1);
            if (next >= 1) {
              setMediaFullyExpanded(true);
            }
            return next;
          });
          rafId = null;
        };
        if (rafId == null) rafId = requestAnimationFrame(performUpdate);
      }
    };

    const handleTouchStart = (e: Event): void => {
      const touchEvent = e as TouchEvent;
      setTouchStartY(touchEvent.touches[0].clientY);
    };

    const handleTouchMove = (e: Event): void => {
      const touchEvent = e as TouchEvent;
      if (!touchStartY) return;

      const touchY = touchEvent.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const update = () => {
          const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
          const scrollDelta = deltaY * scrollFactor;
          setScrollProgress((prev) => {
            const next = Math.min(Math.max(prev + scrollDelta, 0), 1);
            if (next >= 1) {
              setMediaFullyExpanded(true);
            }
            return next;
          });
          setTouchStartY(touchY);
        };
        requestAnimationFrame(update);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  // Measure the wrapper's pixel size (100% width with 16/9 aspect)
  useEffect(() => {
    const measure = (): void => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height > 0 ? rect.height : width * (9 / 16);
      setContainerSize({ width, height });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Pixel-accurate mask: compute from measured width/height (16/9). Start as 1/1 circle, morph to 16/9 rounded rect.
  const { width: containerWidthPx, height: containerHeightPx } = containerSize;
  const initialCircleScale = 0.6; // circle diameter as a fraction of the container height
  const initialSquarePx = Math.max(
    50,
    Math.min(containerHeightPx, containerWidthPx) * initialCircleScale
  );
  const insetXStartPx = Math.max((containerWidthPx - initialSquarePx) / 2, 0);
  const insetYStartPx = Math.max((containerHeightPx - initialSquarePx) / 2, 0);
  const insetXPx = insetXStartPx * (1 - scrollProgress);
  const insetYPx = insetYStartPx * (1 - scrollProgress);
  const startCornerPx = initialSquarePx / 2; // perfect circle at start
  const endCornerPx = 60; // rounded-rect corner at end
  const cornerRadiusPx =
    startCornerPx + (endCornerPx - startCornerPx) * scrollProgress;
  const clipPathValue = `inset(${insetYPx}px ${insetXPx}px ${insetYPx}px ${insetXPx}px round ${cornerRadiusPx}px)`;

  // Animate position: top/left from 65% -> 50%
  const startPercent = 65;
  const endPercent = 50;
  const topPercent =
    startPercent + (endPercent - startPercent) * scrollProgress;
  const leftPercent =
    startPercent + (endPercent - startPercent) * scrollProgress;

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          <div className="absolute inset-0 z-0 h-full bg-black" />
          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div className="w-full h-[60dvh] absolute">
                <div className="flex flex-col items-center w-full h-[100%] relative">
                  <div
                    className={`flex gap-4 w-full relative z-10 transition-none flex-col ${
                      textBlend ? "mix-blend-difference" : "mix-blend-normal"
                    }`}
                  >
                    <div className="w-[735px] justify-start text-white text-6xl text-white text-4xl font-medium font-neulis pt-[8vw]">
                      Salg, service og udlejning af AV-løsninger
                    </div>
                  </div>
                  <div
                    className="absolute z-20 top-1/2 left-1/2"
                    style={{
                      top: `${topPercent}%`,
                      left: `${leftPercent}%`,
                      width: "100%",
                      aspectRatio: "16 / 9",
                      transform: "translate(-50%, -50%)",
                      willChange: "clip-path, filter, top, left",
                      clipPath: clipPathValue,
                      filter:
                        scrollProgress > 0.7
                          ? "drop-shadow(0 10px 30px rgba(0,0,0,0.35))"
                          : "none",
                    }}
                    ref={wrapperRef}
                  >
                    {mediaType === "video" ? (
                      mediaSrc.includes("youtube.com") ? (
                        <div className="relative w-full h-full pointer-events-none">
                          <iframe
                            width="100%"
                            height="100%"
                            src={
                              mediaSrc.includes("embed")
                                ? mediaSrc +
                                  (mediaSrc.includes("?") ? "&" : "?") +
                                  "autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1"
                                : mediaSrc.replace("watch?v=", "embed/") +
                                  "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=" +
                                  mediaSrc.split("v=")[1]
                            }
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                          <div
                            className="absolute inset-0 z-10"
                            style={{ pointerEvents: "none" }}
                          />

                          <motion.div
                            className="absolute inset-0 bg-black/30"
                            initial={{ opacity: 0.7 }}
                            animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                      ) : (
                        <div className="relative w-full h-full pointer-events-none">
                          <video
                            src={mediaSrc}
                            poster={posterSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="w-full h-full object-cover"
                            controls={false}
                            disablePictureInPicture
                            disableRemotePlayback
                          />
                          <div
                            className="absolute inset-0 z-10"
                            style={{ pointerEvents: "none" }}
                          />

                          <motion.div
                            className="absolute inset-0 bg-black/30"
                            initial={{ opacity: 0.7 }}
                            animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                      )
                    ) : (
                      <div className="relative w-full h-full">
                        <Image
                          src={mediaSrc}
                          alt={title || "Media content"}
                          width={1280}
                          height={720}
                          className="w-full h-full object-cover"
                        />

                        <motion.div
                          className="absolute inset-0 bg-black/50"
                          initial={{ opacity: 0.7 }}
                          animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  title: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
  video: {
    src: "/Av-center%20showreel.mp4",
    poster:
      "https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg",
    title: "",
    about: {
      overview:
        "This is a demonstration of the ScrollExpandMedia component with a video. As you scroll, the video expands to fill more of the screen, creating an immersive experience. This component is perfect for showcasing video content in a modern, interactive way.",
      conclusion:
        "The ScrollExpandMedia component provides a unique way to engage users with your content through interactive scrolling. Try switching between video and image modes to see different implementations.",
    },
  },
  image: {
    src: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1280&auto=format&fit=crop",
    title: "Dynamic Image Showcase",
    about: {
      overview:
        "This is a demonstration of the ScrollExpandMedia component with an image. The same smooth expansion effect works beautifully with static images, allowing you to create engaging visual experiences without video content.",
      conclusion:
        "The ScrollExpandMedia component works equally well with images and videos. This flexibility allows you to choose the media type that best suits your content while maintaining the same engaging user experience.",
    },
  },
};

export default function ScrollHero(): React.ReactElement {
  const [mediaType] = useState<"video" | "image">("video");
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event("resetSection");
    window.dispatchEvent(resetEvent);
  }, [mediaType]);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === "video" ? currentMedia.poster : undefined}
        title={currentMedia.title}
      ></ScrollExpandMedia>
    </div>
  );
}
