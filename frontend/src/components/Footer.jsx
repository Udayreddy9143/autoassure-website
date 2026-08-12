import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="brand">
            Auto<span className="gradient-text">Assure</span>
          </div>
          <p style={{ maxWidth: 320, marginTop: 10 }}>
            Test automation and data validation systems for startups and growing companies.
            Confidence, automated.
          </p>
        </div>

        <div className="footer-col">
          <span className="footer-heading">Site</span>
          <Link to="/services">Services</Link>
          <Link to="/case-studies">Case Studies</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/assessment">Free Assessment</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <span className="footer-heading">Get in touch</span>
          <a href="mailto:udayr9154@gmail.com">udayr9154@gmail.com</a>
          <a href="https://wa.me/919154175672" target="_blank" rel="noreferrer">
            WhatsApp: +91 91541 75672
          </a>
          <span>Remote-first · Working with teams worldwide</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} AutoAssure. All rights reserved.</span>
      </div>
    </footer>
  );
}
