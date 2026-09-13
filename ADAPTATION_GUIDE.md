# Urgence Électricien MTL — Next.js Adaptation Guide

## Project Status: Ready for Customization

This is a **Next.js 16 + React 19 + Tailwind CSS 4** project based on your commercial electrician site structure, customized for **24/7 emergency electrical service in Montreal**.

## ✅ What's Already in Place

**Tech Stack (Identical to electriciencommercialsc.com):**
- ✅ Next.js 16.2.12 (App Router)
- ✅ React 19.2.4
- ✅ Tailwind CSS 4 (PostCSS plugin)
- ✅ Motion 12.42.2 (Framer Motion alternative)
- ✅ Lucide React icons
- ✅ TypeScript 5
- ✅ ESLint configuration

**Design System (Identical):**
- ✅ Navy + Amber color palette
- ✅ Jura (display) + Outfit (body) fonts
- ✅ Glassmorphism effects (backdrop-filter blur)
- ✅ Animated letter-by-letter hero headline
- ✅ Fixed glass header (solidifies on scroll)
- ✅ Smooth Motion animations
- ✅ Rounded-3xl generous corners
- ✅ Bento grid layout for services
- ✅ Hairline borders on cards

**Project Structure:**
```
src/
├── app/
│   ├── page.tsx              ← HOME (adapt for emergency service)
│   ├── services/page.tsx      ← SERVICES LISTING
│   ├── services/[slug]/page.tsx  ← INDIVIDUAL SERVICE PAGES
│   ├── a-propos/page.tsx      ← ABOUT PAGE
│   ├── contact/page.tsx       ← CONTACT FORM
│   ├── realisations/page.tsx  ← PROJECT GALLERY
│   ├── layout.tsx             ← MAIN LAYOUT
│   └── api/contact/route.ts   ← CONTACT API
├── components/
│   ├── animated-heading.tsx
│   ├── header/
│   ├── hero/
│   ├── sections/
│   └── ... (many reusable components)
└── styles/
    └── globals.css            ← TAILWIND CONFIG
```

---

## 🎯 Customization Checklist

### 1. **Pages to Update** (High Priority)

#### `src/app/page.tsx` — HOME PAGE
**Changes:**
- Hero headline: "Panne électrique ? On arrive en moins d'une heure."
- Subheading: "24/7 emergency electrical service in Montreal"
- Update hero color blobs (keep navy + amber)
- Change trust indicators to: "Diagnostic gratuit", "Moins d'une heure", "Licencié CMEQ"
- Update call-to-action: "Appeler d'urgence" → "Appeler 24/7"

**Keep:**
- Letter-by-letter animated headline
- Glassmorphism hero badges
- Motion animations
- Color blobs background

---

#### `src/app/services/page.tsx` & `src/app/services/[slug]/page.tsx` — SERVICES
**6 Emergency Electrical Services:**
1. **Dépannage d'urgence 24/7** — Emergency repair, rapid response
2. **Remplacement panneau électrique** — Panel upgrade 100A → 200A
3. **Remplacement disjoncteur** — Breaker replacement, surcharge issues
4. **Installation prise/interrupteur** — Outlets, switches, variators, 240V
5. **Diagnostic électrique complet** — Home inspection, safety assessment
6. **Travaux électriques généraux** — Renovation wiring, new circuits

**Keep:**
- Bento grid layout (asymmetric with first tile in amber)
- Individual service pages with hero header
- Process steps animation
- Glassmorphism cards

---

#### `src/app/a-propos/page.tsx` — ABOUT
**Update:**
- Team introduction for emergency service specialist
- CMEQ license & credentials (prominent)
- 24/7 availability statement
- Service area: "Montréal, Laval, Longueuil, Brossard, Terrebonne, etc."
- Response time guarantee: "Moins d'une heure"

**Keep:**
- Glass header design
- Centered layout
- Testimonials section (adapt for emergency calls)

---

#### `src/app/contact/page.tsx` — CONTACT
**Update:**
- Highlight "APPEL D'URGENCE 24/7" prominently
- Contact form for: name, phone, issue description, preferred time
- Display phone number with "Click to call" link
- Map showing service area

---

#### `src/app/realisations/page.tsx` — GALLERY
**Update:**
- Title: "Interventions Récentes" (Recent Calls)
- Before-after photos of electrical work
- Project cards: address, service type, date
- Keep the glass card design

---

### 2. **Color Customization** (Already Done)

```
--navy-deep: #050b1a
--navy-primary: #0a1433
--navy-panel: #0f1f4d
--amber-signal: #e8790a
--amber-bright: #f59320
```

These are already in your Tailwind config (check `tailwind.config.ts`).

---

### 3. **Typography** (Already Done)

Check `src/styles/globals.css` for:
- **Jura** (Display/Headings) — Bold, geometric
- **Outfit** (Body/UI) — Humanist, readable

No changes needed — font files are loaded from Google Fonts.

---

### 4. **Content Files to Create**

Create a `content.ts` or `content.json` with:

```typescript
// src/lib/services.ts
export const SERVICES = [
  {
    slug: "depannage-urgence",
    title: "Dépannage d'urgence 24/7",
    description: "Panne soudaine ? On arrive en moins d'une heure.",
    keywords: "dépannage électrique urgence montréal, électricien 24/7",
    // ... full content
  },
  // ... 5 more services
]

export const TESTIMONIALS = [
  {
    text: "Réponse en moins d'une heure, problème résolu rapidement.",
    name: "Marie D.",
    area: "Villeray",
    rating: 5,
  },
  // ... 2-3 more
]
```

---

## 🚀 Getting Started

### Step 1: Install Dependencies
```bash
cd urgence-electricien-nextjs
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
# Opens at http://localhost:3000
```

### Step 3: Update Key Pages
Priority order:
1. `src/app/page.tsx` (Home hero)
2. Create `src/lib/services.ts` (6 services data)
3. `src/app/services/page.tsx` (Services listing)
4. `src/app/services/[slug]/page.tsx` (Individual pages)
5. `src/app/a-propos/page.tsx` (About/credentials)
6. `src/app/contact/page.tsx` (Contact form)

### Step 4: Deploy to Vercel
```bash
npm run build
vercel deploy --prod
```

---

## 📋 File Structure Reference

| File | Purpose | Status |
|------|---------|--------|
| `src/app/page.tsx` | Home page | ⏳ Needs emergency content |
| `src/app/layout.tsx` | Main layout wrapper | ✅ Ready (has glass header) |
| `src/components/header/` | Fixed glass header | ✅ Ready |
| `src/components/hero/` | Animated hero section | ✅ Ready |
| `src/app/services/[slug]/page.tsx` | Individual service pages | ✅ Ready (template exists) |
| `src/app/contact/page.tsx` | Contact form | ✅ Ready (API route exists) |

---

## 🎨 Design Features Already Built

**Hero Section:**
- ✅ Letter-by-letter animated headline
- ✅ Glassmorphism badges (backdrop-filter blur)
- ✅ Color blob background (Navy + Amber)
- ✅ Motion-powered animations

**Header:**
- ✅ Fixed position (transparent over hero)
- ✅ Solidifies to glass on scroll
- ✅ Smooth transition effect

**Services Grid:**
- ✅ Bento layout (asymmetric)
- ✅ First tile highlighted in amber
- ✅ Hairline navy borders
- ✅ Hover animations

**Throughout:**
- ✅ Rounded-3xl corners (generous 24px)
- ✅ Glassmorphism on overlays
- ✅ Navy + Amber color system
- ✅ Smooth Motion animations

---

## 🔧 Quick Edits

### Change the Hero Headline
File: `src/app/page.tsx`
```tsx
// Find the main heading and update:
<h1 className="text-5xl font-bold">
  Panne électrique ? On arrive en moins d'une heure.
</h1>
```

### Update Service Icons
File: `src/lib/services.ts`
Icons come from `lucide-react`:
```tsx
import { Zap, Shield, AlertCircle, Plug, Wrench, Lightbulb } from 'lucide-react'
```

### Add Your Phone Number
Update throughout:
- Header CTA
- Hero buttons
- Contact page
- Footer

Replace `[FILL: tél]` with your actual number.

---

## 📞 Key Features for Emergency Service

**Already Implemented:**
- 24/7 availability messaging
- Rapid response time indicators
- Trust/credential badges
- Call-to-action buttons (prominent)
- Contact form with urgency option
- Service area map (ready to customize)

**To Add:**
- Phone number everywhere (clickable tel: links)
- CMEQ license display
- Insurance info
- Testimonials from real emergency calls
- Before-after gallery of repairs

---

## ✅ You're Ready!

The entire Next.js 16 infrastructure is in place with all the premium design features from your commercial site. All that's left is **content customization** — no complex coding needed.

**Start with:** `npm run dev` and open http://localhost:3000 to see the template in action!

---

## 🎯 Deployment Path

1. **Local Testing:** `npm run dev`
2. **Build:** `npm run build`
3. **Deploy:** `vercel deploy --prod`
4. **Custom Domain:** Add in Vercel dashboard

---

**Questions?** Check the commercial electrician site (`electriciencommercialsc.com`) for design patterns and examples!
