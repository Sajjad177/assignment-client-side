import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa"; // Import icons

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6 font-primaryFront">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Navigation Links */}
        <nav className="flex gap-6 text-gray-600 text-sm uppercase">
          <a href="#" className="hover:text-gray-900">
            Products
          </a>
          <a href="#" className="hover:text-gray-900">
            Blog
          </a>
          <a href="#" className="hover:text-gray-900">
            Shop
          </a>
          <a href="#" className="hover:text-gray-900">
            Contacts
          </a>
        </nav>

        {/* Social Media Icons */}
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <FaLinkedinIn size={20} />
          </a>
        </div>

        {/* Contact Details */}
        <div className="mt-4 md:mt-0 text-center md:text-left">
          <p className="text-gray-500 text-sm">Phone: (123) 456-7890</p>
          <p className="text-gray-500 text-sm">Email: noteandnest@gmail.com</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Dreamy Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
