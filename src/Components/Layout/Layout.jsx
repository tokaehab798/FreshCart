import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ScrollToTop from "../ScrollerToUp/ScrollToUp";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col pt-20">
        <Outlet />
      </div>
      <ScrollToTop/>
      <Footer />
    </>
  );
}
