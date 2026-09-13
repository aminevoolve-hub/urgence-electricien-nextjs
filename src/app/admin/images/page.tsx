"use client";

import { useState, useEffect } from "react";
import { Upload, Trash2, Save } from "lucide-react";

const PAGES = [
  { id: "home", label: "Accueil", sections: ["hero", "services", "testimonials"] },
  { id: "about", label: "À propos", sections: ["hero", "team", "values"] },
  { id: "services", label: "Services", sections: ["hero", "service-cards", "process"] },
  { id: "realisations", label: "Réalisations", sections: ["hero", "portfolio"] },
  { id: "blog", label: "Blog", sections: ["hero", "featured", "posts"] },
  { id: "contact", label: "Contact", sections: ["hero", "form"] },
];

export default function ImagesPage() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [selectedSection, setSelectedSection] = useState("hero");
  const [uploaded, setUploaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [images, setImages] = useState<any[]>([]);

  // Load images from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("pageImages");
        if (saved) {
          setImages(JSON.parse(saved));
        }
      } catch (err) {
        console.error("Error loading images:", err);
      }
    }
  }, []);

  const currentPage = PAGES.find(p => p.id === selectedPage);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("page", selectedPage);
    formData.append("section", selectedSection);

    try {
      const res = await fetch("/api/admin/images", { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) {
        const newImage = {
          id: Date.now().toString(),
          name: file.name,
          page: selectedPage,
          section: selectedSection,
          size: `${(file.size / 1024).toFixed(0)} KB`,
          url: data.url
        };
        setImages([...images, newImage]);
        setUploaded(true);
        setTimeout(() => setUploaded(false), 3000);
      }
    } catch (error) {
      alert(`Erreur: ${error}`);
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem("pageImages", JSON.stringify(images));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      alert(`Erreur sauvegarde: ${error}`);
    }
  };

  const handleDelete = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  const pageImages = images.filter(img => img.page === selectedPage);
  const sectionImages = pageImages.filter(img => img.section === selectedSection);

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-navy-900 mb-2">Images par page</h1>
        <p className="text-navy-600 mb-8">
          Gérez les images pour chaque page et section
        </p>

        {uploaded && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <p className="text-green-800 font-medium">✓ Image uploadée avec succès</p>
          </div>
        )}

        {saved && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <p className="text-green-800 font-medium">✓ Images sauvegardées avec succès</p>
          </div>
        )}

        {/* Page & Section Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-2">Page</label>
            <select
              value={selectedPage}
              onChange={(e) => {
                setSelectedPage(e.target.value);
                setSelectedSection(PAGES.find(p => p.id === e.target.value)?.sections[0] || "");
              }}
              className="w-full px-4 py-2 border border-navy-200 rounded-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {PAGES.map(page => (
                <option key={page.id} value={page.id}>{page.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-900 mb-2">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-4 py-2 border border-navy-200 rounded-lg text-navy-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {currentPage?.sections.map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-xl p-8 border border-navy-100 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-navy-900 mb-4">
            Uploader une image pour {currentPage?.label} - {selectedSection}
          </h2>

          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-navy-300 rounded-lg cursor-pointer bg-navy-50 hover:bg-navy-100 transition">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="h-10 w-10 text-navy-400 mb-2" />
              <p className="text-base font-medium text-navy-600">Glissez ou cliquez</p>
              <p className="text-sm text-navy-500">PNG, JPG, WebP (max 5MB)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".png,.jpg,.jpeg,.webp"
              onChange={handleUpload}
            />
          </label>
        </div>

        {/* Current Images for Section */}
        <div className="bg-white rounded-xl p-6 border border-navy-100 shadow-sm">
          <h2 className="text-lg font-bold text-navy-900 mb-6">
            Images de cette section ({sectionImages.length})
          </h2>

          {sectionImages.length === 0 ? (
            <p className="text-navy-500 text-center py-8">Aucune image uploadée pour cette section</p>
          ) : (
            <div className="space-y-3">
              {sectionImages.map((img, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-navy-50 rounded-lg border border-navy-100 group"
                >
                  <div className="flex-1">
                    <p className="font-medium text-navy-900">{img.name}</p>
                    <p className="text-xs text-navy-500">{img.size}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            <Save className="h-5 w-5" />
            Sauvegarder les images
          </button>
        </div>

        {/* All Images Summary */}
        <div className="bg-white rounded-xl p-6 border border-navy-100 shadow-sm mt-8">
          <h2 className="text-lg font-bold text-navy-900 mb-6">
            Résumé par page
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PAGES.map(page => {
              const count = images.filter(img => img.page === page.id).length;
              return (
                <div key={page.id} className="p-4 bg-navy-50 rounded-lg border border-navy-100">
                  <p className="font-medium text-navy-900">{page.label}</p>
                  <p className="text-2xl font-bold text-amber-500">{count}</p>
                  <p className="text-xs text-navy-500">images</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
