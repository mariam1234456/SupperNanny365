import styles from "./Navbar.module.css";
import React, { useState } from "react";
import logo from "../../assets/suppernanny.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Box from "../Box/Box";

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const getColor = () => {
    if (location.pathname === "/home") return `#FFFFFF`;
    if (location.pathname === "/todo") return `#f6c5f7`;
    if (location.pathname === "/quicktips") return `#f6c5f7`;
    if (location.pathname === "/howto") return `#f6c5f7`;
    if (location.pathname === "/childtracker") return `#f6c5f7`;
    if (location.pathname === "/todo/import") return `#f6c5f7`;
    if (location.pathname === "/todo/profile") return `#f6c5f7`;
    if (location.pathname === "/todo/profile/edit") return `#f6c5f7`;
    if (location.pathname === "/todo/profile/baby") return `#f6c5f7`;
  };

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
    console.log("menuOpen:", !menuOpen);
  };

  return (
    <>
      <nav
        className="relative bg-white border-gray-200 dark:bg-gray-900"
        style={{ backgroundColor: getColor() }}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* logo */}
          <a className={`flex ${styles.liter} space-x-3 rtl:space-x-reverse`}>
            {/* sidebar */}
            <Box />
            <img src={logo} className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-md font-semibold dark:text-white">
              Supper Nanny 365
            </span>
          </a>

          {/* Toggle Button */}
          <button
            type="button"
            onClick={handleToggle}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Navigation Links (Desktop and Mobile) */}
          <div
            className={`absolute top-[100%] left-0 right-0 z-50 transition-all duration-300 ${
              menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            } md:relative md:flex md:w-auto md:opacity-100 md:visible`}
            id="navbar-default"
          >
            <ul
              style={{ backgroundColor: getColor() }}
              className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
            >
              <li>
                <NavLink
                  to="/"
                  className="block px-1 hover:text-gray-300 hover:scale-x-95  py-2 text-gray-900"
                >
                  {t(`navbar.home`)}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/todo"
                  className="block px-1 hover:text-gray-300 hover:scale-x-95 py-2 text-gray-900"
                >
                  {t(`navbar.todo`)}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/quicktips"
                  className="block px-1 hover:text-gray-300 hover:scale-x-95 py-2 text-gray-900"
                >
                  {t(`navbar.quicktips`)}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/howto"
                  className="block px-1 hover:text-gray-300 hover:scale-x-95 py-2 text-gray-900"
                >
                  {t(`navbar.howto`)}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/childtracker"
                  className="block px-1 hover:text-gray-300 hover:scale-x-95 py-2 text-gray-900"
                >
                  {t(`navbar.childtracker`)}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Auth Navbar */}
          {/* <div>
            <ul>
             <li>
               <Link
                to="login"
                className={`mx-2 text-black bg-[#FFFFFF] border-[1px] border-black hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full px-6 text-sm py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${styles.navbarbuttons}`}
              >
                {t(`navbar.login`)}
              </Link>

              <Link
                to="register"
                className={`text-white bg-[#FF666A] hover:bg-[#FCBABC] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full px-6  text-sm py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${styles.navbarbuttons}`}
              >
                {t(`navbar.register`)}
              </Link>
            </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </>
  );
}
