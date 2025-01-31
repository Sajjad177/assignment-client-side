import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Banner from "../Banner";
import OurStory from "../ReleventFeatures";
import Footer from "../Footer";
import Featured from "../Featured";

const MainLayout = () => {
  return (
    <div className="font-primaryFront">
      <Navbar />
      <Outlet />
      <div className="mt-14">
        <Banner />
      </div>
      <OurStory/>
      <Featured />
      <Footer />
    </div>
  );
};

export default MainLayout;
