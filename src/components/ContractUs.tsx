import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import Navbar from "./Navbar";
import image1 from "../assets/images/banner-4.jpg";
import Footer from "./Footer";

const ContactUs = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 md:p-12 mt-10 flex flex-col lg:flex-row items-center gap-10 font-primaryFront">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Contact us
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Get in touch with us for any enquiries and questions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* General Inquiries */}
            <Card className="bg-white dark:bg-gray-800 rounded-lg ">
              <CardContent className="p-6 space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  General Inquiries
                </h4>
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Mail size={16} /> noteandnest@gmail.com
                </p>
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Phone size={16} /> +7 911 296 92 17
                </p>
              </CardContent>
            </Card>

            {/* Collaborations */}
            <Card className="bg-white dark:bg-gray-800 rounded-lg ">
              <CardContent className="p-6 space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Collaborations
                </h4>
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Mail size={16} /> noteandnest@gmail.com
                </p>
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Phone size={16} /> +7 931 212 16 07
                </p>
              </CardContent>
            </Card>

            {/* Careers */}
            <Card className="bg-white dark:bg-gray-800 rounded-lg ">
              <CardContent className="p-6 space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Careers
                </h4>
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Mail size={16} /> hr@horizonstudio.work
                </p>
              </CardContent>
            </Card>

            {/* Address */}
            <Card className="bg-white dark:bg-gray-800 rounded-lg ">
              <CardContent className="p-6 space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Address
                </h4>
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MapPin size={16} /> Bogura, Jholesoritola
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={image1}
            alt="Contact us"
            className="rounded-lg  w-full h-auto max-h-[450px] object-cover"
          />
        </div>
      </div>
      <div className="lg:mt-[250px] md:mt-[200px] sm:mt-[150px]">
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
