# Implementation prompt: Vertex Home Page

## Goal
Replace the placeholder `app/page.tsx` with the home page from `design/vertex-home.png`. It has a site header, a hero with a search bar, an "All Courses" section with three course cards, and a decorative footer band. Match the desktop reference exactly and make the page responsive down to 375px.

## Skills / docs read
- `AGENTS.md` (sections 2, 3, 5, 7, 12, 13, 14).
- `prompts/design-system.md`: the tokens and primitives this page builds on.
- `node_modules/next/dist/docs/01-app/03-api-reference/02-components/form.md` (`next/form` for the GET search form).
- No Sanity, Clerk, or PostHog skill applies yet. None of them is set up in the repo (see Decisions 1 and 2).

## Code inspected
- Single Next 16.4.6 app at the repo root, with `cacheComponents: true` and Tailwind 4 via `@tailwindcss/turbopack`.
- Tokens are in `app/globals.css` (primary/neutral palette, Playfair `font-display`, Inter `font-sans`, type scale, radii, shadows).
- Primitives in `components/ui/`: `Logo`, `buttonClasses`, `SearchInput`, `CourseCard` (a horizontal layout with a 40px icon tile), `Badge`, and others.
- No Sanity client, schema, Clerk, or PostHog exists yet. There are no `/courses`, `/my-learning`, or `/search` routes.

## Decisions and assumptions
1. **Course data is a typed placeholder for now.** No Sanity content model or client exists yet, so the three cards come from `lib/placeholder-courses.ts`. That file holds the title, slug, summary, level, duration, module count, and icon src for each card, exactly as the design shows them. Its shape mirrors the planned Sanity projection, so swapping it for a GROQ fetch later only touches the data source. This is the only invented content, it is clearly named as a placeholder, and it is removed when the Sanity catalog lands.
2. **Header avatar is a placeholder.** Clerk is not set up, so the avatar slot shows a neutral circle with a user icon. It is not a link. Clerk's `UserButton` replaces it in the auth task. The bell is a presentational `<button aria-label="Notifications">`, as AGENTS.md §7 requires.
3. **Course icons are static SVGs** in `public/course-icons/` (`nextjs.svg`, `docker.svg`, `typescript.svg`):
   - Next.js: a black rounded square with a white "N".
   - Docker: the whale mark in Docker blue (`#2496ED`), using the CC0 path from the `simple-icons` package. It is copied as a file, with no dependency added. The reference shows a multi-tone whale, while this one is a single tone.
   - TypeScript: the blue (`#3178C6`) rounded "TS" square.
   Later these become the course's Sanity image.
4. **`CourseCard` gets a `variant` prop** instead of a second card component:
   - `"compact"` (default) is the current design-system layout, unchanged.
   - `"featured"` is the home layout: a 72px icon image on top, the title in `font-display` at about 22px, the description, a divider, and the meta row (level, duration, module count with a file icon).
   - The card's `icon` prop stays a `ReactNode`. Featured cards are passed a `next/image`.
5. **New components:**
   - `components/site-header.tsx` (server): logo, Courses (`/courses`), My Learning (`/my-learning`), bell, avatar. Later pages reuse it.
   - `components/home-search.tsx` (client): a `next/form` GET to `/search` with input `name="q"`. It has a large search field and a `⌘ K` kbd box. A Cmd/Ctrl+K keydown listener focuses the field. This is the page's only client code.
6. **Visual specifics read from the reference:**
   - A warm off-white page canvas. This is a new token, `--color-canvas`, sampled from the image.
   - A centered framed column with 1px `neutral-200` side borders, and faint diagonal hatching in the outer gutters (desktop only).
   - A full-width horizontal rule between the hero and "All Courses".
   - An eyebrow badge: "INTELLIGENT LEARNING", with a `primary-200` border, a light `primary-100` fill, `primary-500` text, wide tracking, and small caps size.
   - A two-line serif headline (Playfair, medium weight, about 64px at 1024px, scaling down on mobile), a `neutral-700` subcopy of about 20px, and a large primary "Explore Courses →" button (`/courses`).
   - A search bar about 84px tall, `rounded-lg`, with `shadow-md`.
   - The section header "All Courses" (serif, about 26px) with a `primary-500` "View all courses →" link (`/courses`).
   - The footer line "New courses and lessons added every week." with an outline star in `primary-500`, flanked by hairlines.
   - A decorative band of vertical bars with a primary-300→transparent gradient at the bottom. It has two clusters (left and right) and is `aria-hidden`.
   - The button and accent orange use the existing `primary-500` token. The reference orange reads slightly more muted, but the token keeps the design system consistent.
7. **Responsive:**
   - At 1024px and up, the layout matches the reference.
   - Below `md`, the course cards stack to one column; from `md`, they show as three columns.
   - Hatching and side borders go away below `md`.
   - The headline steps down (about 40px on mobile), and the header tightens (smaller gaps, 32px avatar), so Logo, both links, bell, and avatar fit on one row at 375px.
   - The decorative bars shrink in height.
   - Small text never drops below 12px. The reference's card meta text is slightly smaller than that at 1024px.
8. **Dead links for now:** `/courses`, `/my-learning`, and `/search` 404 until those pages are built. They are wired to their final URLs so no rework is needed.
9. Analytics (the catalog view event) is not added here, because PostHog is not set up. It comes with the analytics task.

## Files expected to touch
- `app/page.tsx` (rewrite)
- `app/globals.css` (add `--color-canvas`)
- `components/site-header.tsx` (new)
- `components/home-search.tsx` (new, client)
- `components/ui/cards.tsx` (add the `variant="featured"` layout to `CourseCard`)
- `lib/placeholder-courses.ts` (new)
- `public/course-icons/{nextjs,docker,typescript}.svg` (new)

## Requirements
- Use tokens only. The one new color is `--color-canvas`. The brand colors inside the SVG logo files are part of those assets.
- Semantic structure:
  - One `<h1>` (the headline), with "All Courses" as an `<h2>`.
  - The header `<nav aria-label="Main">`.
  - The search form has `role="search"` and a labelled input.
  - Decorative elements are `aria-hidden`.
- Every interactive element has a visible focus ring, as in the existing primitives. Course cards keep the stretched-link pattern, linking to `/courses/<slug>`.
- No horizontal scroll at 375px.
- The ⌘K listener cleans up on unmount and does not hijack the shortcut while another input is focused.

## Security considerations
- No secrets, env vars, data fetching, or writes are introduced.
- The search form only navigates to `/search?q=...`. Nothing in the browser calls an MCP endpoint or an LLM.

## Acceptance criteria
- At a 1024px-wide viewport, a screenshot of `/` matches `design/vertex-home.png` section by section: header, eyebrow, headline, subcopy, CTA, search bar, divider, section header, the three cards (icons, titles, copy, meta), footer line, and bars.
- Pressing Cmd/Ctrl+K focuses the search field. Pressing Enter navigates to `/search?q=<query>`.
- At 375px the page reads cleanly: cards are stacked, the header fits on one row, and there is no overflow.
- `/design-system` still renders the compact `CourseCard` unchanged.
- Type check, lint, and production build pass.

## Checks to run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- `npm run dev`, then Playwright screenshots of `/` at 1024px and 375px, compared against the reference.

## Manual test steps
1. Run `npm run dev` and open http://localhost:3000.
2. Compare the page with `design/vertex-home.png` at roughly 1024px browser width.
3. Press Cmd+K (Mac) or Ctrl+K (Windows) and check that the search field gets focus. Type "caching" and press Enter. The URL should become `/search?q=caching`. That page 404s until search is built.
4. Tab through the header, CTA, search, "View all courses", and each card, and check the focus rings.
5. Narrow the window to about 375px and check the layout: cards stack, there is no horizontal scroll, and the header fits.
6. Open `/design-system` and check that the compact course card looks unchanged.
