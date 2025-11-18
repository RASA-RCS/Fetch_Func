import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../image/image.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Our Services', to: '/ourservices' },
    { name: 'Careers', to: '/careers' },
    { name: 'Contact Us', to: '/contactus' },
    { name: 'Admin', to: '/dashboard' },
  ];

  const activeClass =
    "text-blue-600 font-bold border-b-2 border-blue-600";
  const normalClass =
    "text-gray-700 hover:text-blue-600";

  return (
    <nav className="fixed z-50 w-full bg-white shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="text-xl font-bold text-blue-600">
              <img src={logo} alt="logo" className="max-w-half h-16 dark:hidden" />
            </NavLink>
          </div>

          {/* Desktop Links */}
          <div className="items-center hidden space-x-6 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="bg-white shadow-md md:hidden">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
