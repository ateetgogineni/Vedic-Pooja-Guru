// Sample/reference pooja content for the MVP prototype.
// NOTE: per the PRD, all vidhi/mantra content must be reviewed by a priest
// or trusted source before this ships — treat everything below as
// placeholder content to demonstrate the product flow, not verified vidhi.
// Telugu (`te`) strings are a provisional draft translation and, like the
// English source text, are NOT yet priest-verified — do not treat as
// authoritative ritual guidance. Mantras are left as Sanskrit
// transliteration only and are intentionally not translated per-language.

export type PlanningOptions = {
  headcount: number;
  includeChildren: boolean;
  extendedFamily: boolean;
};

// Per-language display text. `en` is required; other language codes are
// optional and fall back to `en` via `localize()` when missing.
export type Localized = { en: string; te?: string };

export function localize(text: Localized, languageCode: string): string {
  if (languageCode === 'te' && text.te) return text.te;
  return text.en;
}

export type ChecklistItem = {
  key: string;
  name: Localized;
  // Stable English category key used for grouping/icon lookup — see
  // CATEGORY_LABELS for the localized display text.
  category: string;
  icon: string;
  quantity: (opts: PlanningOptions) => { amount: number; unit: string };
};

export const CATEGORY_LABELS: Record<string, Localized> = {
  'Flowers & Fruits': { en: 'Flowers & Fruits', te: 'పూలు & పండ్లు' },
  'Core Pooja Items': { en: 'Core Pooja Items', te: 'ప్రధాన పూజా సామగ్రి' },
  'Altar Setup': { en: 'Altar Setup', te: 'పూజా వేదిక ఏర్పాటు' },
};

export type PoojaStep = {
  key: string;
  title: Localized;
  instruction: Localized;
  mantra?: string;
};

export type Pooja = {
  id: string;
  name: Localized;
  tagline: Localized;
  description: Localized;
  durationLabel: Localized;
  difficulty: Localized;
  timing: Localized;
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
    name: { en: 'Red Hibiscus', te: 'ఎర్ర మందార పువ్వు' },
    category: 'Flowers & Fruits',
    icon: 'local-florist',
    quantity: ({ headcount, extendedFamily }) => {
      const base = 5 + 3 * headcount;
      return { amount: extendedFamily ? Math.ceil(base * 1.1) : base, unit: 'Flowers' };
    },
  },
  {
    key: 'durva-grass',
    name: { en: 'Durva Grass (Bermuda Grass)', te: 'గరిక (దూర్వ గడ్డి)' },
    category: 'Flowers & Fruits',
    icon: 'grass',
    quantity: ({ headcount, extendedFamily }) => {
      const base = 15 + 3 * headcount;
      return { amount: extendedFamily ? Math.ceil(base * 1.1) : base, unit: 'Blades' };
    },
  },
  {
    key: 'bananas',
    name: { en: 'Bananas', te: 'అరటిపండ్లు' },
    category: 'Flowers & Fruits',
    icon: 'eco',
    quantity: ({ headcount }) => ({ amount: 1 + 2 * headcount, unit: 'Fruits' }),
  },
  {
    key: 'marigold-garland',
    name: { en: 'Marigold Garland', te: 'బంతిపూల దండ' },
    category: 'Flowers & Fruits',
    icon: 'local-florist',
    quantity: () => ({ amount: 1, unit: 'Garland' }),
  },
  {
    key: 'coconuts',
    name: { en: 'Coconuts (with water)', te: 'కొబ్బరికాయలు (నీటితో)' },
    category: 'Core Pooja Items',
    icon: 'circle',
    quantity: () => ({ amount: 2, unit: 'Coconuts' }),
  },
  {
    key: 'kumkum',
    name: { en: 'Kumkum (Roli)', te: 'కుంకుమ' },
    category: 'Core Pooja Items',
    icon: 'spa',
    quantity: () => ({ amount: 1, unit: 'Small Packet' }),
  },
  {
    key: 'modak',
    name: { en: 'Modak or Ladoo', te: 'మోదకం లేదా లడ్డూ' },
    category: 'Core Pooja Items',
    icon: 'cake',
    quantity: ({ headcount, includeChildren }) => {
      const base = 1 + 10 * headcount;
      return { amount: includeChildren ? Math.ceil(base * 1.2) : base, unit: 'Pieces' };
    },
  },
  {
    key: 'akshata',
    name: { en: 'Akshata (Raw Rice)', te: 'అక్షతలు (బియ్యం)' },
    category: 'Core Pooja Items',
    icon: 'grain',
    quantity: () => ({ amount: 1, unit: 'Small Cup' }),
  },
  {
    key: 'incense',
    name: { en: 'Incense Sticks', te: 'అగరవత్తులు' },
    category: 'Altar Setup',
    icon: 'local-fire-department',
    quantity: () => ({ amount: 1, unit: 'Pack' }),
  },
  {
    key: 'camphor',
    name: { en: 'Camphor', te: 'కర్పూరం' },
    category: 'Altar Setup',
    icon: 'local-fire-department',
    quantity: () => ({ amount: 1, unit: 'Pack' }),
  },
  {
    key: 'diya',
    name: { en: 'Diya with Oil/Ghee', te: 'నూనె/నెయ్యితో దీపం' },
    category: 'Altar Setup',
    icon: 'local-fire-department',
    quantity: () => ({ amount: 1, unit: 'Lamp' }),
  },
  {
    key: 'red-cloth',
    name: { en: 'Red Cloth (Asana)', te: 'ఎర్ర వస్త్రం (ఆసనం)' },
    category: 'Altar Setup',
    icon: 'checkroom',
    quantity: () => ({ amount: 1, unit: 'Piece' }),
  },
  {
    key: 'seating-mats',
    name: { en: 'Seating Mats', te: 'కూర్చునే చాపలు' },
    category: 'Altar Setup',
    icon: 'chair',
    quantity: ({ headcount, extendedFamily }) =>
      extendedFamily ? { amount: headcount, unit: 'Mats' } : { amount: 0, unit: 'Mats' },
  },
];

const ganeshSteps: PoojaStep[] = [
  {
    key: 'sankalpa',
    title: { en: 'Sankalpa (Intention)', te: 'సంకల్పం' },
    instruction: {
      en: 'Sit facing east. Light the diya and take a small amount of water and akshata in your right hand. State your intention for performing this pooja, then let the water fall onto a plate.',
      te: 'తూర్పు దిశగా కూర్చోండి. దీపం వెలిగించి, కుడిచేతిలో కొద్దిగా నీరు మరియు అక్షతలు తీసుకోండి. ఈ పూజ చేయడానికి మీ సంకల్పాన్ని చెప్పి, నీటిని ఒక పళ్ళెంలోకి వదలండి.',
    },
  },
  {
    key: 'avahan',
    title: { en: 'Ganesh Avahan (Invocation)', te: 'గణేశ ఆవాహన' },
    instruction: {
      en: 'Invite Lord Ganesha into the idol or kalash, welcoming the divine presence for the ritual ahead.',
      te: 'గణేశుడిని విగ్రహంలో లేదా కలశంలోకి ఆవాహన చేసి, రాబోయే పూజ కోసం దివ్య సన్నిధిని స్వాగతించండి.',
    },
    mantra: 'Om Gam Ganapataye Namaha',
  },
  {
    key: 'asana',
    title: { en: 'Asana Samarpan (Offering a Seat)', te: 'ఆసన సమర్పణ' },
    instruction: {
      en: 'Place the idol on the red cloth you have prepared, offering a comfortable seat.',
      te: 'మీరు సిద్ధం చేసిన ఎర్ర వస్త్రంపై విగ్రహాన్ని ఉంచి, సౌకర్యవంతమైన ఆసనాన్ని సమర్పించండి.',
    },
  },
  {
    key: 'padya-arghya',
    title: { en: 'Padya, Arghya & Achaman', te: 'పాద్యం, అర్ఘ్యం & ఆచమనం' },
    instruction: {
      en: 'Offer water for the feet, hands, and sipping — a traditional gesture of hospitality and respect.',
      te: 'పాదాలకు, చేతులకు నీరు సమర్పించి, సిప్ చేయడానికి కూడా నీరు అందించండి — ఇది సాంప్రదాయ ఆతిథ్య మరియు గౌరవ సూచన.',
    },
  },
  {
    key: 'snana',
    title: { en: 'Snana (Ritual Bath)', te: 'స్నానం' },
    instruction: {
      en: 'Gently bathe the idol with water, then with panchamrit if available, and rinse once more with clean water.',
      te: 'విగ్రహాన్ని మెల్లగా నీటితో స్నానం చేయించి, అందుబాటులో ఉంటే పంచామృతంతో అభిషేకించి, మళ్ళీ శుభ్రమైన నీటితో కడగండి.',
    },
  },
  {
    key: 'vastra',
    title: { en: 'Vastra & Yajnopavit', te: 'వస్త్రం & యజ్ఞోపవీతం' },
    instruction: {
      en: 'Offer a new piece of cloth and, if following this tradition, a sacred thread.',
      te: 'కొత్త వస్త్రాన్ని సమర్పించండి, మరియు ఈ సంప్రదాయాన్ని అనుసరిస్తే పవిత్ర జందెం కూడా సమర్పించండి.',
    },
  },
  {
    key: 'chandan',
    title: { en: 'Chandan & Kumkum', te: 'చందనం & కుంకుమ' },
    instruction: {
      en: 'Apply a small amount of sandalwood paste followed by kumkum to the idol.',
      te: 'విగ్రహానికి కొద్దిగా గంధం పూసి, తరువాత కుంకుమ అద్దండి.',
    },
  },
  {
    key: 'pushpa',
    title: { en: 'Pushpa & Durva Arpan', te: 'పుష్ప & దూర్వా అర్పణ' },
    instruction: {
      en: 'Offer the hibiscus flowers and durva grass blades, placing them gently at the feet of the idol.',
      te: 'మందార పూలు మరియు దూర్వా గడ్డిని విగ్రహం పాదాల వద్ద మెల్లగా ఉంచి సమర్పించండి.',
    },
  },
  {
    key: 'deepa',
    title: { en: 'Deepa Prajvalana', te: 'దీప ప్రజ్వలన' },
    instruction: {
      en: 'Light the oil lamp and place it on the right side of the altar.',
      te: 'నూనె దీపాన్ని వెలిగించి పూజా వేదిక కుడి వైపున ఉంచండి.',
    },
  },
  {
    key: 'naivedya',
    title: { en: 'Naivedya (Modak Offering)', te: 'నైవేద్యం (మోదక సమర్పణ)' },
    instruction: {
      en: 'Offer the modak or ladoo as prasad, along with the bananas, with folded hands.',
      te: 'మోదకం లేదా లడ్డూను ప్రసాదంగా, అరటిపండ్లతో పాటు, చేతులు జోడించి సమర్పించండి.',
    },
  },
  {
    key: 'aarti',
    title: { en: 'Aarti', te: 'హారతి' },
    instruction: {
      en: 'Light the camphor and perform aarti in gentle clockwise circles while reciting or playing the aarti.',
      te: 'కర్పూరం వెలిగించి, హారతి పాడుతూ లేదా వినిపిస్తూ మెల్లగా సవ్యదిశలో హారతి ఇవ్వండి.',
    },
  },
  {
    key: 'closing',
    title: { en: 'Closing Prayer', te: 'ముగింపు ప్రార్థన' },
    instruction: {
      en: 'Complete a pradakshina (circumambulation) if space allows, and close with a short prayer of gratitude.',
      te: 'స్థలం అనుమతిస్తే ప్రదక్షిణ చేసి, కృతజ్ఞతతో కూడిన చిన్న ప్రార్థనతో ముగించండి.',
    },
    mantra: 'Om Shanti Shanti Shantihi',
  },
];

export const poojas: Pooja[] = [
  {
    id: 'ganesh-pooja',
    name: { en: 'Ganesh Pooja', te: 'గణేశ పూజ' },
    tagline: { en: 'Beginner Friendly', te: 'ప్రారంభకులకు అనుకూలం' },
    level: 'Beginner Friendly',
    description: {
      en: 'A foundational ritual to invoke Lord Ganesha, the remover of obstacles. Performing this pooja brings auspicious beginnings, clarity, and peace to your endeavors.',
      te: 'విఘ్నాలను తొలగించే గణపతిని ఆవాహన చేసే మూలభూత పూజ. ఈ పూజను చేయడం వల్ల మీ కార్యాలకు శుభారంభం, స్పష్టత మరియు శాంతి లభిస్తాయి.',
    },
    durationLabel: { en: '30 mins', te: '30 నిమిషాలు' },
    difficulty: { en: 'Beginner', te: 'ప్రారంభ స్థాయి' },
    timing: { en: 'Morning/Evening', te: 'ఉదయం/సాయంత్రం' },
    icon: 'self-improvement',
    items: ganeshItems,
    steps: ganeshSteps,
  },
  {
    id: 'shiva-abhishek',
    name: { en: 'Shiva Abhishek', te: 'శివ అభిషేకం' },
    tagline: { en: 'Daily Practice', te: 'నిత్య సాధన' },
    level: 'Daily Practice',
    description: {
      en: 'A soothing ritual bath offered to the Shiva Lingam, restoring calm and inner balance.',
      te: 'శివలింగానికి అర్పించే ప్రశాంతమైన అభిషేక పూజ, మనసుకు ప్రశాంతత మరియు అంతర్గత సమతుల్యతను చేకూరుస్తుంది.',
    },
    durationLabel: { en: '20 mins', te: '20 నిమిషాలు' },
    difficulty: { en: 'Beginner', te: 'ప్రారంభ స్థాయి' },
    timing: { en: 'Morning', te: 'ఉదయం' },
    icon: 'water-drop',
    items: [],
    steps: [],
  },
  {
    id: 'gayatri-mantra',
    name: { en: 'Gayatri Mantra', te: 'గాయత్రీ మంత్రం' },
    tagline: { en: 'Chanting', te: 'జప సాధన' },
    level: 'Chanting',
    description: {
      en: 'A guided chanting session for one of the oldest and most revered Vedic mantras.',
      te: 'అత్యంత ప్రాచీనమైన మరియు పూజనీయమైన వేద మంత్రాలలో ఒకటైన దీని కోసం మార్గదర్శక జప సెషన్.',
    },
    durationLabel: { en: '10 mins', te: '10 నిమిషాలు' },
    difficulty: { en: 'Beginner', te: 'ప్రారంభ స్థాయి' },
    timing: { en: 'Anytime', te: 'ఎప్పుడైనా' },
    icon: 'graphic-eq',
    items: [],
    steps: [],
  },
  {
    id: 'satyanarayan-pooja',
    name: { en: 'Satyanarayan Pooja', te: 'సత్యనారాయణ పూజ' },
    tagline: { en: 'Family Occasion', te: 'కుటుంబ వేడుక' },
    level: 'Beginner Friendly',
    description: {
      en: 'A ritual of gratitude performed to Lord Vishnu, often for milestones and family occasions.',
      te: 'విష్ణువుకు కృతజ్ఞతతో చేసే పూజ, సాధారణంగా ముఖ్యమైన సందర్భాలు మరియు కుటుంబ వేడుకలలో నిర్వహిస్తారు.',
    },
    durationLabel: { en: '90 mins', te: '90 నిమిషాలు' },
    difficulty: { en: 'Intermediate', te: 'మధ్యస్థ స్థాయి' },
    timing: { en: 'Evening', te: 'సాయంత్రం' },
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
