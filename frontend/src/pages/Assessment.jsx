import { useState } from "react";
import { useLeadModal } from "../lib/LeadModalContext";
import Button from "../components/Button";
import "./Assessment.css";

const QUESTIONS = [
  "Can you name every manual, repetitive step your team does before a release ships?",
  "If your app broke in production right now, could you say within 10 minutes which layer broke?",
  "Does anyone other than the developer who wrote a feature independently validate it before it ships?",
  "Do you have automated tests covering your critical end-to-end user flows, not just isolated units?",
  "Can your regression suite run unattended and finish in under an hour?",
  "When data moves between environments or systems, is it validated automatically?",
  "Do failed tests block a release automatically, without anyone needing to remember to check?",
  "If a customer reports a data error, can you prove whether it was already covered by a test?",
  "Has your QA workload grown slower than your release frequency?",
  "Could a new hire understand your test coverage within a day, from the suite itself?",
];

function resultFor(score) {
  if (score >= 8) {
    return {
      label: "Strong foundation",
      body: "You likely need targeted automation in specific gaps, not a rebuild. Worth a call to find the highest-leverage ones.",
    };
  }
  if (score >= 4) {
    return {
      label: "Growing risk",
      body: "Manual work is absorbing real hours every release, and something will eventually slip through the gaps.",
    };
  }
  return {
    label: "High exposure",
    body: "Bugs are probably reaching production because there's no systematic net catching them first.",
  };
}

export default function Assessment() {
  const { openModal } = useLeadModal();
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const score = answers.filter((a) => a === true).length;
  const result = resultFor(score);

  function setAnswer(i, value) {
    const next = [...answers];
    next[i] = value;
    setAnswers(next);
  }

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Free Assessment</span>
          <h1>The Automation Readiness Assessment</h1>
          <p className="page-hero-sub">
            10 yes/no questions. Two minutes. See exactly where manual work is putting your
            releases at risk.
          </p>
        </div>
      </section>

      <section>
        <div className="container assessment-layout">
          <div className="card assessment-card">
            {!submitted ? (
              <>
                <div className="questions">
                  {QUESTIONS.map((q, i) => (
                    <div className="question-row" key={q}>
                      <p className="question-text">{q}</p>
                      <div className="question-toggle">
                        <button
                          className={answers[i] === true ? "toggle-btn active-yes" : "toggle-btn"}
                          onClick={() => setAnswer(i, true)}
                        >
                          Yes
                        </button>
                        <button
                          className={answers[i] === false ? "toggle-btn active-no" : "toggle-btn"}
                          onClick={() => setAnswer(i, false)}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="primary" onClick={() => setSubmitted(true)} disabled={!allAnswered}>
                  See my score
                </Button>
                {!allAnswered && (
                  <p style={{ marginTop: 10, fontSize: 13 }}>
                    Answer all {QUESTIONS.length} questions to see your result.
                  </p>
                )}
              </>
            ) : (
              <div className="result">
                <span className="eyebrow">Your score</span>
                <div className="result-score gradient-text">{score}/10</div>
                <h3>{result.label}</h3>
                <p style={{ marginTop: 8, maxWidth: 480 }}>{result.body}</p>
                <div className="result-actions">
                  <Button variant="primary" onClick={() => openModal("CHECKLIST_DOWNLOAD")}>
                    Get the full checklist
                  </Button>
                  <Button variant="secondary" onClick={() => openModal("BOOK_CALL")}>
                    Talk through my score
                  </Button>
                </div>
                <button className="retake" onClick={() => { setSubmitted(false); setAnswers(Array(QUESTIONS.length).fill(null)); }}>
                  Retake assessment
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
