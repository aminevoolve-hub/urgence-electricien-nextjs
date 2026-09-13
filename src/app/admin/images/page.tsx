"use client";

import { useState, useEffect } from "react";
import { Upload, Trash2, Save, Plus, Edit2 } from "lucide-react";
import { projects } from "@/lib/projects";
import { values } from "@/lib/values";

const PAGES = [
  { id: "home", label: "Accueil", sections: ["hero", "services", "testimonials"] },
  { id: "about", label: "À propos", sections: ["hero", "team", "values"] },
  { id: "services", label: "Services", sections: ["hero", "service-cards", "process"] },
  { id: "realisations", label: "Réalisations", sections: ["hero", "portfolio"] },
  { id: "blog", label: "Blog", sections: ["hero", "featured", "posts"] },
  { id: "contact", label: "Contact", sections: ["hero", "form"] },
];

// Pre-load current site images
function getDefaultImages() {
  const defaults: any[] = [];

  // Portfolio images
  projects.forEach((project) => {
    defaults.push({
      id: `default-portfolio-${project.slug}`,
      name: `${project.title}.jpg`,
      page: "realisations",
      section: "portfolio",
      element: project.title,
      size: "—",
      url: null,
      isDefault: true,
    });
  });

  // Values images
  values.forEach((value) => {
    defaults.push({
      id: `default-values-${value.slug}`,
      name: `${value.title}.jpg`,
      page: "about",
      section: "values",
      element: value.title,
      size: "—",
      url: null,
      isDefault: true,
    });
  });

  return defaults;
}

export default function ImagesPage() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [selectedSection, setSelectedSection] = useState("hero");
  const [elementName, setElementName] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  // Load images from localStorage + defaults on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const defaults = getDefaultImages();
        const saved = localStorage.getItem("pageImages");
        const savedImages = saved ? JSON.parse(saved) : [];

        // Merge: uploaded images override defaults
        const merged = [
          ...defaults.filter(d => !savedImages.some(s => s.element === d.element && s.page === d.page)),
          ...savedImages
        ];

        setImages(merged);
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
          element: elementName || file.name,
          size: `${(file.size / 1024).toFixed(0)} KB`,
          url: data.url
        };
        setImages([...images, newImage]);
        setUploaded(true);
        setElementName("");
        setShowUpload(false);
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

  // Stats
  const stats = PAGES.map(page => ({
    label: page.label,
    count: images.filter(img => img.page === page.id).length
  }));

  return (
    <div className="p-8 bg-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-400 mb-2">Images des secteurs</h1>
        <p className="text-amber-100 mb-8">
          Gérez toutes les images de votre site par page et section
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {stats.map(stat => (
            <div key={stat.label} className="bg-gradient-to-br from-amber-900 to-amber-950 rounded-lg p-4 border border-amber-700">
              <p className="text-amber-300 text-2xl font-bold">{stat.count}</p>
              <p className="text-amber-200 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Page & Section Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-amber-400 mb-2">Page</label>
            <select
              value={selectedPage}
              onChange={(e) => {
                setSelectedPage(e.target.value);
                setSelectedSection(PAGES.find(p => p.id === e.target.value)?.sections[0] || "");
              }}
              className="w-full px-4 py-2 bg-navy-900 border border-amber-700 rounded-lg text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {PAGES.map(page => (
                <option key={page.id} value={page.id}>{page.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-400 mb-2">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-4 py-2 bg-navy-900 border border-amber-700 rounded-lg text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {currentPage?.sections.map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-400 mb-2">Élément</label>
            <input
              type="text"
              placeholder="ex: Rapidité, Sécurité..."
              value={elementName}
              onChange={(e) => setElementName(e.target.value)}
              className="w-full px-4 py-2 bg-navy-900 border border-amber-700 rounded-lg text-amber-100 placeholder-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Upload Section */}
        {!showUpload ? (
          <button
            onClick={() => setShowUpload(true)}
            className="w-full mb-8 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Ajouter une nouvelle image
          </button>
        ) : (
          <div className="bg-navy-900 rounded-lg p-8 border border-amber-700 mb-8">
            <h2 className="text-lg font-bold text-amber-400 mb-4">
              📸 Nouvelle image{elementName && ` - ${elementName}`}
            </h2>

            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-amber-700 rounded-lg cursor-pointer bg-navy-950 hover:bg-navy-900 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="h-10 w-10 text-amber-600 mb-2" />
                <p className="text-base font-medium text-amber-300">Glissez ou cliquez</p>
                <p className="text-sm text-amber-600">PNG, JPG, WebP (max 5MB)</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".png,.jpg,.jpeg,.webp"
                onChange={handleUpload}
              />
            </label>

            <button
              onClick={() => setShowUpload(false)}
              className="w-full mt-4 px-4 py-2 bg-navy-800 text-amber-300 rounded-lg hover:bg-navy-700 transition"
            >
              Annuler
            </button>
          </div>
        )}

        {/* Images Grid */}
        {sectionImages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-amber-400 mb-6">
              Images de {currentPage?.label} - {selectedSection}
              <span className="text-sm font-normal text-amber-600 ml-2">({sectionImages.length} position{sectionImages.length > 1 ? 's' : ''})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectionImages.map((img) => (
                <div
                  key={img.id}
                  className="bg-navy-900 border border-amber-700 rounded-lg overflow-hidden hover:border-amber-500 transition"
                >
                  {/* Image Preview */}
                  <div className="relative h-48 overflow-hidden bg-navy-950">
                    {img.url ? (
                      <img
                        src={img.url}
                        alt={img.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-navy-900 to-navy-800 border-b border-amber-700">
                        <p className="text-4xl mb-2">📸</p>
                        <p className="text-amber-600 text-sm text-center px-4">En attente d'image</p>
                      </div>
                    )}
                  </div>

                  {/* Image Details */}
                  <div className="p-4">
                    <p className="font-bold text-amber-400 text-lg">{img.element}</p>
                    <p className="text-xs text-amber-600 mt-1">{img.name}</p>
                    <p className="text-xs text-amber-700">{img.size}</p>
                  </div>

                  {/* Buttons */}
                  <div className="p-4 pt-0 space-y-2">
                    <label className="block">
                      <div className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-center cursor-pointer transition font-medium text-sm">
                        📝 Remplacer
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".png,.jpg,.jpeg,.webp"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const updatedImages = images.map(i =>
                                i.id === img.id
                                  ? { ...i, name: file.name, url: event.target?.result as string, size: `${(file.size / 1024).toFixed(0)} KB` }
                                  : i
                              );
                              setImages(updatedImages);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>

                    <button
                      onClick={() => handleDelete(img.id)}
                      className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium text-sm"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sectionImages.length === 0 && !showUpload && (
          <div className="text-center py-12 bg-navy-900 border border-amber-700 rounded-lg">
            <p className="text-amber-600 text-lg">Aucune image pour cette section</p>
            <p className="text-amber-700 text-sm mt-2">Cliquez sur "Ajouter une nouvelle image" pour commencer</p>
          </div>
        )}

        {/* Save Button */}
        {images.length > 0 && (
          <div className="fixed bottom-8 right-8">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              <Save className="h-5 w-5" />
              Sauvegarder les images
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
