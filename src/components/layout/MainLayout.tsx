import { Outlet } from "react-router-dom";
import Banner from "../Banner";
import CustomerBlogs from "../CustomerReview";
import FeaturedProducts from "../FeaturedProducts";
import Footer from "../Footer";
import Navbar from "../Navbar";

const MainLayout = () => {
  return (
    <div className="font-primaryFront bg-gray-100">
      <Navbar />
      <Outlet />
      <div className="mt-14">
        <Banner />
      </div>
      <FeaturedProducts />
      <CustomerBlogs />
      <Footer />
    </div>
  );
};

export default MainLayout;
