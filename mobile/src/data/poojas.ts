// Sample/reference pooja content for the MVP prototype.
// NOTE: per the PRD, all vidhi/mantra content must be reviewed by a priest
// or trusted source before this ships — treat everything below as
// placeholder content to demonstrate the product flow, not verified vidhi.

export type PlanningOptions = {
  headcount: number;
  includeChildren: boolean;
  extendedFamily: boolean;
};

export type ChecklistItem = {
  key: string;
  name: string;
  category: string;
  icon: string;
  quantity: (opts: PlanningOptions) => { amount: number; unit: string };
};

export type PoojaStep = {
  key: string;
  title: string;
  instruction: string;
  mantra?: string;
};

export type Pooja = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  durationLabel: string;
  difficulty: string;
  timing: string;
  icon: string;
  level: 'Beginner Friendly' | 'Daily Practice' | 'Chanting';
  items: ChecklistItem[];
  steps: PoojaStep[];
};

// Deterministic, rule-based quantity calculator — never left to the AI.
// Base counts below reproduce the reference numbers from the Stitch
// designs at headcount = 2 (e.g. 5 + 3*2 = 11 hibiscus flowers).
const ganeshItems: ChecklistItem[] = [
  {
    key: 'red-hibiscus',
    name: 'Red Hibiscus',
    category: 'Flowers & Fruits',
    icon: 'local-florist',
    quantity: ({ headcount, extendedFamily }) => {
      const base = 5 + 3 * headcount;
      return { amount: extendedFamily ? Math.ceil(base * 1.1) : base, unit: 'Flowers' };
    },
  },
  {
    key: 'durva-grass',
    name: 'Durva Grass (Bermuda Grass)',
    category: 'Flowers & Fruits',
    icon: 'grass',
    quantity: ({ headcount, extendedFamily }) => {
      const base = 15 + 3 * headcount;
      return { amount: extendedFamily ? Math.ceil(base * 1.1) : base, unit: 'Blades' };
    },
  },
  {
    key: 'bananas',
    name: 'Bananas',
    category: 'Flowers & Fruits',
    icon: 'eco',
    quantity: ({ headcount }) => ({ amount: 1 + 2 * headcount, unit: 'Fruits' }),
  },
  {
    key: 'marigold-garland',
    name: 'Marigold Garland',
    category: 'Flowers & Fruits',
    icon: 'local-florist',
    quantity: () => ({ amount: 1, unit: 'Garland' }),
  },
  {
    key: 'coconuts',
    name: 'Coconuts (with water)',
    category: 'Core Pooja Items',
    icon: 'circle',
    quantity: () => ({ amount: 2, unit: 'Coconuts' }),
  },
  {
    key: 'kumkum',
    name: 'Kumkum (Roli)',
    category: 'Core Pooja Items',
    icon: 'spa',
    quantity: () => ({ amount: 1, unit: 'Small Packet' }),
  },
  {
    key: 'modak',
    name: 'Modak or Ladoo',
    category: 'Core Pooja Items',
    icon: 'cake',
    quantity: ({ headcount, includeChildren }) => {
      const base = 1 + 10 * headcount;
      return { amount: includeChildren ? Math.ceil(base * 1.2) : base, unit: 'Pieces' };
    },
  },
  {
    key: 'akshata',
    name: 'Akshata (Raw Rice)',
    category: 'Core Pooja Items',
    icon: 'grain',
    quantity: () => ({ amount: 1, unit: 'Small Cup' }),
  },
  {
    key: 'incense',
    name: 'Incense Sticks',
    category: 'Altar Setup',
    icon: 'local-fire-department',
    quantity: () => ({ amount: 1, unit: 'Pack' }),
  },
  {
    key: 'camphor',
    name: 'Camphor',
    category: 'Altar Setup',
    icon: 'local-fire-department',
    quantity: () => ({ amount: 1, unit: 'Pack' }),
  },
  {
    key: 'diya',
    name: 'Diya with Oil/Ghee',
    category: 'Altar Setup',
    icon: 'local-fire-department',
    quantity: () => ({ amount: 1, unit: 'Lamp' }),
  },
  {
    key: 'red-cloth',
    name: 'Red Cloth (Asana)',
    category: 'Altar Setup',
    icon: 'checkroom',
    quantity: () => ({ amount: 1, unit: 'Piece' }),
  },
  {
    key: 'seating-mats',
    name: 'Seating Mats',
    category: 'Altar Setup',
    icon: 'chair',
    quantity: ({ headcount, extendedFamily }) =>
      extendedFamily ? { amount: headcount, unit: 'Mats' } : { amount: 0, unit: 'Mats' },
  },
];

const ganeshSteps: PoojaStep[] = [
  {
    key: 'sankalpa',
    title: 'Sankalpa (Intention)',
    instruction:
      'Sit facing east. Light the diya and take a small amount of water and akshata in your right hand. State your intention for performing this pooja, then let the water fall onto a plate.',
  },
  {
    key: 'avahan',
    title: 'Ganesh Avahan (Invocation)',
    instruction: 'Invite Lord Ganesha into the idol or kalash, welcoming the divine presence for the ritual ahead.',
    mantra: 'Om Gam Ganapataye Namaha',
  },
  {
    key: 'asana',
    title: 'Asana Samarpan (Offering a Seat)',
    instruction: 'Place the idol on the red cloth you have prepared, offering a comfortable seat.',
  },
  {
    key: 'padya-arghya',
    title: 'Padya, Arghya & Achaman',
    instruction: 'Offer water for the feet, hands, and sipping — a traditional gesture of hospitality and respect.',
  },
  {
    key: 'snana',
    title: 'Snana (Ritual Bath)',
    instruction: 'Gently bathe the idol with water, then with panchamrit if available, and rinse once more with clean water.',
  },
  {
    key: 'vastra',
    title: 'Vastra & Yajnopavit',
    instruction: 'Offer a new piece of cloth and, if following this tradition, a sacred thread.',
  },
  {
    key: 'chandan',
    title: 'Chandan & Kumkum',
    instruction: 'Apply a small amount of sandalwood paste followed by kumkum to the idol.',
  },
  {
    key: 'pushpa',
    title: 'Pushpa & Durva Arpan',
    instruction: 'Offer the hibiscus flowers and durva grass blades, placing them gently at the feet of the idol.',
  },
  {
    key: 'deepa',
    title: 'Deepa Prajvalana',
    instruction: 'Light the oil lamp and place it on the right side of the altar.',
  },
  {
    key: 'naivedya',
    title: 'Naivedya (Modak Offering)',
    instruction: 'Offer the modak or ladoo as prasad, along with the bananas, with folded hands.',
  },
  {
    key: 'aarti',
    title: 'Aarti',
    instruction: 'Light the camphor and perform aarti in gentle clockwise circles while reciting or playing the aarti.',
  },
  {
    key: 'closing',
    title: 'Closing Prayer',
    instruction: 'Complete a pradakshina (circumambulation) if space allows, and close with a short prayer of gratitude.',
    mantra: 'Om Shanti Shanti Shantihi',
  },
];

export const poojas: Pooja[] = [
  {
    id: 'ganesh-pooja',
    name: 'Ganesh Pooja',
    tagline: 'Beginner Friendly',
    level: 'Beginner Friendly',
    description:
      'A foundational ritual to invoke Lord Ganesha, the remover of obstacles. Performing this pooja brings auspicious beginnings, clarity, and peace to your endeavors.',
    durationLabel: '30 mins',
    difficulty: 'Beginner',
    timing: 'Morning/Evening',
    icon: 'self-improvement',
    items: ganeshItems,
    steps: ganeshSteps,
  },
  {
    id: 'shiva-abhishek',
    name: 'Shiva Abhishek',
    tagline: 'Daily Practice',
    level: 'Daily Practice',
    description: 'A soothing ritual bath offered to the Shiva Lingam, restoring calm and inner balance.',
    durationLabel: '20 mins',
    difficulty: 'Beginner',
    timing: 'Morning',
    icon: 'water-drop',
    items: [],
    steps: [],
  },
  {
    id: 'gayatri-mantra',
    name: 'Gayatri Mantra',
    tagline: 'Chanting',
    level: 'Chanting',
    description: 'A guided chanting session for one of the oldest and most revered Vedic mantras.',
    durationLabel: '10 mins',
    difficulty: 'Beginner',
    timing: 'Anytime',
    icon: 'graphic-eq',
    items: [],
    steps: [],
  },
  {
    id: 'satyanarayan-pooja',
    name: 'Satyanarayan Pooja',
    tagline: 'Family Occasion',
    level: 'Beginner Friendly',
    description: 'A ritual of gratitude performed to Lord Vishnu, often for milestones and family occasions.',
    durationLabel: '90 mins',
    difficulty: 'Intermediate',
    timing: 'Evening',
    icon: 'auto-awesome',
    items: [],
    steps: [],
  },
];

export function getPoojaById(id: string | undefined): Pooja | undefined {
  return poojas.find((p) => p.id === id);
}

export function calculateChecklist(pooja: Pooja, opts: PlanningOptions) {
  const grouped = new Map<string, { item: ChecklistItem; amount: number; unit: string }[]>();
  for (const item of pooja.items) {
    const { amount, unit } = item.quantity(opts);
    if (amount <= 0) continue;
    const list = grouped.get(item.category) ?? [];
    list.push({ item, amount, unit });
    grouped.set(item.category, list);
  }
  return Array.from(grouped.entries()).map(([category, entries]) => ({ category, entries }));
}
