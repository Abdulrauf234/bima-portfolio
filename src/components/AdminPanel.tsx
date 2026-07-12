"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2, Save, Laptop, Sparkles } from "lucide-react";

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

const DEFAULT_PROJECTS: Project[] = [
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

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("projects") : null;
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch {
        setProjects(DEFAULT_PROJECTS);
      }
    } else {
      setProjects(DEFAULT_PROJECTS);
    }
  }, []);

  const handleChange = (index: number, field: keyof Project, value: string) => {
    setProjects((prev) => {
      const updated = [...prev];
      (updated[index] as unknown as Record<string, string>)[field as string] = value;
      return updated;
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: "New Project " + (projects.length + 1),
      category: "web",
      desc: "",
      longDesc: "",
      role: "",
      year: String(new Date().getFullYear()),
      color: "from-slate-900 to-indigo-950",
      accentColor: "#818cf8",
    };
    setProjects((prev) => [...prev, newProject]);
    setActiveTab(projects.length); // Switch to newly created project
  };

  const deleteProject = (index: number) => {
    const nextProjects = projects.filter((_, i) => i !== index);
    setProjects(nextProjects);
    if (activeTab >= nextProjects.length) {
      setActiveTab(Math.max(0, nextProjects.length - 1));
    }
  };

  const saveChanges = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("projects", JSON.stringify(projects));
      // Force reload to update active project list on Works section
      window.location.reload();
    }
  };

  const currentProject = projects[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-lg p-3 md:p-6">
      <div className="relative flex flex-col md:flex-row w-full max-w-5xl h-[92vh] md:h-[80vh] overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
        
        {/* Sidebar: Navigation List */}
        <div className="w-full md:w-80 flex flex-col border-b md:border-b-0 md:border-r border-slate-800/80 bg-slate-950/40 p-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/50">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-violet-400" />
              <h2 className="text-sm font-bold tracking-wider text-slate-300 uppercase">
                Works Manager
              </h2>
            </div>
            <button
              onClick={onClose}
              className="md:hidden rounded-full p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Project Tabs list */}
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible md:overflow-y-auto mt-4 py-2 md:py-0 pr-1 flex-1 scrollbar-thin">
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setActiveTab(idx)}
                className={`flex-shrink-0 flex items-center justify-between text-left px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 md:w-full ${
                  activeTab === idx
                    ? "bg-violet-600/10 border-violet-500 text-white shadow-md shadow-violet-500/5"
                    : "bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <span className="truncate max-w-[120px] md:max-w-[160px]">
                  {proj.title || `Untitled Project #${idx + 1}`}
                </span>
                <span className="hidden md:inline rounded-full bg-slate-850 px-2 py-0.5 text-[10px] text-slate-400 border border-slate-800 capitalize">
                  {proj.category}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/50">
            <button
              onClick={addProject}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 py-2.5 text-xs font-bold text-white transition-colors"
            >
              <Plus size={14} /> Add Project
            </button>
          </div>
        </div>

        {/* Workspace Form / Editor */}
        <div className="flex-1 flex flex-col h-full bg-slate-900">
          {/* Header section (Visible only on Desktop) */}
          <div className="hidden md:flex items-center justify-between px-6 py-4 border-b border-slate-800/80">
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <Laptop size={16} className="text-violet-400" />
              Editing: <span className="text-violet-300 font-semibold">{currentProject?.title || "Project Details"}</span>
            </h1>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form workspace body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            {currentProject ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/40">
                  <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                    Attributes
                  </h3>
                  <button
                    onClick={() => deleteProject(activeTab)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-950/40 hover:bg-red-950/70 border border-red-800/40 text-[11px] font-semibold text-red-400 transition-colors"
                  >
                    <Trash2 size={12} /> Delete Project
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Project Title</span>
                    <input
                      type="text"
                      placeholder="e.g. Nova Pay"
                      value={currentProject.title}
                      onChange={(e) => handleChange(activeTab, "title", e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-850 px-3 py-2 text-xs font-semibold text-white placeholder-slate-650 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </label>

                  <label className="block space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Platform Category</span>
                    <select
                      value={currentProject.category}
                      onChange={(e) => handleChange(activeTab, "category", e.target.value as any)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-850 px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-violet-500 transition-colors"
                    >
                      <option value="web">Web Platform</option>
                      <option value="mobile">Mobile App</option>
                    </select>
                  </label>

                  <label className="block space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Year</span>
                    <input
                      type="text"
                      placeholder="e.g. 2026"
                      value={currentProject.year}
                      onChange={(e) => handleChange(activeTab, "year", e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-850 px-3 py-2 text-xs font-semibold text-white placeholder-slate-650 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </label>

                  <label className="block space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Role</span>
                    <input
                      type="text"
                      placeholder="e.g. Lead Designer"
                      value={currentProject.role}
                      onChange={(e) => handleChange(activeTab, "role", e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-850 px-3 py-2 text-xs font-semibold text-white placeholder-slate-650 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </label>

                  <label className="block space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Accent Color</span>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={currentProject.accentColor.startsWith("#") ? currentProject.accentColor : "#818cf8"}
                        onChange={(e) => handleChange(activeTab, "accentColor", e.target.value)}
                        className="w-10 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        placeholder="#818cf8"
                        value={currentProject.accentColor}
                        onChange={(e) => handleChange(activeTab, "accentColor", e.target.value)}
                        className="flex-1 rounded-xl bg-slate-950 border border-slate-850 px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>
                  </label>

                  <label className="block space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">BG Gradient Class</span>
                    <input
                      type="text"
                      placeholder="from-slate-900 to-indigo-950"
                      value={currentProject.color}
                      onChange={(e) => handleChange(activeTab, "color", e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-850 px-3 py-2 text-xs font-semibold text-white placeholder-slate-650 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </label>
                </div>

                <div className="space-y-4 pt-2">
                  <label className="block space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Short Description</span>
                    <textarea
                      placeholder="Brief card summary..."
                      value={currentProject.desc}
                      onChange={(e) => handleChange(activeTab, "desc", e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-850 px-3 py-2 text-xs font-semibold text-white placeholder-slate-650 focus:outline-none focus:border-violet-500 transition-colors"
                      rows={2}
                    />
                  </label>

                  <label className="block space-y-1">
                    <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Case Study (Long) Description</span>
                    <textarea
                      placeholder="Full case study breakdown..."
                      value={currentProject.longDesc}
                      onChange={(e) => handleChange(activeTab, "longDesc", e.target.value)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-850 px-3 py-2 text-xs font-semibold text-white placeholder-slate-650 focus:outline-none focus:border-violet-500 transition-colors"
                      rows={5}
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-550 text-xs">
                Create a project or select one from the list to start editing.
              </div>
            )}
          </div>

          {/* Footer Save Area */}
          <div className="px-6 py-4 bg-slate-950/20 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveChanges}
              className="flex items-center gap-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 px-5 py-2.5 text-xs font-bold text-white transition-colors shadow-lg shadow-violet-600/10"
            >
              <Save size={14} /> Save &amp; Publish
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
