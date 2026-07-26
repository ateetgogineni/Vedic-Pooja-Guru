/**
 * Design tokens transcribed from designs/DESIGN.md ("Sanatana Serenity").
 * Keep this file as the single source of truth for colour, type, spacing
 * and radius so every screen stays visually consistent.
 */
import { Platform } from 'react-native';

export interface ThemeColors {
  outline: string;
  background: string;
  surface: string;
  surfaceBright: string;
  surfaceDim: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  outlineVariant: string;
  onSurface: string;
  onSurfaceVariant: string;
  onBackground: string;
  inverseSurface: string;
  inverseOnSurface: string;
  primary: string;
  primaryContainer: string;
  onPrimary: string;
  onPrimaryContainer: string;
  inversePrimary: string;
  secondary: string;
  secondaryContainer: string;
  onSecondary: string;
  onSecondaryContainer: string;
  tertiary: string;
  tertiaryContainer: string;
  onTertiary: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  softSand: string;
  warmIvory: string;
  sacredGreen: string;
  muhuratAmber: string;
  card: string;
}

export type ColorRole = keyof ThemeColors;

export const LightColors: ThemeColors = {
  outline: '#887365',
  background: '#FBF6EC', // warm-ivory, used as the app canvas
  surface: '#fff8f5',
  surfaceBright: '#fff8f5',
  surfaceDim: '#e9d7cb',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#fff1e9',
  surfaceContainer: '#fdeadf',
  surfaceContainerHigh: '#f8e5d9',
  surfaceContainerHighest: '#f2dfd4',
  outlineVariant: '#dbc2b1',
  onSurface: '#231a13',
  onSurfaceVariant: '#554337',
  onBackground: '#231a13',
  inverseSurface: '#392e27',
  inverseOnSurface: '#ffede3',
  primary: '#924b00',
  primaryContainer: '#e9862e',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#572a00',
  inversePrimary: '#ffb781',
  secondary: '#aa3529',
  secondaryContainer: '#ff7261',
  onSecondary: '#ffffff',
  onSecondaryContainer: '#700605',
  tertiary: '#785a00',
  tertiaryContainer: '#c59827',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#463300',
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
  softSand: '#F3E9D6',
  warmIvory: '#FBF6EC',
  sacredGreen: '#4C7A5A',
  muhuratAmber: '#D99A2B',
  card: '#F3E9D6',
};

// Derived dark palette (DESIGN.md: "deep indigo/charcoal base with saffron
// and gold accents"). No dark mockups were exported, so this is a
// reasonable low-risk mapping of the same semantic roles.
export const DarkColors: ThemeColors = {
  outline: '#a08d7e',
  background: '#1C1A24',
  surface: '#241f2c',
  surfaceBright: '#2c2635',
  surfaceDim: '#1C1A24',
  surfaceContainerLowest: '#17151d',
  surfaceContainerLow: '#211d29',
  surfaceContainer: '#28222f',
  surfaceContainerHigh: '#332b3b',
  surfaceContainerHighest: '#3d3444',
  outlineVariant: '#4a4152',
  onSurface: '#f2e9e4',
  onSurfaceVariant: '#d6c5b9',
  onBackground: '#f2e9e4',
  inverseSurface: '#f2e9e4',
  inverseOnSurface: '#231a13',
  primary: '#ffb781',
  primaryContainer: '#a85a00',
  onPrimary: '#3a1d00',
  onPrimaryContainer: '#ffdcc4',
  inversePrimary: '#924b00',
  secondary: '#ffb4a9',
  secondaryContainer: '#7c2a20',
  onSecondary: '#5c0f08',
  onSecondaryContainer: '#ffdad5',
  tertiary: '#f0c04d',
  tertiaryContainer: '#5b4300',
  onTertiary: '#3a2a00',
  onTertiaryContainer: '#ffdf9d',
  error: '#ffb4ab',
  onError: '#690005',
  errorContainer: '#93000a',
  onErrorContainer: '#ffdad6',
  softSand: '#332b3b',
  warmIvory: '#1C1A24',
  sacredGreen: '#7fac8d',
  muhuratAmber: '#e8b653',
  card: '#28222f',
};

// No bundled Noto Sans/Serif font files ship with this bare-RN project (see
// mobile/README.md for how to add the real .ttf files and native-link them
// with `npx react-native-asset`). Until then we fall back to each
// platform's built-in serif/sans-serif families, which still honours the
// "serif headlines, sans body" structure from DESIGN.md.
const serifFamily = Platform.select<string | undefined>({ android: 'serif', ios: 'Georgia', default: 'serif' });
const sansFamily = Platform.select<string | undefined>({ android: 'sans-serif', ios: undefined, default: undefined });

export const FontFamilies = { serif: serifFamily, sans: sansFamily };

// Typography scale — matches DESIGN.md `typography` tokens.
export const Type = {
  mantraDisplay: { fontFamily: serifFamily, fontWeight: '500' as const, fontSize: 26, lineHeight: 44, letterSpacing: 0.5 },
  headlineLg: { fontFamily: serifFamily, fontWeight: '700' as const, fontSize: 32, lineHeight: 40 },
  headlineLgMobile: { fontFamily: serifFamily, fontWeight: '700' as const, fontSize: 28, lineHeight: 36 },
  headlineMd: { fontFamily: serifFamily, fontWeight: '600' as const, fontSize: 24, lineHeight: 32 },
  bodyLg: { fontFamily: sansFamily, fontSize: 18, lineHeight: 28 },
  bodyMd: { fontFamily: sansFamily, fontSize: 16, lineHeight: 24 },
  labelSm: { fontFamily: sansFamily, fontWeight: '600' as const, fontSize: 12, lineHeight: 16, letterSpacing: 0.6 },
} as const;

// Spacing scale — matches DESIGN.md `spacing` tokens (rem -> px, 1rem = 16).
export const Spacing = {
  stackSm: 8,
  stackMd: 24,
  stackLg: 48,
  gutter: 16,
  marginMobile: 16,
  marginDesktop: 40,
} as const;

export const Radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 24,
  full: 9999,
} as const;

export const MaxContentWidth = 640;
