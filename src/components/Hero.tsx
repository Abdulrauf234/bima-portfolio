"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white px-6 py-20 text-center"
    >
      {/* Light grid background leak */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex max-w-4xl flex-col items-center gap-6 md:gap-8"
      >
        {/* Available for work Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-800"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          Available For Work
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl"
        >
          I'm <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Bima</span>,
          <br className="hidden sm:inline" /> A UI/UX Frontend Designer.
        </motion.h1>

        {/* Short Subtitle */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base md:text-lg"
        >
          I specialize on designing thoughtful product interfaces for ambitions teams. Turning complex ideas into refined useful software.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <button
            onClick={() => handleScrollTo("contact")}
            className="group flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all hover:bg-slate-850"
          >
            Contact Me
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={() => handleScrollTo("work")}
            className="flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50"
          >
            <Sparkles size={16} className="text-violet-500" />
            View Works
          </button>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => handleScrollTo("about")}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-slate-300 p-1 dark:border-slate-800"
        >
          <div className="h-2 w-1 rounded-full bg-slate-400 dark:bg-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
