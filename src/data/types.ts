/** The four starter archetypes the visitor can be sorted into. */
export type TypeId = "fire" | "water" | "grass" | "electric";

export interface PokeType {
  id: TypeId;
  name: string;
  starter: string;   // signature Pokémon name
  starterDex: number; // national dex id for artwork
  colors: [string, string];
  trait: string;
  motto: string;
}

export const TYPES: Record<TypeId, PokeType> = {
  fire: {
    id: "fire",
    name: "Fire",
    starter: "Charizard",
    starterDex: 6,
    colors: ["#f0803c", "#ffd27f"],
    trait: "Bold · Relentless · High-Output",
    motto: "Burns brightest under pressure.",
  },
  water: {
    id: "water",
    name: "Water",
    starter: "Blastoise",
    starterDex: 9,
    colors: ["#4f86f7", "#a8ccff"],
    trait: "Calm · Adaptable · Deep-Thinking",
    motto: "Flows around every obstacle.",
  },
  grass: {
    id: "grass",
    name: "Grass",
    starter: "Venusaur",
    starterDex: 3,
    colors: ["#55b455", "#b7e778"],
    trait: "Patient · Nurturing · Resilient",
    motto: "Grows steadily, endures anything.",
  },
  electric: {
    id: "electric",
    name: "Electric",
    starter: "Pikachu",
    starterDex: 25,
    colors: ["#f6c915", "#fff08a"],
    trait: "Fast · Bright · Energetic",
    motto: "Sparks ideas at a thousand volts.",
  },
};

export const TYPE_LIST: PokeType[] = Object.values(TYPES);

/* ------------------------------------------------------------------ */
/*  Choose Your Starter — the sorting quiz                             */
/* ------------------------------------------------------------------ */
export interface QuizOption {
  label: string;
  type: TypeId;
}
export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export const QUIZ: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "A wild bug (production incident!) appears. Your move?",
    options: [
      { label: "Charge in — hotfix now, ask later.", type: "fire" },
      { label: "Stay calm, read the logs, trace the flow.", type: "water" },
      { label: "Patch the root cause so it never returns.", type: "grass" },
      { label: "Ship a quick mitigation in seconds.", type: "electric" },
    ],
  },
  {
    id: "q2",
    prompt: "Pick the project that excites you most.",
    options: [
      { label: "A bold moonshot that could change everything.", type: "fire" },
      { label: "A deep, elegant system others rely on.", type: "water" },
      { label: "A tool that quietly helps thousands daily.", type: "grass" },
      { label: "A blazing-fast, real-time experience.", type: "electric" },
    ],
  },
  {
    id: "q3",
    prompt: "Your ideal training ground?",
    options: [
      { label: "The volcano — trial by fire.", type: "fire" },
      { label: "The deep ocean — vast and unexplored.", type: "water" },
      { label: "The forest — living, evolving systems.", type: "grass" },
      { label: "The storm — high energy, high stakes.", type: "electric" },
    ],
  },
  {
    id: "q4",
    prompt: "How do teammates describe you?",
    options: [
      { label: "Driven and fearless.", type: "fire" },
      { label: "Thoughtful and unflappable.", type: "water" },
      { label: "Dependable and kind.", type: "grass" },
      { label: "Quick and full of spark.", type: "electric" },
    ],
  },
  {
    id: "q5",
    prompt: "Choose a legendary to fight beside you.",
    options: [
      { label: "Moltres — the flame of resolve.", type: "fire" },
      { label: "Articuno — the calm of ice-clear focus.", type: "water" },
      { label: "Celebi — the guardian of growth.", type: "grass" },
      { label: "Zapdos — the roar of raw current.", type: "electric" },
    ],
  },
];

export function tallyQuiz(answers: TypeId[]): TypeId {
  const scores: Record<TypeId, number> = { fire: 0, water: 0, grass: 0, electric: 0 };
  for (const a of answers) scores[a] += 1;
  return (Object.keys(scores) as TypeId[]).reduce((best, t) =>
    scores[t] > scores[best] ? t : best
  );
}

/** Deterministic PokéAPI official-artwork URL via jsDelivr CDN. */
export function artwork(dex: number): string {
  return `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/official-artwork/${dex}.png`;
}
