import { useEffect, useState } from "react";
import { submitLead } from "../lib/api";
import Button from "../components/Button";
import "./Contact.css";

const REASONS = [
  { value: "BOOK_CALL", label: "Book a free audit call" },
  { value: "QUOTE_REQUEST", label: "Request a quote" },
  { value: "OTHER", label: "General question" },
];

const INITIAL_FORM = { name: "", email: "", company: "", message: "" };
const SLOW_NOTICE_DELAY_MS = 6000;

export default function Contact() {
  const [reason, setReason] = useState("BOOK_CALL");
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

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    try {
      await submitLead({
        leadType: reason === "OTHER" ? "BOOK_CALL" : reason,
        ...form,
        message: reason === "OTHER" ? `[General question] ${form.message}` : form.message,
      });
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Tell us what's breaking, or what's taking too long by hand.</h1>
          <p className="page-hero-sub">
            We reply within one business day. No sales queue, no auto-responder chain.
          </p>
        </div>
      </section>

      <section>
        <div className="container contact-layout">
          <div className="card contact-form-card">
            {status === "success" ? (
              <div className="result">
                <span className="eyebrow">Sent</span>
                <h3 style={{ marginTop: 10 }}>Got it — thanks.</h3>
                <p style={{ marginTop: 8 }}>We'll be in touch within one business day.</p>
                <Button variant="secondary" onClick={() => setStatus("idle")}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="lead-form">
                <div className="reason-tabs">
                  {REASONS.map((r) => (
                    <button
                      type="button"
                      key={r.value}
                      className={reason === r.value ? "reason-tab active" : "reason-tab"}
                      onClick={() => setReason(r.value)}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>

                <label>
                  Name
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
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
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </label>
                <label>
                  Message
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </label>

                {status === "error" && (
                  <p style={{ color: "var(--terracotta)" }}>Something went wrong — please try again.</p>
                )}

                <Button type="submit" variant="primary">
                  {status === "submitting" ? "Sending..." : "Send message"}
                </Button>
                {slowNotice && (
                  <p style={{ fontSize: 13 }}>
                    Still working — our server is waking up from idle, this can take up to a
                    minute. Hang tight.
                  </p>
                )}
              </form>
            )}
          </div>

          <div className="contact-side">
            <img
              src="/images/bright-desk-workspace.jpg"
              alt="Bright desk workspace where the AutoAssure team works"
              className="contact-photo"
            />
            <div className="card">
              <span className="eyebrow">Email</span>
              <p style={{ marginTop: 6 }}>
                <a href="mailto:udayr9154@gmail.com" style={{ color: "var(--ink)" }}>
                  udayr9154@gmail.com
                </a>
              </p>
            </div>
            <div className="card">
              <span className="eyebrow">WhatsApp</span>
              <p style={{ marginTop: 6 }}>
                <a
                  href="https://wa.me/919154175672"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--ink)" }}
                >
                  +91 91541 75672
                </a>
              </p>
            </div>
            <div className="card">
              <span className="eyebrow">Response time</span>
              <p style={{ color: "var(--ink)", marginTop: 6 }}>Within 1 business day</p>
            </div>
            <div className="card">
              <span className="eyebrow">Where we work</span>
              <p style={{ color: "var(--ink)", marginTop: 6 }}>Remote-first, any timezone</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
