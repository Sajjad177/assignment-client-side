import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Banner from "../Banner";
import Footer from "../Footer";
import Featured from "../Featured";
import CustomerReview from "../CustomerReview";

const MainLayout = () => {
  return (
    <div className="font-primary">
      <Navbar />
      <Outlet />
      <div className="mt-14">
        <Banner />
      </div>
      <CustomerReview />
      <Featured />
      <Footer />
    </div>
  );
};

export default MainLayout;
