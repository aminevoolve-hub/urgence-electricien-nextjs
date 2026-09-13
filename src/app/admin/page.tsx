"use client";

import Link from "next/link";
import { ArrowRight, FileText, Settings, Palette, Image as ImageIcon, Video as VideoIcon } from "lucide-react";

export default function AdminDashboard() {
  const quickActions = [
    {
      title: "Modifier la marque",
      description: "Logo, favicon, couleurs",
      href: "/admin/branding",
      icon: "🎨",
    },
    {
      title: "Éditer le contenu",
      description: "Textes, titres, descriptions",
      href: "/admin/contenu",
      icon: "✏️",
    },
    {
      title: "Gérer les images",
      description: "Logo, services, galerie",
      href: "/admin/images",
      icon: "🖼️",
    },
    {
      title: "Vidéos et média",
      description: "Vidéo héros, bande sonore",
      href: "/admin/videos",
      icon: "🎬",
    },
    {
      title: "Couleurs du site",
      description: "Palette, accent, tons",
      href: "/admin/couleurs",
      icon: "🌈",
    },
    {
      title: "SEO & Meta",
      description: "Titres, descriptions, mots-clés",
      href: "/admin/seo",
      icon: "🔍",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-navy-100">
      {/* Header */}
      <div className="bg-navy-900 text-white px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Tableau de bord</h1>
          <p className="text-navy-200">
            Gérez votre site Urgence Électricien sans code
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-navy-900 mb-6">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg border border-navy-100 hover:border-amber-300 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{action.icon}</span>
                  <ArrowRight className="h-5 w-5 text-amber-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-semibold text-navy-900 group-hover:text-amber-600 transition-colors mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-navy-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white rounded-xl p-6 border border-blue-200 bg-blue-50">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Conseil</h3>
            <p className="text-sm text-blue-800">
              Les modifications sont sauvegardées automatiquement. Visitez
              <Link
                href="/"
                className="font-semibold text-blue-900 hover:underline"
              >
                {" "}
                votre site{" "}
              </Link>
              pour voir les changements en direct.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-green-200 bg-green-50">
            <h3 className="font-semibold text-green-900 mb-2">✓ Support</h3>
            <p className="text-sm text-green-800">
              Questions? Consultez la documentation ou contactez le support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
