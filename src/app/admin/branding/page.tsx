"use client";

import { useState } from "react";
import { Save, Upload as UploadIcon } from "lucide-react";

export default function BrandingPage() {
  const [saved, setSaved] = useState(false);
  const [logo, setLogo] = useState("logo-urgence-electricien.svg");
  const [favicon, setFavicon] = useState("favicon.ico");
  const [logoUploading, setLogoUploading] = useState(false);
  const [faviconUploading, setFaviconUploading] = useState(false);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", "branding");
    formData.append("fileType", "logo");

    try {
      console.log("Starting logo upload...");
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      console.log("Upload response:", data);

      if (data.success) {
        // Save logo to localStorage - wait for FileReader to complete before reloading
        const reader = new FileReader();
        reader.onerror = (error) => {
          console.error("FileReader error:", error);
          alert(`❌ Erreur lecture fichier: ${error}`);
        };
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          console.log("✓ FileReader completed, data URL length:", dataUrl?.length || 0);

          try {
            localStorage.setItem("uploadedLogo", dataUrl);
            const verified = localStorage.getItem("uploadedLogo");
            console.log("✓ Saved to localStorage, verified:", verified ? "YES" : "NO", "length:", verified?.length || 0);

            // Dispatch custom event so header/footer update in same tab
            window.dispatchEvent(new CustomEvent("logoUpdated", { detail: dataUrl }));
            console.log("✓ Dispatched logoUpdated event");
          } catch (err) {
            console.error("❌ localStorage error:", err);
            alert(`❌ Erreur sauvegarde: ${err}`);
            return;
          }

          setLogo(file.name);
          setSaved(true);
          alert(`✅ Logo uploadé avec succès!`);
        };
        reader.readAsDataURL(file);
      } else {
        alert(`❌ Erreur: ${data.error}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(`❌ Erreur: ${error}`);
    } finally {
      setLogoUploading(false);
    }
  };

  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFaviconUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", "branding");
    formData.append("fileType", "favicon");

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setFavicon(file.name);
        setSaved(true);
        alert(`✅ Favicon uploadée avec succès!`);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(`❌ Erreur: ${error}`);
    } finally {
      setFaviconUploading(false);
    }
  };

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
              <div className="border-2 border-dashed border-navy-300 rounded-lg p-6 text-center cursor-pointer hover:bg-navy-50 transition relative">
                <input
                  type="file"
                  className="hidden"
                  accept=".svg,.png"
                  onChange={handleLogoUpload}
                  disabled={logoUploading}
                  id="logo-input"
                />
                <label htmlFor="logo-input" className="block cursor-pointer">
                  <div>
                    {logoUploading ? (
                      <p className="text-sm text-navy-600">Téléchargement en cours...</p>
                    ) : (
                      <>
                        <p className="text-sm text-navy-600">
                          Cliquez pour télécharger
                        </p>
                        <p className="text-xs text-navy-500 mt-1">
                          SVG, PNG (max 2MB)
                        </p>
                      </>
                    )}
                  </div>
                </label>
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
                <input
                  type="file"
                  className="hidden"
                  accept=".ico,.png"
                  onChange={handleFaviconUpload}
                  disabled={faviconUploading}
                  id="favicon-input"
                />
                <label htmlFor="favicon-input" className="block cursor-pointer">
                  <div>
                    {faviconUploading ? (
                      <p className="text-sm text-navy-600">Téléchargement en cours...</p>
                    ) : (
                      <>
                        <p className="text-sm text-navy-600">
                          Cliquez pour télécharger
                        </p>
                        <p className="text-xs text-navy-500 mt-1">
                          ICO, PNG (max 1MB)
                        </p>
                      </>
                    )}
                  </div>
                </label>
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
