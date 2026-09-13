"use client";

import { useState } from "react";
import { services } from "@/lib/services";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({
  presetService,
  compact = false,
}: {
  presetService?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-navy-100 bg-navy-50 p-8 text-center">
        <p className="font-heading text-lg text-navy-900">Merci pour votre demande !</p>
        <p className="mt-2 text-navy-700">Notre équipe vous contactera sous 24 à 48 heures ouvrables.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <input type="hidden" name="website" tabIndex={-1} autoComplete="off" />
      <div>
        <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-navy-800">
          Prénom
        </label>
        <input
          id="firstName"
          name="firstName"
          required
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-navy-800">
          Nom
        </label>
        <input
          id="lastName"
          name="lastName"
          required
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-navy-800">
          Courriel *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-navy-800">
          Téléphone *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="address" className="mb-1 block text-sm font-medium text-navy-800">
          Adresse
        </label>
        <input
          id="address"
          name="address"
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="service" className="mb-1 block text-sm font-medium text-navy-800">
          Service souhaité
        </label>
        <select
          id="service"
          name="service"
          defaultValue={presetService ?? ""}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        >
          <option value="">Sélectionner un service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Autre">Autre</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-navy-800">
          Détails de votre projet
        </label>
        <textarea
          id="message"
          name="message"
          rows={compact ? 3 : 4}
          className="w-full rounded-lg border border-navy-200 px-4 py-2.5 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`btn-gradient rounded-full w-full font-semibold text-navy-950 transition disabled:opacity-60 ${
            compact ? "px-5 py-2.5 text-sm" : "px-6 py-3"
          }`}
        >
          {status === "submitting" ? "Envoi en cours..." : "Obtenir ma soumission gratuite"}
        </button>
        {status === "error" && (
          <p className="mt-2 text-sm text-red-600">
            Une erreur est survenue. Veuillez réessayer ou nous appeler directement.
          </p>
        )}
      </div>
    </form>
  );
}
