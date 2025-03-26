import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import google from "../../assets/google.png";
import logo from "../../assets/suppernanny.png";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

export default function Register() {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [password1, setPassword1] = useState("");
  const [showPassword1, setShowPassword1] = useState(true);
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F1D8E8] to-[#BFDBE9] px-4 py-8"
    >
      <div className="relative bg-white rounded-lg shadow-lg flex flex-col md:flex-row h-auto md:h-[500px] w-full max-w-[900px] p-6 md:mt-8">
        {/* زر الإغلاق */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>
        {/* فورم التسجيل */}
        <div className="flex-1 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800">{t(`register.create`)}</h2>
          <p className="text-gray-600 text-sm mb-6">
            {t(`register.account`)}
            <a
              onClick={() => navigate("/login")}
              href="#"
              className="text-blue-500 ml-2 cursor-pointer"
            >
              {t(`register.login`)}
            </a>
          </p>
          <form className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <input
                type="text"
                placeholder={t(`register.first`)}
                className="w-full md:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <input
                type="text"
                placeholder={t(`register.last`)}
                className="w-full md:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <input
              type="email"
              placeholder={t(`register.email`)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <div className="relative">
              <input
                type={showPassword ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t(`register.pass`)}
                className="w-full p-3 border rounded-lg focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute top-3 ${isArabic ? "left-3" : "right-3"} text-gray-500`}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword1 ? "password" : "text"}
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                placeholder={t(`register.confirm`)}
                className="w-full p-3 border rounded-lg focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword1(!showPassword1)}
                className={`absolute top-3 ${isArabic ? "left-3" : "right-3"} text-gray-500`}
              >
                {showPassword1 ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              onClick={() => navigate("/welcome")}
              className="w-full md:w-1/2 bg-red-500 text-white p-3 rounded-full font-semibold hover:bg-red-600"
            >
              {t(`register.button`)}
            </button>
          </form>
        </div>
        {/* الصورة الجانبية مع أزرار السوشيال ميديا */}
        <div className="hidden md:flex flex-col items-center justify-center p-6 gap-4">
          <img src={logo} alt="Hero" className="w-40" />
          <button className="w-full bg-white text-blue-600 border-gray-300 border-2 py-3 rounded-full flex items-center justify-center gap-2">
            <i className="fab fa-facebook"></i>
            <span className="text-gray-600">{t(`register.face`)}</span>
          </button>
          <button className="w-full bg-white text-red-500 border-gray-300 border-2 py-2 rounded-full mt-2 flex items-center justify-center gap-2">
            <img src={google} className="w-4 h-4" alt="" />
            <span className="text-gray-600">{t(`register.google`)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
