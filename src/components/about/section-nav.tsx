"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

export default function AboutSectionNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="glass-light mx-auto w-full overflow-x-auto rounded-full px-2 py-1 shadow-sm lg:w-fit">
      <ul className="flex w-max gap-1 py-1 lg:w-fit">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`block whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                active === s.id ? "bg-amber-600 text-navy-950" : "text-navy-600 hover:text-navy-900"
              }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
