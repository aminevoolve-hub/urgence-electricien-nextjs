"use client";

import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import QuoteTriggerButton from "./quote-trigger-button";

export default function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-navy-100 bg-white lg:hidden">
      <a href={`tel:${site.phone}`} className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold text-navy-900">
        <Phone className="h-4 w-4" /> Appeler
      </a>
      <QuoteTriggerButton className="btn-gradient flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold text-white">
        Soumission gratuite
      </QuoteTriggerButton>
    </div>
  );
}
