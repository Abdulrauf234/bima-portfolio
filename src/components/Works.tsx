"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Sparkles, Smartphone, Monitor } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: "mobile" | "web";
  desc: string;
  longDesc: string;
  role: string;
  year: string;
  color: string;
  accentColor: string;
}

const projects: Project[] = [
  {
    id: "nova-pay",
    title: "Nova Pay",
    category: "mobile",
    desc: "A futuristic financial app that simplifies global transactions with micro-animations and zero-friction flows.",
    longDesc: "Nova Pay is a next-generation neo-banking app designed to streamline borderless transfers. Through extensive user research, we crafted an interface featuring micro-animations that confirm financial operations, a dark minimalist command center, and one-tap invoice settlements.",
    role: "Lead Product Designer",
    year: "2025",
    color: "from-slate-900 to-violet-950",
    accentColor: "#a78bfa",
  },
  {
    id: "aura-workspace",
    title: "Aura Workspace",
    category: "web",
    desc: "An AI-powered dashboard offering smooth Kanban workflows and high-fidelity analytical reporting.",
    longDesc: "Aura is a collaborative B2B tool designed to coordinate cross-functional sprints. The design system features glassmorphism workspace grids, intuitive shortcuts, and rich statistics panels that load seamlessly with zero UI lag.",
    role: "Lead UI/UX Designer",
    year: "2026",
    color: "from-slate-900 to-indigo-950",
    accentColor: "#818cf8",
  },
  {
    id: "zen-bloom",
    title: "Zen Bloom",
    category: "mobile",
    desc: "A wellness and meditation app focused on calming animations, custom dark modes, and habit tracking.",
    longDesc: "Zen Bloom uses breathing exercise loops and custom soft-shadow sound player interfaces to cultivate deep tranquility. We combined soft neutral tones with rich color therapy indicators to reward consistent stress-relief routines.",
    role: "Mobile App UI Designer",
    year: "2025",
    color: "from-slate-900 to-emerald-950",
    accentColor: "#34d399",
  },
];

export default function Works() {
  const [filter, setFilter] = useState<"all" | "web" | "mobile">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section id="work" className="relative w-full bg-slate-900 px-6 py-28 text-white">
      <div className="mx-auto max-w-5xl space-y-16">
        
        {/* Title */}
        <div className="flex flex-col justify-between gap-6 items-center text-center md:flex-row md:items-end md:text-left">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-violet-500">
              Featured Work
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Selected Creations
            </h2>
          </div>

          {/* Filters */}
          <div className="flex gap-2 rounded-full bg-slate-950/80 p-1 border border-slate-800 self-center md:self-start">
            {(["all", "web", "mobile"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`relative rounded-full px-5 py-1.5 text-xs font-semibold capitalize transition-colors ${
                  filter === tab ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {filter === tab && (
                  <motion.span
                    layoutId="activeTabGlow"
                    className="absolute inset-0 z-0 rounded-full bg-slate-800"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProject(project)}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br ${project.color} p-6 shadow-xl cursor-pointer`}
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 h-32 w-32 bg-white/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
                
                {/* Content */}
                <div className="space-y-12">
                  <div className="flex justify-between items-start">
                    <span className="rounded-full bg-white/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                      {project.category === "mobile" ? (
                        <span className="flex items-center gap-1"><Smartphone size={10} /> Mobile App</span>
                      ) : (
                        <span className="flex items-center gap-1"><Monitor size={10} /> Web Platform</span>
                      )}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{project.year}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-violet-200">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-300 line-clamp-3">
                      {project.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Link Button */}
                <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors">
                    View Case Study
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:rotate-45 group-hover:bg-white group-hover:text-slate-950">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-2xl md:p-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} style={{ color: selectedProject.accentColor }} />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: selectedProject.accentColor }}>
                    Case Study
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400">
                    <span>Role: {selectedProject.role}</span>
                    <span>•</span>
                    <span>Year: {selectedProject.year}</span>
                    <span>•</span>
                    <span className="capitalize">Platform: {selectedProject.category}</span>
                  </div>
                </div>

                <hr className="border-slate-800" />

                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-slate-300 md:text-base">
                    {selectedProject.longDesc}
                  </p>
                </div>

                {/* Mockup Presentation Area */}
                <div
                  className={`mt-6 rounded-2xl bg-gradient-to-br ${selectedProject.color} py-12 px-6 text-center border border-white/5`}
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-white/50 block mb-2">
                    Mockup Frame
                  </span>
                  <div className="inline-block rounded-2xl bg-black/40 border border-white/10 p-6 max-w-sm text-left shadow-lg">
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    </div>
                    <div className="h-24 w-64 flex flex-col justify-between">
                      <div className="h-2 w-24 bg-white/20 rounded-full" />
                      <div className="h-3 w-40 bg-white/10 rounded-full" />
                      <div className="flex justify-between items-end">
                        <div className="h-6 w-6 rounded bg-white/15" />
                        <div className="h-4 w-12 bg-white/25 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full bg-slate-900 border border-slate-800 px-6 py-2.5 text-xs font-semibold text-white hover:bg-slate-800"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
