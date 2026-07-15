export interface Project {
  id: string;
  title: string;
  category: "mobile" | "web";
  desc: string;
  longDesc: string;
  role: string;
  year: string;
  color: string;
  accentColor: string;
  mockupImg?: string;
}

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "spark-pay",
    title: "Spark Pay",
    category: "mobile",
    desc: "A polished mobile finance experience built for fast transfers, clean balance panels, and effortless payout flows.",
    longDesc:
      "Spark Pay is a modern digital wallet concept built around instant transfers, simplified transaction history, and clear payment confirmation. The interface focuses on bold card layouts, bright accent states, and an easy one-tap send experience for everyday spending.",
    role: "Product UI Designer",
    year: "2026",
    color: "from-slate-900 to-sky-950",
    accentColor: "#38bdf8",
    mockupImg: "/mockups/ChatGPT Image Jul 15, 2026, 10_35_41 PM.png",
  },
  {
    id: "dentora-care",
    title: "Dentora Care",
    category: "web",
    desc: "A premium dental clinic website with patient-focused booking, treatment highlights, and modern healthcare visuals.",
    longDesc:
      "Dentora Care is a responsive dental service landing page designed to build trust and highlight patient comfort. It uses bright photography, clean content cards, and informative service sections to guide visitors toward appointments and showcase expert care.",
    role: "Brand UX Designer",
    year: "2026",
    color: "from-slate-900 to-cyan-950",
    accentColor: "#22d3ee",
    mockupImg: "/mockups/WhatsApp Image 2026-07-14 at 2.58.58 PM.jpeg",
  },
  {
    id: "vogue-shop",
    title: "Vogue Shop",
    category: "mobile",
    desc: "A luxury fashion shopping app that prioritizes curated brand storefronts, wishlist browsing, and refined product detail pages.",
    longDesc:
      "Vogue Shop blends editorial fashion styling with mobile commerce for an elevated shopping experience. The design emphasizes premium imagery, brand category navigation, and a sleek checkout rhythm for modern shoppers.",
    role: "Mobile Commerce Designer",
    year: "2026",
    color: "from-slate-900 to-pink-950",
    accentColor: "#f472b6",
    mockupImg: "/mockups/785shots_so.png",
  },
];

/**
 * Fetch all projects from Firestore or fall back to static defaults.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const snapshot = await getDoc(doc(db, "portfolio", "projects"));
    if (!snapshot.exists()) {
      return DEFAULT_PROJECTS;
    }

    const data = snapshot.data();
    return Array.isArray(data?.projects) ? data.projects : DEFAULT_PROJECTS;
  } catch (error) {
    console.error("Error fetching projects from Firestore", error);
    return DEFAULT_PROJECTS;
  }
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await setDoc(doc(db, "portfolio", "projects"), { projects }, { merge: true });
}
