"use client";

import { useEffect } from "react";

export default function ColorLoader() {
  useEffect(() => {
    const applyColors = (data: any) => {
      // Save to localStorage for persistence
      localStorage.setItem("siteColors", JSON.stringify(data));

      // Update CSS variables that buttons use
      const root = document.documentElement;
      root.style.setProperty("--amber-400", data.accent);
      root.style.setProperty("--amber-500", data.accent);
      root.style.setProperty("--amber-600", data.accent);
      root.style.setProperty("--amber-400-light", data.accent + "22");
      root.style.setProperty("--color-primary", data.primary);
      root.style.setProperty("--color-accent", data.accent);
      root.style.setProperty("--color-secondary", data.secondary);

      // Create a style element with CSS overrides for all other amber classes
      const style = document.createElement("style");
      style.textContent = `
        :root {
          --amber-400: ${data.accent} !important;
          --amber-500: ${data.accent} !important;
          --amber-600: ${data.accent} !important;
          --color-primary: ${data.primary} !important;
          --color-accent: ${data.accent} !important;
          --color-secondary: ${data.secondary} !important;
        }

        .bg-amber-500, .text-amber-500, .text-amber-600, .border-amber-500 {
          --tw-text-opacity: 1 !important;
          color: ${data.accent} !important;
        }

        .bg-amber-50 {
          background-color: ${data.accent}22 !important;
        }

        .animate-pulse-ring {
          animation: pulse-ring-new 2s infinite !important;
        }

        @keyframes pulse-ring-new {
          0% { box-shadow: 0 0 0 0 ${data.accent}80; }
          70% { box-shadow: 0 0 0 12px ${data.accent}00; }
          100% { box-shadow: 0 0 0 0 ${data.accent}00; }
        }
      `;
      document.head.appendChild(style);
    };

    // Try localStorage first (fastest, persists through reloads)
    try {
      const cached = localStorage.getItem("siteColors");
      if (cached) {
        applyColors(JSON.parse(cached));
      }
    } catch (err) {
      console.log("localStorage not available");
    }

    // Fetch latest from API to sync
    fetch("/api/admin/colors")
      .then((res) => res.json())
      .then((data) => applyColors(data))
      .catch((err) => console.log("Colors fetch failed (using defaults)", err));
  }, []);

  return null;
}
