# DESIGNS: Claymorphism Design System

## 1. Principles

- **Soft, tactile, friendly.** These are newborn and maternal-care topics, so the UI is warm and calm, never clinical-cold.
- **Colour means a level of care.** Each care level owns one tone, used consistently everywhere: cards, badges, flowchart, modules.
- **Clarity over decoration.** Clay depth is for grouping, never for meaning, and every status pairs an icon with a word.

## 2. Clay recipe

Every clay surface combines three shadows (see `app/globals.css`):

1. A large, soft **outer drop shadow** (bottom-right), tinted blue-grey rather than black.
2. A **light top-left outer glow** (white in light mode, faint periwinkle in dark).
3. **Inner highlight** top-left and **inner shade** bottom-right, which give the "puffy" look.

| Utility | Use |
|---|---|
| `clay` | Primary cards and sections (radius 1.75rem) |
| `clay-sm` | Secondary cards, chips, buttons (radius 1.25rem) |
| `clay-inset` | Pressed or sunken wells: inputs, toggles, inner panels |
| `clay-pressed` | Shadow only, for an active state on an existing shape |

Radii: chips and buttons are `rounded-full`, cards 1.25–2.25rem, and nothing is square.

## 3. Tokens

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#eceff8` | `#12152a` |
| `--surface` | `#f7f8fc` | `#1e2235` |
| `--sunken` | `#e4e8f3` | `#171a2b` |
| `--ink` / `--ink-2` / `--muted` | `#1b2033` / `#4a5068` / `#6b7189` | `#eceef7` / `#c3c7da` / `#9aa0ba` |
| `--ring` (brand, focus) | `#5b6cff` | `#8f9bff` |

The page background adds two radial pastel washes (`--bg-accent-1/2`).

### Care-level tones

| Tone | Module | Light strong / soft | Dark strong / soft |
|---|---|---|---|
| `sncu` | SNCU | `#3d6fe0` / `#dbe6ff` | `#7fa4ff` / `#233061` |
| `stepdown` | Step-down | `#7a5ae0` / `#e7defe` | `#ae97ff` / `#31285e` |
| `clmc` | CLMC | `#d14d86` / `#fde0ec` | `#f48bb8` / `#4a2238` |
| `counsellor` | Lactation Counsellor | `#13957a` / `#d5f4ea` | `#4fd3b0` / `#163f39` |
| `followup` | SNCU Follow-up | `#b8780a` / `#fdefcf` | `#f2bd55` / `#44361a` |
| `nrc` | NRC | `#d9622b` / `#ffe2d3` | `#ff9a6b` / `#4a2a1c` |
| `community` | ASHA · ANM · AWW | `#2f8f3a` / `#dcf3d9` | `#7fd486` / `#1f3f24` |

Usage: add `tone-<name>` to an element, then use `text-tone`, `bg-tone`, `bg-tone-soft` or `border-tone` inside it.

## 4. Typography

- **Display:** Fredoka (rounded, matches the clay look), for headings, numbers and tile values.
- **Body:** Plus Jakarta Sans.
- Use `.tabular` (tabular numbers) only for table columns and aligned figures.

## 5. Components (`components/ui`)

| Component | Purpose |
|---|---|
| `ClayCard` | Base surface; `size`, `tone`, `interactive`, `as` |
| `ClayButton` / `ClayLink` / `buttonClass()` | `primary` (gradient clay pill), `soft`, `ghost` |
| `Badge`, `SupplementaryBadge` | Tone chips; dashed badge marks non-guideline content |
| `IconBadge` | Puffy tinted icon holder |
| `Callout` | `important` / `info` / `tip` notes |
| `CheckList`, `NumberedSteps`, `StepChain` | Lists, vertical timeline, chevron chain |
| `SectionHeader`, `PageHeader`, `Container` | Layout |
| `StatTile` | KPI tile |
| `ModuleCard` | Module link card |
| `FaqList` | Native `<details>` accordion |
| `Icon` | Name-based lucide registry |

Plus `Carousel` (Embla, autoplay, dots, prev/next/pause), `Marquee` (CSS infinite strip, pauses on hover), `PathwayFlow` and `ThemeToggle` (three-way segmented control).

## 6. Data visualisation

Follows the dataviz method. The palette was validated with the validator against the clay surfaces (`#f7f8fc` light, `#1e2235` dark), checking all pairs:

| Slot | Light | Dark | Used for |
|---|---|---|---|
| series-1 (blue) | `#2a78d6` | `#3987e5` | Discharge cascade, rate bars, trend line 1 |
| series-2 (orange) | `#eb6834` | `#d95926` | Follow-up cascade, trend line 2 |
| series-3 (aqua) | `#1baf7a` | `#199e70` | Trend line 3 |

- In light mode, aqua is 2.65:1 against the surface, so relief applies: the legend carries the latest value and a full table view exists.
- **Status** colours (fixed): good `#0ca30c`, watch `#fab219`, act `#d03b3b`. They always appear with an icon and a label (`StatusPill`).
- Marks: bars 20px thick with 4px rounded data-ends, lines 2px, 8px markers with a surface ring. Grid lines are recessive and the value axis is hidden when bars carry direct labels.
- There is never a dual axis. Cascades are one series and one hue each, and the trend shows at most 3 series.
- Every chart has a hover tooltip, and there is a table view ("All 16 data points" plus the facility table).

## 7. Motion

| Animation | Where | Reduced motion |
|---|---|---|
| `animate-marquee` | Home key-message strip (55s loop, pauses on hover/focus) | Stopped |
| Embla autoplay (5s) | Module carousel, with a pause button | Starts paused |
| `animate-float` | Hero chips | Stopped |
| `animate-flow` | Dashed connector in the pathway diagram | Stopped |
| Hover lift | Cards, `-translate-y-1` | Not applicable |

## 8. Accessibility

- Skip link, landmark roles and `aria-current` in the navigation.
- Visible 3px focus ring (`--ring`) everywhere; custom radios and checkboxes keep native inputs.
- The carousel uses `aria-roledescription` and labelled slides; the marquee duplicate is `aria-hidden`.
- Colour is never the only signal (status pills, legends, labels).
- Print styles: navigation hidden, shadows replaced by borders.

## 9. Responsive

- Container max width 7xl with 16px side gutters on mobile.
- The navbar collapses to a menu button below `lg`.
- Wide tables scroll inside their card, so the page never scrolls horizontally (verified at 390px).
