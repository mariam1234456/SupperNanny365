
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import bride from "../../assets/bride.mp4";
import { useTranslation } from "react-i18next";
import { useGender } from "../../Context/GenderContext";
import axios from "axios";

export default function Congrat() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { gender } = useGender();

  const [showModal, setShowModal] = useState(false);
  const [motherName, setMotherName] = useState("");

  useEffect(() => {
    const getMotherInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axios.get(
          "https://marwabakry23.pythonanywhere.com/api/userinfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMotherName(data.first_name);
      } catch (err) {
        console.error("Error fetching mother info:", err);
      }
    };

    getMotherInfo();
  }, []);

  return (
    <>
      <div className="bg-white flex flex-col justify-center items-center px-4">
        {/* العنوان */}
        <div className="text-2xl text-center py-10">
          {t(`congrat.step`)}{" "}
          <span className="text-3xl font-bold">{t(`congrat.You`)}</span>{" "}
          {t(`congrat.step1`)}
        </div>

        {/* الفيديو */}
        <div className="mt-6 w-64 h-80 flex justify-center items-center">
          <video autoPlay loop muted className="w-full h-full object-cover rounded-lg">
            <source src={bride} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* زر المتابعة والمودال */}
      <div className="mx-28 mt-10 flex justify-end">
        <button
          className="w-36 h-12 bg-red-300 text-white text-lg rounded-full shadow-md hover:bg-red-400 transition-all"
          onClick={() => setShowModal(true)}
        >
          {t(`congrat.button`)}
        </button>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
              <h2 className="text-xl font-bold text-green-600 mb-4">
                {t("welcome.hi")} {motherName}،
              </h2>

              <p className="text-gray-700 mb-4">{t("welcome.succes1")}</p>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
                <span>{t("welcome.success2")}</span>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/todo");
                }}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
              >
                {t(`congrat.button`)}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
