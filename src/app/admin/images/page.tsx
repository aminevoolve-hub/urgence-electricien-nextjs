"use client";

import { useCallback, useEffect, useState } from "react";
import { upload } from "@vercel/blob/client";
import { AlertCircle, CheckCircle2, ImageIcon, Loader2, RotateCcw, Upload } from "lucide-react";

type Slot = {
  section: string;
  name: string;
  label: string;
  hint?: string;
  original: string | null;
  override: string | null;
  current: string | null;
};

type Group = { id: string; label: string; slots: Slot[] };

type Busy = Record<string, number | "publish">;

const ACCEPT = ".jpg,.jpeg,.png,.webp,.avif";

const keyOf = (slot: Slot) => `${slot.section}/${slot.name}`;

export default function ImagesPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [configured, setConfigured] = useState(true);
  const [activeGroup, setActiveGroup] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<Busy>({});
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/images", { cache: "no-store" });
    const data = await res.json();
    setGroups(data.groups);
    setConfigured(data.configured);
    setActiveGroup((current) => current || data.groups[0]?.id || "");
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function notify(kind: "ok" | "err", text: string) {
    setToast({ kind, text });
    setTimeout(() => setToast(null), 5000);
  }

  function setProgress(key: string, value: number | "publish" | null) {
    setBusy((prev) => {
      const next = { ...prev };
      if (value === null) delete next[key];
      else next[key] = value;
      return next;
    });
  }

  async function replace(slot: Slot, file: File) {
    const key = keyOf(slot);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    setProgress(key, 0);
    try {
      const blob = await upload(`images/${slot.section}/${slot.name}/${Date.now()}.${ext}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/images/upload",
        onUploadProgress: ({ percentage }) => setProgress(key, percentage),
      });
      setProgress(key, "publish");
      const res = await fetch("/api/admin/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: slot.section, name: slot.name, url: blob.url }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Échec de la publication");
      await load();
      notify("ok", `« ${slot.label} » remplacée — visible sur le site maintenant.`);
    } catch (error) {
      notify("err", error instanceof Error ? error.message : "Échec de l'upload");
    } finally {
      setProgress(key, null);
    }
  }

  async function reset(slot: Slot) {
    if (!confirm(`Rétablir l'image d'origine pour « ${slot.label} » ?`)) return;
    const key = keyOf(slot);
    setProgress(key, "publish");
    try {
      const res = await fetch("/api/admin/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: slot.section, name: slot.name }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Échec");
      await load();
      notify("ok", `« ${slot.label} » rétablie à l'image d'origine.`);
    } catch (error) {
      notify("err", error instanceof Error ? error.message : "Échec");
    } finally {
      setProgress(key, null);
    }
  }

  const group = groups.find((g) => g.id === activeGroup);

  return (
    <div className="min-h-full p-6 lg:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-heading text-3xl text-navy-900">Images du site</h1>
        <p className="mt-2 text-navy-600">
          Toutes les images affichées sur le site, page par page. Remplacez-en une : elle est publiée immédiatement.
        </p>

        {!configured && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            Le stockage des images n&apos;est pas configuré (variable BLOB_READ_WRITE_TOKEN manquante). Les uploads
            échoueront tant qu&apos;elle n&apos;est pas ajoutée dans Vercel.
          </div>
        )}

        {loading ? (
          <div className="mt-12 flex items-center gap-3 text-navy-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Chargement des images…
          </div>
        ) : (
          <>
            <div className="mt-8 flex flex-wrap gap-2">
              {groups.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActiveGroup(g.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    g.id === activeGroup
                      ? "bg-navy-900 text-white"
                      : "border border-navy-200 bg-white text-navy-700 hover:border-navy-400"
                  }`}
                >
                  {g.label}
                  <span className={`ml-2 ${g.id === activeGroup ? "text-navy-300" : "text-navy-400"}`}>
                    {g.slots.length}
                  </span>
                </button>
              ))}
            </div>

            {group && (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {group.slots.map((slot) => {
                  const key = keyOf(slot);
                  const state = busy[key];
                  const isLogo = slot.section === "brand";
                  return (
                    <div
                      key={key}
                      className="flex flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm"
                    >
                      <div className={`relative aspect-[4/3] ${isLogo ? "bg-navy-950" : "bg-navy-100"}`}>
                        {slot.current ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={slot.current}
                            alt={slot.label}
                            className={`h-full w-full ${isLogo ? "object-contain p-6" : "object-cover"}`}
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-navy-400">
                            <ImageIcon className="h-8 w-8" />
                            <span className="text-xs">Aucune image — le site affiche une icône</span>
                          </div>
                        )}

                        <span
                          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
                            slot.override
                              ? "bg-amber-400 text-navy-950"
                              : slot.current
                                ? "bg-white/90 text-navy-700"
                                : "bg-white/90 text-navy-400"
                          }`}
                        >
                          {slot.override ? "Personnalisée" : slot.current ? "Par défaut" : "Vide"}
                        </span>

                        {state !== undefined && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy-950/70 text-white">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span className="text-sm font-medium">
                              {state === "publish" ? "Publication…" : `Envoi ${Math.round(state)} %`}
                            </span>
                            {state !== "publish" && (
                              <div className="h-1.5 w-2/3 overflow-hidden rounded-full bg-white/20">
                                <div className="h-full bg-amber-400 transition-all" style={{ width: `${state}%` }} />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-4">
                        <p className="font-semibold text-navy-900">{slot.label}</p>
                        {slot.hint && <p className="mt-1 text-xs text-navy-500">{slot.hint}</p>}

                        <div className="mt-4 flex items-center gap-2">
                          <label
                            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800 ${
                              state !== undefined ? "pointer-events-none opacity-50" : ""
                            }`}
                          >
                            <Upload className="h-4 w-4" />
                            {slot.current ? "Remplacer" : "Ajouter"}
                            <input
                              type="file"
                              accept={ACCEPT}
                              className="hidden"
                              disabled={state !== undefined}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                e.target.value = "";
                                if (file) replace(slot, file);
                              }}
                            />
                          </label>
                          {slot.override && (
                            <button
                              onClick={() => reset(slot)}
                              disabled={state !== undefined}
                              title="Rétablir l'image d'origine"
                              className="rounded-full border border-navy-200 p-2 text-navy-600 transition-colors hover:border-navy-400 hover:text-navy-900 disabled:opacity-50"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex max-w-md items-start gap-3 rounded-2xl px-4 py-3 text-sm shadow-lg ${
            toast.kind === "ok" ? "bg-navy-900 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.kind === "ok" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          )}
          {toast.text}
        </div>
      )}
    </div>
  );
}
