import { ImageIcon } from "lucide-react";
import { getImage } from "@/lib/images";

export default async function ImageSlot({
  section,
  name,
  fallback,
  alt,
  className = "",
}: {
  section: string;
  name: string;
  fallback?: string;
  alt: string;
  className?: string;
}) {
  const src = (await getImage(section, name)) ?? (fallback ? await getImage(section, fallback) : null);

  if (src) {
    return (
      <div className={`overflow-hidden rounded-3xl ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-navy-200 bg-navy-50 text-navy-400 ${className}`}
    >
      <ImageIcon className="h-8 w-8" />
      <span className="text-xs">Image à venir</span>
    </div>
  );
}
