---
name: QuantifyPro
description: TBEC QMX — Quantity Measurement & Exchange. Enterprise engineering SaaS for construction tender management.
colors:
  primary: "#9d4300"
  on-primary: "#ffffff"
  primary-container: "#f97316"
  on-primary-container: "#582200"
  primary-fixed: "#ffdbca"
  primary-fixed-dim: "#ffb690"
  on-primary-fixed: "#341100"
  on-primary-fixed-variant: "#783200"
  inverse-primary: "#ffb690"
  secondary: "#545f73"
  on-secondary: "#ffffff"
  secondary-container: "#d5e0f8"
  on-secondary-container: "#586377"
  secondary-fixed: "#d8e3fb"
  secondary-fixed-dim: "#bcc7de"
  on-secondary-fixed: "#111c2d"
  on-secondary-fixed-variant: "#3c475a"
  tertiary: "#006591"
  on-tertiary: "#ffffff"
  tertiary-container: "#09a4e8"
  on-tertiary-container: "#003650"
  tertiary-fixed: "#c9e6ff"
  tertiary-fixed-dim: "#89ceff"
  on-tertiary-fixed: "#001e2f"
  on-tertiary-fixed-variant: "#004c6e"
  surface: "#f8f9ff"
  surface-dim: "#cbdbf5"
  surface-bright: "#f8f9ff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#eff4ff"
  surface-container: "#e5eeff"
  surface-container-high: "#dce9ff"
  surface-container-highest: "#d3e4fe"
  on-surface: "#0b1c30"
  on-surface-variant: "#584237"
  inverse-surface: "#213145"
  inverse-on-surface: "#eaf1ff"
  outline: "#8c7164"
  outline-variant: "#e0c0b1"
  surface-tint: "#9d4300"
  background: "#f8f9ff"
  on-background: "#0b1c30"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  surface-variant: "#d3e4fe"
typography:
  display:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 600
    lineHeight: 32px
    letterSpacing: -0.02em
  headline:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 600
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: 700
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
spacing:
  unit: 4px
  sidebar_width: 240px
  panel_width: 320px
  gutter: 12px
  row_height_dense: 32px
  row_height_standard: 40px
---

## Brand & Style

This design system is engineered for precision, speed, and high-density data management in the construction sector. The brand personality is industrious, technical, and authoritative, mirroring the reliability of a physical blueprint.

The aesthetic follows a **Technical Minimalism** approach, drawing from drafting software and industrial engineering interfaces. It prioritizes information density over white space, utilizing "safe" margins and sharp edges to convey a sense of structural integrity. Every pixel is intentional, serving the primary goal of enabling estimators to perform complex quantity takeoffs without visual distractions. The emotional response is one of controlled efficiency and professional rigor.

## Colors

The palette is rooted in the physical reality of the construction site and the drafting table.

- **Primary (Construction Orange #f97316):** Used exclusively for primary calls to action, active measurement states, and critical highlights. It provides a high-contrast focal point against the neutral base.
- **Secondary (Industrial Slate #1e293b):** Reserved for structural navigation elements like the sidebar and headers. This provides a heavy "frame" for the lighter work area.
- **Background & Surface:** A clean, multi-layered white and light gray system. Surfaces are strictly white (#FFFFFF) to ensure maximum legibility of fine lines and small text, while the background (#F8FAFC) provides subtle contrast for layout containers.
- **Support Colors:** A technical blue (#0ea5e9) is utilized for informational callouts, and a range of neutral slates are used for borders, grid lines, and secondary text.

## Typography

This design system utilizes **Inter** for all UI elements to maintain clarity at small scales. For numerical data and measurement values, **JetBrains Mono** is introduced to ensure character alignment and ease of scanning in dense tables.

- **Scale:** The type scale is intentionally compact. 14px is the standard body size, while 12px is used extensively for data grids and sidebars.
- **Hierarchy:** High contrast in weight (SemiBold vs. Regular) is preferred over large jumps in font size to maintain vertical density.
- **Labels:** Small, all-caps labels with slight tracking are used for section headers within panels and table headers.

## Layout & Spacing

The layout follows a **Rigid Panel Grid** model. The screen is divided into functional zones:
1. **Primary Navigation:** Fixed left sidebar (Industrial Slate).
2. **Viewport:** The central workspace for blueprints or large data tables.
3. **Inspector Panels:** Collapsible right-hand panels for measurement details and properties.

**Spacing Rhythm:**
- A strict 4px base unit is used.
- Internal padding for data cells is 8px (horizontal) and 4px (vertical) to maximize row count.
- Gutters between major panels are a thin 1px border with a 12px margin to keep the interface feeling interconnected and "locked in."

## Elevation & Depth

This design system avoids traditional shadows to maintain a "flat drafting" aesthetic. Depth is communicated through **Tonal Layering and Borders**:

- **Borders:** A 1px solid border (#E2E8F0) is the primary method of separation.
- **Z-Axis:** Instead of shadows, higher-level elements (like modals) use a heavy 2px border or a very slight 4px "flat" offset shadow with 100% opacity in a neutral slate color.
- **Active States:** Elements being edited or "taken off" use a primary orange 2px border to signify focus without changing the layout size.

## Shapes

The shape language is strictly **Sharp (0px radius)**. Every UI element — from buttons and input fields to the main application containers — features 90-degree corners. This reinforces the "architectural" and "technical" nature of the product. The only exception is the use of circular status pips or icons where required for standard UI recognition.

## Components

- **Buttons:** Sharp corners. Primary buttons are solid Construction Orange with white text. Secondary buttons are ghost-style with a 1px Slate-300 border.
- **Data Tables:** The core of the system. Rows have a fixed height of 32px. Alternating row stripes (Zebra striping) use #F8FAFC. Hover states use a subtle #F1F5F9 highlight.
- **Input Fields:** 1px Slate-200 border, turning to 1px Orange on focus. No rounded corners. Labels sit above the field in `label-caps` typography.
- **KPI Cards:** Small, boxed components with a 1px border. The value is displayed in `data-mono` at a larger size (18px) to emphasize the numerical result of the takeoff.
- **Measurement Panels:** Specialized vertical containers that group "Quantity," "Unit," and "Cost" fields in a high-density vertical stack, utilizing the `body-sm` type scale.
- **Sidebars:** Dark Industrial Slate (#1E293B) background with light slate (#94A3B8) icons and text. Active navigation items use a left-edge Construction Orange accent bar (3px width).

## Do's and Don'ts

- Do use Construction Orange (#f97316) only for primary actions and active states — never for decorative purposes.
- Don't mix rounded and sharp corners in the same view. Stick to 0px radius throughout.
- Do maintain WCAG AA contrast ratios (4.5:1 for normal text).
- Don't use more than two font families (Inter + JetBrains Mono) on a single screen.
- Do use `data-mono` for all numerical and code values in tables.
- Don't use shadows for depth — use tonal layering and borders instead.
- Do use `label-caps` for all section headers and column headings.
- Don't exceed 32px row height in data tables — density is critical for estimator workflows.
