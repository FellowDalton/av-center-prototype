"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, type Variants } from "framer-motion";
import { Building2 } from "lucide-react";

export default function Header(): JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const headerVariants: Variants = {
    top: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderBottomColor: "rgba(55, 65, 81, 0.5)",
      position: "fixed",
      boxShadow: "none",
    },
    scrolled: {
      backgroundColor: "rgba(0, 0, 0, 0.95)",
      borderBottomColor: "rgba(75, 85, 99, 0.7)",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      position: "fixed",
    },
  };

  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.15, ease: "easeIn" } },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="top"
      animate={isScrolled ? "scrolled" : "top"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="px-6 w-full md:px-10 lg:px-16 sticky top-0 z-30 backdrop-blur-md border-b border-gray-800"
    >
      <nav className="flex justify-between items-center max-w-screen-xl mx-auto h-[70px]">
        <div className="flex items-center flex-shrink-0">
          <Building2 className="w-8 h-8 text-gray-400" />
          <span className="text-xl font-bold text-white ml-2">AV CENTER</span>
        </div>

        <div className="hidden md:flex items-center justify-center flex-grow space-x-6 lg:space-x-8 px-4">
          <a href="#services" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">Salg</a>
          <a href="#rental" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">Udlejning</a>
          <a href="#about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">Om Os</a>
          <a href="#locations" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">Lokationer</a>
          <a href="#contact" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">Kontakt</a>
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

          <motion.button
            className="md:hidden text-gray-300 hover:text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm shadow-lg py-4 border-t border-gray-800/50"
          >
            <div className="flex flex-col items-center space-y-4 px-6">
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white">Salg</a>
              <a href="#rental" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white">Udlejning</a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white">Om Os</a>
              <a href="#locations" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white">Lokationer</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-white">Kontakt</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
