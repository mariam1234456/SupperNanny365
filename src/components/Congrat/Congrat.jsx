import { useNavigate } from "react-router-dom";
import React from "react";
import bride from "../../assets/bride.mp4";
import { useTranslation } from "react-i18next";

export default function Congrat() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
    <div className="bg-white flex flex-col justify-center items-center px-4">
      {/* العنوان */}
      <div className="text-2xl text-center py-10">
        {t(`congrat.step`)} <span className="text-3xl font-bold">{t(`congrat.You`)}</span> {t(`congrat.step1`)}
        </div>

      {/* الصورة أو الفيديو */}
      <div className="mt-6 w-64 h-80 flex justify-center items-center">
        <video autoPlay loop muted className="w-full h-full object-cover rounded-lg">
          <source src={bride} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* زر المتابعة */}
      
    </div>
    <div className="mx-28 mt-10 flex justify-end">
    <button
      className="w-36 h-12 bg-red-300 text-white  text-lg rounded-full shadow-md hover:bg-red-400 transition-all"
      onClick={() => navigate("/todo")}
    >
      {t(`congrat.button`)}
    </button>
  </div>
  </>
  ); 
}
