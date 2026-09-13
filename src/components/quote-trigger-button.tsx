"use client";

import { useQuoteModal } from "@/hooks/use-quote-modal";

export default function QuoteTriggerButton({
  service,
  className,
  children,
}: {
  service?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { openQuoteModal } = useQuoteModal();
  return (
    <button type="button" onClick={() => openQuoteModal(service)} className={className}>
      {children}
    </button>
  );
}
