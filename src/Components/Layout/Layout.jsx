import { Footer } from "./Footer";
import { Header } from "./Header";
import { BackOfficeNavbar } from "../BackOffice";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export function Layout({ children }) {
  const location = useLocation();
  const [inBackOffice, setInBackOffice] = useState(
    location.pathname.startsWith("/backoffice")
  );
  return inBackOffice ? (
    <div className="layout">
      <BackOfficeNavbar setInBackOffice={setInBackOffice} />
      {children}
    </div>
  ) : (
    <div className="layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
