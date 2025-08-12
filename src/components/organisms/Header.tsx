"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, type Variants } from "framer-motion";
import { Building2, Home, User, Briefcase, FileText } from "lucide-react";
import { NavBar } from "@/components/molecules/NavBar";

export default function Header(): React.ReactElement {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  // No mobile menu overlay anymore; NavBar handles mobile presentation
  useEffect(() => {
    document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const headerVariants: Variants = {
    top: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      position: "fixed",
      boxShadow: "none",
    },
    scrolled: {
      backgroundColor: "rgba(0, 0, 0, 0.95)",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      position: "fixed",
    },
  };

  const navItems = [
    { name: "Salg", url: "#services", icon: Home },
    { name: "Udlejning", url: "#rental", icon: Briefcase },
    { name: "Om Os", url: "#about", icon: User },
    { name: "Lokationer", url: "#locations", icon: FileText },
    { name: "Kontakt", url: "#contact", icon: FileText },
  ];

  return (
    <motion.header
      variants={headerVariants}
      initial="top"
      animate={isScrolled ? "scrolled" : "top"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
        className="px-6 w-full md:px-10 lg:px-16 sticky top-0 z-30 backdrop-blur-md"
    >
      <nav className="flex justify-between items-center max-w-screen-xl mx-auto h-[70px]">
        <div className="flex items-center flex-shrink-0">
          <Building2 className="w-8 h-8 text-gray-400" />
          <span className="text-xl font-bold text-white ml-2">AV CENTER</span>
        </div>

        <div className="hidden md:flex items-center justify-center flex-grow px-4">
          <NavBar items={navItems} inline className="relative sm:static sm:translate-x-0 sm:mb-0" />
        </div>

        <div className="flex items-center flex-shrink-0 space-x-4 lg:space-x-6">
          <motion.a
            href="#contact"
            className="bg-gray-700 text-white px-4 py-[6px] rounded-md text-sm font-semibold hover:bg-gray-600 transition-colors duration-200 whitespace-nowrap shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            Få Tilbud
          </motion.a>

          {/* Mobile NavBar floating at bottom; keep CTA visible */}
        </div>
      </nav>

      {/* Mobile NavBar is rendered by HomeTemplate as a sticky-from-bottom control */}
    </motion.header>
  );
}
