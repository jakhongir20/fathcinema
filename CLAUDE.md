# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Next.js dev server with HMR)
- **Build:** `npm run build`
- **Start production:** `npm start`
- **Lint:** `npm run lint`
- **Format code:** `npx prettier --write .`

## Architecture

Single-page marketing landing site for Fathcinema agency, built with Next.js 14 App Router.

**Tech stack:** Next.js, TypeScript, TailwindCSS, shadcn/ui, Framer Motion, Lucide icons.

- `app/layout.tsx` — Root layout with Inter font (latin + cyrillic subsets), SEO metadata, global CSS.
- `app/page.tsx` — Composes all section components into a single-page layout (Header, Hero, About, Services, Partners, Contact, Footer, FloatingCTA).
- `app/globals.css` — Tailwind directives, CSS variables for shadcn theming (dark theme only), custom scrollbar.
- `app/api/contact/route.ts` — POST endpoint that forwards contact form submissions to Google Sheets via Apps Script. Requires `GOOGLE_SHEET_URL` env var.
- `components/` — Section components (each is a client component using `'use client'` for Framer Motion animations).
- `components/ui/` — shadcn/ui primitives (`button.tsx`, `input.tsx`) with custom variants.
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge).

## Design System

- Dark theme with CSS variables (HSL format, defined in globals.css).
- Accent gradient: blue-500 to violet-500.
- Glassmorphism: `bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]`.
- Buttons use `rounded-full` with gradient and glow variants (see `components/ui/button.tsx`).

## Code Style

- Prettier: single quotes, 80 char width, 2-space indent (see `.prettierrc`).
- TypeScript strict mode.
- Path alias: `@/*` maps to project root.
- All text content is in Uzbek (uz).
