import { NavLink } from "react-router-dom";
import { useLeadModal } from "../lib/LeadModalContext";
import Button from "./Button";
import "./Navbar.css";

const LINKS = [
  { to: "/services", label: "Services" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/pricing", label: "Pricing" },
  { to: "/assessment", label: "Free Assessment" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { openModal } = useLeadModal();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand">
          Auto<span className="gradient-text">Assure</span>
        </NavLink>

        <nav className="nav-links">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Button variant="primary" onClick={() => openModal("BOOK_CALL")}>
          Book a free call
        </Button>
      </div>
    </header>
  );
}
