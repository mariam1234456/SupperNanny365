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
    const pink = "#f6c5f7";
    switch (location.pathname) {
      case "/home":
        return "#FFFFFF";
      case "/todo":
      case "/quicktips":
      case "/howto":
      case "/childtracker":
      case "/todo/import":
      case "/todo/profile":
      case "/todo/profile/edit":
      case "/todo/profile/baby":
        return pink;
      default:
        return "#FFFFFF";
    }
  };

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className="relative bg-white border-gray-200 dark:bg-gray-900"
      style={{ backgroundColor: getColor() }}
    >
      <div className="max-w-screen-xl flex items-center justify-start mx-auto p-4 gap-4">
        {/* Logo + Sidebar */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Box />
          <img src={logo} className="h-8" alt="Logo" />
          <span className="self-center text-md font-semibold dark:text-white">
            Supper Nanny 365
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex justify-start ltr:ml-16 rtl:mr-16">
          <ul
            style={{ backgroundColor: getColor() }}
            className="font-medium hidden md:flex space-x-6 rtl:space-x-reverse"
          >
            <li>
              <NavLink
                to="/"
                className="block px-1 py-2 text-gray-900 hover:text-gray-300 hover:scale-x-95"
              >
                {t(`navbar.home`)}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/todo"
                className="block px-1 py-2 text-gray-900 hover:text-gray-300 hover:scale-x-95"
              >
                {t(`navbar.todo`)}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/quicktips"
                className="block px-1 py-2 text-gray-900 hover:text-gray-300 hover:scale-x-95"
              >
                {t(`navbar.quicktips`)}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/howto"
                className="block px-1 py-2 text-gray-900 hover:text-gray-300 hover:scale-x-95"
              >
                {t(`navbar.howto`)}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/childtracker"
                className="block px-1 py-2 text-gray-900 hover:text-gray-300 hover:scale-x-95"
              >
                {t(`navbar.childtracker`)}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Toggle Button (Mobile) */}
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

        {/* Mobile Menu */}
        <div
          className={`absolute top-[100%] left-0 right-0 z-50 transition-all duration-300 ${
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } md:hidden`}
          id="navbar-default"
        >
          <ul
            style={{ backgroundColor: getColor() }}
            className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
          >
            <li>
              <NavLink to="/" className="block px-3 py-2 text-gray-900">
                {t(`navbar.home`)}
              </NavLink>
            </li>
            <li>
              <NavLink to="/todo" className="block px-3 py-2 text-gray-900">
                {t(`navbar.todo`)}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/quicktips"
                className="block px-3 py-2 text-gray-900"
              >
                {t(`navbar.quicktips`)}
              </NavLink>
            </li>
            <li>
              <NavLink to="/howto" className="block px-3 py-2 text-gray-900">
                {t(`navbar.howto`)}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/childtracker"
                className="block px-3 py-2 text-gray-900"
              >
                {t(`navbar.childtracker`)}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* <div className="flex flex-1 justify-end px-3 rounded-full gap-3">
        <button className={`px-6 py-2 bg-[#FF666A] text-[#FFFFFF] rounded-full text-base hover:bg-[#FCBABC] ${styles.navbarbuttons}`}>
            <Link to="login">{t(`navbar.login`)}</Link>
          </button>
          <button className={`px-6 rounded-full border-2 hover:bg-[#FCBABC] ${styles.navbarbuttons}`}>
            <Link to="register">{t(`navbar.register`)}</Link>
          </button>

        </div> */}
      </div>
    </nav>
  );
}
