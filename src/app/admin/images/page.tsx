"use client";

import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";

export default function ImagesPage() {
  const [uploaded, setUploaded] = useState(false);

  const images = [
    { name: "logo-urgence-electricien.svg", category: "Branding", size: "45 KB" },
    {
      name: "electrician-hero.jpg",
      category: "Hero Section",
      size: "850 KB",
    },
    { name: "services-icon-1.svg", category: "Services", size: "12 KB" },
    { name: "services-icon-2.svg", category: "Services", size: "14 KB" },
    { name: "team-photo.jpg", category: "À propos", size: "620 KB" },
  ];

  const handleUpload = () => {
    setUploaded(true);
    setTimeout(() => setUploaded(false), 3000);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-navy-900 mb-2">Images</h1>
        <p className="text-navy-600 mb-8">
          Gérez toutes les images du site
        </p>

        {uploaded && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <p className="text-green-800 font-medium">
              ✓ Image uploadée avec succès
            </p>
          </div>
        )}

        {/* Upload Area */}
        <div className="bg-white rounded-xl p-8 border border-navy-100 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-navy-900 mb-4">
            Uploader une image
          </h2>

          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-navy-300 rounded-lg cursor-pointer bg-navy-50 hover:bg-navy-100 transition">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="h-10 w-10 text-navy-400 mb-2" />
              <p className="text-base font-medium text-navy-600">
                Glissez ou cliquez pour uploader
              </p>
              <p className="text-sm text-navy-500">PNG, JPG, SVG (max 5MB)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".png,.jpg,.jpeg,.svg"
              onChange={handleUpload}
            />
          </label>
        </div>

        {/* Current Images */}
        <div className="bg-white rounded-xl p-6 border border-navy-100 shadow-sm">
          <h2 className="text-lg font-bold text-navy-900 mb-6">
            Images actuelles
          </h2>

          <div className="space-y-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-navy-50 rounded-lg border border-navy-100 group"
              >
                <div className="flex-1">
                  <p className="font-medium text-navy-900">{img.name}</p>
                  <p className="text-xs text-navy-500">
                    {img.category} • {img.size}
                  </p>
                </div>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
