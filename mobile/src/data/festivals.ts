// Sample festival calendar data for the MVP prototype.
// NOTE: dates/times below are placeholder estimates, NOT yet derived from
// a real panchangam calculation (which needs location-aware astronomical
// data — see PanchangamScreen). Treat as sample content only, same as the
// rest of this prototype's unverified placeholder data.
import type { Localized } from '@/lib/i18n';

export type Festival = {
  id: string;
  name: Localized;
  description: Localized;
  icon: string;
  start: string;
  end: string;
};

export const FESTIVALS: Festival[] = [
  {
    id: 'raksha-bandhan',
    name: { en: 'Raksha Bandhan', te: 'రక్షా బంధన్' },
    description: {
      en: 'A celebration of the bond between brothers and sisters, marked by tying a sacred thread (rakhi).',
      te: 'అన్నాచెల్లెళ్ల అనుబంధాన్ని జరుపుకునే పండుగ, పవిత్రమైన రాఖీని కట్టడం ద్వారా జరుపుకుంటారు.',
    },
    icon: 'festival',
    start: '2026-08-28T06:00:00',
    end: '2026-08-28T21:00:00',
  },
  {
    id: 'krishna-janmashtami',
    name: { en: 'Krishna Janmashtami', te: 'కృష్ణ జన్మాష్టమి' },
    description: {
      en: 'Marks the birth of Lord Krishna, celebrated with fasting, devotional singing, and midnight prayers.',
      te: 'శ్రీకృష్ణుని జన్మదినాన్ని పురస్కరించుకుని ఉపవాసం, భజనలు మరియు అర్ధరాత్రి పూజలతో జరుపుకుంటారు.',
    },
    icon: 'auto-awesome',
    start: '2026-09-04T18:00:00',
    end: '2026-09-05T06:00:00',
  },
  {
    id: 'ganesh-chaturthi',
    name: { en: 'Ganesh Chaturthi', te: 'గణేశ చతుర్థి' },
    description: {
      en: 'A ten-day festival honoring Lord Ganesha, culminating in the immersion (visarjan) of his idol.',
      te: 'గణేశుడిని పూజించే పది రోజుల పండుగ, విగ్రహ నిమజ్జనం (విసర్జన)తో ముగుస్తుంది.',
    },
    icon: 'self-improvement',
    start: '2026-09-14T06:00:00',
    end: '2026-09-23T18:00:00',
  },
  {
    id: 'navratri-dussehra',
    name: { en: 'Navratri & Dussehra', te: 'నవరాత్రి & దసరా' },
    description: {
      en: 'Nine nights honoring the Goddess, followed by Dussehra celebrating the victory of good over evil.',
      te: 'దేవిని పూజించే తొమ్మిది రాత్రులు, ఆ తర్వాత చెడుపై మంచి సాధించిన విజయాన్ని జరుపుకునే దసరా.',
    },
    icon: 'festival',
    start: '2026-10-11T06:00:00',
    end: '2026-10-20T22:00:00',
  },
  {
    id: 'diwali',
    name: { en: 'Diwali', te: 'దీపావళి' },
    description: {
      en: 'The festival of lights, celebrating the victory of light over darkness with diyas, sweets, and Lakshmi puja.',
      te: 'దీపాల పండుగ — దీపాలు, తీపి పదార్థాలు మరియు లక్ష్మీ పూజతో వెలుగు చీకటిపై సాధించిన విజయాన్ని జరుపుకుంటారు.',
    },
    icon: 'wb-twilight',
    start: '2026-11-08T18:00:00',
    end: '2026-11-09T06:00:00',
  },
  {
    id: 'makar-sankranti',
    name: { en: 'Makar Sankranti', te: 'మకర సంక్రాంతి' },
    description: {
      en: 'A harvest festival marking the sun’s transition into Capricorn, celebrated with kite flying and sesame sweets.',
      te: 'సూర్యుడు మకర రాశిలోకి ప్రవేశించే పంట పండుగ, గాలిపటాలు ఎగరవేయడం మరియు నువ్వుల తీపి పదార్థాలతో జరుపుకుంటారు.',
    },
    icon: 'wb-sunny',
    start: '2027-01-14T06:00:00',
    end: '2027-01-14T18:00:00',
  },
];

export function getFestivalById(id: string | undefined): Festival | undefined {
  return FESTIVALS.find((f) => f.id === id);
}
