"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown, Home } from "lucide-react";
import { navigation } from "../data/navigation";
import Sidebar from "./Sidebar";

export const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-background/80 backdrop-blur-sm transition-all fixed top-0 left-0 right-0 border-b border-primary/20 h-16 z-20">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto h-full px-8">
          <div className="lg:flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center justify-center p-2 text-primary hover:text-accent transition-colors focus:outline-none"
              aria-label="Go Home"
            >
              <Home className="w-6 h-6" />
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              <ul className="flex space-x-8 items-center">
                {navigation.map(({ href, label, submenu }) => (
                  <li key={label} className="relative group">
                    {submenu ? (
                      <>
                        <button className="relative font-semibold text-primary hover:text-accent transition-colors flex items-center focus:outline-none">
                          {label}
                          <ChevronDown className="inline w-4 h-4 ml-1" />
                        </button>
                        <ul className="absolute top-8 left-0 bg-white border border-primary/10 shadow-lg rounded-md py-2 w-48 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150">
                          {submenu.map(({ href, label }) => (
                            <li key={href}>
                              <Link
                                href={href}
                                className="block px-4 py-2 text-primary hover:bg-background hover:text-accent rounded-md transition-colors"
                              >
                                {label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link
                        href={href}
                        className="font-semibold text-primary hover:text-accent transition-colors"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            <Menu
              className="w-6 h-6 cursor-pointer text-primary hover:text-accent transition-colors"
              onClick={() => setSidebarOpen(true)}
            />
          </div>
        </div>
      </header>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </>
  );
};
