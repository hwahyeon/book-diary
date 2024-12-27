"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Github, Moon, Sun, Menu, ChevronDown } from "lucide-react";
import { navigation } from "../data/navigation";
import Sidebar from "./Sidebar";

export const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLLIElement>(null);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const handleSubMenuToggle = (label: string) => {
    setOpenSubMenu((prev) => (prev === label ? null : label));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenSubMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="w-full bg-background/60 dark:bg-gray-900/80 backdrop-blur-sm transition-all fixed top-0 left-0 right-0 border-b border-gray-200 dark:border-gray-700 h-16 z-20">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto h-full px-8">
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <nav>
              <ul className="flex space-x-8 items-center">
                {navigation.map(({ href, label, submenu }) => (
                  <li
                    key={label}
                    className="relative group"
                    ref={submenu ? menuRef : undefined}
                  >
                    <button
                      className="relative font-semibold hover:text-gray-400 flex items-center focus:outline-none"
                      onClick={() => handleSubMenuToggle(label)}
                    >
                      {label}
                      {submenu && (
                        <ChevronDown className="inline w-4 h-4 ml-1" />
                      )}
                    </button>
                    {submenu && openSubMenu === label && (
                      <ul className="absolute top-10 left-0 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 space-y-2 w-48">
                        {submenu.map(({ href, label }) => (
                          <li key={href}>
                            <Link
                              href={href}
                              className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                            >
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            {/* <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button> */}
            <Menu
              className="w-6 h-6 cursor-pointer hover:text-primary transition-colors"
              onClick={() => setSidebarOpen(true)}
            />
          </div>
        </div>
      </header>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </>
  );
};
