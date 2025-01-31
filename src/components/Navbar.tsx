import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";

// Define the type for navigation items
type NavItem = {
  name: string;
  href: string;
};

// Navigation items
const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/all-products" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b w-full fixed top-0 z-50 font-primaryFront">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-teal-600">
              Note & Nest
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-800 hover:text-gray-600 px-3 py-2"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex space-x-4">
            {currentUser ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" className="px-4">
                    {" "}
                    Dashboard{" "}
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="px-4"
                >
                  <LogOut className="ml-1 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="px-4">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" className="px-4">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={toggleMenu}>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-2/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-4 py-6">
          <div className="flex justify-end">
            <Button variant="ghost" onClick={toggleMenu}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="mt-4 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-gray-800 hover:text-gray-600 px-3 py-2"
                onClick={toggleMenu} // Close menu on click
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-6 space-y-4">
              {currentUser ? (
                <>
                  <>
                    <Link to="/dashboard">
                      <Button variant="outline" className="px-4">
                        {" "}
                        Dashboard{" "}
                      </Button>
                    </Link>
                    <Button
                      onClick={handleLogout}
                      // variant="outline"
                      className="px-4"
                    >
                      <LogOut className="ml-1 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="default" className="w-full">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
