# Implementation prompt: Home page main content at ~1440px

## Goal
Widen the home page's framed main column, the bordered area that holds the header, hero, courses, and footer band, from a 1200px max width to 1440px. Its content should use that width on large screens.

## Skills / docs read
- `AGENTS.md` (sections 2, 3, 13).
- `prompts/home-page.md`: the approved home page build.

## Code inspected
- `app/page.tsx`:
  - The outer frame is `max-w-[1200px]`, with hatched gutters outside it from `md` up.
  - The All Courses block is capped at `max-w-[53.5rem]` (856px) inside `md:px-[3.25rem]` padding.
  - The hero search is capped at `max-w-[46.5rem]`.
- `components/site-header.tsx`: the header spans the frame, so it widens automatically.

## Decisions and assumptions
1. "Main content" here means the framed column. It becomes `max-w-[1440px]`. On viewports wider than 1440px plus the gutters, the hatched gutters fill the rest.
2. The All Courses block (section header, card grid, footer line) widens with the frame. Its cap moves from 856px to 1336px, which is the 1440px frame minus the existing 52px side padding on each side. Without this, the cards would sit as a narrow island in a wide frame.
3. The hero keeps its current sizes: headline, subcopy, CTA, and the 744px search bar. It is centered display content, and the reference gives no wider measure for it.
4. Viewports up to about 1024px look exactly as they do now. Padding is the limit there, not the caps.

## Files expected to touch
- `app/page.tsx`

## Requirements
- No new tokens or components. Responsive behavior below `md` is unchanged.

## Security considerations
- None. This is a layout-only change.

## Acceptance criteria
- At 1440px+ viewports, the framed column measures 1440px and the course grid spans the frame's inner width.
- At 1024px, the page is unchanged against `design/vertex-home.png`.
- At 375px, the page is unchanged.
- Type check, lint, and build pass.

## Checks to run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- Screenshots of `/` at 1600px, 1024px, and 375px.

## Manual test steps
1. Run `npm run dev` and open http://localhost:3000 in a window wider than 1500px.
2. Check that the bordered column is about 1440px wide, with hatching outside it.
3. Check that the three cards stretch across that width.
4. Resize to about 1024px and about 375px, and check that the page looks as before.
