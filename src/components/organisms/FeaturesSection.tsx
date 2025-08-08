"use client";

import React from "react";
import { motion } from "framer-motion";
import { Monitor, Mic, Camera, Lightbulb, Building2, Headphones } from "lucide-react";

export default function FeaturesSection(): React.ReactElement {
  return (
    <section id="services" className="relative z-10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Vores Tjenester</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Fra salg og installation til service og udlejning - vi dækker alle dine AV-behov
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Monitor className="w-8 h-8" />,
              title: "Projektorer & Skærme",
              description: "Professionelle projektorer, interaktive tavler og store skærme til enhver anvendelse",
            },
            {
              icon: <Mic className="w-8 h-8" />,
              title: "Lydsystemer",
              description: "Konferencesystemer, højttalere og mikrofoner til krystalklart lyd",
            },
            {
              icon: <Camera className="w-8 h-8" />,
              title: "Videokonference",
              description: "Moderne videokonferenceløsninger for effektiv fjernkommunikation",
            },
            {
              icon: <Lightbulb className="w-8 h-8" />,
              title: "LED & Belysning",
              description: "LED-strips, scene- og dekorationsbelysning til events og installationer",
            },
            {
              icon: <Building2 className="w-8 h-8" />,
              title: "Rumkontrolsystemer",
              description: "Intelligente styringssystemer til komplette AV-installationer",
            },
            {
              icon: <Headphones className="w-8 h-8" />,
              title: "Udlejning",
              description: "Komplet udlejning af AV-udstyr til events, konferencer og produktioner",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
            >
              <div className="text-gray-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
