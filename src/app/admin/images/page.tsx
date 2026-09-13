"use client";

import { useState, useEffect } from "react";
import { Upload, Trash2, Save, Plus, Edit2 } from "lucide-react";
import { projects } from "@/lib/projects";
import { values } from "@/lib/faq";
import { services } from "@/lib/services";

const PAGES = [
  { id: "home", label: "Accueil", sections: ["valeurs"] },
  { id: "services", label: "Services", sections: ["service-cards"] },
  { id: "realisations", label: "Réalisations", sections: ["portfolio"] },
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
      page: "home",
      section: "valeurs",
      element: value.title,
      size: "—",
      url: null,
      isDefault: true,
    });
  });

  // Services images
  services.forEach((service) => {
    defaults.push({
      id: `default-service-${service.slug}`,
      name: `${service.name}.jpg`,
      page: "services",
      section: "service-cards",
      element: service.name,
      size: "—",
      url: null,
      isDefault: true,
    });
  });

  return defaults;
}

export default function ImagesPage() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [selectedSection, setSelectedSection] = useState("valeurs");
  const [saved, setSaved] = useState(false);
  const [images, setImages] = useState<any[]>([]);

  // Load images from localStorage + defaults on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const defaults = getDefaultImages();
        const saved = localStorage.getItem("pageImages");
        const savedImages: any[] = saved ? JSON.parse(saved) : [];

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

  const handleSave = () => {
    try {
      localStorage.setItem("pageImages", JSON.stringify(images));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      alert(`Erreur sauvegarde: ${error}`);
    }
  };

  const sectionImages = images.filter(img => img.page === selectedPage && img.section === selectedSection);

  return (
    <div className="p-8 bg-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-400 mb-2">📸 Images du site</h1>
        <p className="text-amber-100 mb-8">Cliquez sur une image pour la remplacer</p>

        {saved && (
          <div className="bg-green-900 border border-green-700 rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <p className="text-green-300 font-medium">✓ Images sauvegardées</p>
          </div>
        )}

        {/* Page Selector - Horizontal Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {PAGES.map(page => (
            <button
              key={page.id}
              onClick={() => {
                setSelectedPage(page.id);
                setSelectedSection(page.sections[0]);
              }}
              className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                selectedPage === page.id
                  ? "bg-amber-600 text-white"
                  : "bg-navy-900 text-amber-400 border border-amber-700 hover:bg-navy-800"
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>

        {/* Section Tabs */}
        {currentPage && (
          <div className="flex gap-2 mb-8 pb-2">
            {currentPage.sections.map(section => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`px-4 py-1 rounded-lg text-sm font-semibold transition ${
                  selectedSection === section
                    ? "bg-amber-500 text-white"
                    : "bg-navy-900 text-amber-300 border border-amber-700 hover:bg-navy-800"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        )}

        {/* Images Grid - Simple Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sectionImages.map((img) => (
            <label
              key={img.id}
              className="group cursor-pointer"
            >
              <div className="bg-navy-900 border-2 border-amber-700 rounded-lg overflow-hidden hover:border-amber-400 transition-all h-full flex flex-col">
                {/* Image Preview */}
                <div className="relative h-40 bg-navy-950 flex items-center justify-center overflow-hidden group-hover:bg-navy-800 transition">
                  {img.url ? (
                    <img
                      src={img.url}
                      alt={img.element}
                      className="h-full w-full object-cover group-hover:opacity-75 transition"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center px-4">
                      <p className="text-3xl mb-1">📸</p>
                      <p className="text-amber-600 text-xs">Cliquez pour ajouter</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <p className="text-white font-bold text-sm">Changer</p>
                  </div>
                </div>

                {/* Label */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <p className="font-bold text-amber-400 text-sm line-clamp-2">{img.element}</p>
                  {img.url && <p className="text-xs text-amber-700 mt-1">{img.name}</p>}
                </div>
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
          ))}
        </div>

        {sectionImages.length === 0 && (
          <div className="text-center py-12 bg-navy-900 border border-amber-700 rounded-lg">
            <p className="text-amber-600 text-lg">Aucune image pour cette section</p>
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
