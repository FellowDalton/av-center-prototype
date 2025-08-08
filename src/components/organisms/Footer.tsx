"use client";

import React from "react";
import {
  Building2,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Linkedin as LinkedinIcon,
  Youtube as YoutubeIcon,
} from "lucide-react";

export default function Footer(): React.ReactElement {
  return (
    <footer className="relative z-10 bg-gray-900/50 border-t border-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Building2 className="w-6 h-6 text-gray-400 mr-2" />
              <span className="text-lg font-bold text-white">AV CENTER</span>
            </div>
            <p className="text-gray-400 text-sm">
              Danmarks førende leverandør af professionelle audiovisuelle løsninger siden 1985.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Tjenester</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Salg
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Installation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Udlejning
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Virksomhed</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Om os
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Karriere
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Nyheder
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Følg os</h4>
            <div className="flex space-x-4">
              <FacebookIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <LinkedinIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <InstagramIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <YoutubeIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} AV Center. Alle rettigheder forbeholdes.</p>
        </div>
      </div>
    </footer>
  );
}
