# Vedic Pooja Guru — Mobile (bare React Native CLI)

A clickable prototype of the Vedic Pooja Guru MVP, built with the **React
Native CLI** (no Expo). See `../docs/PRD.md` for product scope and
`../designs/DESIGN.md` for the design system.

This project was originally scaffolded with Expo and was later migrated off
it entirely to bare React Native — native `android/` and `ios/` projects,
`@react-navigation` instead of `expo-router`, `react-native-vector-icons`
instead of `@expo/vector-icons`, `react-native-tts` instead of
`expo-speech`. There is no `expo` package anywhere in `package.json`.

**Verified working**: this has been built and run end-to-end on a real
Android emulator (Pixel 9 Pro AVD) — `npm run android`-equivalent build,
install, Metro connection, and the Onboarding screen rendering correctly.
Two real build issues were found and fixed along the way:
- A corrupted/partial NDK install (side-effect of an interrupted first
  build) — fixed by deleting `<SDK>/ndk/27.1.12297006` and letting Gradle
  redownload it cleanly.
- `react-native-tts`'s bundled `android/build.gradle` uses the defunct
  JCenter repository and an ancient AGP classpath, incompatible with RN
  0.86's Gradle/AGP versions. Patched via `patches/react-native-tts+4.1.1.patch`
  (applied automatically after every `npm install` via the `postinstall`
  script — see `package.json`). If you ever bump `react-native-tts`, delete
  and regenerate this patch with `npx patch-package react-native-tts`.

## What's implemented

**All 15 MVP screens are navigable**, matching the Stitch designs and using
the `designs/DESIGN.md` colour/type/spacing tokens (see
`src/constants/theme.ts`):

Splash → Onboarding → Language → Tradition → Sign In/Up → Home, Library,
Panchangam (basic), Pooja Detail, Headcount Planning, Item Checklist, Muhurat
Suggestion, Step Walkthrough (+ voice narration via `react-native-tts`), AI
Assistant Chat (canned/local responses — see "What's not real" below),
Settings, Help & Support.

**One flow is fully functional end-to-end** (per the PRD's recommendation —
Section 6): **Ganesh Pooja → Headcount Planning → Item Checklist**.

- The quantity calculator (`src/data/poojas.ts`, `calculateChecklist`) is
  deterministic/rule-based, not AI — it recalculates samagri quantities from
  headcount + the "include children" / "extended family" toggles.
- Your headcount choice and checked-off items are **saved and read back**:
  written to Supabase Postgres (`pooja_plans`, `checklist_state` tables, RLS
  scoped to the signed-in user — see `../schema.sql`) when a backend is
  configured, and to local `AsyncStorage` otherwise, so the flow is testable
  immediately even before you've run the SQL. Sign-up/sign-in also uses
  Supabase Auth.
- All other screens use static/sample data (see `src/data/poojas.ts` and
  inline sample data) — wiring them to real data is additive from here (see
  "Wiring up more screens" below).

## What's not real (by design, for this prototype)

- **AI Assistant chat** replies from a small local keyword-matched list, not
  a real LLM. The PRD's recommended architecture (a dedicated AI
  microservice doing grounded RAG over verified vidhi content) is a
  follow-up build, not something to fake convincingly here.
- **Voice input** (the mic button in chat) is a placeholder. Voice
  **output** (TTS reading out each ritual step) is real, via
  `react-native-tts`.
- **Muhurat/Panchangam data** is sample data, not a real astronomical
  calculation.
- **Google sign-in** button is present for design fidelity but not wired up.
- **Fonts**: no Noto Sans/Serif `.ttf` files are bundled (see "Adding the
  real Noto fonts" below) — headings currently render in each platform's
  built-in serif font and body text in the system sans-serif, which already
  matches DESIGN.md's "serif headline / sans body" structure.

## Setup

This is a **bare React Native project** — it needs native Android/iOS
toolchains, not just Node. Follow the official environment setup guide for
your OS first if you haven't already:
https://reactnative.dev/docs/set-up-your-environment (select "React Native
CLI Quickstart", not Expo).

You'll need: Node ≥ 22, a JDK + Android Studio (Android SDK) for Android, and
(macOS only) Xcode + CocoaPods for iOS.

```bash
npm install

# Android only
npm run android

# iOS only (macOS + Xcode required)
cd ios && bundle install && bundle exec pod install && cd ..
npm run ios
```

`npm start` runs the Metro bundler on its own if you'd rather launch the app
from Android Studio / Xcode directly.

> **Note on this environment**: Android Studio, the SDK, and an emulator
> were installed in this environment, and the app has been built and run
> successfully on it end-to-end (see the two fixes noted above). iOS has
> **not** been built or run anywhere (this sandbox is Windows — Xcode
> requires a Mac) — that first build/run is still yours to do.
>
> Also note `npm run android` / `npx react-native run-android` itself
> failed here with `'gradlew.bat' is not recognized` — a quirk of how the
> RN CLI spawns Gradle in this environment. The working sequence was to run
> Gradle directly: `cd android && .\gradlew.bat app:installDebug` with
> `JAVA_HOME` set to Android Studio's bundled JDK
> (`...\Android Studio\jbr`) and `ANDROID_HOME` set to the SDK path, plus
> `npx react-native start` for Metro and `adb reverse tcp:8081 tcp:8081` +
> `adb shell am start -n com.vedicvidhi/.MainActivity` to launch it. If
> `npm run android` doesn't work for you either, fall back to that sequence.

### Connect the backend (Supabase)

The app runs and the core flow works locally without this step. To persist
data server-side and enable real accounts:

1. Create a free project at https://supabase.com.
2. Open the SQL Editor in your Supabase project, paste the entire contents
   of `../schema.sql`, and run it. It creates `profiles`, `pooja_plans`,
   `checklist_state` with row-level security, plus a trigger that creates a
   profile row on sign-up. It's safe to re-run.
3. In Project Settings → API, copy the **Project URL** and **anon public**
   key.
4. Edit `.env` in this folder (already created; copy from `.env.example` if
   missing) and fill in:
   ```
   SUPABASE_URL=...
   SUPABASE_ANON_KEY=...
   ```
5. Env vars are inlined by Babel at bundle time (`react-native-dotenv`), so
   restart Metro with `npm start -- --reset-cache` after editing `.env`.

Until this is done, `src/lib/supabase.ts` logs a warning and the app falls
back to on-device storage automatically — nothing crashes.

### Adding the real Noto fonts (optional)

1. Download the `.ttf` files for Noto Sans (400, 600) and Noto Serif (500,
   600, 700) from Google Fonts and drop them in a new `assets/fonts/`
   folder.
2. Add a `react-native.config.js` with `assets: ['./assets/fonts']`, then
   run `npx react-native-asset` (links fonts into both native projects) and
   rebuild.
3. Update `serifFamily` / `sansFamily` in `src/constants/theme.ts` to the
   exact PostScript names of the files you added.

## Project structure

```
android/, ios/                native projects (generated by the RN CLI)
App.tsx                       app entry: gesture handler, safe area,
                               theme/auth/prefs providers, NavigationContainer
index.js                      registers App with AppRegistry
src/
  screens/                    one component per screen (16 screens)
  navigation/
    types.ts                  RootStackParamList / TabParamList
    RootNavigator.tsx          native-stack navigator (all screens)
    TabNavigator.tsx            bottom-tab navigator (Home/Library/
                                Panchangam/Profile), mounted as "Tabs"
    hooks.ts                   useAppNavigation() / useAppRoute() helpers
  components/ui/               shared design-system primitives (Button, Card,
                               TopBar, Screen, CheckboxRow, ToggleRow, ...)
  constants/theme.ts            colour / type / spacing tokens from DESIGN.md
  data/poojas.ts                static pooja content + the quantity calculator
  lib/
    supabase.ts                 Supabase client (env-driven via @env)
    auth-context.tsx            session state + sign in/up/out/guest
    prefs-context.tsx           language/tradition selection (AsyncStorage)
    theme-context.tsx           light/dark theme switch (Settings toggle)
    plan-store.ts               reads/writes pooja_plans + checklist_state
                                (Supabase when configured, else AsyncStorage)
```

## Navigation model

`RootNavigator` is a native-stack with every screen except the four tab
screens, plus one entry named `"Tabs"` that mounts `TabNavigator`. Screens
inside the tabs (Home, Library, Panchangam, Profile) can still navigate to
root-level screens (e.g. Home → PoojaDetail) because React Navigation
bubbles an unmatched `navigate()` call up to the parent navigator — see
`src/navigation/types.ts` for why param lists are merged into one
`AppParamList` rather than fought with composite-navigator generics.

## Wiring up more screens to real data later

The structure is deliberately set up so this is additive, not a rewrite:

- **More poojas / real vidhi content**: add entries to `src/data/poojas.ts`
  (or, better, replace that module's data source with a Supabase table —
  the shape already matches what a `poojas` / `pooja_items` / `pooja_steps`
  table would look like). Everything downstream (Detail, Headcount,
  Checklist, Walkthrough) already reads through `getPoojaById` /
  `calculateChecklist`, so new poojas "just work" once they have `items`
  and `steps`.
- **Real AI assistant**: swap the canned-response logic in
  `src/screens/ChatScreen.tsx` for a call to the AI microservice the PRD
  describes (Section 4.2) — the chat UI, message list, and suggestion chips
  don't need to change.
- **Real panchangam/muhurat**: replace the sample data in
  `src/screens/PanchangamScreen.tsx` and `src/screens/MuhuratScreen.tsx`
  with a real calculation or API call.
- **Notifications, saved/favorite poojas, pooja history**: additive rows on
  top of the existing `profiles` table and the same RLS pattern used by
  `pooja_plans` / `checklist_state` in `schema.sql`.
