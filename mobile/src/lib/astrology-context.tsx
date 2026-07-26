import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type AstrologyProfile = {
  rashi: string;
  nakshatra: string;
  dob: string;
  birthPlace: string;
};

const EMPTY_PROFILE: AstrologyProfile = { rashi: '', nakshatra: '', dob: '', birthPlace: '' };

const STORAGE_KEY = 'vedic-vidhi.astrology-profile';

type AstrologyContextValue = {
  profile: AstrologyProfile;
  isComplete: boolean;
  setProfile: (profile: AstrologyProfile) => void;
};

const AstrologyContext = createContext<AstrologyContextValue | null>(null);

export function AstrologyProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<AstrologyProfile>(EMPTY_PROFILE);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) setProfileState(JSON.parse(raw));
    });
  }, []);

  const setProfile = (next: AstrologyProfile) => {
    setProfileState(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const value = useMemo(
    () => ({ profile, isComplete: Boolean(profile.rashi), setProfile }),
    [profile],
  );

  return <AstrologyContext.Provider value={value}>{children}</AstrologyContext.Provider>;
}

export function useAstrologyProfile() {
  const ctx = useContext(AstrologyContext);
  if (!ctx) throw new Error('useAstrologyProfile must be used within AstrologyProvider');
  return ctx;
}
