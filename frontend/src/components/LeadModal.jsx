import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLeadModal } from "../lib/LeadModalContext";
import { submitLead } from "../lib/api";
import Button from "./Button";
import "./LeadModal.css";

const INITIAL_FORM = { name: "", email: "", company: "", message: "" };
const SLOW_NOTICE_DELAY_MS = 6000;

const WHATSAPP_PREFILL = {
  BOOK_CALL: "Hi! I'd like to book a free automation audit call.",
  QUOTE_REQUEST: "Hi! I'd like to request a quote for an automation project.",
  CHECKLIST_DOWNLOAD: "Hi! Could you send me the Automation Readiness Checklist?",
};

function whatsappLink(leadType) {
  const text = encodeURIComponent(WHATSAPP_PREFILL[leadType] ?? "Hi! I'd like to get in touch.");
  return `https://wa.me/919154175672?text=${text}`;
}

export default function LeadModal() {
  const { leadType, copy, closeModal } = useLeadModal();
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [slowNotice, setSlowNotice] = useState(false);

  useEffect(() => {
    if (status !== "submitting") {
      setSlowNotice(false);
      return;
    }
    const timer = setTimeout(() => setSlowNotice(true), SLOW_NOTICE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [status]);

  function handleClose() {
    setForm(INITIAL_FORM);
    setStatus("idle");
    closeModal();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    try {
      await submitLead({ leadType, ...form });
      setStatus("success");
      if (leadType === "CHECKLIST_DOWNLOAD") {
        const link = document.createElement("a");
        link.href = "/automation-readiness-checklist.md";
        link.download = "AutoAssure-Automation-Readiness-Checklist.md";
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {leadType && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="modal-panel card"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={handleClose} aria-label="Close">
              &times;
            </button>

            {status === "success" ? (
              <div className="modal-success">
                <div className="eyebrow">Done</div>
                <h3>You're in.</h3>
                <p>
                  {leadType === "CHECKLIST_DOWNLOAD"
                    ? "Your checklist download should start automatically."
                    : "We'll be in touch within one business day."}
                </p>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </div>
            ) : (
              <>
                <h3>{copy.title}</h3>
                <p style={{ marginTop: 8, marginBottom: 24 }}>{copy.subtitle}</p>

                <form onSubmit={handleSubmit} className="lead-form">
                  <label>
                    Name
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </label>
                  <label>
                    Work email
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </label>
                  <label>
                    Company
                    <input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </label>
                  {copy.showMessage && (
                    <label>
                      {copy.messageLabel}
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </label>
                  )}

                  {status === "error" && (
                    <p style={{ color: "var(--terracotta)" }}>
                      Something went wrong — please try again.
                    </p>
                  )}

                  <Button type="submit" variant="primary">
                    {status === "submitting" ? "Sending..." : copy.submitLabel}
                  </Button>
                  {slowNotice && (
                    <p style={{ fontSize: 13 }}>
                      Still working — our server is waking up from idle, this can take up to a
                      minute. Hang tight.
                    </p>
                  )}
                </form>

                <p className="modal-whatsapp-alt">
                  Prefer WhatsApp?{" "}
                  <a href={whatsappLink(leadType)} target="_blank" rel="noreferrer">
                    Message us directly
                  </a>
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
