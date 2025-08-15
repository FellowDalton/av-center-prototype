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
    { id: "1", title: "Installation" },
    { id: "2", title: "Service" },
    { id: "3", title: "Udlejning" },
    { id: "4", title: "Løsninger" },
    { id: "5", title: "Support" },
  ],
}: LinkListProps): React.ReactElement {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12">
        {/* Left Text Panel - Updated to match Figma style */}
        <div className="w-[478px] inline-flex flex-col justify-center items-start gap-6">
          <div className="self-stretch inline-flex justify-start items-center gap-2">
            <div className="w-1 h-1 bg-emerald-500 rounded-[999px]" />
            <div className="justify-start text-white text-base font-medium font-jetbrains">
              Pre header
            </div>
            <div className="flex-1 h-0 outline outline-[0.50px] outline-offset-[-0.25px] outline-gray-cold-400"></div>
          </div>
          <div className="self-stretch justify-start text-white text-4xl font-normal font-neulis">
            Overskrift hvor der beskrives mere specifikt om AV•Centers services
            og løsninger
          </div>
          <div className="self-stretch justify-start text-gray-cold-300 text-base font-normal font-neulis">
            Vi er én af Danmarks førende virksomheder indenfor salg,
            installation, service og udlejning af audiovisuelle (AV)
            installationer, og vi tilbyder dig en professionel og nærværende
            kontakt med dine ønsker i fokus.
          </div>
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
