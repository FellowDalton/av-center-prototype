"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { DotsArrow } from "@/components/atoms/DotsArrow";

interface DepartmentInfo {
  name: string;
  phone: string;
  email: string;
}

const departments: DepartmentInfo[] = [
  {
    name: "København",
    phone: "70 20 17 99",
    email: "koebenhavn@avcenter.dk",
  },
  {
    name: "Odense",
    phone: "70 20 29 55",
    email: "odense@avcenter.dk",
  },
  {
    name: "Kolding",
    phone: "75 53 60 00",
    email: "kolding@avcenter.dk",
  },
  {
    name: "Aarhus",
    phone: "70 20 98 05",
    email: "aarhus@avcenter.dk",
  },
  {
    name: "Aalborg",
    phone: "70 20 29 99",
    email: "aalborg@avcenter.dk",
  },
  {
    name: "Cinema",
    phone: "57 82 08 68",
    email: "cinema@avcenter.dk",
  },
];

const AVCenterLogo = () => (
  <div className="h-[42px] w-[388px] relative overflow-hidden">
    <svg viewBox="0 0 388 42" fill="none" className="w-full h-full">
      {/* AV Center Logo SVG paths - simplified version */}
      <text
        x="0"
        y="30"
        className="fill-white text-3xl font-bold tracking-wider"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        AV•CENTER
      </text>
    </svg>
  </div>
);

export const Footer = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  const [email, setEmail] = React.useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Newsletter subscription:", email);
  };

  return (
    <footer
      ref={ref}
      className={cn(
        "bg-gray-cold-900 text-white px-16 pt-[100px] pb-12",
        className
      )}
      {...props}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top section - Newsletter and CTA */}
        <div className="flex flex-row items-start justify-between mb-[86px]">
          {/* Newsletter Section */}
          <div className="flex flex-col gap-20">
            <div className="flex flex-col gap-4 w-full">
              <h3 className="font-mono font-medium text-lg text-white">
                Nyhedsbrev
              </h3>
              <p className="font-sans text-2xl text-white w-[334px]">
                Hold dig opdateret på AV-nyheder og events.
              </p>

              {/* Email Input with Dots Arrow */}
              <form onSubmit={handleNewsletterSubmit} className="relative">
                <div className="flex flex-row gap-2 items-center px-0 py-1.5 w-full border-b border-emerald-200">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Skriv din e-mail"
                    className="font-mono font-normal text-sm text-emerald-400 bg-transparent border-none outline-none flex-1 placeholder:text-emerald-400"
                  />
                  <button
                    type="submit"
                    className="relative h-5 w-20 group"
                    aria-label="Tilmeld nyhedsbrev"
                  >
                    <DotsArrow className="w-20 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Call to Action Text */}
          <div className="w-[465px]">
            <p className="font-sans text-4xl text-white leading-normal">
              Lad os{" "}
              <span className="underline decoration-gray-cold-300">
                tage en snak
              </span>{" "}
              ... lorem ipsum noget med AV-løsninger. Du kan også find os på{" "}
              <a
                href="#"
                className="underline decoration-gray-cold-300 hover:decoration-emerald-400 transition-colors"
              >
                Facebook
              </a>{" "}
              eller{" "}
              <a
                href="#"
                className="underline decoration-gray-cold-300 hover:decoration-emerald-400 transition-colors"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </div>

        {/* Departments Section */}
        <div className="flex flex-col gap-16 w-full mb-11">
          {/* Section Header */}
          <div className="flex flex-row gap-2 items-center w-full">
            <h2 className="font-mono font-medium text-base text-white whitespace-nowrap">
              Afdelinger
            </h2>
            <div className="flex-1 h-px bg-gray-cold-500"></div>
          </div>

          {/* Departments Grid */}
          <div className="flex flex-row items-center justify-between w-full">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="flex flex-col gap-2.5 h-[75px] w-[185px]"
              >
                <h3 className="font-sans font-medium text-lg text-white">
                  {dept.name}
                </h3>
                <a
                  href={`tel:${dept.phone.replace(/\s/g, "")}`}
                  className="font-mono font-normal text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {dept.phone}
                </a>
                <a
                  href={`mailto:${dept.email}`}
                  className="font-mono font-normal text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  {dept.email}
                </a>
              </div>
            ))}
          </div>

          {/* Bottom Border */}
          <div className="h-px bg-gray-cold-500 w-full"></div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-11 w-full">
          {/* Logo */}
          <AVCenterLogo />

          {/* Footer Links */}
          <div className="flex flex-row items-center justify-between w-full">
            {/* Left Links */}
            <div className="flex flex-row gap-12 items-center">
              <span className="font-mono font-normal text-xs text-gray-cold-300 whitespace-nowrap">
                Medlem af AV Brancheforeningen
              </span>
              <span className="font-mono font-normal text-xs text-gray-cold-300 whitespace-nowrap">
                SKI-leverandør
              </span>
            </div>

            {/* Right Links */}
            <div className="flex flex-row gap-12 items-center">
              <a
                href="#"
                className="font-mono font-normal text-xs text-gray-cold-300 hover:text-white transition-colors whitespace-nowrap"
              >
                Vilkår og betingelser
              </a>
              <a
                href="#"
                className="font-mono font-normal text-xs text-gray-cold-300 hover:text-white transition-colors whitespace-nowrap"
              >
                Persondatapolitik
              </a>
              <a
                href="#"
                className="font-mono font-normal text-xs text-gray-cold-300 hover:text-white transition-colors whitespace-nowrap"
              >
                Cookie politik
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
