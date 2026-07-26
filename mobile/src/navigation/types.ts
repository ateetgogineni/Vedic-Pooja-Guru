export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Language: { from?: 'settings' } | undefined;
  Tradition: { from?: 'settings' } | undefined;
  Auth: undefined;
  Tabs: undefined;
  PoojaDetail: { id: string };
  Headcount: { id: string };
  Checklist: { id: string };
  Muhurat: { id: string };
  Walkthrough: { id: string };
  Chat: { id?: string; step?: string };
  Help: undefined;
  Profile: undefined;
  AstrologyProfile: undefined;
  FestivalDetail: { id: string };
};

export type TabParamList = {
  Home: undefined;
  Library: undefined;
  Assistant: undefined;
  Panchangam: undefined;
  Festivals: undefined;
};

// Screens inside the tab navigator still need to reach root-stack-only
// screens (e.g. Home -> PoojaDetail, Home -> Profile). React Navigation
// bubbles unmatched `navigate()` calls up to the parent navigator at
// runtime, so a single merged param list keeps every screen's navigation
// hook simply typed without fighting composite-navigator generics.
export type AppParamList = RootStackParamList & TabParamList;
