"use client";

import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";

type QuoteModalContextValue = {
  isOpen: boolean;
  openQuoteModal: (service?: string) => void;
  closeQuoteModal: () => void;
  presetService?: string;
};

export const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetService, setPresetService] = useState<string | undefined>(undefined);

  const openQuoteModal = useCallback((service?: string) => {
    setPresetService(service);
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openQuoteModal, closeQuoteModal, presetService }),
    [isOpen, openQuoteModal, closeQuoteModal, presetService]
  );

  return <QuoteModalContext.Provider value={value}>{children}</QuoteModalContext.Provider>;
}
