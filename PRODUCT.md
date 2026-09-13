# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who need a commercial electrical contractor in Montréal: business owners, building managers, and general contractors/architects who search for a licensed electrician for a specific project (new installation, panel upgrade, lighting conversion, maintenance, or an urgent electrical problem) and compare quotes before calling.

## Product Purpose

A lead-generation marketing site for Électricien Commercial SC, a Montréal electrical contractor. Success is a visitor requesting a free quote (via the quote modal, contact form, or phone call) or finding enough information to trust the company and reach out.

## Positioning

100% specialization in commercial and industrial electrical work, no residential dilution.

## Operating Context

Visitors typically arrive from a search for a specific need (installation, lighting, maintenance/diagnostics, EV charging/networking) or a general "commercial electrician Montréal" search. RBQ licensing and 24/7 emergency availability are recurring trust signals.

## Capabilities and Constraints

- Content-only site: no database. Services, blog posts, projects, testimonials, and FAQ are hardcoded in `src/lib/*.ts`.
- Only the contact form and uploaded images are dynamic (form submits to Google Sheets + Brevo email; images are read from `public/images/{section}/` by exact filename match; an authored illustration/icon stands in when no real photo has been uploaded).
- Four service lines: commercial electrical installation, commercial/energy-efficient lighting, maintenance/diagnostics/electrical safety, connected systems and networks (EV charging, structured cabling).
- Serves Montréal, Laval, Longueuil, Rive-Sud, Rive-Nord, and the greater metropolitan area.

## Brand Commitments

- Name: Électricien Commercial SC.
- New logo: a stylized "S/C" mark built from a blue-to-orange electric bolt with an arrow. The palette (vivid electric blue + saturated orange) is derived from this logo.

## Evidence on Hand

- Google rating 4.9, 127 reviews; RBQ license number, founded year, and stats (16+ years, 480+ projects) are placeholder figures from the original brief, not verified real data.

## Product Principles

- Specialization over generality: every page reinforces "commercial and industrial only."
- Trust before flash: RBQ licensing, real project examples, and clear pricing/process transparency matter more than visual spectacle.
- One conversion path per page: quote request is the single primary action; phone call is the only acceptable secondary action.
- Content targets specific SEO keywords per page; redesign work preserves copy, routes, and keyword targeting unless the user asks to change them.
