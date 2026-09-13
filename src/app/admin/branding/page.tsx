"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function BrandingPage() {
  const [saved, setSaved] = useState(false);
  const [logo, setLogo] = useState("logo-urgence-electricien.svg");
  const [favicon, setFavicon] = useState("favicon.ico");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-navy-900 mb-2">Marque & Logo</h1>
        <p className="text-navy-600 mb-8">
          Personnalisez le logo et les identifiants de votre site
        </p>

        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <p className="text-green-800 font-medium">
              ✓ Changements sauvegardés avec succès
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo */}
          <div className="bg-white rounded-xl p-6 border border-navy-100 shadow-sm">
            <h2 className="text-lg font-bold text-navy-900 mb-4">Logo</h2>

            <div className="bg-navy-50 rounded-lg p-8 flex items-center justify-center mb-4 border-2 border-dashed border-navy-200">
              <div className="text-center">
                <div className="text-4xl mb-2">🎨</div>
                <p className="text-sm text-navy-600">Logo actuel</p>
                <p className="text-xs text-navy-500 font-mono mt-1">{logo}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-900 mb-3">
                Fichier logo (SVG recommandé)
              </label>
              <div className="border-2 border-dashed border-navy-300 rounded-lg p-6 text-center cursor-pointer hover:bg-navy-50 transition">
                <input type="file" className="hidden" accept=".svg,.png" />
                <div>
                  <p className="text-sm text-navy-600">
                    Cliquez pour télécharger
                  </p>
                  <p className="text-xs text-navy-500 mt-1">
                    SVG, PNG (max 2MB)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Favicon */}
          <div className="bg-white rounded-xl p-6 border border-navy-100 shadow-sm">
            <h2 className="text-lg font-bold text-navy-900 mb-4">Favicon</h2>

            <div className="bg-navy-50 rounded-lg p-8 flex items-center justify-center mb-4 border-2 border-dashed border-navy-200">
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <p className="text-sm text-navy-600">Icône onglet</p>
                <p className="text-xs text-navy-500 font-mono mt-1">{favicon}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-900 mb-3">
                Fichier favicon
              </label>
              <div className="border-2 border-dashed border-navy-300 rounded-lg p-6 text-center cursor-pointer hover:bg-navy-50 transition">
                <input type="file" className="hidden" accept=".ico,.png" />
                <div>
                  <p className="text-sm text-navy-600">
                    Cliquez pour télécharger
                  </p>
                  <p className="text-xs text-navy-500 mt-1">
                    ICO, PNG (max 1MB)
                  </p>
                </div>
              </div>

              <p className="text-xs text-navy-500 mt-3">
                💡 Affiché dans l'onglet du navigateur
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
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
