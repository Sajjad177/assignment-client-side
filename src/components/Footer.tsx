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

        {/* Copyright Section */}
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Dreamy Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
