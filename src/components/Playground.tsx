"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Sliders, RefreshCw, Hand, Info } from "lucide-react";

export default function Playground() {
  const [stiffness, setStiffness] = useState(150);
  const [damping, setDamping] = useState(15);
  const [activeTab, setActiveTab] = useState<"spring" | "tilt">("spring");

  // Spring physics variables
  const constraintsRef = useRef(null);

  // 3D Card Hover variables
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  const rotateX = useTransform(y, [0, 400], [15, -15]);
  const rotateY = useTransform(x, [0, 400], [-15, 15]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
    }
  }

  function handleMouseLeave() {
    x.set(200);
    y.set(200);
  }

  return (
    <section id="playground" className="relative w-full bg-slate-900 px-6 py-28 text-white">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-5xl space-y-16">
        {/* Intro */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Interaction Sandbox
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Animation Playground
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Test my signature UI physics. Drag components or hover over elements to feel the responsiveness of premium motion design.
          </p>
        </div>

        {/* Content Tabs */}
        <div className="flex justify-center">
          <div className="flex gap-2 rounded-full bg-slate-950/80 p-1 border border-slate-800">
            <button
              onClick={() => setActiveTab("spring")}
              className={`rounded-full px-5 py-1.5 text-xs font-semibold capitalize transition-all ${
                activeTab === "spring" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Spring Physics
            </button>
            <button
              onClick={() => setActiveTab("tilt")}
              className={`rounded-full px-5 py-1.5 text-xs font-semibold capitalize transition-all ${
                activeTab === "tilt" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              3D Card Tilt
            </button>
          </div>
        </div>

        {/* Canvas & Controls Container */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3 items-stretch">
          
          {/* Controls Column */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-300">
                <Sliders size={16} />
                <span>Motion Parameters</span>
              </div>

              {activeTab === "spring" ? (
                <div className="space-y-6">
                  {/* Stiffness */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                      <span>Stiffness</span>
                      <span className="font-mono text-indigo-400">{stiffness}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="400"
                      value={stiffness}
                      onChange={(e) => setStiffness(Number(e.target.value))}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-800 accent-indigo-500"
                    />
                  </div>

                  {/* Damping */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                      <span>Damping (Friction)</span>
                      <span className="font-mono text-indigo-400">{damping}</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="50"
                      value={damping}
                      onChange={(e) => setDamping(Number(e.target.value))}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-800 accent-indigo-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 leading-relaxed flex gap-3 items-start bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                  <Info size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                  <span>
                    Move your mouse inside the card on the right to rotate it in three dimensions. The transformation is calculated instantly on the client layout.
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 pt-4 border-t border-slate-900">
              <span className="flex items-center gap-1.5">
                <Hand size={12} /> Interact on Canvas
              </span>
              <button
                onClick={() => {
                  setStiffness(150);
                  setDamping(15);
                }}
                className="hover:text-white flex items-center gap-1 transition-colors"
              >
                <RefreshCw size={10} /> Reset
              </button>
            </div>
          </div>

          {/* Canvas Box Column */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-800 bg-slate-950/20 p-8 flex items-center justify-center min-h-[380px] overflow-hidden relative">
            
            {/* Grid Line Visuals */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            {/* TAB 1: Spring Physics Sandbox */}
            {activeTab === "spring" && (
              <div ref={constraintsRef} className="w-full h-full min-h-[280px] flex items-center justify-center relative">
                <motion.div
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={0.2}
                  dragTransition={{ bounceStiffness: stiffness, bounceDamping: damping }}
                  whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                  className="h-28 w-28 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center shadow-2xl cursor-grab text-center relative group select-none"
                >
                  <span className="text-xs font-bold tracking-wider">DRAG ME</span>
                  <span className="text-[10px] opacity-70 mt-1 block">Spring Return</span>
                </motion.div>
              </div>
            )}

            {/* TAB 2: 3D Hover Tilt */}
            {activeTab === "tilt" && (
              <div className="w-full h-full flex items-center justify-center">
                <motion.div
                  ref={cardRef}
                  onMouseMove={handleMouse}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformStyle: "preserve-3d",
                  }}
                  className="h-56 w-80 rounded-3xl bg-gradient-to-tr from-slate-900 to-indigo-950 border border-slate-800 p-8 flex flex-col justify-between shadow-2xl relative cursor-pointer"
                >
                  {/* Glowing core */}
                  <div
                    style={{ transform: "translateZ(30px)" }}
                    className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold"
                  >
                    Interaction design
                  </div>

                  <div
                    style={{ transform: "translateZ(40px)" }}
                    className="space-y-2"
                  >
                    <h3 className="text-xl font-black">Bima.dev</h3>
                    <p className="text-xs text-slate-400">
                      Hovering offsets the element on the virtual coordinate plane.
                    </p>
                  </div>
                </motion.div>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
