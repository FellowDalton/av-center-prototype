"use client";

import React, { useEffect, useState } from "react";
import BackgroundDotsCanvas from "../organisms/BackgroundDotsCanvas";
import Header from "../organisms/Header";
import HeroSection from "../organisms/HeroSection";
import ScrollHero from "../organisms/ScrollHero";
import FeaturesSection from "../organisms/FeaturesSection";
import ProofSection from "../organisms/ProofSection";
import ContactSection from "../organisms/ContactSection";
import Footer from "../organisms/Footer";
import { NavBar } from "@/components/molecules/NavBar";
import { Briefcase, FileText, Home, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function HomeTemplate(): React.ReactElement {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: "Salg", url: "#services", icon: Home },
    { name: "Udlejning", url: "#rental", icon: Briefcase },
    { name: "Om Os", url: "#about", icon: User },
    { name: "Lokationer", url: "#locations", icon: FileText },
    { name: "Kontakt", url: "#contact", icon: FileText },
  ];

  return (
    <div className="bg-black text-gray-300 min-h-screen">
      <BackgroundDotsCanvas />
      <Header />
      {/* Mobile-only sticky-from-bottom NavBar. Starts fixed at bottom, sticks below header on scroll */}
      <div className="md:hidden sticky top-[72px] z-40 flex justify-center pointer-events-none">
        <div
          className={cn(
            isScrolled
              ? "relative"
              : "fixed bottom-4 left-1/2 -translate-x-1/2",
            "pointer-events-auto"
          )}
        >
          <NavBar items={navItems} />
        </div>
      </div>
      <ScrollHero />
      <HeroSection />
      <FeaturesSection />
      <ProofSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
