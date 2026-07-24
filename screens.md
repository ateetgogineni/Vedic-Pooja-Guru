# Vedic Pooja Guru — Screens & Style Guide
### (Formatted for Google Stitch screen generation)

**How to use this doc:** Each screen below is a standalone section with **Purpose**, **Key UI Elements**, and **Layout Notes** — paste one section at a time into Stitch as a prompt, along with the Style Guide reference. Phase tags (⭐ MVP / P2 / P3) indicate build priority, not visual priority — all screens should follow the same style guide.

---

## 0. Style Guide (apply to every screen)

**Overall look & feel:** Calm, reverent, premium. Clean, spacious, modern layout with subtle traditional accents (soft mandala motifs, gentle gradients, diya/kalash iconography used sparingly). Meditative-wellness-app-meets-tradition — never cluttered or "temple clipart."

**Colour palette:**
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
| Dark mode base | Deep Indigo/Charcoal | `#1C1A24` (saffron/gold accents on top) |

**Typography:**
- Headings: warm humanist/display serif, devotional and timeless feel (e.g., Tiro Devanagari, Noto Serif, Playfair-Display-style), full Devanagari + regional script support.
- Body: clean humanist sans-serif (e.g., Noto Sans, Inter), strong multi-script support.
- Mantra text: larger size, generous line-height, script-accurate rendering.

**Shape & interaction language:** Rounded corners (12–20px), soft drop shadows, generous whitespace, gentle fade/slide motion. Icons: simple rounded-line icons; traditional accent icons (diya, kalash, flower, Om) used sparingly as decorative flourishes, not clutter.

**Global components to reuse across screens:** Top app bar (with back arrow, screen title, language icon), bottom tab bar (Home, Library, Panchangam, Profile), primary CTA button (saffron fill, rounded, white text), secondary button (outline, saffron border), card component (soft sand background, rounded corners, subtle shadow).

---

## 1. Onboarding & Setup

### 1.1 Splash / Launch Screen ⭐ MVP
**Purpose:** Branded first-impression screen shown briefly on app launch while resources load.
**Key UI Elements:**
- App logo/icon centered (lotus/diya-inspired mark)
- Wordmark "Vedic Pooja Guru" in display serif type
- Subtle background gradient (warm ivory to soft saffron glow)
- Small loading indicator (optional, minimal)
**Layout Notes:** Full-bleed background, logo vertically and horizontally centered, no navigation chrome. Gentle fade-in animation on load.

### 1.2 Onboarding Carousel ⭐ MVP
**Purpose:** Introduce the app's core value props (AI guidance, quantity calculation, voice help) before sign-in.
**Key UI Elements:**
- 2–3 swipeable slides, each with an illustration, short headline, and one-line description
- Dot pagination indicator at bottom
- "Skip" text link (top right)
- "Next" / "Get Started" primary button (bottom)
**Layout Notes:** Full-screen illustration-forward slides, text block in lower third, CTA pinned to bottom. Horizontal swipe gesture.

### 1.3 Language Selection ⭐ MVP
**Purpose:** Let the user choose the app's display and audio language before proceeding.
**Key UI Elements:**
- Screen title ("Choose your language")
- Scrollable list/grid of language options, each showing language name in its own script
- Selected-state highlight (saffron border/fill)
- "Continue" primary button (disabled until a selection is made)
**Layout Notes:** Simple vertical list or 2-column grid of cards; continue button fixed at bottom.

### 1.4 Region / Tradition Selection ⭐ MVP
**Purpose:** Let the user select their regional tradition so ritual content is personalized.
**Key UI Elements:**
- Screen title ("Select your tradition")
- List of region cards (e.g., South Indian, North Indian, Bengali, Maharashtrian) with a small representative icon/motif per card
- Selected-state highlight
- "Continue" primary button
- "Not sure / Skip for now" secondary link
**Layout Notes:** Card grid (2 columns), each card icon + label; continue button fixed at bottom.

### 1.5 Sign In / Sign Up ⭐ MVP
**Purpose:** Authenticate the user (phone or Google) or allow guest browsing.
**Key UI Elements:**
- App logo (small, top)
- Phone number input field with country code selector
- "Continue with Google" button
- "Continue as Guest" text link
- Terms & privacy disclaimer text (small, bottom)
**Layout Notes:** Centered vertical form, generous spacing, primary auth button prominent, guest option de-emphasized but visible.

---

## 2. Home & Navigation

### 2.1 Home / Dashboard ⭐ MVP
**Purpose:** Main entry hub — surfaces featured poojas, today's panchangam snapshot, and quick actions.
**Key UI Elements:**
- Top greeting ("Namaste, [Name]") with profile icon
- Today's Panchangam summary card (tithi, muhurat) with "View more" link
- "Featured / Upcoming Pooja" horizontal scroll card set
- Quick action row (e.g., "Start a Pooja," "Ask AI Assistant")
- Bottom tab navigation
**Layout Notes:** Scrollable vertical feed of cards; panchangam card near top for daily relevance; bottom tab bar persistent.

### 2.2 Pooja Library / Catalog ⭐ MVP
**Purpose:** Browse and search all available poojas, filterable by occasion/region.
**Key UI Elements:**
- Search bar (top)
- Filter chips (region, occasion, duration)
- Grid or list of pooja cards (thumbnail image/icon, name, short tag e.g. "20 min")
- Empty state for no search results
**Layout Notes:** 2-column card grid on mobile; filter chips in a horizontally scrollable row beneath the search bar.

### 2.3 Pooja Detail ⭐ MVP
**Purpose:** Show full overview of a selected pooja before starting: description, duration, item preview, and entry points to plan or start.
**Key UI Elements:**
- Hero image/illustration for the pooja
- Pooja name (serif heading) + short description
- Metadata row (duration, difficulty, region variant selector)
- "What you'll need" preview list (collapsed, with "See full list" link)
- Two primary CTAs: "Plan This Pooja" and "Start Now"
**Layout Notes:** Hero image full-width at top, content scrolls below, CTAs fixed at bottom of screen (sticky).

---

## 3. Planning

### 3.1 Headcount / Planning Input ⭐ MVP
**Purpose:** Capture number of participants and options so the AI can calculate item quantities.
**Key UI Elements:**
- Screen title ("How many people are joining?")
- Stepper/counter input (+/− with number display)
- Optional toggles (e.g., "Include children," "Extended family version")
- "Calculate Items" primary button
**Layout Notes:** Centered single-focus layout, large stepper control as the visual centerpiece, minimal distractions.

### 3.2 Item / Samagri Checklist ⭐ MVP
**Purpose:** Display the AI-calculated item list with quantities; let users check off items they have.
**Key UI Elements:**
- Screen title with pooja name
- List of items, each row showing icon, item name, calculated quantity, and a checkbox
- Section grouping (e.g., "Flowers & Fruits," "Puja Items")
- "Add to Shopping List" / "Share List" secondary action
- "Start Pooja" primary button (bottom)
**Layout Notes:** Vertical checklist grouped by category with subtle section headers; sticky CTA at bottom.

### 3.3 Muhurat / Date Suggestion ⭐ MVP
**Purpose:** Show the suggested auspicious date/time window for the selected pooja.
**Key UI Elements:**
- Screen title ("Best time for this pooja")
- Calendar/date highlight card showing recommended date(s) and time range
- Short explanation text (tithi/nakshatra reasoning)
- "Set Reminder" secondary button
- "Continue" primary button
**Layout Notes:** Single prominent date card near top, supporting text below, actions at bottom.

### 3.4 Shopping List Export (P2)
**Purpose:** Provide a shareable/exportable version of the item checklist.
**Key UI Elements:**
- Formatted list preview (item + quantity)
- Export options row (Share, Copy, Download as PDF)
- "Done" button
**Layout Notes:** Simple document-style preview card centered, action icons in a row beneath it.

### 3.5 Budget Estimator (P3)
**Purpose:** Estimate total cost for larger poojas based on item list.
**Key UI Elements:**
- Itemized cost breakdown list (item, quantity, estimated price)
- Total cost summary card (highlighted)
- Editable price fields per item
**Layout Notes:** Table/list layout with total summary pinned at bottom or top as a sticky card.

### 3.6 Order Items / E-commerce (P3)
**Purpose:** Let users purchase pooja items directly through integrated partners.
**Key UI Elements:**
- Item list with vendor price comparisons
- "Add to Cart" per item
- Cart summary bar (sticky bottom, shows item count + total)
- "Checkout" primary button
**Layout Notes:** Standard e-commerce list layout; sticky cart bar at bottom for quick access.

---

## 4. Guided Pooja Experience

### 4.1 Pooja Step Walkthrough ⭐ MVP
**Purpose:** The core guided ritual flow — shows the current step, instructions, and navigation, with voice narration running.
**Key UI Elements:**
- Progress indicator (step X of Y) at top
- Step illustration/icon
- Step instruction text (large, readable)
- Voice/audio waveform indicator (shows narration is playing)
- Previous / Next step navigation buttons
- Floating "Ask AI Assistant" button (mic icon)
**Layout Notes:** Single-focus, distraction-free full-screen layout; large tap targets since hands may be occupied; floating AI button always accessible in a fixed corner.

### 4.2 Mantra View ⭐ MVP
**Purpose:** Display an enlarged mantra with audio pronunciation for the current step.
**Key UI Elements:**
- Mantra text in large script-accurate typography
- Play/pause audio button with waveform
- Playback speed control
- (P2) "Show meaning" toggle/expandable section
- Close/back button
**Layout Notes:** Mantra text vertically centered as the visual focus, audio controls directly beneath, minimal chrome around it.

### 4.3 AI Assistant (Chat/Voice) ⭐ MVP
**Purpose:** Grounded, context-aware Q&A during the pooja — the app's core differentiator.
**Key UI Elements:**
- Chat message thread (user + AI messages, AI messages marked with a small assistant icon)
- Large mic button for voice input (primary interaction)
- Text input field as fallback
- Suggested quick-question chips (e.g., "What if I don't have a coconut?")
- Context banner showing current pooja step
**Layout Notes:** Chat-style vertical thread with input/mic controls fixed at bottom; context banner pinned at top so AI answers feel grounded.

### 4.4 Aarti Sync (P2)
**Purpose:** Play synced aarti audio/video at the closing step of the pooja.
**Key UI Elements:**
- Video/audio player (large, centered)
- Lyrics text synced/highlighted with playback
- Play/pause, volume controls
- "Finish Pooja" button
**Layout Notes:** Media player as the dominant element, lyrics scroll beneath in sync, finish CTA appears after playback or via skip.

### 4.5 Progress / Timer Overlay (P3)
**Purpose:** Show step progress and elapsed time; allow pausing mid-pooja.
**Key UI Elements:**
- Progress bar (step X of Y)
- Elapsed timer
- Pause/Resume button
- Exit confirmation dialog trigger
**Layout Notes:** Thin overlay bar pinned to top of the walkthrough screen, non-intrusive.

### 4.6 Group Participation (P3)
**Purpose:** Allow multiple household members to join and follow one shared pooja session together.
**Key UI Elements:**
- Participant avatar row (who's joined)
- "Invite" button (share session code/link)
- Shared progress indicator synced across devices
**Layout Notes:** Avatar strip at top of the walkthrough screen, invite action easily accessible but unobtrusive.

---

## 5. Daily & Calendar

### 5.1 Panchangam (Basic) ⭐ MVP
**Purpose:** Show today's tithi and muhurat at a glance.
**Key UI Elements:**
- Date header
- Tithi name and short description
- Auspicious time window highlight
- "View Full Panchangam" link (P2 upsell)
**Layout Notes:** Single summary card, minimal and glanceable — often embedded on Home as well as standalone.

### 5.2 Panchangam (Full) (P2)
**Purpose:** Detailed daily panchangam view — tithi, nakshatra, auspicious/inauspicious windows.
**Key UI Elements:**
- Date selector (swipe/calendar picker)
- Detailed data rows (tithi, nakshatra, yoga, karana, rahu kaal, etc.)
- Auspicious vs. inauspicious time visual timeline
**Layout Notes:** Structured data list with a visual day-timeline strip near the top showing good/bad time blocks.

### 5.3 Daily Ritual Guide (P2)
**Purpose:** Provide a guided flow for daily morning rituals, similar in structure to the full pooja walkthrough but shorter.
**Key UI Elements:**
- Step list/carousel (fewer steps than a full pooja)
- Voice narration controls
- "Mark as done today" button
**Layout Notes:** Same visual language as Pooja Step Walkthrough but condensed; completion action prominent at the end.

### 5.4 Festival Calendar (P2)
**Purpose:** Show upcoming festivals with the ability to set reminders.
**Key UI Elements:**
- Calendar/list view toggle
- Festival cards (name, date, short description, icon)
- "Remind me" toggle per festival
**Layout Notes:** Vertical scrollable list grouped by month; calendar view as an alternate tab.

### 5.5 Habit Tracker / Streaks (P3)
**Purpose:** Show daily practice streaks and stats to reinforce habit-building.
**Key UI Elements:**
- Streak counter (large number, flame/diya icon)
- Calendar heatmap of completed days
- Motivational message/badge row
**Layout Notes:** Streak number as hero element at top, heatmap grid beneath.

---

## 6. Profile & Personalization

### 6.1 User Profile (P2)
**Purpose:** Show account info and let users manage language/region preferences.
**Key UI Elements:**
- Profile photo/avatar and name
- Editable fields (name, language, region)
- Navigation list to Saved Poojas, History, Settings
**Layout Notes:** Standard profile layout — avatar/header block at top, list-style navigation menu below.

### 6.2 Saved / Favorite Poojas (P2)
**Purpose:** Quick access to poojas the user has bookmarked.
**Key UI Elements:**
- Grid/list of saved pooja cards (same style as Library cards)
- Empty state illustration + prompt when none saved
**Layout Notes:** Mirrors Pooja Library layout for consistency.

### 6.3 Pooja History (P2)
**Purpose:** Log of previously performed poojas with dates.
**Key UI Elements:**
- Chronological list grouped by month
- Each entry: pooja name, date performed, small icon
- Tap to view details or redo
**Layout Notes:** Simple timeline/list layout, grouped headers by month.

### 6.4 Family Profile (P3)
**Purpose:** Manage multiple family members and their individual preferences.
**Key UI Elements:**
- Member list (avatar, name, relationship)
- "Add family member" button
- Per-member preference summary
**Layout Notes:** List of member cards, add-action as a dashed-border "add" card at the end.

### 6.5 Settings ⭐ MVP
**Purpose:** Manage app-wide preferences.
**Key UI Elements:**
- List rows: Language, Region/Tradition, Notifications, Audio settings, Dark Mode toggle, Sign out
- Section headers grouping related settings
**Layout Notes:** Standard grouped settings list, toggle switches right-aligned.

---

## 7. Trust, Support & Business

### 7.1 Content Source / Verification Info (P3)
**Purpose:** Build trust by showing how ritual content is sourced/verified.
**Key UI Elements:**
- Explanatory text block
- Priest/source credentials or partner logos
- "Learn more" expandable sections per pooja
**Layout Notes:** Simple editorial/article-style layout, calm and text-forward.

### 7.2 Feedback / Report Content (P3)
**Purpose:** Let users flag or correct inaccurate content.
**Key UI Elements:**
- Reference to the specific step/content being flagged
- Text input for feedback
- Category selector (e.g., "Incorrect mantra," "Wrong quantity")
- "Submit" button
**Layout Notes:** Simple form layout, submit button pinned at bottom.

### 7.3 Priest-on-Call (P3)
**Purpose:** Offer a human-priest fallback/hybrid booking option.
**Key UI Elements:**
- List of available priests (photo, rating, languages spoken)
- Availability/calendar picker
- "Book Now" button per priest
**Layout Notes:** Card list similar to a booking app; filter/sort row at top.

### 7.4 Subscription / Paywall (P3)
**Purpose:** Convert users to premium (ad-free, premium poojas, priority AI).
**Key UI Elements:**
- Plan comparison cards (Free vs. Premium)
- Feature checklist per plan
- "Upgrade Now" primary CTA
- Fine print / cancellation terms
**Layout Notes:** Side-by-side or stacked plan cards, premium plan visually emphasized (border/glow).

### 7.5 Referral / Share (P3)
**Purpose:** Encourage users to invite family/friends.
**Key UI Elements:**
- Referral code/link display
- Share buttons (WhatsApp, SMS, copy link)
- Incentive messaging (if applicable)
**Layout Notes:** Centered card with code and share icon row beneath.

### 7.6 Help / About ⭐ MVP
**Purpose:** Provide basic help, contact, and app information.
**Key UI Elements:**
- FAQ accordion list
- Contact support button
- App version and legal links (Privacy Policy, Terms)
**Layout Notes:** Standard support-page layout, accordion for FAQs, contact CTA prominent near top.

---

## Screen Count Summary

| Phase | Screen Count |
|---|---|
| ⭐ MVP (Phase 1) | 15 |
| Phase 2 | 8 |
| Phase 3 | 9 |
| **Total** | **32** entries (some screens listed once but relevant across phases) |

**MVP screens to prioritize in Stitch first:** Splash, Onboarding Carousel, Language Selection, Region Selection, Sign In/Sign Up, Home, Pooja Library, Pooja Detail, Headcount Input, Item Checklist, Muhurat Suggestion, Pooja Step Walkthrough, Mantra View, AI Assistant, Settings, Help/About.
