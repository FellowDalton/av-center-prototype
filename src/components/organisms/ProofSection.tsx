"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Building2 } from "lucide-react";

export default function ProofSection(): JSX.Element {
  return (
    <section className="relative z-10 py-20 px-4 bg-gray-900/30">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">Hvorfor Vælge AV Center?</h2>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {[
            { number: "175+", label: "Medarbejdere" },
            { number: "5", label: "Lokationer" },
            { number: "20+", label: "Års erfaring" },
            { number: "100%", label: "Dansk ejet" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Award className="w-12 h-12 mx-auto mb-4 text-gray-400" />,
              title: "Godkendt til SKI-aftaler",
              description:
                "Vi er godkendt til alle AV-relevante SKI-aftaler og kan levere til offentlige institutioner",
            },
            {
              icon: <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />,
              title: "Erfarne specialister",
              description: "Mange af vores medarbejdere har 20+ års erfaring inden for AV-branchen",
            },
            {
              icon: <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />,
              title: "Landsdækkende service",
              description:
                "Med 5 lokationer i Danmark kan vi levere hurtig service og support overalt",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
