// Sample rashi (moon-sign) guidance for the MVP prototype.
// NOT a real personalized horoscope calculation — see the on-screen
// disclaimer. Rashi/nakshatra names are Sanskrit terms left untranslated,
// same convention as tithi/nakshatra in panchangam-sample.ts.
import { seedFor } from '@/lib/panchangam-sample';
import type { Localized } from '@/lib/i18n';

export const RASHIS = [
  'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
  'Tula', 'Vrischika', 'Dhanu', 'Makara', 'Kumbha', 'Meena',
];

const GUIDANCE: Localized[] = [
  {
    en: 'A favorable day for new beginnings and important decisions.',
    te: 'కొత్త ప్రారంభాలకు మరియు ముఖ్యమైన నిర్ణయాలకు అనుకూలమైన రోజు.',
  },
  {
    en: 'Focus on family and home matters brings harmony today.',
    te: 'కుటుంబం మరియు ఇంటి విషయాలపై దృష్టి పెట్టడం నేడు సామరస్యాన్ని తెస్తుంది.',
  },
  {
    en: 'Financial caution is advised; avoid major purchases.',
    te: 'ఆర్థిక విషయాల్లో జాగ్రత్త అవసరం; పెద్ద కొనుగోళ్లను నివారించండి.',
  },
  {
    en: 'A good day for spiritual practice and inner reflection.',
    te: 'ఆధ్యాత్మిక సాధన మరియు ఆత్మావలోకనానికి మంచి రోజు.',
  },
  {
    en: 'Communication and travel are favored today.',
    te: 'నేడు సంభాషణ మరియు ప్రయాణం అనుకూలంగా ఉంటాయి.',
  },
];

export function getSampleGuidance(rashi: string, date: Date): Localized {
  const rashiIndex = Math.max(0, RASHIS.indexOf(rashi));
  const seed = seedFor(date) + rashiIndex;
  return GUIDANCE[seed % GUIDANCE.length];
}
