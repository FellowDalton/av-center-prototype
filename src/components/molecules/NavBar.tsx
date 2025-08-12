"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/components/utils/cn";

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

export interface NavBarProps {
  items: NavItem[];
  className?: string;
  inline?: boolean; // if true, render inline (not fixed); used for desktop header
}

export function NavBar({ items, className, inline = false }: NavBarProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<string>(items[0]?.name ?? "");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize and sync active tab with URL hash so the selected state persists
  useEffect(() => {
    const assignFromHash = () => {
      const currentHash = window.location.hash;
      if (!currentHash) return;
      const matched = items.find((i) => i.url === currentHash)?.name;
      if (matched) setActiveTab(matched);
    };
    assignFromHash();
    window.addEventListener("hashchange", assignFromHash);
    return () => window.removeEventListener("hashchange", assignFromHash);
  }, [items]);

  return (
    <div
      className={cn(
        inline
          ? "relative z-20"
          : "relative z-50",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex items-center rounded-full border border-white/10 backdrop-blur-[5px]",
          // Slightly lighter container background so the active pill stands out
          "bg-[rgba(40,47,58,0.20)]",
          "h-[50px]",
          "px-1",
          isMobile ? "shadow-lg" : "shadow-md",
        )}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-medium px-6 py-4 rounded-full transition-colors",
                "text-white/90 hover:text-white",
                isActive && "text-white",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="active-nav-pill"
                  className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-[rgba(40,47,58,0.40)] backdrop-blur-[6px]"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {/* No active lamp effect per Figma spec */}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default NavBar;

