"use client";

import { useContext } from "react";
import { QuoteModalContext } from "@/context/quote-modal-context";

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return context;
}
