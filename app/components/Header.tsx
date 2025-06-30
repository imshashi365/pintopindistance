'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / Title */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">
                Pincode Distance
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium flex items-center">
              <span className="mr-1">🏠</span> Home
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium flex items-center">
              <span className="mr-1">📖</span> Blog
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium flex items-center">
              <span className="mr-1">🔍</span> About Tool
            </Link>
            
            {/* Resources Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium flex items-center focus:outline-none"
              >
                <span className="mr-1">📜</span> Resources
                <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isResourcesOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link href="/directory" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Pincode Directory
                    </Link>
                    <Link href="/gst-rules" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      GST Rules
                    </Link>
                    <Link href="/transport-calculator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Transport Calculator
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium flex items-center">
              <span className="mr-1">📞</span> Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
              <span className="mr-2">🏠</span> Home
            </Link>
            <Link href="/blog" className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
              <span className="mr-2">📖</span> Blog
            </Link>
            <Link href="/about" className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
              <span className="mr-2">🔍</span> About Tool
            </Link>
            
            <div className="px-4 py-2">
              <button 
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className="w-full flex justify-between items-center text-base font-medium text-gray-700 hover:text-indigo-600 focus:outline-none"
              >
                <span><span className="mr-2">📜</span> Resources</span>
                <svg className={`h-5 w-5 transform transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isResourcesOpen && (
                <div className="mt-2 pl-6 space-y-2">
                  <Link href="/directory" className="block py-2 text-sm text-gray-700 hover:text-indigo-600">
                    Pincode Directory
                  </Link>
                  <Link href="/gst-rules" className="block py-2 text-sm text-gray-700 hover:text-indigo-600">
                    GST Rules
                  </Link>
                  <Link href="/transport-calculator" className="block py-2 text-sm text-gray-700 hover:text-indigo-600">
                    Transport Calculator
                  </Link>
                </div>
              )}
            </div>
            
            <Link href="/contact" className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">
              <span className="mr-2">📞</span> Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
