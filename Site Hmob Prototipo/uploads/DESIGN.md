# Design System Document: Technical Precision & Editorial Authority

## 1. Overview & Creative North Star: "The Architectural Blueprint"

This design system is built to reflect the intersection of high-end corporate architecture and precise industrial engineering. It moves away from the "friendly SaaS" aesthetic toward a "Technical Editorial" experience—where white space is an active structural element and typography carries the weight of a premium printed monograph.

**Creative North Star: The Architectural Blueprint**
The system treats the screen not as a flat canvas, but as a three-dimensional space defined by layers, light, and material. We prioritize intentional asymmetry to guide the eye through complex B2B information, using high-contrast typography scales to establish a commanding, authoritative presence. Every element must feel "machined"—precise, deliberate, and premium.

---

## 2. Colors: Tonal Architecture

Our palette is rooted in the depth of `on_background` (#1A1C1D) and the energy of `primary` (#9B4000). We do not use color for decoration; we use it for orientation and emphasis.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders for sectioning are strictly prohibited. 
Separation must be achieved through:
*   **Background Shifts:** Transitioning from `surface` (#F9F9FA) to `surface_container_low` (#F4F3F4).
*   **Tonal Logic:** Defining the edge of a section by the start of a new tonal plane, creating a seamless, architectural flow.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the Material tokens to create nested importance:
1.  **Base Plane:** `surface` (#F9F9FA) - The primary canvas.
2.  **Inset Content:** `surface_container_lowest` (#FFFFFF) - Used for content cards to create a "punched-out" effect against the slightly darker base.
3.  **Elevated Content:** `surface_container_high` (#E8E8E9) - For sidebars or utility panels that sit "above" the main work area.

### The "Glass & Gradient" Rule
To evoke the high-end materials of Hmob (glass, polished steel, wood), floating elements (modals, dropdowns) should utilize **Glassmorphism**:
*   **Background:** `surface` at 80% opacity.
*   **Effect:** Backdrop-blur of 12px to 20px.
*   **Signature Texture:** Main CTAs should use a subtle linear gradient from `primary` (#9B4000) to `primary_container` (#C35200) at a 135° angle to provide a "machined" metallic depth.

---

## 3. Typography: The Editorial Voice

We balance the heritage of a serif with the technical clarity of a sans-serif.

*   **Display & Headlines (Noto Serif):** These are our "Brand Anchors." Large-scale, high-contrast serif typefaces suggest history, authority, and premium craft. Use `display-lg` (3.5rem) with generous letter spacing (-0.02em) for hero moments.
*   **Title & Body (Inter):** This is our "Engineering Voice." Inter provides a neutral, highly legible contrast to the expressive serifs. It communicates technical data and product specifications with zero friction.
*   **Labels (Inter):** All-caps labels using `label-sm` (0.6875rem) with +0.05em tracking should be used for technical metadata, mimicking the look of an architectural drawing.

---

## 4. Elevation & Depth: Tonal Layering

Shadows are a fallback, not a first resort. We define depth through "Stacking."

*   **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` section. This creates a soft, natural lift that mimics fine paper or layered veneers.
*   **Ambient Shadows:** If a floating effect is required (e.g., a "Quick View" furniture modal), use a custom shadow: `0px 24px 48px -12px rgba(26, 28, 29, 0.08)`. The shadow color is a tinted version of `on_surface` to keep it natural.
*   **The "Ghost Border" Fallback:** For input fields or cards where a boundary is critical for accessibility, use the `outline_variant` token at **15% opacity**. Never use 100% opaque lines.
*   **Glassmorphism Depth:** When using glass containers, ensure the `surface_tint` (#9F4200) is applied at a 2% opacity to the background to give the "glass" a warm, high-end furniture finish.

---

## 5. Components: Machined Precision

### Buttons: The Action Catalyst
*   **Primary:** Gradient of `primary` to `primary_container`. Corner radius: `sm` (0.125rem) for a sharp, technical look. Text: `label-md` bold, all-caps.
*   **Tertiary:** No background. `primary` text. Interaction state: `surface_container_highest` background on hover with a 0.2s ease-in-out transition.

### Input Fields: Technical Entry
*   **Style:** Minimalist. No full box. Use a `surface_container_highest` bottom-only "bar" (2px).
*   **Focus:** The bottom bar transitions to `primary` (#9B4000). Labels move to `label-sm` above the field.

### Cards & Lists: The No-Line Rule in Action
*   **Constraint:** Absolute prohibition of divider lines between list items.
*   **Alternative:** Use `spacing-md` (1rem) of vertical white space or alternating background shifts between `surface` and `surface_container_low`.
*   **Interactive Cards:** Should not have shadows. On hover, they should transition to `surface_container_highest` or scale subtly (1.02x) to indicate interactivity.

### Technical Data Specs (New Component)
For furniture dimensions and materials, use a "Spec Grid." Small `label-sm` headers in `secondary` color, with `title-sm` data values in `on_surface`. This reinforces the engineering focus.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts for Hero sections (e.g., text left-aligned, image overlapping the vertical center).
*   **Do** use "Negative Space" as a luxury. If a page feels crowded, increase the spacing scale rather than adding lines.
*   **Do** apply `notoSerif` to any numerical value that represents price or a significant "Key Performance Indicator."

### Don't:
*   **Don't** use `full` roundedness (pills) for buttons; it feels too consumer-grade. Stick to `sm` (0.125rem) or `none`.
*   **Don't** use pure black (#000) for large text blocks; use `on_background` (#1A1C1D) for a more sophisticated, "ink-on-paper" look.
*   **Don't** add shadows to buttons. Depth comes from color and gradient, not simulated height.
*   **Don't** use standard icons. Use thin-stroke (1px or 1.5px) technical icons that match the `outline` weight.