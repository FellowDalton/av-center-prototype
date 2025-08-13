"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatButtonProps {
  className?: string;
  onClick?: () => void;
}

export function ChatButton({ className = "", onClick }: ChatButtonProps): React.ReactElement {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-2 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap z-50"
          >
            Start chat
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors duration-200"
        style={{
          padding: '14.86px',
          background: 'rgba(55, 65, 82, 0.50)',
          borderRadius: '927.64px',
          backdropFilter: 'blur(5.57px)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        aria-label="Open chat"
      >
        {/* Chat Icon - dotted pattern from Figma design */}
        <div className="relative w-[22.29px] h-[22.29px]">
          <div className="absolute w-[2.23px] h-[2.23px] left-[15.60px] top-[3.34px] bg-white rounded-full" />
          <div className="absolute w-[2.23px] h-[2.23px] left-[12.26px] top-[3.34px] bg-white rounded-full" />
          <div className="absolute w-[2.23px] h-[2.23px] left-[17.83px] top-[8.91px] bg-white rounded-full" />
          <div className="absolute w-[2.23px] h-[2.23px] left-[3.34px] top-[5.57px] bg-white rounded-full" />
          <div className="absolute w-[2.23px] h-[2.23px] left-[5.57px] top-[3.34px] bg-white rounded-full" />
          <div className="absolute w-[2.23px] h-[2.23px] left-[8.91px] top-[3.34px] bg-white rounded-full" />
          <div className="absolute w-[2.23px] h-[2.23px] left-[17.83px] top-[12.26px] bg-white rounded-full" />
          <div className="absolute w-[2.23px] h-[2.23px] left-[15.60px] top-[14.49px] bg-white rounded-full" />
          <div className="absolute w-[2.23px] h-[2.23px] left-[12.26px] top-[14.49px] bg-white rounded-full" />
          <div className="absolute w-[2.23px] h-[2.23px] left-[8.91px] top-[14.49px] bg-white rounded-full" />
          <div className="absolute w-[2.23px] h-[2.23px] left-[6.69px] top-[16.71px] bg-white rounded-full" />
          <div className="absolute w-[2.23px] h-[2.23px] left-[3.34px] top-[8.91px] bg-white rounded-full" />
          <div className="absolute w-[2.23px] h-[2.23px] left-[3.34px] top-[12.26px] bg-white rounded-full" />
          <div className="absolute w-[2.23px] h-[2.23px] left-[3.34px] top-[15.60px] bg-white rounded-full" />
          <div className="absolute w-[2.23px] h-[2.23px] left-[3.34px] top-[18.94px] bg-white rounded-full" />
          <div className="absolute w-[2.23px] h-[2.23px] left-[17.83px] top-[5.57px] bg-white rounded-full" />
        </div>

        {/* Notification dot with pulse animation - positioned per Figma design */}
        <motion.div
          className="absolute w-[11.14px] h-[11.14px] rounded-full"
          style={{
            left: '36.21px',
            top: '0.93px',
            background: 'var(--Color-Emerald-500, #13BC7F)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Ripple effect on click */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/20"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: [0, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
        />
      </motion.button>
    </div>
  );
}

export default ChatButton;