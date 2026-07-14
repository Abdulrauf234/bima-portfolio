import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  writeBatch,
  deleteDoc,
} from "firebase/firestore";

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
    mockupImg: "/mockups/WhatsApp Image 2026-07-14 at 2.55.23 PM.jpeg",
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

const COLLECTION = "projects";

/**
 * Fetch all projects from Firestore.
 * Falls back to DEFAULT_PROJECTS if the collection is empty (first run).
 */
export async function getProjects(): Promise<Project[]> {
  const snapshot = await getDocs(collection(db, COLLECTION));
  if (snapshot.empty) {
    return DEFAULT_PROJECTS;
  }
  const projects: Project[] = [];
  snapshot.forEach((docSnap) => {
    projects.push(docSnap.data() as Project);
  });
  // Sort by a stable key so order is consistent
  projects.sort((a, b) => a.id.localeCompare(b.id));
  return projects;
}

/**
 * Overwrite the entire projects collection in Firestore.
 * Uses a batch write for atomicity.
 */
export async function saveProjects(projects: Project[]): Promise<void> {
  // 1. Delete all existing docs
  const existing = await getDocs(collection(db, COLLECTION));
  const deleteBatch = writeBatch(db);
  existing.forEach((docSnap) => deleteBatch.delete(docSnap.ref));
  await deleteBatch.commit();

  // 2. Write all new projects
  const writeBatchOp = writeBatch(db);
  for (const project of projects) {
    const ref = doc(db, COLLECTION, project.id);
    writeBatchOp.set(ref, project);
  }
  await writeBatchOp.commit();
}
