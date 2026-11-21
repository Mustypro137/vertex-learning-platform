# Implementation prompt: Vertex Design System

## Goal
Turn `design/vertex-designsystem.png` into code: design tokens (Tailwind v4 theme), fonts, and a small set of reusable UI primitives that every later page (catalog, course, lesson, search, instructor, My Learning) will build on. Add a `/design-system` reference page that renders the sheet so it can be compared side by side with the image.

## Skills / docs read
- `AGENTS.md` (sections 2, 3, 5, 6, 13, 14).
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` (next/font/google, CSS variable usage).
- No Sanity / Clerk / PostHog skills apply: this task touches none of them.

## Code inspected
- Fresh `create-next-app` scaffold at the repo root: Next 16.4.6, React 19.3, Tailwind 4.3.3 loaded via the `@tailwindcss/turbopack` loader in `next.config.ts` (no PostCSS file), `cacheComponents: true`.
- `app/layout.tsx` uses Geist fonts; `app/globals.css` has scaffold tokens and a dark-mode block; `app/page.tsx` is the scaffold landing page.
- No `components/`, no icon library, no existing patterns to reuse.

## Decisions and assumptions
1. **Tokens live in `app/globals.css` via `@theme`**, read straight from the sheet:
   - Colors: `primary-500 #F97316`, `primary-400 #FB923C`, `primary-300 #FDBA74`, `primary-200 #FED7AA`, `primary-100 #FFEEE5`; `neutral-900 #0F172A`, `700 #334155`, `500 #64748B`, `300 #CBD5E1`, `200 #E2E8F0`, `100 #F1F5F9`, `50 #FAFAFC`; white. These override Tailwind's default `neutral-*` at those steps (unused steps stay default and should not be used).
   - Fonts: `--font-display` Playfair Display, `--font-sans` Inter (via `next/font/google`, CSS variables).
   - Type scale as utilities: `text-display-1` 48/56 bold, `text-display-2` 36/44 bold (both Playfair), `text-h1` 28/36 semibold, `text-h2` 22/30 semibold, `text-h3` 18/26 medium, `text-body-lg` 16/24, `text-body` 14/20, `text-small` 12/16 (Inter).
   - Spacing: Tailwind's default 4px base already matches the sheet (4…64) — no change.
   - Radius: `xs 4`, `sm 8`, `md 12`, `lg 16`, `xl 24`, full.
   - Shadows: `sm 0 1px 2px 0 rgba(15,23,42,.05)`, `md 0 4px 12px -2px rgba(15,23,42,.08)`, `lg 0 12px 24px -4px rgba(15,23,42,.10)`, `xl 0 20px 40px -8px rgba(15,23,42,.12)`.
   - Remove the scaffold dark-mode block (no dark reference exists). Body: white bg, `neutral-900` text, Inter.
2. **Icons: add `lucide-react`.** Its icons are a 24px grid, 2px stroke, round caps — exactly the sheet's icon spec. "Filled style" = same icon with `fill="currentColor"`. This is the one new dependency.
3. **Primitives in `components/ui/`**, server-safe (no `"use client"` unless interaction needs it), plain props, no Sanity types (data mapping happens in the feature that uses them):
   - `button.tsx` — `Button` + `buttonClasses()` helper so links can share styles. Variants `primary | secondary | tertiary | text`, sizes `md | lg` (h-11, radius 12, px 12/16, Inter medium), hover/disabled states as on the sheet, visible focus ring.
   - `input.tsx` — `SearchInput` (search icon, optional `⌘K` hint) and `Select` (native `<select>` styled with chevron; native for accessibility). h-11, radius 12, border `neutral-200`, focus border `primary-400`, px 16.
   - `badge.tsx` — `Badge` with `video | lesson | popular` tones (uppercase, small, tinted bg).
   - `status.tsx` — `StatusIndicator` with `in-progress | completed | now-playing | locked`.
   - `progress-bar.tsx` — `ProgressBar` (value 0–100, optional "35% complete" label, `role="progressbar"` + aria values).
   - `cards.tsx` — `CourseCard`, `VideoLessonCard`, `LessonCard`, `ResourceCard`, presentational, matching section 12 (props only: title, description, meta, href, etc.). Links use `next/link`.
   - `logo.tsx` — Vertex mark (inline SVG chevron "V" in primary-500) + wordmark.
   - `breadcrumbs.tsx` — `<nav aria-label="Breadcrumb">` with chevron separators, last item is current page.
   - `pagination.tsx` — prev/next, numbered pages with ellipsis, current page outlined in primary; takes `current`, `total`, `hrefFor(page)`.
   - Top navigation bar is **not** built here; only its parts (Logo, nav link style). The full header comes with the first page design that shows it.
4. **`/design-system` page** (`app/design-system/page.tsx`) reproduces the sheet's 14 sections using the tokens and primitives — the visual acceptance surface. It's a static internal reference page (marked `robots: noindex`).
5. `app/page.tsx` scaffold content replaced with a minimal placeholder linking to `/design-system` (the real home/catalog comes with its own design). Metadata title → "Vertex".
6. **Workspace location:** the scaffold sits at the repo root, while AGENTS.md section 5 wants `web/` + `studio/` workspaces. This task does **not** move it; flagged for a decision before the Studio work starts.
7. Responsive: the reference page grid stacks to one column on mobile; primitives are fluid.

## Files expected to touch
- `package.json`, `package-lock.json` (add `lucide-react`)
- `app/globals.css`, `app/layout.tsx`, `app/page.tsx`
- `app/design-system/page.tsx` (new)
- `components/ui/{button,input,badge,status,progress-bar,cards,logo,breadcrumbs,pagination}.tsx` (new)
- `lib/cn.ts` (tiny class-join helper, no extra dependency)

## Requirements
- Every color, size, radius and shadow used comes from the tokens above; no ad-hoc hex values in components.
- Primitives are accessible: real `<button>`/`<a>`, focus-visible rings, labelled icon-only controls, `aria-current` on breadcrumb/pagination current items, disabled state via `disabled`/`aria-disabled`.
- No client components unless required (none expected).

## Security considerations
- No secrets, env vars, network calls or data access are introduced. Fonts are self-hosted by next/font (no runtime request to Google).

## Acceptance criteria
- `/design-system` visually matches `design/vertex-designsystem.png` section by section (colors, type scale, spacing chips, radius/shadow tiles, icons outline + filled, button states, inputs, badges, status indicators, progress bar, four card types, navigation pieces, principles).
- Tokens usable as Tailwind utilities (`bg-primary-500`, `text-neutral-700`, `font-display`, `text-h2`, `rounded-md`, `shadow-lg`).
- Page is usable at 375px width with no horizontal scroll.
- Type check, lint and production build pass.

## Checks to run
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- `npm run dev` and load `/design-system`.

## Manual test steps
1. `npm run dev`, open http://localhost:3000/design-system.
2. Compare each numbered section with `design/vertex-designsystem.png`.
3. Hover the buttons (Default → Hover colors), Tab through buttons/inputs/pagination to see focus rings.
4. Resize to ~375px wide: sections stack, nothing overflows.
