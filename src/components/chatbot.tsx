"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Phone, Zap } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/lib/site";
import { useQuoteModal } from "@/hooks/use-quote-modal";

type Message = { from: "bot" | "user"; text: string };

const questions: { question: string; answer: string }[] = [
  {
    question: "Quels services offrez-vous ?",
    answer:
      "Dépannage électrique d'urgence 24/7, remplacement de disjoncteur, mise à jour de panneau électrique, installation de prises et d'interrupteurs, diagnostic électrique complet et travaux électriques généraux.",
  },
  {
    question: "Êtes-vous licenciés RBQ ?",
    answer: "Oui, tous nos électriciens sont licenciés RBQ et membres de la CCQ.",
  },
  {
    question: "Quelle est votre zone de service ?",
    answer: `Nous desservons ${site.serviceArea}.`,
  },
  {
    question: "En combien de temps arrivez-vous ?",
    answer: "En moins d'une heure dans le Grand Montréal, 24 heures sur 24, 7 jours sur 7, sans surcharge pour l'urgence.",
  },
  {
    question: "Combien ça coûte ?",
    answer: "Le diagnostic sur place est gratuit et le prix est annoncé avant toute réparation. Pour un projet planifié, demandez une soumission gratuite ci-dessous.",
  },
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Bonjour ! Une panne électrique ou une question ? Je suis là pour vous aider, 24/7." },
  ]);
  const [typing, setTyping] = useState(false);
  const { openQuoteModal } = useQuoteModal();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  function handleQuestion(q: { question: string; answer: string }) {
    setMessages((prev) => [...prev, { from: "user", text: q.question }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: q.answer }]);
      setTyping(false);
    }, 900);
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end lg:bottom-6 lg:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 flex h-[32rem] w-80 flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between bg-navy-900 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="icon-badge flex h-8 w-8 items-center justify-center rounded-full text-navy-950">
                  <Zap className="h-4 w-4" />
                </span>
                <span className="font-heading text-sm text-white">Assistant Urgence Électricien</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Fermer" className="text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex items-end gap-2 ${m.from === "user" ? "justify-end" : ""}`}>
                  {m.from === "bot" && (
                    <span className="icon-badge flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-navy-950">
                      <Zap className="h-3.5 w-3.5" />
                    </span>
                  )}
                  <div
                    className={`max-w-[78%] rounded-xl px-3 py-2 text-sm ${
                      m.from === "bot" ? "bg-navy-50 text-navy-800" : "bg-amber-600 text-navy-950"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex items-end gap-2">
                  <span className="icon-badge flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-navy-950">
                    <Zap className="h-3.5 w-3.5" />
                  </span>
                  <div className="w-fit rounded-xl bg-navy-50 px-3 py-2 text-sm text-navy-500">en train d&apos;écrire…</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-navy-100 p-3">
              <div className="grid grid-cols-2 gap-2">
                {questions.map((q) => (
                  <button
                    key={q.question}
                    onClick={() => handleQuestion(q)}
                    className="rounded-xl border border-navy-200 px-2.5 py-1.5 text-left text-xs text-navy-700 hover:border-amber-500 hover:text-amber-700"
                  >
                    {q.question}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <a
                  href={`tel:${site.phone}`}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-navy-200 py-2 text-xs font-semibold text-navy-800 hover:border-amber-500"
                >
                  <Phone className="h-3.5 w-3.5" /> Appeler
                </a>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-navy-200 py-2 text-xs font-semibold text-navy-800 hover:border-amber-500"
                >
                  Page contact
                </Link>
              </div>
              <button onClick={() => openQuoteModal()} className="btn-gradient rounded-full mt-2 w-full py-2 text-sm font-semibold text-navy-950">
                Demander une soumission
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Ouvrir le clavardage"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-amber-500 shadow-xl hover:bg-navy-800"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
