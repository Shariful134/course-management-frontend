import { Outlet } from "react-router-dom";
import Navbar from "../navBar/NavBar";
import Footer from "../footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default MainLayout;
