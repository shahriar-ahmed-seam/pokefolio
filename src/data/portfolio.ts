/**
 * Single source of truth for every piece of personal content on the site.
 * Edit this file to make the portfolio your own — nothing else needs to change.
 */

export const profile = {
  name: "Shahriar Ahmed Seam",
  epithet: "AI/ML Trainer & LLM Researcher",
  title: "Champion of the Machine-Learning League",
  company: "Somokolon Labs",
  location: "Dhaka, Bangladesh · Battling remotely worldwide",
  available: true,
  tagline:
    "Gotta build 'em all — from agentic AI and LLM systems to on-device intelligence.",
  bio: [
    "I'm an AI/ML engineer and LLM researcher who treats every model like a Pokémon — train it well, understand its type, and it'll battle for you when it counts. My move-pool spans agentic AI, generative AI, RAG, NLP, computer vision and diffusion models.",
    "At Somokolon Labs I raise production LLM systems and multi-agent orchestrators, and I'm just as happy forging a vector database from raw C++ as wiring up a real-time recommendation engine.",
    "With 100+ open-source Pokédex entries — from offline-first healthcare AI for rural Bangladesh to low-latency systems — I chase the intersection of research depth and real-world impact.",
  ],
  resumeUrl: "/resume.pdf",
  email: "shahriarseam17@gmail.com",
};

export interface Social {
  label: string;
  handle: string;
  href: string;
  icon: "github" | "linkedin" | "twitter" | "mail";
}

export const socials: Social[] = [
  { label: "GitHub", handle: "@shahriar-ahmed-seam", href: "https://github.com/shahriar-ahmed-seam", icon: "github" },
  { label: "LinkedIn", handle: "in/shahriar-ahmed-seam", href: "https://www.linkedin.com/in/shahriar-ahmed-seam", icon: "linkedin" },
  { label: "Poké-Mail", handle: "shahriarseam17@gmail.com", href: "mailto:shahriarseam17@gmail.com", icon: "mail" },
];

/** The Trainer's party — decorative team roster (national dex ids). */
export const party: { name: string; dex: number }[] = [
  { name: "Charizard", dex: 6 },
  { name: "Blastoise", dex: 9 },
  { name: "Venusaur", dex: 3 },
  { name: "Pikachu", dex: 25 },
  { name: "Mewtwo", dex: 150 },
  { name: "Gengar", dex: 94 },
];

/* ------------------------------------------------------------------ */
/*  Battle Lab — skills as moves                                       */
/* ------------------------------------------------------------------ */
export type MoveType =
  | "psychic" | "steel" | "electric" | "ground"
  | "normal" | "fire" | "water" | "grass" | "ghost" | "dragon";
export type MoveCategory = "Physical" | "Special" | "Status";

export interface Move {
  name: string;      // technology
  move: string;      // flavour move name
  type: MoveType;
  category: MoveCategory;
  power: number;     // 0–100 mastery
}

export interface MoveSet {
  id: string;
  title: string;   // themed group name
  subject: string; // real-world category
  moves: Move[];
}

export const moveSets: MoveSet[] = [
  {
    id: "psychic",
    title: "Psychic Moves",
    subject: "AI / ML & LLM Systems",
    moves: [
      { name: "LLMs & RAG", move: "Future Sight", type: "psychic", category: "Special", power: 96 },
      { name: "Agentic AI · LangGraph", move: "Calm Mind", type: "psychic", category: "Status", power: 93 },
      { name: "PyTorch", move: "Psystrike", type: "psychic", category: "Special", power: 92 },
      { name: "Computer Vision", move: "Foresight", type: "psychic", category: "Status", power: 88 },
      { name: "Diffusion & GenAI", move: "Dream Eater", type: "psychic", category: "Special", power: 85 },
      { name: "Vector Search · FAISS", move: "Trick Room", type: "psychic", category: "Status", power: 90 },
    ],
  },
  {
    id: "steel",
    title: "Steel Moves",
    subject: "Backend & Systems",
    moves: [
      { name: "Python · FastAPI", move: "Flash Cannon", type: "steel", category: "Special", power: 95 },
      { name: "C++ · SIMD", move: "Iron Head", type: "steel", category: "Physical", power: 84 },
      { name: "Go", move: "Bullet Punch", type: "steel", category: "Physical", power: 82 },
      { name: "Node.js & TypeScript", move: "Gyro Ball", type: "steel", category: "Physical", power: 90 },
      { name: "PostgreSQL", move: "Iron Defense", type: "steel", category: "Status", power: 86 },
    ],
  },
  {
    id: "electric",
    title: "Electric Moves",
    subject: "Frontend & Interfaces",
    moves: [
      { name: "React & Next.js", move: "Thunderbolt", type: "electric", category: "Special", power: 93 },
      { name: "TypeScript", move: "Volt Switch", type: "electric", category: "Special", power: 92 },
      { name: "Tailwind CSS", move: "Charge Beam", type: "electric", category: "Special", power: 90 },
      { name: "Three.js · WebGL", move: "Wild Charge", type: "electric", category: "Physical", power: 82 },
      { name: "Framer Motion", move: "Agility", type: "electric", category: "Status", power: 86 },
    ],
  },
  {
    id: "ground",
    title: "Ground Moves",
    subject: "MLOps, DevOps & Edge",
    moves: [
      { name: "Docker & Kubernetes", move: "Earthquake", type: "ground", category: "Physical", power: 86 },
      { name: "ONNX · On-Device ML", move: "Dig", type: "ground", category: "Physical", power: 85 },
      { name: "Ollama · Local LLMs", move: "Sandstorm", type: "ground", category: "Status", power: 90 },
      { name: "Kafka & Redis", move: "Bulldoze", type: "ground", category: "Physical", power: 83 },
      { name: "Vercel · Render", move: "Fissure", type: "ground", category: "Physical", power: 90 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Project Dex — projects as caught Pokémon                           */
/* ------------------------------------------------------------------ */
export interface DexEntry {
  id: string;
  dex: number;         // portfolio index (#001…)
  title: string;
  species: string;     // flavour species line
  mon: { name: string; dex: number; type: MoveType };
  entry: string;       // Pokédex-style description
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  category: "AI/ML" | "Systems" | "Frontend" | "Infra";
}

const GH = "https://github.com/shahriar-ahmed-seam";

export const dexEntries: DexEntry[] = [
  {
    id: "nexus-agent-orchestrator",
    dex: 1,
    title: "Nexus Agent Orchestrator",
    species: "The Multi-Agent Pokémon",
    mon: { name: "Mewtwo", dex: 150, type: "psychic" },
    entry:
      "A production-grade platform for orchestrating autonomous AI agents (plan → research → code → critique) with a real-time LangGraph visual graph, RAG over PDFs and safe tool use. Runs fully offline with zero API keys.",
    tags: ["LangGraph", "FastAPI", "Next.js", "pgvector"],
    repoUrl: `${GH}/nexus-agent-orchestrator`,
    featured: true,
    category: "AI/ML",
  },
  {
    id: "vector-vault-db",
    dex: 2,
    title: "Vector Vault DB",
    species: "The Iron Vault Pokémon",
    mon: { name: "Metagross", dex: 376, type: "steel" },
    entry:
      "A high-performance vector database built from scratch in C++17 with Python bindings: HNSW/IVF ANN indexes, AVX-512 distance kernels, a custom arena allocator and a memory-mapped snapshot format.",
    tags: ["C++17", "SIMD", "HNSW", "pybind11"],
    repoUrl: `${GH}/Vector-Vault-DB`,
    featured: true,
    category: "Systems",
  },
  {
    id: "streammind",
    dex: 3,
    title: "StreamMind",
    species: "The Virtual Pokémon",
    mon: { name: "Porygon-Z", dex: 474, type: "normal" },
    entry:
      "A Netflix-grade real-time AI recommendation platform: two-stage retrieval, Kafka feature pipelines, FAISS vector search and full MLOps atop a PyTorch two-tower engine.",
    tags: ["PyTorch", "Kafka", "FAISS", "MLOps"],
    repoUrl: `${GH}/streammind`,
    featured: true,
    category: "AI/ML",
  },
  {
    id: "resonet",
    dex: 4,
    title: "ResoNet",
    species: "The Healing Pokémon",
    mon: { name: "Blissey", dex: 242, type: "normal" },
    entry:
      "Offline, on-device respiratory-disease screening from cough audio — a ResNet18 model plus librosa/scipy preprocessing reimplemented in pure Dart + ONNX Runtime, shrinking the app from 600MB+ to ~70MB with zero accuracy loss.",
    tags: ["ONNX", "ResNet", "Edge AI", "Dart"],
    repoUrl: `${GH}/ResoNet`,
    featured: true,
    category: "AI/ML",
  },
  {
    id: "hilltrack-pulse",
    dex: 5,
    title: "HillTrack Pulse",
    species: "The Foresight Pokémon",
    mon: { name: "Xatu", dex: 178, type: "psychic" },
    entry:
      "DBSCAN outbreak detection, multi-modal medical logistics and on-device (Ollama) + Gemini consultation for the Chittagong Hill Tracts — offline-first, built with React + FastAPI.",
    tags: ["DBSCAN", "FastAPI", "Ollama", "Gemini"],
    repoUrl: `${GH}/HillTrack-Pulse`,
    featured: true,
    category: "AI/ML",
  },
  {
    id: "cortex",
    dex: 6,
    title: "Cortex",
    species: "The Plasma Pokémon",
    mon: { name: "Rotom", dex: 479, type: "electric" },
    entry:
      "A private, offline-first AI assistant for Windows 11 powered by local LLMs (Ollama) — a cinematic Next.js product site plus a native WinUI 3 desktop app with on-device RAG.",
    tags: ["WinUI 3", "Ollama", "RAG", "C#"],
    repoUrl: `${GH}/cortex`,
    featured: true,
    category: "Frontend",
  },
  {
    id: "hyper-match-engine",
    dex: 7,
    title: "Hyper Match Engine",
    species: "The Ball Pokémon",
    mon: { name: "Electrode", dex: 101, type: "electric" },
    entry:
      "A low-latency limit-order matching engine: a deterministic, zero-hot-path-allocation C++ core, a Rust HTTP/WebSocket gateway, a binary wire protocol and a real-time web console.",
    tags: ["C++", "Rust", "Low-Latency", "WebSocket"],
    repoUrl: `${GH}/Hyper-Match-Engine`,
    category: "Systems",
  },
  {
    id: "ledger-core-banking",
    dex: 8,
    title: "Ledger Core Banking",
    species: "The Scratch Cat Pokémon",
    mon: { name: "Meowth", dex: 52, type: "normal" },
    entry:
      "A production-grade core-banking engine: double-entry bookkeeping, PostgreSQL row-level locking for concurrency-safe money movement, JWT + RBAC security and a premium internet-banking dashboard.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "React"],
    repoUrl: `${GH}/Ledger-Core-Banking`,
    category: "Systems",
  },
];

/* ------------------------------------------------------------------ */
/*  Region Journey — timeline                                          */
/* ------------------------------------------------------------------ */
export interface Gym {
  region: string;
  title: string;
  place: string;
  description: string;
  badge: "work" | "study" | "award";
}

export const journey: Gym[] = [
  {
    region: "Now",
    title: "AI/ML Engineer & LLM Researcher",
    place: "Somokolon Labs · Dhaka",
    description:
      "Raising production LLM systems, multi-agent orchestrators and RAG pipelines — and shipping on-device ML for real-world problems.",
    badge: "work",
  },
  {
    region: "Kanto",
    title: "100+ Open-Source Entries",
    place: "GitHub · @shahriar-ahmed-seam",
    description:
      "From a from-scratch C++ vector database to autonomous agent swarms and edge-AI healthcare apps — a prolific, public body of work.",
    badge: "award",
  },
  {
    region: "Johto",
    title: "LLM Systems, RAG & Agentic AI",
    place: "Research & Practice",
    description:
      "Deep work across generative AI, diffusion models, computer vision, NLP and system design — bridging research and engineering.",
    badge: "study",
  },
  {
    region: "Hoenn",
    title: "Healthcare AI for Bangladesh",
    place: "Gram-Sheba · HillTrack Pulse · ResoNet",
    description:
      "Offline-first triage, outbreak detection and cough-based disease screening designed to reach underserved communities.",
    badge: "work",
  },
];

export const stats = [
  { label: "Pokédex Entries", value: "100+", hint: "public repos" },
  { label: "AI Systems Trained", value: "40+", hint: "LLM / ML" },
  { label: "Move Types Mastered", value: "12+", hint: "languages" },
  { label: "Gym Badges", value: "∞", hint: "and counting" },
];
