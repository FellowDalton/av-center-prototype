"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface LinkListItem {
  id: string;
  title: string;
}

export interface LinkListProps {
  className?: string;
  linkItems?: LinkListItem[];
}

export function LinkList({
  className,
  linkItems = [
    { id: "1", title: "Overskrift 1" },
    { id: "2", title: "Overskrift 2" },
    { id: "3", title: "Overskrift 3" },
    { id: "4", title: "Overskrift 4" },
    { id: "5", title: "Overskrift 5" },
  ],
}: LinkListProps): React.ReactElement {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12">
        {/* Left Text Panel - Figma Imported Content */}
        <div className="flex flex-col justify-center items-start gap-6 max-w-[478px]">
          {/* Pre-header with green dot and line */}
          <div className="self-stretch flex justify-start items-center gap-2">
            <div className="w-1 h-1 bg-emerald-500 rounded-full" />
            <div className="text-white text-base font-mono font-medium">
              Pre header
            </div>
            <div className="flex-1 h-px border-t border-gray-400" />
          </div>

          {/* Main heading */}
          <h1 className="self-stretch text-white text-4xl font-normal leading-tight">
            Overskrift hvor der beskrives mere specifikt om AV•Centers services
            og løsninger
          </h1>

          {/* Description */}
          <p className="self-stretch text-gray-300 text-base font-normal leading-relaxed">
            Vi er én af Danmarks førende virksomheder indenfor salg,
            installation, service og udlejning af audiovisuelle (AV)
            installationer, og vi tilbyder dig en professionel og nærværende
            kontakt med dine ønsker i fokus.
          </p>
        </div>

        {/* Right Link List Panel - Figma Style */}
        <div className="flex flex-col justify-start items-center w-full max-w-[380px] ml-auto">
          {/* Top divider */}
          <div className="self-stretch h-px border-t border-gray-400" />

          {linkItems.map((item) => (
            <React.Fragment key={item.id}>
              <div
                className="self-stretch relative flex justify-between items-end align-center cursor-pointer py-4"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="text-white text-base font-mono font-normal">
                  {item.title}
                </div>

                {/* Animated emerald dots on hover */}
                <div className="w-full h-6 absolute left-0 top-1/2 -translate-y-1/2">
                  {Array.from({ length: 7 }, (_, i) => {
                    const positions = [
                      { x: 364.4, y: 3.6 }, // leftmost group
                      { x: 364.4, y: 18 }, // leftmost group
                      { x: 366.8, y: 6 }, // middle-left group
                      { x: 366.8, y: 15.6 }, // middle-left group
                      { x: 369.2, y: 13.2 }, // middle-right group
                      { x: 369.2, y: 8.4 }, // middle-right group
                      { x: 371.6, y: 10.8 }, // rightmost
                    ];

                    // Group dots by their lighting sequence
                    const getAnimationGroup = (index: number) => {
                      if (index <= 1) return 0; // leftmost group
                      if (index <= 3) return 1; // middle-left group
                      if (index <= 5) return 2; // middle-right group
                      return 3; // rightmost
                    };

                    const animationGroup = getAnimationGroup(i);
                    const pos = positions[i];

                    return (
                      <motion.div
                        key={i}
                        className="w-[2.4px] h-[2.4px] absolute bg-emerald-500 rounded-full"
                        style={{
                          left: `${(pos.x / 380) * 100}%`,
                          top: `${pos.y}px`,
                        }}
                        animate={{
                          opacity: hoveredItem === item.id ? 0.8 : 0.3,
                          scale: hoveredItem === item.id ? 1.2 : 1,
                        }}
                        transition={{
                          duration: 0.15,
                          delay:
                            hoveredItem === item.id
                              ? animationGroup * 0.08
                              : (3 - animationGroup) * 0.08,
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Bottom divider for each item */}
              <div className="self-stretch h-px border-t border-gray-400" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LinkList;
