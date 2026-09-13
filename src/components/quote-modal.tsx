"use client";

import { X, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useQuoteModal } from "@/hooks/use-quote-modal";
import { testimonials } from "@/lib/testimonials";
import ContactForm from "./contact-form";

export default function QuoteModal() {
  const { isOpen, closeQuoteModal, presetService } = useQuoteModal();
  const doubled = [...testimonials, ...testimonials];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuoteModal}
        >
          <motion.div
            className="relative w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeQuoteModal}
              aria-label="Fermer"
              className="card-shadow absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-navy-700 hover:text-navy-900"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative max-h-[90vh] overflow-hidden rounded-3xl bg-white">
              <div className="max-h-[90vh] w-full overflow-y-auto p-6 pb-8 sm:p-8 sm:pb-10 lg:w-[58%]">
                <h3 className="font-heading text-xl text-navy-900 sm:text-2xl">Demandez votre soumission gratuite</h3>
                <p className="mt-2 text-navy-600">Réponse sous 24 à 48 heures ouvrables. Aucun engagement.</p>
                <div className="mt-6">
                  <ContactForm presetService={presetService} compact />
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 hidden w-[42%] flex-col overflow-hidden bg-navy-50 p-6 lg:flex">
                <p className="font-heading text-sm text-navy-900">Ce que nos clients en pensent</p>
                <div className="relative mt-4 flex-1 overflow-hidden">
                  <div className="animate-marquee-vertical flex flex-col gap-4">
                    {doubled.map((t, i) => (
                      <div key={`${t.name}-${i}`} className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="flex gap-0.5">
                          {Array.from({ length: t.rating }).map((_, j) => (
                            <Star key={j} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                        <p className="mt-2 text-xs text-navy-700">&ldquo;{t.quote}&rdquo;</p>
                        <p className="mt-2 text-xs font-semibold text-navy-900">{t.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
