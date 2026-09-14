"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Palette, Type, Image, Video, Zap, Eye, LogOut, Newspaper } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/branding", label: "Marque", icon: Palette },
  { href: "/admin/contenu", label: "Contenu", icon: Type },
  { href: "/admin/blog", label: "Blogue", icon: Newspaper },
  { href: "/admin/images", label: "Images", icon: Image },
  { href: "/admin/videos", label: "Vidéos", icon: Video },
  { href: "/admin/couleurs", label: "Couleurs", icon: Zap },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  const isActive = (href: string) =>
    pathname === href || (href !== "/admin" && pathname.startsWith(href));

  return (
    <div className="flex h-screen bg-navy-50">
      {/* Sidebar */}
      <div className="w-64 bg-navy-900 text-white flex flex-col">
        <div className="p-6 border-b border-navy-800">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-amber-400">⚡</span>
            <span>URGENCE</span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? "bg-amber-500 text-navy-900 font-semibold"
                    : "text-navy-200 hover:bg-navy-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-navy-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-navy-200 hover:bg-navy-800 transition-colors"
          >
            <Eye className="h-5 w-5" />
            <span className="text-sm">Voir le site</span>
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-navy-200 hover:bg-navy-800 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm">Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
