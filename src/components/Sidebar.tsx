import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Settings, Users, Mail, FileText, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <Home className="w-4 h-4" />, label: "Dashboard", href: "#" },
    { icon: <Users className="w-4 h-4" />, label: "Users", href: "#" },
    { icon: <Mail className="w-4 h-4" />, label: "Messages", href: "#" },
    { icon: <FileText className="w-4 h-4" />, label: "Documents", href: "#" },
    { icon: <Settings className="w-4 h-4" />, label: "Settings", href: "#" },
  ];

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
          {/* Logo Area */}
          {/* <div className="p-6 border-b">
            <h2 className="text-xl font-semibold truncate">Your App Name</h2>
          </div> */}

          {/* Navigation */}
          <ScrollArea className="flex-1">
            <nav className="space-y-1 p-4">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-3 rounded-md text-sm
                    hover:bg-gray-100 hover:text-gray-900
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-auto mt-[64px] p-6">
        <div className="container mx-auto">
          {/* Header Area */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
              <Button variant="outline" size="sm">
                Action
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white text-gray-900 rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold mb-2">Card {item}</h3>
                <p className="text-sm text-gray-600">
                  This is a sample card to demonstrate the responsive grid
                  layout.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
