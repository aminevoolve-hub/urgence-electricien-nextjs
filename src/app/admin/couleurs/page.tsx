"use client";

import { useState } from "react";
import { Save, RotateCcw } from "lucide-react";

export default function CouleursPage() {
  const [saved, setSaved] = useState(false);
  const [colors, setColors] = useState({
    primary: "#1E40AF",
    accent: "#EA580C",
    secondary: "#0A5C8A",
  });

  const handleColorChange = (key: string, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setColors({
      primary: "#1E40AF",
      accent: "#EA580C",
      secondary: "#0A5C8A",
    });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-navy-900 mb-2">Couleurs</h1>
        <p className="text-navy-600 mb-8">
          Personnalisez la palette de couleurs du site
        </p>

        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <p className="text-green-800 font-medium">
              ✓ Couleurs sauvegardées avec succès
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Color Editor */}
          <div className="space-y-6">
            {[
              { key: "primary", label: "Bleu primaire", desc: "Couleur principale" },
              { key: "accent", label: "Orange d'urgence", desc: "CTA et accents" },
              { key: "secondary", label: "Bleu secondaire", desc: "Éléments secondaires" },
            ].map(({ key, label, desc }) => (
              <div
                key={key}
                className="bg-white rounded-xl p-6 border border-navy-100 shadow-sm"
              >
                <label className="block text-sm font-semibold text-navy-900 mb-1">
                  {label}
                </label>
                <p className="text-xs text-navy-500 mb-3">{desc}</p>

                <div className="flex gap-3 items-center mb-3">
                  <input
                    type="color"
                    value={colors[key as keyof typeof colors]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-20 h-14 rounded-lg cursor-pointer border border-navy-200"
                  />

                  <div className="flex-1">
                    <input
                      type="text"
                      value={colors[key as keyof typeof colors]}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="w-full px-3 py-2 border border-navy-200 rounded-lg font-mono text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div
                  className="h-10 rounded-lg border border-navy-100"
                  style={{
                    backgroundColor: colors[key as keyof typeof colors],
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl p-6 border border-navy-100 shadow-sm sticky top-8">
            <h2 className="text-lg font-bold text-navy-900 mb-6">Aperçu</h2>

            <div className="space-y-6">
              {/* Buttons */}
              <div>
                <p className="text-xs font-medium text-navy-600 uppercase mb-3">
                  Boutons
                </p>
                <button
                  style={{ backgroundColor: colors.primary }}
                  className="w-full text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity mb-2"
                >
                  Bouton primaire
                </button>
                <button
                  style={{ backgroundColor: colors.accent }}
                  className="w-full text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Appel à l'action
                </button>
              </div>

              {/* Text */}
              <div>
                <p className="text-xs font-medium text-navy-600 uppercase mb-3">
                  Texte
                </p>
                <p
                  style={{ color: colors.primary }}
                  className="text-lg font-bold mb-2"
                >
                  Texte primaire
                </p>
                <p
                  style={{ color: colors.secondary }}
                  className="text-sm"
                >
                  Texte secondaire
                </p>
              </div>

              {/* Badges */}
              <div>
                <p className="text-xs font-medium text-navy-600 uppercase mb-3">
                  Badges
                </p>
                <div className="flex gap-2 flex-wrap">
                  <div
                    style={{ backgroundColor: colors.primary }}
                    className="px-3 py-1 rounded-full text-xs text-white font-medium"
                  >
                    Badge
                  </div>
                  <div
                    style={{ backgroundColor: colors.accent }}
                    className="px-3 py-1 rounded-full text-xs text-white font-medium"
                  >
                    Urgent
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-3 justify-end">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-navy-100 hover:bg-navy-200 text-navy-900 font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            <RotateCcw className="h-5 w-5" />
            Réinitialiser
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            <Save className="h-5 w-5" />
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}
