"use client";

import React, { useEffect, useState } from "react";
import BackgroundDotsCanvas from "../organisms/BackgroundDotsCanvas";
import Header from "../organisms/Header";
import ScrollHero from "../organisms/ScrollHero";
import Waves from "../organisms/Waves";
import { NavBar } from "@/components/molecules/NavBar";
import { LinkList } from "@/components/molecules/LinkList";
import { CaseStudySection } from "@/components/sections/CaseStudySection";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Footer } from "@/components/organisms/Footer";
import { Briefcase, FileText, Home, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import CursorFollower from "@/components/animations/CursorFollower";

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
    <div className="bg-black text-gray-300 min-h-screen relative">
      <CursorFollower />
      {/*  <BackgroundDotsCanvas /> */}

      {/* Fixed Waves background that becomes absolute when scrolled past */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
        <Waves
          lineColor="rgba(255, 255, 255, 0.1)"
          waveSpeedX={0.0}
          waveSpeedY={0.0}
          className="pointer-events-auto"
        />
      </div>

      {/* Main content before CaseStudySection */}
      <div className="relative z-10">
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

        {/* ScrollHero - wrapped in SectionContainer */}
        <SectionContainer variant="default">
          <ScrollHero />
        </SectionContainer>

        {/* Text Accordion Section - wrapped in SectionContainer */}
        <section className="relative">
          <SectionContainer
            variant="default"
            className="py-10 lg:py-20 lg:mb-[250px]"
          >
            <LinkList />
          </SectionContainer>
        </section>
      </div>

      {/* Case Study Section - handles its own edge layout with solid background to hide waves */}
      <CaseStudySection className="relative z-20 bg-emerald-950" />

      <div className="w-full bg-black py-60 z-20" />

      {/* Footer */}
      <Footer className="relative z-20" />
    </div>
  );
}
