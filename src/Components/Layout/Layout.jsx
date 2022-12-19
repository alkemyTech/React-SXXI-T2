import { Footer } from "./Footer";
import { Header } from "./Header";
import { BackOfficeNavbar } from "../BackOffice";
import { useSelector } from "react-redux";

export function Layout({ children }) {
  const { inBackOffice } = useSelector((state) => state.header);

  return inBackOffice ? (
    <div className="layout">
      <BackOfficeNavbar />
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
