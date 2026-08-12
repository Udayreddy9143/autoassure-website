import { useLeadModal } from "../lib/LeadModalContext";
import Button from "../components/Button";
import "./CaseStudies.css";

const EXAMPLES = [
  {
    profile: "Seed-stage fintech, 6-person eng team",
    problem:
      "Every release meant 2 full days of manual regression on the payments flow. A rounding bug reached production and was caught by a customer, not the team.",
    approach:
      "Built a Playwright end-to-end suite covering the full payment and reconciliation flow, gated into their CI pipeline so a red run blocks merge.",
    outcome:
      "Manual regression replaced by an automated suite that runs on every PR — releases no longer wait on a human to click through the app.",
  },
  {
    profile: "Series A logistics platform, data migrating off a legacy DB",
    problem:
      "A multi-stage data migration had no automated way to confirm records matched after each stage — mismatches were being found by support tickets weeks later.",
    approach:
      "Built an automated reconciliation layer that diffed source and destination records after every migration stage and flagged mismatches immediately.",
    outcome:
      "Migration mismatches now surface within minutes of a stage completing, instead of being discovered downstream by customers.",
  },
  {
    profile: "Bootstrapped SaaS, single full-stack developer",
    problem:
      "The one developer wrote every feature and also decided when it was safe to ship — no second check existed anywhere in the process.",
    approach:
      "Introduced an independent automated test suite covering critical flows plus a CI gate, acting as the 'second reviewer' the team didn't have headcount for.",
    outcome:
      "Shipping decisions now rest on a suite that doesn't share the author's blind spots, without hiring a dedicated QA role.",
  },
];

export default function CaseStudies() {
  const { openModal } = useLeadModal();

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Case Studies</span>
          <h1>What these engagements typically look like.</h1>
          <p className="page-hero-sub">
            AutoAssure is a newer practice, so these are illustrative example engagements based on
            the problems most startups and small teams actually bring us — not verbatim client
            case studies yet. Real case studies will replace these as engagements complete.
          </p>
        </div>
      </section>

      <section>
        <div className="container case-list">
          {EXAMPLES.map((c) => (
            <div className="card case-card" key={c.profile}>
              <span className="eyebrow" style={{ color: "var(--terracotta)" }}>
                Illustrative example
              </span>
              <h3 style={{ marginTop: 10 }}>{c.profile}</h3>
              <div className="case-block">
                <span className="case-label">Problem</span>
                <p>{c.problem}</p>
              </div>
              <div className="case-block">
                <span className="case-label">Approach</span>
                <p>{c.approach}</p>
              </div>
              <div className="case-block">
                <span className="case-label">Outcome</span>
                <p>{c.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="photo-section" style={{ backgroundImage: "url(/images/dashboard-review.jpg)" }}>
        <div className="container cta-banner">
          <div>
            <h2>Want to be the next real case study?</h2>
            <p style={{ marginTop: 10 }}>
              Book an audit call and we'll scope your actual problem, not a hypothetical one.
            </p>
          </div>
          <Button variant="primary" onClick={() => openModal("BOOK_CALL")}>
            Book a free audit call
          </Button>
        </div>
      </section>
    </div>
  );
}
