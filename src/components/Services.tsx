"use client";

import { motion } from "framer-motion";
import { Layers, Cpu, Sparkles } from "lucide-react";

const FigmaIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
  </svg>
);

interface Service {
  title: string;
  desc: string;
  skills: string[];
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    title: "Interaction Design",
    desc: "Crafting fluid transitions, micro-interactions, and motion pathways that make user actions feel intuitive and satisfying.",
    skills: ["Framer Motion", "Principle", "Lottie Animations", "Micro-interactions"],
    icon: <Sparkles className="h-6 w-6 text-violet-500" />,
  },
  {
    title: "High-Fidelity UI Design",
    desc: "Designing responsive layout structures, premium typography grids, dark modes, and high-fidelity mockups.",
    skills: ["Figma expert", "Typography", "Visual hierarchy", "Responsive grids"],
    icon: <Layers className="h-6 w-6 text-indigo-500" />,
  },
  {
    title: "Design Systems",
    desc: "Building clean, scalable component libraries and documentation that bridge the gap between design and dev workflows.",
    skills: ["Token architecture", "Component variants", "React specs", "Style guides"],
    icon: <FigmaIcon className="h-6 w-6 text-fuchsia-500" />,
  },
  {
    title: "Product Strategy & UX",
    desc: "Auditing product flows, validating assumptions with real-world users, and wireframing complex task paths.",
    skills: ["User research", "Information architecture", "Wireframing", "Audit"],
    icon: <Cpu className="h-6 w-6 text-emerald-500" />,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative w-full bg-white px-6 py-28 text-slate-900">
      {/* Light grid layout background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />

      <div className="mx-auto max-w-5xl space-y-16 relative z-10">
        
        {/* Title */}
        <div className="max-w-2xl space-y-4 text-center md:text-left mx-auto md:mx-0">
          <div className="text-xs font-bold uppercase tracking-wider text-violet-600">
            Expertise
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
            How I help teams build exceptional products.
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-slate-100 bg-slate-50/50 p-8 flex flex-col justify-between gap-8 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md text-center items-center md:text-left md:items-start"
            >
              <div className="space-y-4 flex flex-col items-center md:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {service.desc}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100/80 w-full justify-center md:justify-start">
                {service.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-white border border-slate-100 px-3.5 py-1 text-[10px] font-bold text-slate-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
