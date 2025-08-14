"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Home, Briefcase, User, FileText } from "lucide-react";
import { Logo } from "./Logo";
import { ChatButton } from "./ChatButton";
import { NavBar } from "@/components/molecules/NavBar";
import { useScrollPosition } from "@/lib/hooks/useScrollPosition";

export function Header(): React.ReactElement {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { isScrolled, isVisible } = useScrollPosition({
    threshold: 10,
    hideOnScrollDown: false, // Keep header always visible for better UX
  });

  const headerVariants: Variants = {
    visible: {
      y: 0,
      opacity: 1,
    },
    hidden: {
      y: -100,
      opacity: 0,
    },
  };

  const backgroundVariants: Variants = {
    transparent: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      boxShadow: "none",
    },
    solid: {
      backgroundColor: "rgba(0, 0, 0, 0.95)",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
  };

  const navItems = [
    { name: "Salg", url: "#services", icon: Home },
    { name: "Udlejning", url: "#rental", icon: Briefcase },
    { name: "Om Os", url: "#about", icon: User },
    { name: "Lokationer", url: "#locations", icon: FileText },
    { name: "Kontakt", url: "#contact", icon: FileText },
  ];

  const handleChatClick = () => {
    setIsChatOpen(!isChatOpen);
    // TODO: Implement chat modal/panel
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-30 w-full"
    >
      <motion.div
        variants={backgroundVariants}
        initial="transparent"
        animate={isScrolled ? "solid" : "transparent"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="backdrop-blur-md px-6 md:px-10 lg:px-16"
      >
        <nav className="flex justify-between items-center max-w-[1188px] mx-auto h-[70px]">
          {/* Logo Section */}
          <Logo />

          {/* Navigation Section - Desktop */}
          <div className="hidden md:flex items-center justify-center flex-grow px-4">
            <NavBar
              items={navItems}
              inline
              className="relative sm:static sm:translate-x-0 sm:mb-0"
            />
          </div>

          {/* Action Section */}
          <div className="flex items-center flex-shrink-0 space-x-4 lg:space-x-6">
            {/* Chat Button */}
            <ChatButton onClick={handleChatClick} />
          </div>
        </nav>
      </motion.div>
    </motion.header>
  );
}

export default Header;
