"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError((await res.json()).error || "Connexion impossible");
        return;
      }
      const next = new URLSearchParams(window.location.search).get("next");
      router.replace(next && next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-navy-50 px-4 py-16">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-navy-100 bg-white p-8 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-amber-400">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="mt-5 font-heading text-2xl text-navy-900">Administration</h1>
        <p className="mt-1 text-sm text-navy-600">Entrez le mot de passe pour gérer le site.</p>

        <label className="mt-6 block text-sm font-medium text-navy-800">
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
            required
            className="mt-2 w-full rounded-xl border border-navy-200 px-4 py-2.5 text-navy-900 outline-none focus:border-navy-900 focus:ring-2 focus:ring-amber-400/50"
          />
        </label>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting || !password}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-50"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Se connecter
        </button>
      </form>
    </div>
  );
}
