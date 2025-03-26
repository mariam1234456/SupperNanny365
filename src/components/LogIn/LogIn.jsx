import google from "../../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import style from "./LogIn.module.css";
import React, { useState, useTransition } from "react";
import girl from "../../assets/girl.png";
import boy from "../../assets/boy.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function LogIn() {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showVerifyCode, setShowVerifyCode] = useState(false);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="relative flex items-center justify-center h-screen bg-gradient-to-b from-[#F1D8E8] to-[#BFDBE9] overflow-auto">
        {/* الصور (الفتاة والولد) */}
        <img
          src={girl}
          alt="baby-left"
          className="hidden md:block absolute left-5 top-5 w-32 h-32 lg:w-40 lg:h-40"
        />
        <img
          src={boy}
          alt="baby-right"
          className="hidden md:block absolute right-5 bottom-5 w-32 h-32 lg:w-40 lg:h-40"
        />

        {/* المودال */}
        {isOpen && (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-96">
            {showSetPassword ? (
              <div>
                <button
                  onClick={() => setShowSetPassword(false)}
                  className="absolute top-3 left-3 text-gray-500 hover:text-gray-800 text-sm md:text-base"
                >
                  ← {t(`forget.back`)}
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  <i className="fas fa-times"></i>
                </button>
                <h2 className="text-lg md:text-xl font-semibold my-4">{t(`resentpass.set`)}</h2>
                <p className="text-xs md:text-sm text-gray-500 mt-2">
                  {t(`resentpass.reset`)}
                </p>
                <div className="flex items-center border my-3 rounded-md w-full">
                  <input
                    type={showPassword ? "password" : "text"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t(`resentpass.create`)}
                    className="w-full p-2 pe-10 border-none focus:outline-none focus:ring-0 text-sm md:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700 p-2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="flex items-center border rounded-md w-full">
                  <input
                    type={showPassword ? "password" : "text"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t(`resentpass.reenter`)}
                    className="w-full p-2 pe-10 border-none focus:outline-none focus:ring-0 text-sm md:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700 p-2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <button
                  className="w-full bg-red-500 text-white py-2 mt-4 rounded-full text-sm md:text-base"
                  onClick={() => setShowSetPassword(false)}
                >
                  {t(`resentpass.button`)}
                </button>
              </div>
            ) : showVerifyCode ? (
              <div>
                <button
                  onClick={() => setShowVerifyCode(false)}
                  className="absolute top-3 left-3 text-gray-500 hover:text-gray-800 text-sm md:text-base"
                >
                  ← {t(`forget.back`)}
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  <i className="fas fa-times"></i>
                </button>
                <h2 className="text-lg md:text-xl font-semibold my-4">{t(`verify.verify`)}</h2>
                <p className="text-xs md:text-sm text-gray-500 mt-2">
                  {t(`verify.code`)}
                </p>
                <input
                  type="text"
                  placeholder={t(`verify.enter`)}
                  className="w-full p-2 border-gray-300 rounded-lg mt-4 text-sm md:text-base"
                />
                <button
                  className="w-full bg-red-500 text-white py-2 mt-4 rounded-full text-sm md:text-base"
                  onClick={() => {
                    setShowVerifyCode(false);
                    setShowSetPassword(true);
                  }}
                >
                  {t(`verify.verifybutton`)}
                </button>
                <p className="text-xs md:text-sm text-black text-center mt-2 cursor-pointer">
                  {t(`verify.receive`)}{" "}
                  <span className="underline text-red-500">{t(`verify.resend`)}</span>
                </p>
              </div>
            ) : showForgotPassword ? (
              <div>
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="absolute top-3 left-3 text-gray-500 hover:text-gray-800 text-sm md:text-base"
                >
                  ← {t(`forget.back`)}
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  <i className="fas fa-times"></i>
                </button>
                <h2 className="text-lg md:text-xl font-semibold my-4">
                  {t(`forget.forget`)}
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mt-2">
                  {t(`forget.worry`)}
                </p>
                <input
                  type="email"
                  placeholder={t(`login.email`)}
                  className="w-full p-2 border-gray-300 rounded-lg mt-4 text-sm md:text-base"
                />
                <button
                  className="w-full bg-red-500 text-white py-2 mt-4 rounded-full text-sm md:text-base"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setShowVerifyCode(true);
                  }}
                >
                  {t(`forget.submit`)}
                </button>
              </div>
            ) : (
              // الـ Login Form اللي عندك
              <>
                <button
                  onClick={() => navigate("/")}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  <i className="fas fa-times"></i>
                </button>
                <h2 className="text-lg md:text-xl font-semibold text-center">
                  {t(`login.login`)}
                </h2>
                <p className="text-xs md:text-sm text-gray-500 text-center">
                  {t(`login.account`)}{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-blue-500"
                  >
                    {t(`login.signup`)}
                  </button>
                </p>
                <div className="mt-4">
                  <button className="w-full bg-white text-blue-600 border-gray-300 border-2 py-2 rounded-full flex items-center justify-center gap-2 text-sm md:text-base">
                    <i className="fab fa-facebook"></i>
                    <span className="text-gray-600">{t(`login.face`)}</span>
                  </button>
                  <button className="w-full bg-white text-red-500 border-gray-300 border-2 py-2 rounded-full mt-2 flex items-center justify-center gap-2 text-sm md:text-base">
                    <img src={google} className="w-4 h-4" alt="" />
                    <span className="text-gray-600">{t(`login.google`)}</span>
                  </button>
                </div>
                <div className="flex items-center my-4">
                  <hr className="flex-grow border-gray-300" />
                  <span className="mx-2 text-gray-500 text-xs md:text-sm">{t(`login.OR`)}</span>
                  <hr className="flex-grow border-gray-300" />
                </div>
                <input
                  type="email"
                  placeholder={t(`login.email`)}
                  className="w-full p-2 border-gray-300 rounded-lg mb-2 text-sm md:text-base"
                />
                <div className="flex items-center border rounded-md w-full">
                  <input
                    type={showPassword ? "password" : "text"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t(`login.pass`)}
                    className="w-full p-2 pe-10 border-none focus:outline-none focus:ring-0 text-sm md:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700 p-2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <p className="text-end text-xs md:text-sm underline">
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="text-blue-500"
                  >
                    {t(`login.forget`)}
                  </button>
                </p>
                <button
                  onClick={() => navigate("/todo")}
                  className="w-full bg-red-500 text-white py-2 my-2 rounded-full text-sm md:text-base"
                >
                  {t(`login.login`)}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
