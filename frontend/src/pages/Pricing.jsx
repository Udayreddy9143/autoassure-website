import { useLeadModal } from "../lib/LeadModalContext";
import Button from "../components/Button";
import "./Pricing.css";

const TIERS = [
  {
    name: "Audit",
    price: "Free",
    period: "",
    description: "A focused look at where manual work and untested paths are creating risk.",
    features: [
      "30-minute call with a working engineer, not a salesperson",
      "Walkthrough of your release process and current test coverage",
      "A short written list of the highest-leverage gaps",
      "No obligation to continue",
    ],
    cta: "Book the audit",
    action: "BOOK_CALL",
    highlight: false,
  },
  {
    name: "Automation Build",
    price: "Project-based",
    period: "scoped after audit",
    description: "A one-time engagement to design and build the test or validation suite you need.",
    features: [
      "End-to-end or data validation suite for your critical flows",
      "CI/CD integration so the suite actually gates releases",
      "Documentation so your team can extend it",
      "Fixed-scope quote — no open-ended hourly billing",
    ],
    cta: "Request a quote",
    action: "QUOTE_REQUEST",
    highlight: true,
  },
  {
    name: "Ongoing Guard",
    price: "Monthly retainer",
    period: "for teams shipping weekly+",
    description: "We maintain and extend the suite as your app changes, so coverage doesn't rot.",
    features: [
      "New test coverage added as features ship",
      "Flaky test triage and suite upkeep",
      "Monthly report on coverage and what it caught",
      "Direct line for urgent breakages",
    ],
    cta: "Request a quote",
    action: "QUOTE_REQUEST",
    highlight: false,
  },
];

export default function Pricing() {
  const { openModal } = useLeadModal();

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Pricing</span>
          <h1>Start free. Scope the rest after we know your problem.</h1>
          <p className="page-hero-sub">
            Every engagement starts with the free audit — pricing beyond that is scoped to your
            actual codebase and team size, not a one-size-fits-all package.
          </p>
        </div>
      </section>

      <section>
        <div className="container pricing-grid">
          {TIERS.map((t) => (
            <div key={t.name} className={`card pricing-card ${t.highlight ? "highlight" : ""}`}>
              {t.highlight && <span className="pricing-badge">Most common</span>}
              <h3>{t.name}</h3>
              <div className="pricing-price">
                <span className="gradient-text">{t.price}</span>
              </div>
              {t.period && <span className="pricing-period">{t.period}</span>}
              <p style={{ marginTop: 14 }}>{t.description}</p>
              <ul className="pricing-features">
                {t.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Button variant={t.highlight ? "primary" : "secondary"} onClick={() => openModal(t.action)}>
                {t.cta}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="card faq-note">
            <h3>Why isn't there a fixed price list?</h3>
            <p style={{ marginTop: 10 }}>
              Because "build a test suite" for a 3-person app and a 30-person app are different
              amounts of work, and pretending otherwise means either overcharging small teams or
              underscoping larger ones. The audit call exists specifically to give you a real
              number, fast.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
