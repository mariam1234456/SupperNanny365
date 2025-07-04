import styles from "./Home.module.css";
import React, { useEffect } from "react";
import logo from "../../assets/suppernanny.png";
import logo2 from "../../assets/boyandgirl.png";
import logo3 from "../../assets/car.jpg";
import logo4 from "../../assets/lolipop.jpg";
import logo5 from "../../assets/phot.jpg";
import sky from "../../assets/sky.png";
import baby from "../../assets/baby.png";
import todo from "../../assets/todo.jpg";
import quick from "../../assets/quick.jpg";
import steps from "../../assets/steps.jpg";
import photo1 from "../../assets/1.jpg";
import photo2 from "../../assets/2.jpg";
import photo3 from "../../assets/3.jpg";
import photo4 from "../../assets/4.jpg";
import photo5 from "../../assets/5.jpg";
import photo6 from "../../assets/6.jpg";
import back1 from "../../assets/back1.jpg";
import back2 from "../../assets/back2.jpg";
import back3 from "../../assets/back3.jpg";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

export default function Home() {
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
    document.body.style.overflow = "auto"; // تفعيل Scroll عند فتح Home

    return () => {
      document.body.style.overflow = "hidden"; // تعطيل Scroll عند مغادرة Home
    };
  }, []);

  return (
    <>
      {/* القسم الأول  hero section*/}
      <div
        className={`${styles.herocontainer} flex items-center justify-center bg-image bg-1 bg-cover bg-center h-auto py-10`}
      >
        <div className="flex flex-row items-center max-w-4xl gap-6 p-4 sm:p-6 md:p-8 rounded-lg w-full">
          {/* النص */}
          <div className={`${styles.herotext} flex-1 mx-11`}>
            <h1 className="text-5xl font-bold text-black leading-tight max-w-full">
              {t(`home.title`)}
            </h1>
            <button
              className="px-6 sm:px-10 py-2 sm:py-3 mt-4 font-semibold text-white bg-[#FF666A] hover:bg-[#FCBABC] rounded-full shadow"
              onClick={() => navigate("/login")}
            >
              {t(`home.button`)}
            </button>
          </div>

          {/* الصورة */}
          <div
            className={`heroimage ${styles.heroimage} flex-1 flex justify-center`}
          >
            <img
              src={logo}
              alt="Super Mom & Baby"
              className="max-w-[250px] sm:max-w-[300px] md:max-w-[350px] object-contain"
            />
          </div>
        </div>
      </div>

      {/* القسم الثاني */}
      <div
        className={`absolute right-0 rounded-3xl ${styles.animate} z-10`}
      ></div>
      <div className="relative flex flex-col items-center justify-center min-h-screen py-10 sm:py-16">
        <div className="z-20 max-w-2xl text-center px-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800">
            <p><Trans i18nKey="home.header" /></p>
          </h1>
          <img
            src={logo2}
            alt="Cute Kids"
            className="w-32 pt-11 sm:w-40 md:w-48 mx-auto mt-4 transform translate-x-16 sm:translate-x-20 md:translate-x-24"
          />
        </div>

        <img
          src={baby}
          alt="Cloud"
          className="absolute z-20 w-16 sm:w-20 h-auto right-4 sm:right-5 top-10 sm:top-12"
        />
        <img
          src={sky}
          alt="Cake"
          className="absolute z-20 w-12 sm:w-16 h-auto left-4 sm:left-5 top-12 sm:top-15"
        />

        {/* الخدمات */}
        <div className="grid w-full max-w-4xl gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 text-center grid-cols-3 px-4">
          {/* الخدمة 1 */}
          <div className="flex flex-col p-4 bg-white rounded-lg shadow-lg">
            <img
              src={logo3}
              alt="Babysitting"
              className="w-10 sm:w-12 mx-auto"
            />
            <div className={`flex flex-col mt-2 ${styles.services}`}>
              <h2 className="text-base sm:text-lg font-semibold text-blue-950">
                {t(`home.Babysitting`)}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {t(`home.servies1`)}
              </p>
            </div>
          </div>

          {/* الخدمة 2 */}
          <div className="flex flex-col p-4 bg-white rounded-lg shadow-lg">
            <img
              src={logo5}
              alt="Nanny Care"
              className="w-10 sm:w-12 mx-auto"
            />
            <div className={`flex flex-col mt-2 ${styles.services}`}>
              <h2 className="text-base sm:text-lg font-semibold text-blue-950">
              {t(`home.NannyCare`)}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {t(`home.servies2`)}
              </p>
            </div>
          </div>

          {/* الخدمة 3 */}
          <div className="flex flex-col p-4 bg-white rounded-lg shadow-lg">
            <img
              src={logo4}
              alt="Mother's Helpers"
              className="w-10 sm:w-12 mx-auto"
            />
            <div className={`flex flex-col mt-2 ${styles.services}`}>
              <h2 className="text-base sm:text-lg font-semibold text-blue-950">
              {t(`home.Mother’sHelpers`)}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {t(`home.servies3`)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* القسم الثالث */}
      <div className="container p-4 sm:p-6 mx-auto bg-image bg-2 bg-cover bg-center">
        <p className="text-lg sm:text-xl md:text-2xl text-center">
          <Trans i18nKey="home.title2"/>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-10 sm:mt-20 md:mt-32 px-4">
          {/*  الكارت الأولى */}
          <div
            className={`w-full max-w-[250px] min-h-[500px] p-6 mx-auto bg-white rounded-xl shadow-2xl flex flex-col 
        ${styles.element} ${styles.hovercontainer} ${styles.card}`}
          >
            <img
              src={todo}
              alt="To-Do List"
              className="object-contain w-full rounded-md h-44 sm:h-52 md:h-60"
            />
            <h2 className="sm:text-lg font-semibold text-center">
              {t(`home.header1`)}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-center text-gray-600 flex-grow">
            {t(`home.text1`)}
            </p>
            <Link
              to="/login"
              className={`mt-auto flex justify-center text-xs sm:text-base ${styles.hovertext}`}
            >
               {t(`home.button1`)}
            </Link>
          </div>

          {/*  الكارت الثانية */}
          <div
            className={`w-full max-w-[250px] min-h-[500px] p-6 mx-auto bg-white rounded-lg shadow-2xl flex flex-col 
        ${styles.element} ${styles.hovercontainer} ${styles.card}`}
          >
            <img
              src={quick}
              alt="Quick Tips"
              className="object-contain w-full rounded-md h-44 sm:h-52 md:h-60"
            />
            <h2 className="text-base sm:text-lg font-semibold text-center">
            {t(`home.header2`)}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-center text-gray-600 flex-grow">
            {t(`home.text2`)}
            </p>
            <Link
              to="/login"
              className={`mt-auto flex justify-center text-sm sm:text-base ${styles.hovertext}`}
            >
              {t(`home.button2`)}
            </Link>
          </div>

          {/*  الكارت الثالثة */}
          <div
            className={`w-full max-w-[250px] min-h-[500px] p-6 mx-auto bg-white rounded-lg shadow-2xl flex flex-col 
        ${styles.element} ${styles.hovercontainer} ${styles.card}`}
          >
            <img
              src={steps}
              alt="How-To Guides"
              className="object-contain w-full rounded-md h-44 sm:h-52 md:h-60"
            />
            <h2 className="text-base sm:text-lg font-semibold text-center">
            {t(`home.header3`)}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-center text-gray-600 flex-grow">
            {t(`home.text3`)}
            </p>
            <Link
              to="/login"
              className={`mt-auto flex justify-center text-sm sm:text-base ${styles.hovertext}`}
            >
               {t(`home.button3`)}
            </Link>
          </div>
        </div>
      </div>

      {/* القسم الرابع - الجاليري */}
      <div className="flex flex-col items-center py-10 sm:py-16 md:py-20 m-4 sm:m-6 md:m-10 bg-image bg-3 bg-cover bg-center">
        <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl font-bold text-center text-slate-950">
          {t(`home.PhotoGallery`)}
        </h2>

        <div className="grid max-w-4xl gap-3 sm:gap-4 md:gap-6 grid-cols-3">
          <img
            src={photo1}
            alt="Baby Playing"
            className="object-cover w-full h-32 sm:h-40 md:h-48 transition-transform duration-300 rounded-lg hover:scale-110"
          />
          <img
            src={photo2}
            alt="Mom and Baby Smiling"
            className="object-cover w-full h-32 sm:h-40 md:h-48 transition-transform duration-300 rounded-lg hover:scale-110"
          />
          <img
            src={photo3}
            alt="Happy Baby with Mom"
            className="object-cover w-full h-32 sm:h-40 md:h-48 transition-transform duration-300 rounded-lg hover:scale-110"
          />
          <img
            src={photo4}
            alt="Mother Holding Baby"
            className="object-cover w-full h-32 sm:h-40 md:h-48 transition-transform duration-300 rounded-lg hover:scale-110"
          />
          <img
            src={photo5}
            alt="Breastfeeding Mom"
            className="object-cover w-full h-32 sm:h-40 md:h-48 transition-transform duration-300 rounded-lg hover:scale-110"
          />
          <img
            src={photo6}
            alt="Mom Hugging Baby"
            className="object-cover w-full h-32 sm:h-40 md:h-48 transition-transform duration-300 rounded-lg hover:scale-110"
          />
        </div>

        <a
          href="https://www.pexels.com/search/mother%20and%20baby/"
          target="_blank"
        >
          <button className="px-4 sm:px-6 py-2 mt-4 sm:mt-6 text-white bg-[#FF666A] hover:bg-[#FCBABC] rounded-lg shadow-md">
          {t(`home.viewmore`)}
          </button>
        </a>
      </div>

      <Footer />
    </>
  );
}
