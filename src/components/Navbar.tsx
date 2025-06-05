"use client";

import { useState } from "react";
import { Menu, X, Atom } from "lucide-react";
import LittleLogo from "./ui/LittleLogo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-cyan-50 shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <a href="/">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
            
                  <LittleLogo className="w-10 h-10" />
               
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    <span className="bg-gradient-to-r from-cyan-800 to-cyan-600 text-transparent bg-clip-text">
                      EquaLab
                    </span>
               
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">Materials</p>
                </div>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 mx-auto">
            <a
              href="/"
              className="flex items-center space-x-1 text-cyan-900 hover:text-cyan-600 transition-colors font-medium"
            >
              <span>Materials</span>
            </a>
            <a
              href="/add"
              className="flex items-center space-x-1 text-cyan-900 hover:text-cyan-600 transition-colors font-medium"
            >
              <span>Add Material</span>
            </a>
            <a
              href="/compare"
              className="flex items-center space-x-1 text-cyan-900 hover:text-cyan-600 transition-colors font-medium"
            >
              <span>Compare</span>
            </a>
            <a
              href="/info"
              className="flex items-center space-x-1 text-cyan-900 hover:text-cyan-600 transition-colors font-medium"
            >
              <span>Info</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-cyan-50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <span className="font-medium">Database</span>
              </a>
              <a
                href="/add"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <span className="font-medium">Add Material</span>
              </a>
             <a 
                href="/compare"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <span className="font-medium">Compare</span>
              </a>
              <a
                href="/info"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <span className="font-medium">Info</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}