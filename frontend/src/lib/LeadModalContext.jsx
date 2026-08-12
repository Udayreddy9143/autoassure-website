import { createContext, useCallback, useContext, useMemo, useState } from "react";

const LeadModalContext = createContext(null);

const COPY = {
  BOOK_CALL: {
    title: "Book a free automation audit call",
    subtitle: "30 minutes. We look at where your process or app is bleeding time, you leave with a plan — no pitch deck.",
    submitLabel: "Book my call",
    showMessage: true,
    messageLabel: "What are you hoping to automate or fix?",
  },
  QUOTE_REQUEST: {
    title: "Request a quote",
    subtitle: "Tell us a bit about your project and team size — we'll follow up with a scoped estimate.",
    submitLabel: "Send request",
    showMessage: true,
    messageLabel: "Briefly describe your project",
  },
  CHECKLIST_DOWNLOAD: {
    title: "Get the Automation Readiness Checklist",
    subtitle: "10 questions that show you exactly where manual work is putting your releases at risk.",
    submitLabel: "Send me the checklist",
    showMessage: false,
  },
};

export function LeadModalProvider({ children }) {
  const [leadType, setLeadType] = useState(null);

  const openModal = useCallback((type) => setLeadType(type), []);
  const closeModal = useCallback(() => setLeadType(null), []);

  const value = useMemo(
    () => ({ leadType, copy: leadType ? COPY[leadType] : null, openModal, closeModal }),
    [leadType, openModal, closeModal]
  );

  return <LeadModalContext.Provider value={value}>{children}</LeadModalContext.Provider>;
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("useLeadModal must be used inside a LeadModalProvider");
  }
  return ctx;
}
