"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { PhoneCall, Compass, PenTool, Award } from "lucide-react";

interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const steps: ProcessStep[] = [
  {
    num: "01",
    title: "Book a call or meeting",
    desc: "We discuss your goals, define scope, align on values, and lay down the product strategy roadmap.",
    icon: <PhoneCall className="h-6 w-6 text-violet-400" />,
  },
  {
    num: "02",
    title: "Getting familiar with the product",
    desc: "Deep research, user interviews, auditing existing tools, and gathering benchmark insights.",
    icon: <Compass className="h-6 w-6 text-fuchsia-400" />,
  },
  {
    num: "03",
    title: "Wireframing & ideation",
    desc: "Mapping flows, conceptualizing layouts, and designing iterative blueprints to solve core problems.",
    icon: <PenTool className="h-6 w-6 text-indigo-400" />,
  },
  {
    num: "04",
    title: "Final polished design",
    desc: "Delivering pixel-perfect high-fidelity designs, style guides, interactive prototypes, and developer specs.",
    icon: <Award className="h-6 w-6 text-emerald-400" />,
  },
];

function Card({ step }: { step: ProcessStep }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-950/60 p-8 transition-all hover:bg-slate-900/50 text-center items-center md:text-left md:items-start"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
    >
      {/* Light glow spotlight on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="flex flex-col gap-6 items-center md:items-start w-full">
        {/* Step Top */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between w-full">
          <span className="text-4xl font-extrabold text-slate-800 transition-colors group-hover:text-violet-500/30">
            {step.num}
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 group-hover:border-violet-500/20">
            {step.icon}
          </div>
        </div>

        {/* Step Info */}
        <div className="space-y-2 w-full">
          <h3 className="text-xl font-bold text-white group-hover:text-violet-200">
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed text-slate-400">
            {step.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  return (
    <section
      id="about"
      className="relative w-full bg-slate-950 px-6 py-28 text-white"
    >
      {/* Soft background glow decoration */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 h-[500px] w-[500px] rounded-full bg-fuchsia-600/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl space-y-16">
        {/* Intro */}
        <div className="max-w-2xl space-y-4 text-center md:text-left mx-auto md:mx-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-wider text-violet-500"
          >
            My Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight"
          >
            My approach to designing clean, thoughtful product interfaces.
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {steps.map((step) => (
            <Card key={step.num} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
