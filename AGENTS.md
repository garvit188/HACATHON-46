# AGENTS.md — PIET Sanskriti School Portal

## Project Context
PIET Sanskriti School Portal — a web application for students, teachers, and admin of PIET Sanskriti School, HUDA, Panipat. Built with Next.js 14, Tailwind CSS, shadcn/ui, Supabase (auth + database), and Cloudinary (image CDN).

## Conventions
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4 + shadcn/ui components
- **Auth:** Supabase Auth with role-based access (admin, teacher, student)
- **Database:** Supabase Postgres with RLS policies
- **Image uploads:** Cloudinary
- **Icons:** Lucide React
- **Font pairing:** Inter (body) + Playfair Display (headings)
- **Color scheme:** Primary #0a5c8a (teal), Accent #28a745 (green)

## Commands
```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## File Structure
See brain.md for full architecture snapshot.

## Rules
- All images use real PIET school photos from pietsanskriti.com
- Admin credentials: admin@piet.com / admin@qwerty
- Teachers + students can create lost/found + classroom problems
- Admin manages announcements, events, gallery
- No unnecessary dependencies
- Follow existing code patterns
- Update brain.md after each task completion
