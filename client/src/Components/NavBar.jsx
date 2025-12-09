// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services]. 
//  You shall not disclose such confidential information and shall use it only in accordance 
//with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../image/image.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Our Services", to: "/ourservices" },
    { name: "Careers", to: "/careers" },
    { name: "Contact Us", to: "/contactus" },
    { name: "Admin", to: "/dashboard" },
  ];

  const activeClass =
    "text-blue-600 font-bold border-b-2 border-blue-600 block py-2";
  const normalClass =
    "text-gray-700 hover:text-blue-600 block py-2 transition";


  const [thought, setThought] = useState("");

  useEffect(() => {
    const fetchQuote = () => {
      fetch("https://uselessfacts.jsph.pl/random.json?language=en")
        .then((res) => res.json())
        .then((data) => {
          setThought(data.text);

        })
        .catch((err) => console.error("Error fetching thought:", err));
    };

    fetchQuote(); // initial call
    const interval = setInterval(fetchQuote, 10000); // every 10 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center">
              <img src={logo} alt="logo" className="h-14 w-auto" />
            </NavLink>
            {/* <div>{thought}</div> */}
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
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

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600 transition"
            >
              {isOpen ? (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="w-full bg-gray-900 text-white py-3 px-4 text-center text-sm md:text-base shadow-inner">
          <span className="font-semibold">Thought of the Day:</span> <p>{thought}</p>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96" : "max-h-0"
            }`}
        >
          <div className="px-4 py-3 space-y-2">
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
      </nav>

    </>
  );
};

export default Navbar;
