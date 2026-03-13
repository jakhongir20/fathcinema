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

- `app/layout.tsx` — Root layout with Inter font (next/font/google), SEO metadata, global CSS.
- `app/page.tsx` — Composes all section components into a single-page layout.
- `app/globals.css` — Tailwind directives, CSS variables for shadcn theming (dark theme only), custom scrollbar.
- `components/` — Section components: `header`, `hero-section`, `about-section`, `services-section`, `partners-section`, `contact-section`, `footer`, `floating-cta`.
- `components/ui/` — shadcn/ui primitives (`button.tsx`, `input.tsx`).
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge).

## Design System

- Dark theme with CSS variables (HSL format, defined in globals.css).
- Accent gradient: blue-500 → violet-500.
- Glassmorphism: `bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]`.
- All section components are client components (`'use client'`) for Framer Motion animations.
- Buttons use `rounded-full` with gradient and glow variants (see `components/ui/button.tsx`).

## Code Style

- Prettier: single quotes, 80 char width, 2-space indent (see `.prettierrc`).
- TypeScript strict mode.
- Path alias: `@/*` maps to project root.
- All text content is in Uzbek (uz).
