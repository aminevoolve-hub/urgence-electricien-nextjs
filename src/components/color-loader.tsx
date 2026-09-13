"use client";

import { useEffect } from "react";

export default function ColorLoader() {
  useEffect(() => {
    const applyColors = (data: any) => {
      // Save to localStorage for persistence
      localStorage.setItem("siteColors", JSON.stringify(data));

      // Create a style element with CSS overrides
      const style = document.createElement("style");
      style.textContent = `
        :root {
          --color-primary: ${data.primary};
          --color-accent: ${data.accent};
          --color-secondary: ${data.secondary};
        }

        .bg-amber-500, .btn-gradient {
          background-color: ${data.accent} !important;
        }

        .hover\\:bg-amber-600:hover {
          background-color: ${data.accent}dd !important;
        }

        .text-amber-500 {
          color: ${data.accent} !important;
        }

        .hover\\:text-amber-500:hover {
          color: ${data.accent} !important;
        }

        .bg-amber-50, .hover\\:bg-amber-50:hover {
          background-color: ${data.accent}22 !important;
        }

        .border-amber-500 {
          border-color: ${data.accent} !important;
        }

        .text-amber-600 {
          color: ${data.accent} !important;
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
