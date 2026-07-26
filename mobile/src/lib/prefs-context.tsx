import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = { code: string; label: string; nativeLabel: string };
export type Tradition = { id: string; label: string; description: string; icon: string };

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ' },
];

export const TRADITIONS: Tradition[] = [
  {
    id: 'north_indian',
    label: 'North Indian',
    description: 'Includes practices typical of UP, Punjab, Rajasthan, and surrounding regions.',
    icon: 'temple-hindu',
  },
  {
    id: 'south_indian',
    label: 'South Indian',
    description: 'Encompasses Tamil, Telugu, Kannada, and Malayali ritual protocols.',
    icon: 'local-florist',
  },
  {
    id: 'bengali',
    label: 'Bengali',
    description: 'Focuses on Shaktism and eastern regional variations of pooja.',
    icon: 'festival',
  },
  {
    id: 'maharashtrian',
    label: 'Maharashtrian',
    description: 'Tailored to western Indian practices and specific deity worship styles.',
    icon: 'diversity-3',
  },
];

const LANGUAGE_KEY = 'vedic-vidhi.language';
const TRADITION_KEY = 'vedic-vidhi.tradition';

type PrefsContextValue = {
  languageCode: string;
  traditionId: string;
  setLanguageCode: (code: string) => void;
  setTraditionId: (id: string) => void;
};

const PrefsContext = createContext<PrefsContextValue | null>(null);

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [languageCode, setLanguageCodeState] = useState('en');
  const [traditionId, setTraditionIdState] = useState('north_indian');

  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_KEY).then((v) => v && setLanguageCodeState(v));
    AsyncStorage.getItem(TRADITION_KEY).then((v) => v && setTraditionIdState(v));
  }, []);

  const setLanguageCode = (code: string) => {
    setLanguageCodeState(code);
    AsyncStorage.setItem(LANGUAGE_KEY, code);
  };
  const setTraditionId = (id: string) => {
    setTraditionIdState(id);
    AsyncStorage.setItem(TRADITION_KEY, id);
  };

  const value = useMemo(
    () => ({ languageCode, traditionId, setLanguageCode, setTraditionId }),
    [languageCode, traditionId],
  );

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error('usePrefs must be used within PrefsProvider');
  return ctx;
}
