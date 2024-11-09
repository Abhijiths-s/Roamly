import React, { useState, useEffect } from "react";
import Loginalert from "./Alert";
import { Link, useNavigate } from "react-router-dom";

// import logo from "/public/Roamly-icon.svg";

export default function Navbar() {
  const [state, setState] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    // Clear token from localStorage (or sessionStorage)
    localStorage.removeItem("token");

    // Clear any other session data, like user info if you're storing it
    localStorage.removeItem("username");

    // Redirect to the login page or home page
    navigate("/login");
  };

  const changeState = () => {
    setState(!state);
    console.log(state);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timeoutId;

    const handleScroll = () => {
      clearTimeout(timeoutId);

      if (window.scrollY > 300) {
        setIsVisible(false);
        setIsAtTop(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;

      // Set navbar to top if no scrolling is detected after 1.5 seconds
      timeoutId = setTimeout(() => {
        if (lastScrollY < window.scrollY + 1) {
          setIsAtTop(true);
          setIsVisible(true);
        }
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-10 transition-transform duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isAtTop ? "top-0" : ""
        } drop-shadow-xl shadow-md px-8 backdrop-blur-sm `}
      >
        <div className="flex items-center justify-between space-x-96 mx-auto py-4 ">
          <Link to="/profile">
            <p className="flex flex-row justify-center items-center hover:underline underline-offset-2 text-white">
              <svg
                className="w-6 h-6 mr-2  text-orange-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                // width="24"
                // height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <span className="leading-tight bg-gradient-to-r from-blue-400 via-teal-400 to-orange-400 bg-clip-text text-transparent text-2xl font-bold  ">
                {username ? username : "Guest"}
              </span>
            </p>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-10 text-3xl">
            <a
              href="/"
              className="text-black hover:text-white transition-colors font-masalva duration-200"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-black hover:text-white transition-colors font-masalva duration-200"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-black hover:text-white transition-colors font-masalva"
            >
              Contact
            </a>
          </div>

          <button
            className=" bg-orange-500 backdrop-blur-md text-white py-3 px-6 rounded-lg hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg  md:block hidden"
            onClick={handleLogout}
          >
            Log out
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="inline-flex items-center p-2  text-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mobile-menu"
            aria-expanded={state}
            onClick={changeState}
          >
            <svg
              className="w-6 h-6"
              color="black"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5h14a1 1 0 01 0-2H3a1 1 0 01 0 2zm0 6h14a1 1 0 01 0-2H3a1 1 0 01 0 2zm0 6h14a1 1 0 01 0-2H3a1 1 0 01 0 2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            !state ? "hidden" : "block"
          } flex justify-center items-center`}
          id="mobile-menu"
        >
          <ul className="space-y-6 text-center p-4 bg-transparent text-xl font-extrabold font-masalva ">
            <li
              onClick={changeState}
              className="hover:bg-white hover:text-[black] rounded-lg  w-96 border-b-2 border-black"
            >
              <a href="/dashboard" className="text-black ">
                Home
              </a>
            </li>
            <li
              onClick={changeState}
              className="hover:bg-white hover:text-[black] rounded-lg  border-b-2 border-black"
            >
              <a href="/about" className="text-black ">
                About
              </a>
            </li>
            <li
              onClick={changeState}
              className="hover:bg-white hover:text-[black] rounded-lg  border-b-2 border-black"
            >
              <a href="/contact" className="text-black">
                Contact
              </a>
            </li>
            <li>
              <button
                className=" bg-orange-500 backdrop-blur-md text-white py-1 px-4 rounded-lg text-sm hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg  "
                onClick={handleLogout}
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
