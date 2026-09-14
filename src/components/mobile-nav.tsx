"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Phone, Mail, ChevronRight, ChevronLeft, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { localPages } from "@/lib/local-pages";
import { navLinks } from "@/lib/nav";
import QuoteTriggerButton from "./quote-trigger-button";

export default function MobileNav({
  open,
  onClose,
  logoUrl,
}: {
  open: boolean;
  onClose: () => void;
  logoUrl: string;
}) {
  const [view, setView] = useState<"main" | "services" | "zones">("main");

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <AnimatePresence onExitComplete={() => setView("main")}>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 flex flex-col overflow-y-auto bg-navy-950 px-6 py-6 text-white lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between">
            {view === "services" || view === "zones" ? (
              <button
                onClick={() => setView("main")}
                className="flex items-center gap-1 text-sm font-medium text-navy-200"
              >
                <ChevronLeft className="h-4 w-4" /> Retour
              </button>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={logoUrl} alt={site.name} className="h-16 w-auto" />
            )}
            <button onClick={onClose} aria-label="Fermer le menu" className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>

          {view === "main" ? (
            <>
              <nav className="mt-8 flex flex-1 flex-col items-center justify-center gap-6">
                {navLinks.map((link) =>
                  link.label === "Services" ? (
                    <button
                      key={link.href}
                      onClick={() => setView("services")}
                      className="flex items-center gap-1 font-heading text-2xl"
                    >
                      {link.label} <ChevronRight className="h-5 w-5 text-amber-500" />
                    </button>
                  ) : link.label === "Nos secteurs" ? (
                    <button
                      key={link.href}
                      onClick={() => setView("zones")}
                      className="flex items-center gap-1 font-heading text-2xl"
                    >
                      {link.label} <ChevronRight className="h-5 w-5 text-amber-500" />
                    </button>
                  ) : (
                    <Link key={link.href} href={link.href} onClick={onClose} className="font-heading text-2xl">
                      {link.label}
                    </Link>
                  )
                )}
              </nav>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                <a href={`tel:${site.phone}`} className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-amber-500" /> {site.phoneDisplay}
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-amber-500" /> {site.email}
                </a>
                <QuoteTriggerButton className="btn-gradient mt-2 block w-full rounded-full px-5 py-3 text-center text-sm font-semibold text-navy-950">
                  Soumission gratuite
                </QuoteTriggerButton>
              </div>
            </>
          ) : view === "services" ? (
            <div className="mt-8 flex flex-1 flex-col justify-center">
              <Link
                href="/services"
                onClick={onClose}
                className="mb-4 text-center text-sm font-semibold text-amber-500"
              >
                Voir tous les services
              </Link>
              <div className="grid grid-cols-2 gap-3">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={onClose}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                  >
                    <s.icon className="h-6 w-6 shrink-0 text-amber-500" />
                    <span className="text-xs">{s.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8 flex flex-1 flex-col justify-center">
              <div className="flex flex-col gap-3">
                {localPages.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <MapPin className="h-5 w-5 shrink-0 text-amber-500" />
                    <span className="text-sm">{p.h1}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
