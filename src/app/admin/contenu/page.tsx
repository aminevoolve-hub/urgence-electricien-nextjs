"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function ContenuPage() {
  const [saved, setSaved] = useState(false);
  const [companyName, setCompanyName] = useState("Urgence Électricien MTL");
  const [phone, setPhone] = useState("[FILL]");
  const [email, setEmail] = useState("[FILL]");
  const [heroTitle, setHeroTitle] = useState(
    "Électricien d'urgence 24/7 à Montréal"
  );
  const [heroSubtitle, setHeroSubtitle] = useState(
    "Panne électrique? Réponse en moins d'une heure"
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-navy-900 mb-2">
          Contenu du site
        </h1>
        <p className="text-navy-600 mb-8">
          Modifiez les textes et informations principales
        </p>

        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <p className="text-green-800 font-medium">
              ✓ Changements sauvegardés avec succès
            </p>
          </div>
        )}

        {/* Company Info */}
        <div className="bg-white rounded-xl p-6 border border-navy-100 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-navy-900 mb-6">
            Informations entreprise
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Nom de l'entreprise
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-amber-500"
              />
              <p className="text-xs text-red-600 mt-1">
                ⚠️ Important: remplacez [FILL] par votre vrai numéro
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Email de contact
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-amber-500"
              />
              <p className="text-xs text-red-600 mt-1">
                ⚠️ Important: remplacez [FILL] par votre vrai email
              </p>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-xl p-6 border border-navy-100 shadow-sm">
          <h2 className="text-lg font-bold text-navy-900 mb-6">
            Section Héro (Accueil)
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Titre principal
              </label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-amber-500"
              />
              <p className="text-xs text-navy-500 mt-1">
                Grand titre affiché sur la page d'accueil
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Sous-titre
              </label>
              <textarea
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-navy-200 rounded-lg focus:outline-none focus:border-amber-500"
              />
              <p className="text-xs text-navy-500 mt-1">
                Description courte sous le titre
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
