"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Sparkles, Smartphone, Monitor, ZoomIn, Maximize2 } from "lucide-react";
import { getProjects, DEFAULT_PROJECTS, Project } from "@/lib/projectsService";


export default function Works() {
  const [filter, setFilter] = useState<"all" | "web" | "mobile">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>(DEFAULT_PROJECTS);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    getProjects()
      .then((data) => setProjectsList(data))
      .catch(() => setProjectsList(DEFAULT_PROJECTS))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredProjects = projectsList.filter(
    (p) => filter === "all" || p.category === filter
  );

  const resetPreview = () => {
    setIsImageExpanded(false);
    setZoomLevel(1);
  };

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
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br ${project.color} p-6 shadow-xl cursor-pointer mx-auto w-full max-w-md md:max-w-none`}
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

                  {/* Mockup Thumbnail */}
                  {project.mockupImg && (
                    <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-950/50 aspect-video flex items-center justify-center shadow-lg">
                      <img
                        src={project.mockupImg}
                        alt={`${project.title} Design`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
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
          <div
            onClick={() => {
              setSelectedProject(null);
              resetPreview();
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 py-8 backdrop-blur-md overflow-y-auto cursor-pointer"
          >
            {/* Persistent Floating Close Button */}
            <button
              onClick={() => {
                setSelectedProject(null);
                resetPreview();
              }}
              className="fixed top-4 right-4 md:top-8 md:right-8 z-55 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all shadow-2xl backdrop-blur cursor-pointer"
              title="Close Case Study"
            >
              <X size={20} />
            </button>

            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-950 p-6 md:p-10 shadow-2xl scrollbar-thin cursor-default"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                
                {/* Left Side: Metadata, Text and Close Action */}
                <div className="flex flex-col justify-between space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} style={{ color: selectedProject.accentColor }} />
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: selectedProject.accentColor }}>
                        Case Study
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                        {selectedProject.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-400">
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
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        resetPreview();
                      }}
                      className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/30 hover:bg-red-950/20 hover:text-red-400 px-6 py-3 text-xs font-bold text-white transition-all shadow-lg w-full md:w-auto justify-center cursor-pointer"
                    >
                      <X size={15} /> Close Case Study
                    </button>
                  </div>
                </div>

                {/* Right Side: Mockup Presentation Area */}
                <div
                  className={`rounded-3xl bg-gradient-to-br ${selectedProject.color} p-6 md:p-8 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden min-h-[300px] md:min-h-full`}
                >
                  <div className="absolute top-0 right-0 h-32 w-32 bg-white/5 rounded-bl-full pointer-events-none" />
                  
                  <div className="flex items-center justify-between w-full max-w-sm mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                      Mockup Frame
                    </span>
                    {selectedProject.mockupImg && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setZoomLevel((prev) => (prev === 1 ? 1.8 : 1));
                          }}
                          className="rounded-full border border-white/10 bg-slate-900/70 p-2 text-slate-200 transition hover:bg-white/10"
                          title="Toggle zoom"
                        >
                          <ZoomIn size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsImageExpanded(true);
                          }}
                          className="rounded-full border border-white/10 bg-slate-900/70 p-2 text-slate-200 transition hover:bg-white/10"
                          title="View full screen"
                        >
                          <Maximize2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="rounded-2xl bg-black/40 border border-white/10 p-4 md:p-6 w-full max-w-sm text-center shadow-2xl mx-auto">
                    <div className="flex items-center justify-center gap-1.5 mb-4">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    {selectedProject.mockupImg ? (
                      <div className="relative rounded-lg overflow-hidden border border-white/5 bg-slate-950/80 aspect-[16/10] flex items-center justify-center">
                        <img
                          src={selectedProject.mockupImg}
                          alt={`${selectedProject.title} Mockup`}
                          className="w-full h-full object-cover transition-transform duration-300"
                          style={{ transform: `scale(${zoomLevel})` }}
                        />
                      </div>
                    ) : (
                      <div className="h-24 w-full flex flex-col justify-between items-center text-center">
                        <div className="h-2 w-24 bg-white/20 rounded-full" />
                        <div className="h-3 w-40 bg-white/10 rounded-full" />
                        <div className="flex justify-center items-center gap-4">
                          <div className="h-6 w-6 rounded bg-white/15" />
                          <div className="h-4 w-12 bg-white/25 rounded-full" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isImageExpanded && selectedProject?.mockupImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
            onClick={() => resetPreview()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetPreview();
              }}
              className="fixed top-4 right-4 z-[61] flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all shadow-2xl"
              title="Close fullscreen preview"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={selectedProject.mockupImg}
              alt={`${selectedProject.title} Fullscreen Mockup`}
              className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-2xl"
              style={{ transform: `scale(${zoomLevel})` }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
