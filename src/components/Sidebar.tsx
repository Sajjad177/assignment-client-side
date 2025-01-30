import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Menu, X, User, ShoppingBag, Box } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const userRole = {
  admin: "admin",
  user: "user",
};

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [];

  switch (user!.role) {
    case userRole.admin:
      menuItems.push(
        {
          icon: <User className="w-4 h-4" />,
          name: "Profile",
          href: "profile",
        },
        { icon: <Users className="w-4 h-4" />, name: "Users", href: "users" },
        {
          icon: <Box className="w-4 h-4" />,
          name: "Products",
          href: "products",
        },
        {
          icon: <ShoppingBag className="w-4 h-4" />,
          name: "Orders",
          href: "orders",
        }
      );
      break;
    case userRole.user:
      menuItems.push(
        // { icon: <Users className="w-4 h-4" />, name: "Users", href: "#" },
        { icon: <Box className="w-4 h-4" />, name: "Products", href: "#" },
        { icon: <ShoppingBag className="w-4 h-4" />, name: "Orders", href: "#" }
      );
      break;
    default:
      break;
  }

  return (
    <div className="relative flex min-h-screen">
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        className="lg:hidden fixed top-16 left-2 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] bg-white border-r border-gray-200
          transition-transform duration-300 ease-in-out
          w-[240px] lg:w-[280px] z-40 lg:relative lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <ScrollArea className="flex-1">
            <nav className="space-y-1 p-4">
              {menuItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.href}
                  className="flex items-center gap-3 px-3 py-3 rounded-md text-sm
                    hover:bg-gray-100 hover:text-gray-900
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto mt-[64px] p-6">
        <div className="container mx-auto">
          {/* Outlet add there */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
