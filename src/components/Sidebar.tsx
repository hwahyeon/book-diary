import React from "react";
import Link from "next/link";
import { navigation } from "@/data/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const handleCloseClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 flex z-50 ${sidebarOpen ? "block" : "hidden"}`}
    >
      {/* Sidebar-left */}
      <div
        className={`w-1/2 h-screen bg-gray-700 opacity-90 transition-all duration-500 ${
          sidebarOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        onClick={handleCloseClick}
      ></div>

      {/* Sidebar-right */}
      <div
        className={`w-1/2 h-screen bg-white text-black transition-all duration-500 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 mt-10 relative">
          <button
            className="absolute top-3 right-6 text-4xl cursor-pointer"
            onClick={handleCloseClick}
          >
            &times;
          </button>
          <nav className="mt-6">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                <div
                  className="p-4 text-xl font-bold cursor-pointer hover:text-primary hover:translate-x-2 transition-transform duration-300"
                  onClick={handleCloseClick}
                >
                  {item.label}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
