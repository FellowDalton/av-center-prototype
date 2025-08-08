"use client";

import React, { type FormEvent } from "react";
import { motion, type Variants } from "framer-motion";
import RotatingText from "../atoms/RotatingText";
import DisplayCards from "./DisplayCards";

export default function HeroSection(): React.ReactElement {
  const contentDelay = 0.3;
  const itemDelayIncrement = 0.1;

  const bannerVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: contentDelay } },
  };
  const headlineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement } },
  };
  const subHeadlineVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement * 2 } },
  };
  const formVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement * 3 } },
  };
  const cardsVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: contentDelay + itemDelayIncrement * 4 } },
  };

  return (
    <section className="relative z-10 min-h-screen flex items-center px-4 text-center py-28 sm:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={bannerVariants} initial="hidden" animate="visible" className="mb-6">
          <span className="bg-gray-800 border border-gray-600 text-gray-300 px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
            Danmarks førende AV-virksomhed siden 1985
          </span>
        </motion.div>

        <motion.h1
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto mb-6"
        >
          Professionelle{" "}
          <span className="inline-block h-[1.2em] overflow-hidden align-bottom">
            <RotatingText
              texts={["AV-løsninger", "Installationer", "Udlejninger", "Systemer"]}
              mainClassName="text-gray-400 mx-1"
              staggerFrom={"last"}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "110%", opacity: 0 }}
              staggerDuration={0.01}
              transition={{ type: "spring", damping: 18, stiffness: 250 }}
              rotationInterval={2200}
              splitBy="characters"
              auto={true}
              loop={true}
            />
          </span>
          <br />til moderne virksomheder
        </motion.h1>

        <motion.p
          variants={subHeadlineVariants}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8"
        >
          Med 175+ medarbejdere og 5 lokationer i Danmark leverer vi skræddersyede audiovisuelle løsninger. Fra projektorer og interaktive tavler til komplette konferencesystemer.
        </motion.p>

        <motion.form
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto mb-16 sm:mb-20 lg:mb-24"
          onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Din virksomheds email"
            required
            className="flex-grow w-full sm:w-auto px-4 py-3 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
          />
          <motion.button
            type="submit"
            className="w-full sm:w-auto bg-gray-700 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-gray-600 transition-colors duration-200 whitespace-nowrap shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            Få gratis konsultation
          </motion.button>
        </motion.form>

        <motion.div variants={cardsVariants} initial="hidden" animate="visible" className="flex justify-center">
          <DisplayCards />
        </motion.div>
      </div>
    </section>
  );
}
