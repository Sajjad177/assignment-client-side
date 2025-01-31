import bannerimg from "../../src/assets/images/banner-1.jpg";
import { Button } from "./ui/button";

const Banner = () => {
  return (
    <div className="relative w-full h-[65vh] md:h-[80vh] flex items-center justify-center text-center bg-cover bg-center">
      {/* Background Image */}
      <img
        src={bannerimg}
        alt="Banner Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 text-white">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-primaryFront">
          Memorable Gifts for Loved Ones
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-xl text-gray-300">
          Designed for every occasion, our notecards—available in landscape and
          portrait—are ideal for heartfelt messages, big announcements, and
          charming invitations.
        </p>
        <Button
        //   variant="outline"
          className="px-4 py-6 bg-teal-600 hover:bg-teal-700 text-white text-xl mt-6"
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default Banner;
