import { useLeadModal } from "../lib/LeadModalContext";
import Button from "../components/Button";
import "./Services.css";

const SERVICES = [
  {
    title: "Test Automation",
    tagline: "Stop re-testing the same flow by hand every release.",
    body: "We build UI, API, and end-to-end test suites on the tools that fit your stack — Selenium, Playwright, Cypress, pytest, RestAssured. Suites are built around the flows your real users take, not generic smoke tests.",
    image: "/images/code-through-glasses.jpg",
    imageAlt: "Close-up of automated test code running on screen",
    bullets: [
      "End-to-end coverage of critical user journeys",
      "API contract and regression testing",
      "Cross-browser and cross-environment runs",
      "Test suites your team can read and extend",
    ],
  },
  {
    title: "Data Validation Systems",
    tagline: "Catch bad data before it reaches a customer or a dashboard.",
    body: "Migrations, integrations, and ETL jobs move data between systems constantly. We build automated validation layers that compare, reconcile, and flag mismatches the moment they happen — not weeks later in a support ticket.",
    image: "/images/dashboard-review.jpg",
    imageAlt: "Engineers reviewing a data dashboard at their desks",
    bullets: [
      "Cross-environment and pre/post-migration data checks",
      "Schema and business-rule validation",
      "Automated reconciliation reports",
      "Alerts wired into Slack, email, or your pipeline",
    ],
  },
  {
    title: "CI/CD Test Gating",
    tagline: "Make it impossible to ship a build nobody actually tested.",
    body: "A test suite that nobody runs is just documentation. We wire your automated tests into the pipeline itself, so a red build blocks the merge automatically instead of relying on someone remembering to check.",
    image: "/images/code-closeup.jpg",
    imageAlt: "Close-up of colorful code in an editor",
    bullets: [
      "Test gates in GitHub Actions, Jenkins, GitLab CI, Azure DevOps",
      "Fast, parallelized test runs to keep pipelines quick",
      "Clear failure reporting back to the PR",
      "Staged rollout — gate warns first, then blocks",
    ],
  },
  {
    title: "Process & RPA",
    tagline: "Free your team from repetitive, rule-based busywork.",
    body: "Manual report generation, data entry between systems, recurring reconciliation tasks — if it's repetitive and rule-based, it's a candidate for automation, not a permanent line item on someone's calendar.",
    image: "/images/bright-desk-workspace.jpg",
    imageAlt: "Bright desk workspace with a laptop running automation scripts",
    bullets: [
      "Scripted, scheduled back-office workflows",
      "Integration between tools that don't talk to each other",
      "Error handling and logging so failures get noticed",
      "Documentation so it's not a black box after handoff",
    ],
  },
];

export default function Services() {
  const { openModal } = useLeadModal();

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1>Automation built around your app, not a template.</h1>
          <p className="page-hero-sub">
            Every engagement starts with a free audit call so we scope real problems — not a
            generic package.
          </p>
        </div>
      </section>

      <section>
        <div className="container services-list">
          {SERVICES.map((s, i) => (
            <div key={s.title} className={`service-row ${i % 2 === 1 ? "reverse" : ""}`}>
              <div className="service-copy">
                <h2>{s.title}</h2>
                <p className="service-tagline gradient-text">{s.tagline}</p>
                <p style={{ marginTop: 14 }}>{s.body}</p>
              </div>
              <div className="card service-bullets">
                <img src={s.image} alt={s.imageAlt} className="service-photo" />
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="photo-section" style={{ backgroundImage: "url(/images/team-collab-overhead.jpg)" }}>
        <div className="container cta-banner">
          <div>
            <h2>Not sure which service fits?</h2>
            <p style={{ marginTop: 10 }}>That's exactly what the audit call is for.</p>
          </div>
          <Button variant="primary" onClick={() => openModal("BOOK_CALL")}>
            Book a free audit call
          </Button>
        </div>
      </section>
    </div>
  );
}
