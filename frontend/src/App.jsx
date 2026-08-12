import { Route, BrowserRouter, Routes } from "react-router-dom";
import { LeadModalProvider } from "./lib/LeadModalContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LeadModal from "./components/LeadModal";
import Home from "./pages/Home";
import Services from "./pages/Services";
import CaseStudies from "./pages/CaseStudies";
import Pricing from "./pages/Pricing";
import Assessment from "./pages/Assessment";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <LeadModalProvider>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <LeadModal />
      </LeadModalProvider>
    </BrowserRouter>
  );
}
