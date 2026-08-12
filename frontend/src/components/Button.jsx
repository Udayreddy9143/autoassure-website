import { Link } from "react-router-dom";
import "./Button.css";

export default function Button({ children, variant = "primary", as, to, onClick, type = "button", disabled = false }) {
  const className = `btn btn-${variant}`;

  if (as === "link" && to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
