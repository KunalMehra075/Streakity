import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function WebsiteLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
