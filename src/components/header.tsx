"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Phone, ChevronDown, Menu, MapPin } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { localPages } from "@/lib/local-pages";
import { navLinks } from "@/lib/nav";
import QuoteTriggerButton from "./quote-trigger-button";
import MobileNav from "./mobile-nav";

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [zonesOpen, setZonesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  // Use the logo from public/images folder
  const [logoUrl] = useState("/images/logo-urgence-electricien.png");


  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => setScrolledPastHero(latest > 40));

  const scrolled = !isHome || scrolledPastHero;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "border-b border-navy-100/60 bg-white/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 lg:px-8">
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt={site.name}
              className="h-24 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) =>
              link.label === "Services" ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-amber-500"
                        : scrolled
                          ? "text-navy-800 hover:bg-navy-100/70 hover:text-amber-500"
                          : "text-white hover:bg-white/10 hover:text-amber-500"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </Link>
                  {servicesOpen && (
                    <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4">
                      <div className="grid grid-cols-2 gap-2 rounded-3xl border border-navy-100 bg-white p-4 shadow-xl">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="flex items-start gap-3 rounded-2xl p-3 hover:bg-amber-50"
                          >
                            <s.icon className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                            <span>
                              <span className="block text-sm font-semibold text-navy-900">{s.name}</span>
                              <span className="mt-1 block text-xs text-navy-600">{s.shortDescription}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : link.label === "Nos secteurs" ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setZonesOpen(true)}
                  onMouseLeave={() => setZonesOpen(false)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                      scrolled
                        ? "text-navy-800 hover:bg-navy-100/70 hover:text-amber-500"
                        : "text-white hover:bg-white/10 hover:text-amber-500"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {zonesOpen && (
                    <div className="absolute left-1/2 top-full w-[320px] -translate-x-1/2 pt-4">
                      <div className="grid grid-cols-1 gap-1 rounded-3xl border border-navy-100 bg-white p-3 shadow-xl">
                        {localPages.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/${p.slug}`}
                            className="flex items-center gap-3 rounded-2xl p-3 hover:bg-amber-50"
                          >
                            <MapPin className="h-5 w-5 shrink-0 text-amber-600" />
                            <span className="text-sm font-semibold text-navy-900">{p.h1}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-amber-500"
                      : scrolled
                        ? "text-navy-800 hover:bg-navy-100/70 hover:text-amber-500"
                        : "text-white hover:bg-white/10 hover:text-amber-500"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={`tel:${site.phone}`}
              aria-label={site.phoneDisplay}
              title={site.phoneDisplay}
              className={`flex items-center justify-center rounded-full p-2 ${scrolled ? "text-navy-900" : "text-white"}`}
            >
              <Phone className="animate-phone-ring h-5 w-5" />
            </a>
            <QuoteTriggerButton className="btn-gradient animate-pulse-ring rounded-full px-5 py-2 text-sm font-semibold text-white">
              Soumission gratuite
            </QuoteTriggerButton>
          </div>

          <button className="p-2 lg:hidden" aria-label="Ouvrir le menu" onClick={() => setMobileOpen(true)}>
            <Menu className={`h-6 w-6 ${scrolled ? "text-navy-900" : "text-white"}`} />
          </button>
        </div>
      </motion.header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
