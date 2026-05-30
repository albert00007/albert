# Design Inspiration & UI Principles

Based on modern Behance corporate website trends, the Lyov-Sayt MSD project should adhere to the following principles:

## 1. Typography
- **Primary Font:** Geist (or Inter/SF Pro). Clean, sans-serif, geometric.
- **Hierarchy:** High contrast between headings and body text. Large, bold headers (e.g., 4rem+) for hero sections, and highly legible body text (1rem - 1.125rem) with relaxed line height (1.6+).

## 2. Colors & Theme
- **Base Theme:** Dark mode default (`#09090B` background).
- **Accents:** Deep purples (`#8B5CF6`), indigos (`#6366F1`), and cyan (`#67E8F9`) used for gradients, hover states, and call-to-action buttons.
- **Surfaces:** Use slightly lighter dark shades (`#18181B` or `#27272A`) for cards and floating elements to create depth without relying heavily on borders.

## 3. Layout
- **Spacing:** Generous whitespace (padding/margins) to let elements breathe. 
- **Grid:** CSS Grid for portfolio and services sections. Asymmetric grids or masonry layouts for a modern tech agency feel.
- **Containers:** Max-width containers (e.g., `max-w-7xl`) to keep content readable on ultra-wide screens.

## 4. Animations & Micro-interactions
- **Scroll Effects:** Elements should fade up/in as they enter the viewport (`useScrollAnimation` with IntersectionObserver).
- **Hover States:** Cards should lift slightly (`translateY`) with a subtle glow or border highlight.
- **Backgrounds:** Slow-moving, abstract gradient orbs in the background to provide a sense of life and cutting-edge tech without distracting from the content.

## 5. UI Components
- **Buttons:** Pill-shaped or slightly rounded, often with a subtle gradient background or a glassmorphism effect.
- **Navigation:** Sticky, frosted-glass header (backdrop-blur).
- **Cards:** Border-radius of `xl` or `2xl`, subtle semi-transparent borders (e.g., `border-white/10`).
