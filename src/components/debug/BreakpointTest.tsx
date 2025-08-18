"use client";

import { useEffect, useState } from "react";

export default function BreakpointTest() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="fixed top-20 right-4 z-50 bg-white text-black p-2 rounded shadow-lg">
      <div className="text-xs font-mono">
        <div>Width: {width}px</div>
        <div className="block sm:hidden">{"< 640px"}</div>
        <div className="hidden sm:block md:hidden">sm: 640px+</div>
        <div className="hidden md:block lg:hidden">md: 768px+</div>
        <div className="hidden lg:block xl:hidden">lg: 1220px+</div>
        <div className="hidden xl:block 2xl:hidden">xl: 1280px+</div>
        <div className="hidden 2xl:block">2xl: 1536px+</div>
      </div>
    </div>
  );
}
