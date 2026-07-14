"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, MessageSquare, Briefcase, Mail } from "lucide-react";

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const ThreadsIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5C13.3807 9.5 14.5 10.6193 14.5 12Z" />
    <path d="M14.5 14.5C14.5 14.5 13 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 13.6569 15.3284 15 14 15V15" />
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
  </svg>
);

const PhoneIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1800);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-white px-6 pt-28 pb-12 text-slate-900 dark:bg-slate-950 dark:text-white"
    >
      {/* Background radial highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl space-y-20">
        
        {/* Layout grid */}
        <div className="grid gap-12 lg:grid-cols-5">
          
          {/* Text/Info column */}
          <div className="lg:col-span-2 space-y-6 text-center lg:text-left items-center lg:items-start flex flex-col">
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-500">
                Get In Touch
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
                Let's build something incredible together.
              </h2>
            </div>
            
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Have an idea, project, or need full-time design support? Feel free to reach out at <a href="mailto:Kasimubima@gmail.com" className="font-semibold text-violet-600 hover:underline dark:text-violet-400">Kasimubima@gmail.com</a>. I reply within 24 hours.
            </p>

            {/* Quick contact social buttons */}
            <div className="flex flex-col gap-3 pt-4 items-center lg:items-start">
              <a
                href="https://www.instagram.com/bima.ux?igsh=ZXNlNXlobXc0bDh0&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700 hover:text-pink-600 dark:text-slate-300 dark:hover:text-pink-400"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                  <InstagramIcon size={16} />
                </div>
                Connect on Instagram
              </a>

              <a
                href="https://wa.me/2348153233055"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                  <WhatsAppIcon size={16} />
                </div>
                Message on WhatsApp
              </a>

              <a
                href="tel:09032563189"
                className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                  <PhoneIcon size={16} />
                </div>
                Call: 0903 256 3189
              </a>

              <a
                href="https://x.com/bimakasimu?s=21"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                  <XIcon size={16} />
                </div>
                Follow on X
              </a>

              <a
                href="https://www.threads.com/@bima.ux?igshid=NTc4MTIwNjQ2YQ=="
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-sm font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
                  <ThreadsIcon size={16} />
                </div>
                Connect on Threads
              </a>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3">
            <motion.div
              layout
              className="rounded-3xl border border-slate-100 bg-slate-50/50 p-8 shadow-xl dark:border-slate-800/40 dark:bg-slate-900/40 backdrop-blur-sm"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={status === "submitting" || status === "success"}
                    placeholder="Enter your name"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-800 dark:bg-slate-950 dark:focus:border-violet-500"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={status === "submitting" || status === "success"}
                    placeholder="name@company.com"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-800 dark:bg-slate-950 dark:focus:border-violet-500"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={status === "submitting" || status === "success"}
                    placeholder="Describe your project goals..."
                    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-800 dark:bg-slate-950 dark:focus:border-violet-500"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className="w-full group flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  {status === "idle" && (
                    <>
                      Send Message
                      <Send size={14} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                  {status === "submitting" && "Sending message..."}
                  {status === "success" && (
                    <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
                      <CheckCircle size={16} /> Sent Successfully!
                    </span>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <hr className="border-slate-100 dark:border-slate-900" />
        
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row text-xs text-slate-400 font-semibold text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Bima. All rights reserved.
          </div>
          
          <div className="flex gap-6">
            <a href="#hero" className="hover:text-slate-900 dark:hover:text-white">Back to Top</a>
            <a href="#work" className="hover:text-slate-900 dark:hover:text-white">Works</a>
            <a href="#about" className="hover:text-slate-900 dark:hover:text-white">Process</a>
          </div>
        </div>
      </div>
    </section>
  );
}
