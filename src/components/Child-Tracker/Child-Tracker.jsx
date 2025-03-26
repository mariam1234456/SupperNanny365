import style from "../../components/Child-Tracker/Child-Tracker.module.css";
import React, { useEffect, useState } from "react";
import imog from "../../assets/emogi.png";
import bottle from "../../assets/bottle.png";
import Sleeping from "../../assets/Sleeping.png";
import Baby2 from "../../assets/Baby2.png";
import baby3 from "../../assets/baby3.png";
import Scale from "../../assets/Scale.png";
import blood from "../../assets/blood.png";
import Cold from "../../assets/Cold.png";
import Measure from "../../assets/Measure.png";
import { useTranslation } from "react-i18next";

export default function ChildTracker() {
  const { t, i18n } = useTranslation();

  const [value, setValue] = useState(() => localStorage.getItem("feeding") || "");
  const [value2, setValue2] = useState(() => localStorage.getItem("sleeping") || "");
  const [value3, setValue3] = useState(() => localStorage.getItem("Diaper") || "");
  const [valueHeight, setValueHeight] = useState(() => localStorage.getItem("Height") || "");
  const [valueWeight, setValueWeight] = useState(() => localStorage.getItem("Weight") || "");
  const [valueTemperature, setValueTemperature] = useState(() => localStorage.getItem("Temperature") || "");
  const [valueVaccination, setValueVaccination] = useState(() => localStorage.getItem("Vaccination") || "");

  useEffect(() => {
    localStorage.setItem("feeding", value);
  }, [value]);
  useEffect(() => {
    localStorage.setItem("sleeping", value2);
  }, [value2]);
  useEffect(() => {
    localStorage.setItem("Diaper", value3);
  }, [value3]);
  useEffect(() => {
    localStorage.setItem("Height", valueHeight);
  }, [valueHeight]);
  useEffect(() => {
    localStorage.setItem("Weight", valueWeight);
  }, [valueWeight]);
  useEffect(() => {
    localStorage.setItem("Temperature", valueTemperature);
  }, [valueTemperature]);
  useEffect(() => {
    localStorage.setItem("Vaccination", valueVaccination);
  }, [valueVaccination]);

  const toArabicNumerals = (text) => {
    if (i18n.language === "ar") {
      const arabictexts = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
      return text
        .toString()
        .split("")
        .map((digit) => arabictexts[digit] || digit)
        .join("");
    }
    return text;
  };

  return (
    <div
      className="flex flex-col md:flex-row min-h-screen bg-[#f7eddf] p-4 md:p-7 rounded-xl"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      {/* (الصورة الشخصية) */}
      <div className="flex-shrink-0 flex justify-center md:justify-start mb-6 md:mb-0">
        <div className="text-center">
          <img
            src={imog}
            alt="Profile"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
          />
          <h3 className="mt-3 text-md font-semibold">Puerto Rico</h3>
        </div>
      </div>

      {/*(Feeding, Sleeping, Diaper) */}
      <div className="flex-1 w-full  md:w-2/6 px-4 md:px-6 mb-6 md:mb-0">
        <div className="grid grid-cols-1 xl:grid-cols-3 mt-6 gap-8">
          {/* Feeding */}
          <div className="bg-white p-5 rounded-xl w-48 shadow-md  max-w-xs mx-auto">
            <div className="flex items-center space-x-4 space-x-reverse">
              <img src={bottle} alt="Feeding" className="w-9 h-9 bg-[#fadaaf] rounded-lg" />
              <h2 className="text-lg font-bold text-black">&ensp;{t(`childtracker.feeding`)}</h2>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse mb-5 mt-4">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="p-2 border font-bold border-gray-300 w-12 rounded-lg text-center"
                style={{ appearance: "textfield" }}
              />
              <p className="text-black">&ensp;{t(`childtracker.m`)}</p>
            </div>
            <span className="text-black bg-[#fadaaf] px-2 font-semibold">Normal</span>
          </div>

          {/* Sleeping */}
          <div className="bg-white p-5 rounded-xl shadow-md w-48 max-w-xs mx-auto">
            <div className="flex items-center space-x-4 space-x-reverse">
              <img src={Sleeping} alt="Sleeping" className="w-9 h-9 bg-[#f3dae0] rounded-lg" />
              <h2 className="text-lg font-bold text-black">&ensp;{t(`childtracker.sleeping`)}</h2>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse mb-5 mt-4">
              <input
                type="text"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="p-2 border font-bold border-gray-300 w-12 rounded-lg text-center"
                style={{ appearance: "textfield" }}
              />
              <p className="text-black">&ensp;{t(`childtracker.day`)}</p>
            </div>
            <span className="text-black bg-[#f3dae0] px-2 font-semibold">Normal</span>
          </div>

          {/* Diaper */}
          <div className="bg-white p-5 rounded-xl shadow-md w-48 max-w-xs mx-auto">
            <div className="flex items-center space-x-4 space-x-reverse">
              <img src={Baby2} alt="Diaper" className="w-9 h-9 bg-[#D0FBFF] rounded-lg" />
              <h2 className="text-lg font-bold text-black">&ensp;{t(`childtracker.diaper`)}</h2>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse mb-5 mt-4">
              <input
                type="text"
                value={value3}
                onChange={(e) => setValue3(e.target.value)}
                className="p-2 border font-bold border-gray-300 w-12 rounded-lg text-center"
                style={{ appearance: "textfield" }}
              />
              <p className="text-black">&ensp;{t(`childtracker.h`)}</p>
            </div>
            <span className="text-black bg-[#D0FBFF] px-2 font-semibold">Normal</span>
          </div>
        </div>
      </div>

      
      <div className="flex-1 w-full lg:w-3/6 px-4 md:px-6">
        {/* الأزرار */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          <button className="border px-4 py-2 rounded-lg border-[#CACACA]">
            {t(`childtracker.edit`)}
          </button>
          <button
            id="dropdownHoverButton"
            data-dropdown-toggle="dropdownHover"
            data-dropdown-trigger="hover"
            className="border px-4 py-2 rounded-lg border-[#CACACA] inline-flex items-center"
          >
            {t(`childtracker.thisweek`)}
            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          <div className="relative w-full max-w-xs md:w-auto">
            <input
              type="text"
              id="search-navbar"
              className="w-full p-2 ps-10 text-sm rounded-lg"
              placeholder={t(`childtracker.placholder`)}
            />
            <svg
              className="w-4 h-4 text-gray-500 absolute top-1/2 left-3 transform -translate-y-1/2"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <button className="p-2 rounded-lg bg-[#ffffff]">
            <i className="fas fa-bell"></i>
          </button>
        </div>

        {/* Height and Weight */}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-6 mb-6">
          <div className="bg-[#F8DEBD] p-4 rounded-xl shadow-md w-52 max-w-xs mx-auto relative">
            <img src={Measure} className="w-10 h-10 absolute -top-5 left-1/2 transform -translate-x-1/2" alt="Measure" />
            <div className="flex justify-between items-center w-full mt-6">
              <p>{t(`childtracker.height`)}</p>
              <input
                type="text"
                value={valueHeight}
                onChange={(e) => setValueHeight(e.target.value)}
                className="w-12 rounded-lg text-center bg-[#F8DEBD]"
                style={{ appearance: "textfield" }}
              />
              <p className="text-black">{t(`childtracker.cm`)}</p>
            </div>
          </div>
          <div className="bg-[#D0FBFF] p-4 rounded-xl shadow-md w-52 max-w-xs mx-auto relative">
            <img src={Scale} className="w-10 h-10 absolute -top-5 left-1/2 transform -translate-x-1/2" alt="Scale" />
            <div className="flex justify-between items-center w-full mt-6">
              <p>{t(`childtracker.weight`)}</p>
              <input
                type="text"
                value={valueWeight}
                onChange={(e) => setValueWeight(e.target.value)}
                className="w-12 rounded-lg text-center bg-[#D0FBFF]"
                style={{ appearance: "textfield" }}
              />
              <p className="text-black">{t(`childtracker.kg`)}</p>
            </div>
          </div>
        </div>

        {/* Temperature and Vaccination */}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-6 mb-6">
          <div className="bg-[#f599a1] p-4 rounded-xl shadow-md w-52 max-w-xs mx-auto relative">
            <img src={Cold} className="w-12 h-12 absolute -top-6 left-1/2 transform -translate-x-1/2" alt="Cold" />
            <div className="flex justify-between items-center w-full mt-6">
              <p>{t(`childtracker.temprature`)}</p>
              <input
                type="text"
                value={valueTemperature}
                onChange={(e) => setValueTemperature(e.target.value)}
                className="w-12 rounded-lg text-center bg-[#f599a1]"
                style={{ appearance: "textfield" }}
              />
              <p className="text-black">{t(`childtracker.c`)}</p>
            </div>
          </div>
          <div className="bg-[#C8B8AE] p-4 rounded-xl shadow-md w-52 max-w-xs mx-auto relative">
            <img src={blood} className="w-12 h-12 absolute -top-6 left-1/2 transform -translate-x-1/2" alt="Blood" />
            <div className="flex justify-between items-center w-full mt-6">
              <p>{t(`childtracker.voccination`)}</p>
              <input
                type="text"
                value={valueVaccination}
                onChange={(e) => setValueVaccination(e.target.value)}
                className="w-12 rounded-lg text-center bg-[#C8B8AE]"
                style={{ appearance: "textfield" }}
              />
              <p className="text-black">/{toArabicNumerals(5)}</p>
            </div>
          </div>
        </div>

        {/* صورة الطفل */}
        <div className="flex justify-center">
          <img src={baby3} className="w-40 h-40 max-w-full object-cover" alt="Baby" />
        </div>
      </div>
    </div>
  );
}