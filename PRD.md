# Product Requirements Document (PRD)
## Vedic Pooja Guru

**Version:** 1.1
**Date:** 2026-07-24
**Status:** Draft

---

## 1. Overview

### 1.1 Problem
Performing traditional Hindu poojas correctly today depends heavily on either hiring a priest (costly, requires scheduling, often unavailable — especially outside India) or self-guiding using scattered, inconsistent sources like YouTube videos, PDFs, or memory. This leads to:

- Uncertainty about the right items and quantities (especially for larger gatherings)
- Fear of "doing it wrong" — missing steps, wrong mantras, incorrect sequence
- No real-time help when a doubt arises mid-ritual (missing an item, unsure of the next step)
- Regional and language differences making generic content unreliable
- No easy way to know the right date/time (muhurat) or daily ritual guidance

### 1.2 Solution
A mobile app that acts like a **virtual priest's assistant**: it guides the user step-by-step through poojas, calculates exactly what items and quantities are needed based on headcount, and provides **grounded, real-time AI assistance** (including hands-free voice) during the ritual — personalized to the user's region and language.

### 1.3 Target Users
- **Primary:** Hindu households/individuals who want to perform poojas themselves — young professionals and nuclear families (urban or abroad) without easy access to a family priest.
- **Diaspora Hindus** outside India, where priests are scarce and ritual knowledge isn't always passed down.
- **Daily-practice users** wanting routine spiritual guidance (morning rituals, panchangam) without repeated lookups.
- **Secondary:** People organizing larger community/family poojas needing planning help (item lists, quantities per headcount).

### 1.4 Value Proposition
1. **AI-assisted, not just informational** — dynamic, personalized guidance vs. static content.
2. **Grounded accuracy** — rituals/mantras based on verified traditional sources, not AI improvisation.
3. **Region- and language-aware** — adapts to Maharashtrian, Tamil, Bengali, etc. traditions.
4. **Hands-free, real-time** — voice-first interaction for use mid-ritual.
5. **Everyday utility** — daily rituals + panchangam drive habitual use, not just festival downloads.
6. **Accessibility** — removes cost/availability barriers of hiring a priest.

**In short:** it turns the guesswork and dependency of traditional pooja practice into a guided, personalized, trustworthy digital experience — less a content app, more an on-demand ritual assistant.

---

## 2. Features by Phase

### Phase 1 — MVP (Prove the core idea)
**Goal:** Validate that people will use AI-guided pooja guidance instead of static content or a priest, for a small set of common poojas.

**Content & Guidance**
- 3–4 major poojas fully built (Ganesh Pooja, Satyanarayan Pooja, Daily Puja, Griha Pravesh)
- Step-by-step guided vidhi flow (current/next step navigation)
- Item/samagri checklist per pooja
- Mantras with audio pronunciation
- Regional variant selection for included poojas
- 2–3 languages (English, Hindi, + one regional language)

**AI Assistant**
- Quantity calculator based on headcount (deterministic/rule-based)
- Grounded conversational Q&A during pooja (RAG-based, not freeform)
- Context-aware answers (knows current step)
- Voice interaction (hands-free ask/respond)
- Pre-pooja planning chat ("I have 10 guests, what do I need?")
- Guardrail: fallback to "consult a priest" for out-of-scope/theological questions

**Planning**
- Auto-generated shopping/item list
- Panchangam basics — today's tithi/muhurat
- Suggested best date/time for included poojas

**During-Pooja**
- Voice-guided walkthrough (TTS reads steps aloud)

**Trust**
- All content reviewed/verified by a priest or trusted source (non-negotiable)

**Platform**
- Mobile app — Android first (faster reach in India)

---

### Phase 2 — V2 (Deepen engagement, build habit)
**Goal:** Move from occasional use to daily/regular use; expand breadth.

- Expanded pooja library (10–15+ poojas, more regional variants)
- Meaning/translation of mantras
- Daily morning ritual guide
- Full panchangam integration with notifications (tithi, nakshatra, auspicious times)
- Festival calendar with reminders
- Offline mode for saved/downloaded poojas
- User profiles (saved/favorite poojas, history, preferences)
- Improved AI session memory (context retained across full pooja)
- Additional languages
- Aarti audio/video sync at pooja end
- iOS app launch
- Shopping list export (shareable/exportable)

---

### Phase 3 — V3 (Scale, monetize, differentiate)
**Goal:** Build the moat — deeper AI, business model, community trust.

- E-commerce integration (order pooja items directly)
- Priest-on-call fallback (hybrid human + AI model)
- Freemium/subscription model (premium poojas, ad-free, priority AI)
- Community feedback/correction system for content accuracy
- Content sourcing/citations shown
- Family/group participation (multiple members in one session, shared planning)
- Budget estimator for larger events
- Guest-count planning (seating, prasad quantity)
- Habit tracking / streaks for daily practice
- Ambience effects (bell/conch sounds)
- Timer/progress indicator; pause & resume mid-pooja
- Accessibility improvements (elderly-friendly UI, screen reader support)
- Tablet-optimized "altar-side" view
- Referral/sharing mechanics
- User-contributed/family-specific ritual variants
- Proactive AI tips ("you'll need extra flowers for the next step")

---

### Phase 4 — Future (Beyond initial roadmap)
- Expansion beyond Hindu poojas to other religions/traditions
- Regional priest network partnerships for hybrid bookings
- AR/visual guidance (point camera at altar for step recognition)

---

## 3. Style Guide

### 3.1 Overall Look & Feel
Calm, reverent, and premium — evoking devotion and warmth without feeling gaudy or "temple-clipart." Clean, spacious, modern layouts with subtle traditional accents (soft mandala motifs, gentle gradients). The mood is **serene and trustworthy**, not busy. Think "meditative wellness app meets tradition."

### 3.2 Colour Palette
| Role | Colour | Hex |
|---|---|---|
| Primary (devotion/auspicious) | Saffron / Marigold | `#E9862E` |
| Primary Deep | Deep Kumkum Red | `#B23A2E` |
| Secondary | Turmeric Gold | `#F2C14E` |
| Accent | Sacred Green (tulsi) | `#4C7A5A` |
| Background (light) | Warm Ivory | `#FBF6EC` |
| Surface / Card | Soft Sand | `#F3E9D6` |
| Text Primary | Deep Brown-Black | `#2B211A` |
| Text Secondary | Muted Brown | `#6B5B4B` |
| Success | Leaf Green | `#4C7A5A` |
| Alert / Muhurat warning | Amber | `#D99A2B` |

Optional dark mode: deep indigo/charcoal base (`#1C1A24`) with saffron and gold accents (evokes an evening aarti / diya ambience).

### 3.3 Typography Feel
- **Headings:** A warm humanist serif or a refined display serif for a devotional, timeless feel (e.g., *Tiro Devanagari*, *Noto Serif*, *Playfair Display*-style). Must fully support Devanagari and target regional scripts.
- **Body:** A clean, highly readable humanist sans-serif (e.g., *Noto Sans*, *Inter*) with strong multi-script support for mantras and multi-language text.
- **Mantra text:** Slightly larger, generous line-height for readability during recitation; script-accurate rendering is critical.
- Rounded corners, soft shadows, generous whitespace, and gentle motion (fade/slide) reinforce the calm tone.

### 3.4 Iconography & Imagery
- Simple line icons with rounded terminals; subtle traditional accent icons (diya, kalash, flower, om) used sparingly.
- Imagery: soft, respectful, warm-lit photography or tasteful illustration — avoid harsh saturated stock imagery.

---

## 4. Tech Stack

### 4.1 Confirmed
- **Mobile App:** **React Native** (cross-platform iOS + Android; Android prioritized for MVP). Recommend **Expo** for faster MVP development.

### 4.2 Backend & Database — Recommendation
**Use Firebase for the MVP** — it covers almost everything with minimal ops overhead, ideal for moving fast:

| Need | Firebase Service |
|---|---|
| Authentication | Firebase Auth (phone/Google sign-in) |
| Content + user data | Cloud Firestore |
| Audio/video/mantra assets | Cloud Storage |
| Server logic / API glue | Cloud Functions |
| Push notifications (panchangam, festivals) | Firebase Cloud Messaging (FCM) |
| Analytics | Firebase Analytics |
| Offline caching (Phase 2) | Firestore offline persistence |

**The one gap: the AI/RAG layer.** Firebase isn't built for LLM orchestration or vector search. Pair it with a small dedicated **AI service**:

- A lightweight **Node.js or Python service** (Cloud Run / a small VM) that handles:
  - **LLM** for grounded conversational Q&A (Anthropic Claude recommended for the assistant).
  - **Vector search / RAG** over the verified vidhi knowledge base (e.g., a managed vector DB such as Pinecone, or `pgvector` on Postgres).
  - The **deterministic quantity calculator** (plain code / lookup tables + formulas — never let the LLM guess numbers).
- Cloud Functions call this AI service; the app never talks to the LLM directly.

**Voice pipeline:** Speech-to-text + text-to-speech via a managed provider (e.g., Google Cloud STT/TTS) with multi-language support, orchestrated through the AI service.

**Summary recommendation:** **Firebase (app backend + data) + a dedicated AI microservice (LLM + vector DB) for the assistant.** This gives you speed for the MVP while keeping the AI layer reliable and grounded. If you later outgrow Firestore's query flexibility, a migration path to Postgres/Supabase is straightforward.

---

## 5. Screen List (All Phases)

> **Legend:** ⭐ = MVP (Phase 1) screen. Others tagged with their phase.

### Onboarding & Setup
| Screen | Phase | Description |
|---|---|---|
| Splash / Launch | ⭐ P1 | Branded launch screen with logo and calm motion. |
| Onboarding Carousel | ⭐ P1 | 2–3 slides introducing the app's value (AI guidance, quantity calc, voice help). |
| Language Selection | ⭐ P1 | Choose app + audio language. |
| Region / Tradition Selection | ⭐ P1 | Choose regional tradition (e.g., South Indian, North Indian, Bengali). |
| Sign In / Sign Up | ⭐ P1 | Phone/Google auth via Firebase (guest browsing allowed). |

### Home & Navigation
| Screen | Phase | Description |
|---|---|---|
| Home / Dashboard | ⭐ P1 | Entry hub: featured poojas, today's panchangam snapshot, quick actions. |
| Pooja Library / Catalog | ⭐ P1 | Browse/search available poojas, filter by occasion/region. |
| Pooja Detail | ⭐ P1 | Overview of a selected pooja: description, duration, item list preview, "Start" and "Plan" actions. |

### Planning
| Screen | Phase | Description |
|---|---|---|
| Headcount / Planning Input | ⭐ P1 | Enter number of participants and options; feeds the quantity calculator. |
| Item / Samagri Checklist | ⭐ P1 | Auto-calculated item list with quantities; check-off + shopping-list view. |
| Muhurat / Date Suggestion | ⭐ P1 | Suggested auspicious date/time for the selected pooja. |
| Shopping List Export | P2 | Shareable/exportable version of the item list. |
| Budget Estimator | P3 | Estimated cost for larger poojas. |
| Order Items (E-commerce) | P3 | Purchase pooja items via integrated partners. |

### Guided Pooja Experience
| Screen | Phase | Description |
|---|---|---|
| Pooja Step Walkthrough | ⭐ P1 | Core guided flow: current step, instructions, mantra, next/previous, voice narration. |
| Mantra View | ⭐ P1 | Enlarged mantra text with audio pronunciation and (P2) meaning/translation. |
| AI Assistant (Chat/Voice) | ⭐ P1 | Grounded, context-aware Q&A; hands-free voice ask/respond during the ritual. |
| Aarti Sync | P2 | Aarti audio/video synced for the closing step. |
| Progress / Timer Overlay | P3 | Step X of Y indicator, timer, pause & resume. |
| Group Participation | P3 | Multiple members join one shared pooja session. |

### Daily & Calendar
| Screen | Phase | Description |
|---|---|---|
| Panchangam (Basic) | ⭐ P1 | Today's tithi and muhurat snapshot. |
| Panchangam (Full) | P2 | Detailed daily panchangam: tithi, nakshatra, auspicious/inauspicious times. |
| Daily Ritual Guide | P2 | Guided morning ritual flow. |
| Festival Calendar | P2 | Upcoming festivals with reminders. |
| Habit Tracker / Streaks | P3 | Daily practice streaks and stats. |

### Profile & Personalization
| Screen | Phase | Description |
|---|---|---|
| User Profile | P2 | Account info, language/region preferences. |
| Saved / Favorite Poojas | P2 | Quick access to saved poojas. |
| Pooja History | P2 | Log of performed poojas with dates. |
| Family Profile | P3 | Multiple members and their preferences. |
| Settings | ⭐ P1 | Language, region, notifications, audio, dark mode. |

### Trust, Support & Business
| Screen | Phase | Description |
|---|---|---|
| Content Source / Verification Info | P3 | Sourcing and priest-verification details for rituals. |
| Feedback / Report Content | P3 | Community correction and feedback mechanism. |
| Priest-on-Call | P3 | Book a human priest as a fallback/hybrid option. |
| Subscription / Paywall | P3 | Freemium upgrade, premium poojas, ad-free. |
| Referral / Share | P3 | Invite family/friends. |
| Help / About | ⭐ P1 | Basic help, contact, and app info. |

---

## 6. Best Candidate to Build Fully Functional First

**Recommended first flow: the single-pooja guided experience — from Pooja Detail → Headcount/Planning → Item Checklist → Guided Step Walkthrough (with AI Assistant + voice) — for ONE pooja (Ganesh Pooja).**

**Why this flow:**
- It contains the app's **core differentiator** end-to-end: quantity calculation, grounded AI guidance, step-by-step flow, and hands-free voice — the things no static-content competitor offers.
- Building it for **one pooja** proves the hardest, riskiest parts (grounded AI accuracy, voice UX, quantity logic, priest-verified content) before investing in breadth.
- It's a **complete, demoable loop** users can actually perform a real pooja with — enough to test genuine value, gather feedback, and validate trust.
- Everything else (more poojas, daily rituals, profiles, panchangam depth, monetization) is either content scaling or additive, and only matters once this core loop is proven.

**Concrete first milestone:** Fully working Ganesh Pooja — planning to completion — with the AI assistant grounded on verified content, voice narration, and the quantity calculator live. Nail this one flow, then replicate the pattern across other poojas.

---

## 7. Open Questions / Next Steps
- Finalize the exact 3–4 poojas and their regional variants for MVP.
- Source and verify vidhi content with a partnering priest.
- Choose the vector DB and LLM provider for the AI service.
- Confirm STT/TTS provider and language coverage.
- Define the quantity-calculation formulas/lookup tables per pooja.
- Decide Expo vs. bare React Native based on native module needs (voice/audio).
