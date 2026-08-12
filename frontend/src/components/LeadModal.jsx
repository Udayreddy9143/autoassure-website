import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLeadModal } from "../lib/LeadModalContext";
import { submitLead } from "../lib/api";
import Button from "./Button";
import "./LeadModal.css";

const INITIAL_FORM = { name: "", email: "", company: "", message: "" };

export default function LeadModal() {
  const { leadType, copy, closeModal } = useLeadModal();
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");

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
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
