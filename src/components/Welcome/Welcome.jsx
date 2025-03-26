import style from "./Welcome.module.css";
import React, { useState } from "react";
import logo from "../../assets/suppernanny.png";
import emogi from "../../assets/emogi.png";
import bottle from "../../assets/bottle.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
export default function Welcome() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const {t}= useTranslation();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const years = Array.from({ length: 125 }, (_, i) => 2026 - i);

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-[#DF5248] text-2xl text-center my-6">
        <span className="text-[#DF5248] font-bold text-4xl ">{t(`welcome.welcome`)}</span> {t(`welcome.text`)}
        <br />{t(`welcome.text1`)}
        <span className="text-[#DF5248] font-bold text-4xl">{t(`welcome.baby`)}</span>
      </h1>

      <div className="absolute top-14 right-10">
        <img src={emogi} alt="Baby Icon" className="w-12 h-12" />
      </div>

      <div className={`flex flex-col items-center lg:flex-row lg:justify-center gap-x-6 max-w-6xl mx-auto p-6`}>
        <div className="flex-1 flex justify-center">
          <img src={logo} alt="Hero" className="w-full max-w-sm" />
        </div>

        <div className="flex-1 bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">{t(`welcome.choose`)}</h2>

          <p className="text-gray-600 mb-2">{t(`welcome.gender`)}</p>
          <div className="flex gap-4 mb-4">
            <button className="flex-1 p-3 border rounded-lg text-gray-700 hover:bg-red-100">{t(`welcome.male`)}</button>
            <button className="flex-1 p-3 border rounded-lg text-gray-700 hover:bg-red-100">{t(`welcome.female`)}</button>
          </div>

          <p className="text-gray-600 mb-2">{t(`welcome.date`)}</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="p-3 border rounded-lg text-gray-700 text-lg focus:ring-2 focus:ring-red-300">
              <option value="">{t(`welcome.day`)}</option>
              {days.map((day) => (<option key={day} value={day}>{day}</option>))}
            </select>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="p-3 border rounded-lg text-gray-700 text-lg focus:ring-2 focus:ring-red-300">
              <option value="">{t(`welcome.month`)}</option>
              {months.map((month, index) => (<option key={index} value={month}>{month}</option>))}
            </select>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="p-3 border rounded-lg text-gray-700 text-lg focus:ring-2 focus:ring-red-300">
              <option value="">{t(`welcome.year`)}</option>
              {years.map((year) => (<option key={year} value={year}>{year}</option>))}
            </select>
          </div>

          <div className="flex justify-center items-center gap-4">
            <button className="bg-red-400 text-white p-3 rounded-full text-lg font-semibold hover:bg-red-500 flex-1" onClick={() => navigate("/congrate")}>
              {t(`welcome.button`)}
            </button>
            <img src={bottle} alt="Baby Icon" className="w-12 h-12" />
          </div>
        </div>
      </div>
    </>
  );
}
