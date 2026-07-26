---
name: Sanatana Serenity
colors:
  surface: '#fff8f5'
  surface-dim: '#e9d7cb'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1e9'
  surface-container: '#fdeadf'
  surface-container-high: '#f8e5d9'
  surface-container-highest: '#f2dfd4'
  on-surface: '#231a13'
  on-surface-variant: '#554337'
  inverse-surface: '#392e27'
  inverse-on-surface: '#ffede3'
  outline: '#887365'
  outline-variant: '#dbc2b1'
  surface-tint: '#924b00'
  primary: '#924b00'
  on-primary: '#ffffff'
  primary-container: '#e9862e'
  on-primary-container: '#572a00'
  inverse-primary: '#ffb781'
  secondary: '#aa3529'
  on-secondary: '#ffffff'
  secondary-container: '#ff7261'
  on-secondary-container: '#700605'
  tertiary: '#785a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c59827'
  on-tertiary-container: '#463300'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc4'
  primary-fixed-dim: '#ffb781'
  on-primary-fixed: '#2f1400'
  on-primary-fixed-variant: '#6f3800'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4a9'
  on-secondary-fixed: '#410001'
  on-secondary-fixed-variant: '#891c15'
  tertiary-fixed: '#ffdf9d'
  tertiary-fixed-dim: '#f0c04d'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#5b4300'
  background: '#fff8f5'
  on-background: '#231a13'
  surface-variant: '#f2dfd4'
  sacred-green: '#4C7A5A'
  warm-ivory: '#FBF6EC'
  soft-sand: '#F3E9D6'
  muhurat-amber: '#D99A2B'
typography:
  headline-lg:
    fontFamily: notoSerif
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: notoSerif
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: notoSerif
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  mantra-display:
    fontFamily: notoSerif
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 44px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: notoSans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: notoSans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: notoSans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-mobile: 1rem
  margin-desktop: 2.5rem
  gutter: 1rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
---

## Brand & Style

The design system embodies a "meditative wellness meets tradition" narrative. It is designed to evoke a sense of deep reverence, calm, and digital sanctuary for practitioners of Hindu rituals. The brand personality is that of a "Virtual Priest’s Assistant"—knowledgeable, steady, and spiritually grounded.

The visual style is a blend of **Minimalism** and **Tactile/Skeuomorphic** elements. We utilize heavy whitespace and clean layouts to ensure clarity during rituals, while introducing tactile warmth through soft paper-like textures, gentle gradients that mimic the glow of a diya, and refined traditional motifs. The interface prioritizes focus and peace, avoiding the "cluttered" aesthetic often found in religious apps in favor of a premium, modern wellness experience.

**Key Design Principles:**
- **Reverence over Rush:** Use generous spacing to allow the spiritual content to breathe.
- **Grounded Trust:** Use verified traditional motifs (Mandalas, Kalash) as subtle watermarks rather than dominant decorations.
- **Guided Ease:** High-contrast typography and large tap targets for use in ritual settings where hands may be occupied.

## Colors

The palette is rooted in sacred Hindu symbolism. **Saffron (#E9862E)** serves as the primary brand driver, representing fire and purity. **Deep Kumkum Red (#B23A2E)** provides structural weight and emotional depth, while **Turmeric Gold (#F2C14E)** is used for highlights and celebratory moments.

**Background Strategy:**
The interface avoids pure whites. **Warm Ivory (#FBF6EC)** is the default background color to reduce eye strain and provide a "temple-wall" warmth. **Soft Sand (#F3E9D6)** is reserved for surface layers like cards and containers to create subtle depth without relying on heavy shadows.

**Accents & Semantics:**
- **Sacred Green (#4C7A5A):** Used for growth, Tulsi-related elements, and success states.
- **Muhurat Amber (#D99A2B):** Specifically for time-sensitive ritual warnings or auspicious windows.
- **Deep Brown-Black (#2B211A):** Used for primary text to maintain warmth and readability compared to pure black.

## Typography

The typography system is optimized for multilingual clarity and spiritual resonance. **Noto Serif** is used for all headlines and Sanskrit mantras to provide a timeless, scholarly feel. **Noto Sans** is used for instructions and UI labels to ensure high legibility across regional scripts.

**Recitation Design:**
The `mantra-display` level is specifically tuned for ritual use. It features an increased line height (44px) and slightly larger font size to prevent eye-skipping while the user is chanting mid-vidhi. 

**Hierarchy:**
Use Serif weights for "Divine" content (God names, Mantras, Pooja titles) and Sans-Serif for "Operational" content (quantities, settings, countdowns).

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop and a **Fluid Grid** on mobile to ensure a centered, focused experience. 

**Rhythm:**
A base unit of 8px (0.5rem) governs the spacing system.
- **Mobile:** 4-column layout with 16px margins.
- **Tablet/Desktop:** 12-column layout with a max-width of 1040px to keep the "altar-side" view centered and meditative.

**Ritual Spacing:**
During the `Guided Pooja Experience`, use `stack-lg` (48px) between instruction blocks to prevent the screen from feeling overwhelming. Elements should reflow into a single-column stack on mobile to maximize text size.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** rather than heavy shadows.

- **Surface Tier 1 (Warm Ivory):** The base canvas for the entire application.
- **Surface Tier 2 (Soft Sand):** Used for cards and interactive containers. These sit slightly above the ivory background.
- **Depth:** Use **Ambient Shadows**—extremely diffused (20-30px blur), low opacity (8%), tinted with the `primary_color_hex` to create a soft "glow" effect rather than a mechanical drop shadow. 

Avoid high-contrast outlines. Instead, use 1px borders of a slightly darker sand color to define boundaries in a soft, non-intrusive way.

## Shapes

The shape language is defined by **Rounded** corners to evoke softness and safety. 

- **Primary Components (Buttons, Cards):** 0.5rem (8px) radius.
- **Large Layout Containers (Pooja Hero Cards):** 1rem (16px) radius to create a soft, inviting frame for religious imagery.
- **Pill Shapes:** Reserved exclusively for "In Progress" chips or "Live" Muhurat status indicators.

Avoid sharp 0px corners entirely, as they conflict with the "calm and meditative" brand narrative.

## Components

### Buttons
- **Primary:** Saffron (#E9862E) fill with white text. High-elevation "glow" shadow on hover.
- **Secondary:** Outlined in Saffron with a Warm Ivory fill.
- **Ritual Action:** Large, circular buttons for "Next Step" to allow for easy tapping during physical rituals.

### Cards
- **Pooja Cards:** Soft Sand background. Use a subtle mandala watermark in the bottom right corner (opacity 5%).
- **Selection Cards:** When selected, use a 2px Saffron border and a light Turmeric Gold inner glow.

### Input Fields
- Use "Soft Sand" for the field background rather than white.
- Labels should always be in Noto Sans (label-sm).
- Focus states should use a Saffron underline or border.

### Ritual Progress Bar
- A thin Turmeric Gold line that fills as the user progresses through Vidhi steps. 
- Use a small "Diya" icon as the progress marker that moves along the line.

### AI Assistant Chat
- **Assistant Bubbles:** Soft Sand with a Sacred Green left-border accent.
- **User Bubbles:** Subtle Saffron tint with right-alignment.
- **Voice Waveform:** A fluid, organic wave (not jagged) in Saffron to indicate active listening.