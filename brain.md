# Brain — PIET Sanskriti School Portal

## Current state
Full PIET Sanskriti School portal built with Next.js 14, Tailwind CSS, shadcn/ui, Supabase, Cloudinary. All pages and components created. Ready for Supabase + Cloudinary credentials to go live.

## Architecture snapshot
```
src/
├── app/
│   ├── layout.tsx              # Root layout with Inter + Playfair fonts
│   ├── page.tsx                # Public homepage (brand website)
│   ├── globals.css             # Custom styles, animations, theme
│   ├── login/page.tsx          # Auth login with Supabase
│   ├── signup/page.tsx         # Auth signup with role selection
│   ├── dashboard/
│   │   ├── layout.tsx          # Sidebar layout with role check
│   │   ├── page.tsx            # Overview stats
│   │   ├── announcements/page.tsx  # View announcements
│   │   ├── events/page.tsx         # View events
│   │   ├── gallery/page.tsx        # View gallery images
│   │   ├── lost-found/page.tsx     # List + create lost/found items
│   │   └── problems/page.tsx       # List + report classroom problems
│   └── admin/
│       ├── layout.tsx          # Dark sidebar, admin-only access
│       ├── page.tsx            # Admin stats overview
│       ├── announcements/page.tsx  # CRUD announcements
│       ├── events/page.tsx         # CRUD events
│       ├── gallery/page.tsx        # Upload + manage photos
│       ├── lost-found/page.tsx     # View all, mark resolved
│       ├── problems/page.tsx       # View all, update status
│       └── setup/page.tsx          # One-time admin role promotion
├── components/
│   ├── ui/                     # shadcn components (14 files)
│   └── homepage/
│       ├── Navbar.tsx          # Sticky nav with mobile menu
│       ├── HeroCarousel.tsx    # Auto-sliding hero with dots
│       ├── AboutSection.tsx    # Dark overlay about section
│       ├── NewsEvents.tsx      # Event cards grid
│       ├── ExploreGrid.tsx     # Infrastructure image grid
│       ├── PrincipalSection.tsx # Principal quote section
│       ├── GallerySection.tsx  # Photo gallery grid
│       ├── Testimonials.tsx    # Parent testimonials
│       └── Footer.tsx          # Full footer with contact + social
├── lib/
│   ├── utils.ts                # cn() helper
│   ├── supabase/
│   │   ├── client.ts           # Browser client
│   │   └── server.ts           # Server client
│   ├── cloudinary.ts           # Upload helper
│   └── constants.ts            # All school data, images, testimonials
├── middleware.ts                # Auth route protection
└── supabase-schema.sql         # Full DB schema + RLS policies
```

## Task log

### [DONE] Task 1 — Project Setup
- Init Next.js + Tailwind + shadcn/ui
- Installed: @supabase/supabase-js, @supabase/ssr, lucide-react, framer-motion, clsx, tailwind-merge, class-variance-authority
- Added 14 shadcn components

### [DONE] Task 2 — Core Library Files
- lib/constants.ts — all school data, images, testimonials, social links
- lib/utils.ts — cn() helper
- lib/supabase/client.ts — browser client
- lib/supabase/server.ts — server client
- lib/cloudinary.ts — upload helper
- middleware.ts — auth route protection

### [DONE] Task 3 — Public Homepage
- HeroCarousel — 4-slide auto-rotating carousel with PIET banners
- AboutSection — dark overlay with school description
- NewsEvents — 6 event cards with real PIET photos
- PrincipalSection — principal quote with photo
- ExploreGrid — 5 infrastructure images
- GallerySection — 12-image grid from PIET
- Testimonials — 5 parent testimonials
- Footer — full contact info, social links, quick links

### [DONE] Task 4 — Auth System
- Login page with email/password, show/hide password
- Signup page with name, email, password, role selection (student/teacher)
- Supabase auth integration
- Middleware redirects unauthenticated users

### [DONE] Task 5 — Student/Teacher Dashboard
- Sidebar layout with role-based routing
- Overview page with stats cards
- Announcements, Events, Gallery — read-only views
- Lost & Found — create + view items (lost/found toggle)
- Classroom Problems — create + view reports

### [DONE] Task 6 — Admin Dashboard
- Dark sidebar with Shield icon, admin-only access
- Stats overview with counts
- Announcements — create + delete
- Events — create + delete
- Gallery — upload via Cloudinary, delete with hover overlay
- Lost & Found — view all items, mark resolved
- Problems — view all, update status (open → in_progress → resolved)

### [DONE] Task 7 — Database Schema
- supabase-schema.sql — full schema with RLS policies
- Auto-create profile on signup trigger
- Admin seed SQL to promote admin@piet.com

### [DONE] Task 8 — Admin Setup & Mobile Fixes
- Hero images mobile fix: reduced height (35vh→45vh→65vh→80vh), added object-position center 30%
- Admin setup page at /admin/setup — one-click role promotion for admin@piet.com
- Added admin seed SQL to supabase-schema.sql

## Key decisions
- Use Supabase for auth + database
- Use Cloudinary for image CDN/uploads
- Admin seeded: admin@piet.com / admin@qwerty
- Homepage uses real PIET school images from pietsanskriti.com
- Dashboard accessible via "Go to Dashboard" button on homepage
- Three roles: admin, teacher, student
- Teachers + students can create lost/found + classroom problems
- Admin manages announcements, events, gallery
- Font pairing: Inter (body) + Playfair Display (headings)
- Color: Primary #0a5c8a (teal), Accent #28a745 (green)

## What to do next
1. Run supabase-schema.sql in Supabase SQL editor (includes admin seed)
2. Sign up as admin@piet.com with any password
3. Visit /admin/setup and click "Promote to Admin"
4. Test all pages
5. Deploy to Vercel

## What NOT to do
- Do not change the color scheme (it matches PIET brand)
- Do not remove the image URLs from constants.ts
- Do not break the middleware auth flow
- Do not add unnecessary dependencies
