"use client";

import React from "react";
import BackgroundDotsCanvas from "../organisms/BackgroundDotsCanvas";
import Header from "../organisms/Header";
import HeroSection from "../organisms/HeroSection";
import FeaturesSection from "../organisms/FeaturesSection";
import ProofSection from "../organisms/ProofSection";
import ContactSection from "../organisms/ContactSection";
import Footer from "../organisms/Footer";

export default function HomeTemplate(): React.ReactElement {
  return (
    <div className="bg-black text-gray-300 min-h-screen">
      <BackgroundDotsCanvas />
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ProofSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
