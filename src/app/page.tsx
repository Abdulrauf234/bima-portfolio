import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Works from "@/components/Works";
import Playground from "@/components/Playground";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Premium cursor glowing spotlight tracker */}
      <CursorGlow />

      {/* Floating Centered Pill Navbar */}
      <Navbar />

      {/* Hero section */}
      <Hero />

      {/* Services & Expertise section (light theme) */}
      <Services />

      {/* About & Process section (dark theme) */}
      <Process />

      {/* Featured Works section (dark theme) */}
      <Works />

      {/* Interactive Physics Sandbox Playground (dark theme) */}
      <Playground />

      {/* Contact Section & Footer (light/dark adaptive) */}
      <Contact />
    </div>
  );
}

export const metadata = {
  title: "Bima | Professional UI/UX Frontend Designer Portfolio",
  description: "Ultra-premium personal portfolio website showcasing clean, thoughtful user interfaces, wireframes, and front-end designs by Bima.",
};
