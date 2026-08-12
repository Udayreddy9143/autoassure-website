import { motion } from "framer-motion";
import { useLeadModal } from "../lib/LeadModalContext";
import Button from "../components/Button";
import "./Home.css";

const PAIN_POINTS = [
  {
    title: "Still stuck doing it by hand",
    body: "Repetitive checks, regression passes, data spot-checks — hours go into work a script could run while you sleep.",
  },
  {
    title: "No idea where it broke",
    body: "Something fails in production and it takes half a day of guessing before anyone knows which layer actually caused it.",
  },
  {
    title: "Developers grading their own homework",
    body: "The person who wrote the feature is also the one deciding it's safe to ship. Blind spots slip through by design.",
  },
  {
    title: "No real test suite for the app flow",
    body: "Unit tests exist, maybe. The end-to-end path a real user takes has never been automated, so releases are a gamble.",
  },
  {
    title: "Regression eats days, every release",
    body: "The team re-tests the whole app manually before each release because nobody trusts the last time it was 'done.'",
  },
  {
    title: "Customers find the data bugs first",
    body: "Migrations and integrations move data between systems with no automated validation — so mismatches surface as support tickets.",
  },
];

const SERVICES = [
  {
    title: "Test Automation",
    body: "UI, API, and end-to-end suites built on Selenium, Playwright, or Cypress — covering the flows your users actually take.",
  },
  {
    title: "Data Validation Systems",
    body: "Automated checks across environments and migrations so bad data gets caught before it reaches a dashboard or a customer.",
  },
  {
    title: "CI/CD Test Gating",
    body: "Wire your suite into the pipeline so a broken build can't ship — no more manual sign-off as the only safety net.",
  },
  {
    title: "Process & RPA",
    body: "Repetitive back-office and ops workflows scripted and scheduled, freeing your team for work that needs a human.",
  },
];

const STEPS = [
  { step: "01", title: "Audit", body: "A free 30-minute call to map where manual work and untested paths are creating risk." },
  { step: "02", title: "Build", body: "We design and build the automation or validation suite around your actual flows — not a generic template." },
  { step: "03", title: "Guard", body: "The suite runs in your pipeline going forward, catching breaks before your users do." },
];

export default function Home() {
  const { openModal } = useLeadModal();

  return (
    <div>
      <section className="hero photo-section" style={{ backgroundImage: "url(/images/hero-team-workspace.jpg)" }}>
        <div className="container">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">Automation &amp; QA for growing teams</span>
            <h1 className="hero-title">
              Confidence, <span className="gradient-text">automated.</span>
            </h1>
            <p className="hero-subtitle">
              AutoAssure builds test automation and data validation systems so your team stops
              finding bugs the hard way — from a customer, in production, after it already shipped.
            </p>
            <div className="hero-actions">
              <Button variant="primary" onClick={() => openModal("BOOK_CALL")}>
                Book a free audit call
              </Button>
              <Button as="link" to="/services" variant="outline-light">
                See what we automate
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Sound familiar?</span>
            <h2>You're not slow. You're doing everything by hand.</h2>
          </div>
          <div className="grid-3">
            {PAIN_POINTS.map((p) => (
              <div className="card pain-card" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--cream-alt)" }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What we build</span>
            <h2>Automation that fits how your app actually works.</h2>
          </div>
          <div className="grid-2">
            {SERVICES.map((s) => (
              <div className="card" key={s.title}>
                <h3>{s.title}</h3>
                <p style={{ marginTop: 10 }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <Button as="link" to="/services" variant="secondary">
              Explore all services
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="container how-it-works-layout">
          <div>
            <div className="section-head" style={{ marginBottom: 32 }}>
              <span className="eyebrow">How it works</span>
              <h2>Three steps from "we hope it works" to "we know it works."</h2>
            </div>
            <div className="steps-list">
              {STEPS.map((s) => (
                <div key={s.step} className="step-card">
                  <span className="step-number gradient-text">{s.step}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <img
            className="how-it-works-photo"
            src="/images/team-collab-overhead.jpg"
            alt="Team working together on laptops during an automation audit"
          />
        </div>
      </section>

      <section className="photo-section" style={{ backgroundImage: "url(/images/code-through-glasses.jpg)" }}>
        <div className="container cta-banner">
          <div>
            <h2>Not sure where to start?</h2>
            <p style={{ marginTop: 10, maxWidth: 460 }}>
              Take the 2-minute Automation Readiness Assessment and see exactly where the risk is
              hiding in your release process.
            </p>
          </div>
          <Button as="link" to="/assessment" variant="primary">
            Take the free assessment
          </Button>
        </div>
      </section>
    </div>
  );
}
