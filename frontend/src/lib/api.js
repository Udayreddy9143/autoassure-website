const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

export async function submitLead({ leadType, name, email, company, message }) {
  const response = await fetch(`${API_BASE}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ leadType, name, email, company, message }),
  });

  if (!response.ok) {
    throw new Error("Submission failed");
  }
}
