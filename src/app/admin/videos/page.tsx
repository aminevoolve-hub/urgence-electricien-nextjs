"use client";

import { useState } from "react";
import { Upload, Trash2, Play } from "lucide-react";

export default function VideosPage() {
  const [uploaded, setUploaded] = useState(false);

  const videos = [
    { name: "hero-video.mp4", type: "Vidéo héros", duration: "8s", size: "45 MB" },
    {
      name: "service-demo.mp4",
      type: "Démonstration service",
      duration: "6s",
      size: "32 MB",
    },
  ];

  const handleUpload = () => {
    setUploaded(true);
    setTimeout(() => setUploaded(false), 3000);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-navy-900 mb-2">Vidéos</h1>
        <p className="text-navy-600 mb-8">
          Gérez les vidéos du site (héro, services, etc.)
        </p>

        {uploaded && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <p className="text-green-800 font-medium">
              ✓ Vidéo uploadée avec succès
            </p>
          </div>
        )}

        {/* Upload Area */}
        <div className="bg-white rounded-xl p-8 border border-navy-100 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-navy-900 mb-4">
            Uploader une vidéo
          </h2>

          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-navy-300 rounded-lg cursor-pointer bg-navy-50 hover:bg-navy-100 transition">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="h-10 w-10 text-navy-400 mb-2" />
              <p className="text-base font-medium text-navy-600">
                Glissez ou cliquez pour uploader
              </p>
              <p className="text-sm text-navy-500">MP4, WebM (max 100MB)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".mp4,.webm,.mov"
              onChange={handleUpload}
            />
          </label>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-amber-800">
              💡 <strong>Conseil:</strong> Compressez les vidéos pour un site plus rapide.
              Format MP4 recommandé, résolution 1920x1080 maximum.
            </p>
          </div>
        </div>

        {/* Current Videos */}
        <div className="bg-white rounded-xl p-6 border border-navy-100 shadow-sm">
          <h2 className="text-lg font-bold text-navy-900 mb-6">
            Vidéos actuelles
          </h2>

          <div className="space-y-3">
            {videos.map((video, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-navy-50 rounded-lg border border-navy-100 group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-12 bg-navy-900 rounded-lg flex items-center justify-center shrink-0">
                    <Play className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-navy-900">{video.name}</p>
                    <p className="text-xs text-navy-600">
                      {video.type} • {video.duration} • {video.size}
                    </p>
                  </div>
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
