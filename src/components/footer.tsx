"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { localPages } from "@/lib/local-pages";
import { navLinks } from "@/lib/nav";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-96"
        style={{ background: "radial-gradient(ellipse 70% 100% at 50% 100%, color-mix(in srgb, var(--navy-500) 45%, transparent), transparent 70%)" }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.85fr_0.85fr_0.85fr_0.9fr] lg:px-8">
        <div>
          <h3 className="text-2xl font-bold text-amber-400">URGENCE</h3>
          <p className="mt-4 text-sm text-white">
            Urgence électricien 24/7. Dépannage d'urgence disponible 24 heures sur 24, 7 jours sur 7.
            Électricien licencié RBQ au service de la grande région métropolitaine de Montréal.
          </p>
        </div>

        <div>
          <p className="font-heading text-sm text-white">Navigation</p>
          <ul className="mt-4 space-y-2 text-sm text-white">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-amber-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm text-white">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-white">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-amber-400">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm text-white">Zones desservies</p>
          <ul className="mt-4 space-y-2 text-sm text-white">
            {localPages.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="hover:text-amber-400">
                  {p.h1}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-heading text-sm text-white">Coordonnées</p>
          <ul className="mt-4 space-y-3 text-sm text-white">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span>
                {site.address.street}, {site.address.city} ({site.address.region})
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-amber-400" />
              <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-amber-400" />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li className="text-white">Électricien licencié CMEQ</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-6 text-center text-xs text-white">
        © {new Date().getFullYear()} {site.name}. Tous droits réservés.
      </div>
    </footer>
  );
}
