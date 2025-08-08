"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactSection(): React.ReactElement {
  return (
    <section id="contact" className="relative z-10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Kontakt Os</h2>
          <p className="text-lg text-gray-400">Klar til at diskutere dit næste AV-projekt? Kontakt os i dag</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">Vores Lokationer</h3>
            <div className="space-y-6">
              {[
                { city: "København", address: "Hovedkontor" },
                { city: "Odense", address: "Fyn afdeling" },
                { city: "Kolding", address: "Sydjylland" },
                { city: "Aarhus", address: "Østjylland" },
                { city: "Aalborg", address: "Nordjylland" },
              ].map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-white font-medium">{location.city}</div>
                    <div className="text-gray-400 text-sm">{location.address}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-white">+45 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-white">info@avcenter.dk</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Send os en besked</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Dit navn"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Din email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Virksomhed"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Beskriv dit projekt..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-gray-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-600 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send besked
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
