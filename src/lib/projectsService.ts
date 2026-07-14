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
    id: "nova-pay",
    title: "Nova Pay",
    category: "mobile",
    desc: "A futuristic financial app that simplifies global transactions with micro-animations and zero-friction flows.",
    longDesc:
      "Nova Pay is a next-generation neo-banking app designed to streamline borderless transfers. Through extensive user research, we crafted an interface featuring micro-animations that confirm financial operations, a dark minimalist command center, and one-tap invoice settlements.",
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
    longDesc:
      "Aura is a collaborative B2B tool designed to coordinate cross-functional sprints. The design system features glassmorphism workspace grids, intuitive shortcuts, and rich statistics panels that load seamlessly with zero UI lag.",
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
    longDesc:
      "Zen Bloom uses breathing exercise loops and custom soft-shadow sound player interfaces to cultivate deep tranquility. We combined soft neutral tones with rich color therapy indicators to reward consistent stress-relief routines.",
    role: "Mobile App UI Designer",
    year: "2025",
    color: "from-slate-900 to-emerald-950",
    accentColor: "#34d399",
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
