import type { LucideIcon } from "lucide-react";
import Reveal from "./reveal";

export default function FeatureRow({
  items,
}: {
  items: { icon: LucideIcon; title: string; description: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.06} className="card-shadow rounded-3xl bg-navy-50 p-6">
          <item.icon className="h-8 w-8 text-amber-600" />
          <p className="mt-3 font-heading text-base text-navy-900">{item.title}</p>
          <p className="mt-1 text-sm text-navy-600">{item.description}</p>
        </Reveal>
      ))}
    </div>
  );
}
