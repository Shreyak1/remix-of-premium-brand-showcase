## Premium motion pass — Palmer-inspired

Goal: replace the current generic fade-in / scale-on-hover vocabulary with the deliberate, slow, physical motion language Palmer Dinnerware uses — products that float, drift, and respond to scroll/cursor like real objects on a cream canvas. Scope is **home, shop, and product** pages (cart drawer included as it's shared chrome).

### What "generic" looks like today
- Every section uses the same `initial opacity 0 → animate 1` fade-up on mount.
- Hover = `scale-105`, transition-transform — same on every card.
- No scroll-driven motion. No cursor parallax. No physics. No staggered entrances tied to layout rhythm.
- Marquee runs at a constant linear speed regardless of scroll.
- Cart drawer slides in with default Radix easing.

### The new motion language (3 principles)
1. **Float, don't fade.** Products enter with slow Y-drift + subtle rotation, as if settling into place. Easing: long custom cubic-bezier (1.2s+).
2. **Scroll is the timeline.** Hero product, marquee, and section transitions respond to scroll position (parallax, speed-modulated marquee, image scale tied to viewport progress).
3. **Cursor has weight.** Product cards tilt subtly toward the cursor (max 4° rotateX/Y), images zoom with damped spring instead of CSS transition.

### Page-by-page changes

**Home (`src/routes/index.tsx`)**
- Hero image: add slow continuous `y` float loop (±8px, 6s ease-in-out) on top of the existing entrance. Parallax: image translates -15% as the section scrolls out.
- "New — Four-Piece Ritual" badge: enters last with spring, gently rotates -3° at rest.
- Marquee: switch from CSS keyframe to motion-driven `x` with `useScroll` — speed modulates with scroll velocity (faster when scrolling, drifts when idle).
- Product grid: replace uniform stagger with **diagonal cascade** (top-left first, bottom-right last) using x+y offset entrance, 1.1s duration each. Cards lift on hover with subtle shadow grow + 3D tilt toward cursor.
- "Slow as honey" dark section: headline words animate in one-by-one with `TextReveal`-style mask, tied to scroll progress, not mount.
- Ritual teaser image: parallax scale (1 → 1.08 as it enters viewport).

**Shop (`src/routes/shop.tsx`)**
- Product cards: same diagonal cascade + cursor tilt. Image inside card gets a damped spring zoom on hover (not CSS transition).
- Hero heading: per-word reveal with stagger.

**Product page (`src/routes/product.$slug.tsx`)**
- Main product image: subtle continuous float loop. On cursor-over, replace zoom with a magnified circular lens that follows the cursor.
- Thumbnail swap: cross-fade with blur transition instead of instant change.
- "Add to bag" button: magnetic hover (button shifts ~6px toward cursor when within 80px radius).
- Ritual / notes sections: per-line reveal on scroll using `whileInView` with line-by-line stagger.

**Cart drawer (`src/components/site/CartDrawer.tsx`)**
- Replace default slide with custom spring (stiffness ~180, damping ~24). Backdrop fades with longer duration than panel. Items inside cascade in after panel settles.
- Quantity changes animate with `layout` prop for smooth reflow.

**Nav (`src/components/site/Nav.tsx`)**
- Nav hides on scroll-down, reveals on scroll-up (transform-based, spring eased).
- Link hover: underline grows from left with custom easing (replace `hover:text-foreground` only).

### Technical approach
- Use Framer Motion (already installed) — specifically `useScroll`, `useTransform`, `useSpring`, `useMotionValue`, and `whileInView` with custom variants.
- Add a shared `src/lib/motion.ts` exporting reusable easings (`easeOutExpo`, `easeFloat`) and variants (`floatIn`, `diagonalCascade`, `wordReveal`) so the language stays consistent.
- Add a small `useMousePosition` hook + `<TiltCard>` wrapper for the cursor tilt behavior — applied to product cards across home/shop.
- All animations respect `prefers-reduced-motion` (motion library handles this when `MotionConfig reducedMotion="user"` is set in root).
- No new dependencies needed.

### Out of scope
- No visual redesign of colors, typography, or layout (the palette, TAN Grandeur, and structure stay).
- No copy changes.
- No backend/data changes.
- About, Journal, Contact pages — left as-is this round (can extend the language to them in a follow-up if you like the result).

### Validation
After implementation: capture the home page in the preview, scroll through it, and verify the diagonal cascade, marquee scroll-speed coupling, and cursor tilt all read as intentional (not jittery). Check `prefers-reduced-motion` by toggling it in devtools.
