import { Button } from "@/components/ui/button";
import firstImage from "../../src/assets/images/banner-2.jpg";
import secondImage from "../../src/assets/images/banner-3.jpg";
import thirdImage from "../../src/assets/images/banner-4.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";

const OurStory = () => {
  return (
    <div>
      <Navbar />
      <section className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8 font-primaryFront mt-10">
        {/* Left Section - Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h3 className="text-lg text-teal-600 font-semibold">Our Story!!</h3>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Welcome To Store.
          </h2>
          <p className="text-gray-600 mt-4">
            Our Note & Nest store of stationery and creative essentials! We are
            ready to impress you with an enormous selection of the finest
            notebooks, pens, art supplies, office essentials, and personalized
            stationery to stir up your creativity and provide the best
            organization.
          </p>
          <Button className="mt-6 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3">
            Read More
          </Button>
        </div>

        {/* Right Section - Images */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <img
            src={firstImage}
            alt="Brush Marker"
            className="rounded-lg w-full h-full object-cover"
          />
          <div className="grid gap-4">
            <img
              src={secondImage}
              alt="Ink Bottles"
              className="rounded-lg w-full h-auto"
            />
            <img
              src={thirdImage}
              alt="Notebook"
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>
      </section>
      <div className="lg:mt-[200px] md:mt-[130px] sm:mt-[100px]">
        <Footer />
      </div>
    </div>
  );
};

export default OurStory;
