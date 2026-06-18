"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { navigation } from "@/data/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const close = () => setSidebarOpen(false);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <span className="text-sm font-semibold text-primary tracking-wide uppercase">Menu</span>
          <button
            onClick={close}
            className="p-1 text-gray-400 hover:text-accent transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {navigation.map((item) => (
            <div key={item.href} className="mb-2">
              {item.submenu ? (
                <>
                  <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </p>
                  <ul className="ml-2 space-y-1">
                    {item.submenu.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          onClick={close}
                          className="flex items-center px-3 py-2.5 rounded-lg text-gray-700 font-medium hover:bg-background hover:text-accent transition-colors"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex items-center px-3 py-2.5 rounded-lg text-gray-700 font-medium hover:bg-background hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">© 2024 hwahyeon</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
