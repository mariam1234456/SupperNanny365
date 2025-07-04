
import style from "../../components/Child-Tracker/Child-Tracker.module.css";
import React, { useContext, useEffect, useState } from "react";
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

import axios from "axios";
import i18n from "../../i18n";
import toast from "react-hot-toast";
import { PhotoContext } from "../../Context/photoContext";
import GrowthChart from "../GrowthChar/GrowthChar";

export default function ChildTracker() {
  const [error, setError] = useState("");
  const [growthDate, setGrowthDate] = useState("");
  const [refreshGrowthKey, setRefreshGrowthKey] = useState(0);
  const [hasData, setHasData] = useState(false);
const [weightStatus, setWeightStatus] = useState(null);
const [heightStatus, setHeightStatus] = useState(null);
const [showGrowthModal, setShowGrowthModal] = useState(false);

  const [feeding, setfeeding] = useState("");
  const [sleeping, setsleeping] = useState("");
  const [diaper, setdiaper] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [feedingStatus, setFeedingStatus] = useState("");
  const [sleepingStatus, setSleepingStatus] = useState("");
  const [diaperStatus, setDiaperStatus] = useState("");
  const { t, i18n } = useTranslation();
const [isFirstVisit, setIsFirstVisit] = useState(() => {
  const stored = localStorage.getItem("isFirstVisit");
  return stored === null ? true : stored === "true";
});

  const { photoUrl, uploadPhoto, updatePhoto } = useContext(PhotoContext);

  const [valueHeight, setValueHeight] = useState();
  const [valueWeight, setValueWeight] = useState();
  const [valueTemperature, setValueTemperature] = useState();
  const [valueVaccination, setValueVaccination] = useState();
  const [childData, setChildData] = useState(null);
  const babyId = localStorage.getItem("babyId");
  const [GrowthId, setGrowthId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [ChildId, setChildId] = useState(localStorage.getItem("childId"));

  //get baby name
  useEffect(() => {
    async function fetchChild() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const babyId = localStorage.getItem("babyId");
        const response = await axios.get(
          `https://marwabakry23.pythonanywhere.com/api/child/${babyId}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setChildData(response.data);
      } catch (err) {
        console.error("Error fetching child data:", err);
      }
    }
    fetchChild();
  }, []);

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

   // post daiper
  const handleRegisterChild = async () => {
    setisLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const language = localStorage.getItem("language") || "en";
      const response = await axios.post(
        "https://marwabakry23.pythonanywhere.com/api/register-child/",
        {
          pre_id: Number(babyId),
          feedings: parseFloat(feeding),
          sleeping: parseFloat(sleeping),
          Diapers: parseFloat(diaper),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": language,
          },
        }
      );
      setFeedingStatus(response.data.feedings_status);
      setSleepingStatus(response.data.sleeping_status);
      setDiaperStatus(response.data.diapers_status);
      localStorage.setItem("childId", response.data.id);
      toast.success(t("welcome.succes"));
      await fetchChildData();
      setHasData(true); // ✅ ← يخلّي الزر Edit يظهر بعد أول Submit
      // ← اتأكد إنها موجودة فوق برا useEffect
    } catch (error) {
      console.error("خطأ في الإرسال:", error.response?.data || error);
      toast.error(t("welcome.error"));
    } finally {
      setisLoading(false);
    }
  };

  //get data diaper

  const fetchChildData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const language = i18n.language;
      const response = await axios.get(
        "https://marwabakry23.pythonanywhere.com/api/register-child/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Accept-Language": language,
          },
        }
      );
      const currentChild = response.data.find(
        (item) => item.pre === Number(babyId)
      );
      if (currentChild) {
        setfeeding(currentChild.feedings);
        setsleeping(currentChild.sleeping);
        setdiaper(currentChild.Diapers);
        setFeedingStatus(currentChild.feedings_status);
        setSleepingStatus(currentChild.sleeping_status);
        setDiaperStatus(currentChild.diapers_status);
        setChildId(currentChild.id);
        localStorage.setItem("childId", currentChild.id);
        setHasData(true); // ✅ ← أهم خطوة
      } else {
        setHasData(false); // مفيش بيانات لسه
      }
    } catch (err) {
      console.error("Error fetching child data:", err);
      setHasData(false); // مفيش بيانات لسه
    }
  };
  useEffect(() => {
    fetchChildData();
  }, [babyId, i18n.language]);

 
  //update diaper
  const handleUpdateChild = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const language = localStorage.getItem("language") || "en";
      const babyId = localStorage.getItem("babyId");

      const response = await axios.put(
        `https://marwabakry23.pythonanywhere.com/api/child/${babyId}/update/`,
        {
          feedings: parseFloat(feeding),
          sleeping: parseFloat(sleeping),
          Diapers: parseFloat(diaper),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": language,
          },
        }
      );

      toast.success(t("welcome.success"));
      await fetchChildStatus(); // ← هنعملها دلوقتي

      setIsEditing(false);
    } catch (error) {
      console.error("❌ فشل التعديل:", error.response?.data || error);
      toast.error(t("welcome.error1"));
    }
  };

  const fetchChildStatus = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const language = localStorage.getItem("language") || "en";

      const res = await axios.get(
        "https://marwabakry23.pythonanywhere.com/api/register-child/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": language,
          },
        }
      );

      const data = res.data[0];

      setFeedingStatus(data.feedings_status);
      setSleepingStatus(data.sleeping_status);
      setDiaperStatus(data.diapers_status);
    } catch (err) {
      console.error(" Error fetching updated status:", err);
    }
  };

  const handleImageAction = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (photoUrl) {
      updatePhoto(file); // تحديث
    } else {
      uploadPhoto(file); // رفع أول مرة
    }
  };
  // post hieght

  const postGrowthData = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const babyId = localStorage.getItem("babyId");
     const language = localStorage.getItem("language") || "en";


    const response = await axios.post(
      `https://marwabakry23.pythonanywhere.com/api/child/${babyId}/growth/`,
      {
        weight: parseFloat(valueWeight),
        height: parseFloat(valueHeight),
        date: growthDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": language,

        },
      }
    );

    toast.success(t("welcome.succes"));

    setWeightStatus(response.data.weight_status);
    setHeightStatus(response.data.height_status);
    setShowGrowthModal(true); 

    setGrowthId(response.data.id);
    setRefreshGrowthKey((prev) => prev + 1);
  } catch (error) {
    console.error("فشل في إرسال بيانات النمو:", error.response?.data || error);
    toast.error(t("welcome.error"));
  }
};


  //get height
  

useEffect(() => {
  const submittedBefore = localStorage.getItem("growthSubmitted") === "true";
  if (submittedBefore) {
    return;
  }

  const fetchGrowthData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const babyId = localStorage.getItem("babyId");
      const language = localStorage.getItem("language") || "en";

      const response = await axios.get(
        `https://marwabakry23.pythonanywhere.com/api/child/${babyId}/growth/view/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": language,
          },
        }
      );

      const latestGrowth = response.data?.[0];

      if (latestGrowth) {
        setValueHeight(latestGrowth.height);
        setValueWeight(latestGrowth.weight);
        setGrowthDate(latestGrowth.date);
        setGrowthId(latestGrowth.id);
      }
    } catch (error) {
      console.error(" فشل في جلب بيانات النمو:", error.response?.data || error);
    }
  };

  fetchGrowthData();
}, [babyId]);




  //update
  const updateGrowthData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const language = localStorage.getItem("language") || "en";
      const babyId = localStorage.getItem("babyId");

      const response = await axios.put(
        `https://marwabakry23.pythonanywhere.com/api/growth-records/${babyId}/${GrowthId}/update/`,
        {
          weight: parseFloat(valueWeight),
          height: parseFloat(valueHeight),
          date: growthDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(t("welcome.success"));

      setIsEditing(false);
    } catch (error) {
      console.error("❌ فشل التعديل:", error.response?.data || error);
      toast.error(t("welcome.error1"));
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row min-h-screen bg-[#f7eddf] p-4 md:p-7 rounded-xl"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      {/* (الصورة الشخصية) */}
      <div className="flex-shrink-0 flex justify-center md:justify-start mb-6 md:mb-0">
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src={photoUrl || imog}
              alt="Profile"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
            />
            <label
              htmlFor="upload-photo"
              className="absolute bottom-0 right-0 cursor-pointer"
            >
              <i className="fas fa-upload bg-white rounded-full p-1 text-sm"></i>
            </label>
            <input
              id="upload-photo"
              type="file"
              accept="image/*"
              onChange={handleImageAction}
              className="hidden"
            />
          </div>

          {childData ? (
            <>
              {" "}
              <h3 className="mt-3 text-md font-semibold">{childData.baby}</h3>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      {/*(Feeding, Sleeping, Diaper) */}

      <div className="flex-1 w-full  md:w-2/6 px-4 md:px-6 mb-6 md:mb-0">
        <div className="grid grid-cols-1 xl:grid-cols-3 mt-6 gap-8">
          {/* Feeding */}
          <div className="bg-white p-5 rounded-xl w-48 shadow-md  max-w-xs mx-auto">
            <div className="flex items-center space-x-4 space-x-reverse">
              <img
                src={bottle}
                alt="Feeding"
                className="w-9 h-9 bg-[#fadaaf] rounded-lg"
              />
              <h2 className="text-lg font-bold text-black">
                &ensp;{t(`childtracker.feeding`)}
              </h2>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse mb-5 mt-4">
              <input
                type="text"
                value={feeding}
                onChange={(e) => setfeeding(e.target.value)}
                // disabled={!isEditing}
                className="p-2 border font-bold border-gray-300 w-12 rounded-lg text-center"
                style={{ appearance: "textfield" }}
              />
              <p className="text-black">&ensp;{t(`childtracker.m`)}</p>
            </div>
            <span className="text-black bg-[#fadaaf] px-2 font-semibold">
              {feedingStatus}
            </span>
          </div>

          {/* Sleeping */}
          <div className="bg-white p-5 rounded-xl shadow-md w-48 max-w-xs mx-auto">
            <div className="flex items-center space-x-4 space-x-reverse">
              <img
                src={Sleeping}
                alt="Sleeping"
                className="w-9 h-9 bg-[#f3dae0] rounded-lg"
              />
              <h2 className="text-lg font-bold text-black">
                &ensp;{t(`childtracker.sleeping`)}
              </h2>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse mb-5 mt-4">
              <input
                type="text"
                value={sleeping}
                onChange={(e) => setsleeping(e.target.value)}
                // disabled={!isEditing}
                className="p-2 border font-bold border-gray-300 w-12 rounded-lg text-center"
                style={{ appearance: "textfield" }}
              />
              <p className="text-black">&ensp;{t(`childtracker.day`)}</p>
            </div>
            <span className="text-black bg-[#f3dae0] px-2 font-semibold">
              {sleepingStatus}
            </span>
          </div>

          {/* Diaper */}
          <div className="bg-white p-5 rounded-xl shadow-md w-48 max-w-xs mx-auto">
            <div className="flex items-center space-x-4 space-x-reverse">
              <img
                src={Baby2}
                alt="Diaper"
                className="w-9 h-9 bg-[#D0FBFF] rounded-lg"
              />
              <h2 className="text-lg font-bold text-black">
                &ensp;{t(`childtracker.diaper`)}
              </h2>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse mb-5 mt-4">
              <input
                type="text"
                value={diaper}
                onChange={(e) => setdiaper(e.target.value)}
                // disabled={!isEditing}
                className="p-2 border font-bold border-gray-300 w-12 rounded-lg text-center"
                style={{ appearance: "textfield" }}
              />
              <p className="text-black">&ensp;{t(`childtracker.h`)}</p>
            </div>
            <span className="text-black bg-[#D0FBFF] px-2 font-semibold">
              {diaperStatus}
            </span>
          </div>
        </div>
        
        
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          {/* زرار التسجيل أو الحفظ المشترك */}
          {!hasData || isEditing ? (
            <button
              type="submit"
              onClick={async () => {
                if (isEditing) {
                  await handleUpdateChild();
                  setIsEditing(false);
                } else {
                  await handleRegisterChild();
                  setHasData(true); // ← أول ما يسجل بيانات يظهر الزر Edit
                }
              }}
              className={`flex items-center gap-2 px-6 py-2 rounded-full shadow-md transition-all duration-300 
        ${
          isEditing
            ? "bg-[#bd90aa] hover:bg-[#8d647c]"
            : "bg-[#3a97a3] hover:bg-[#176974]"
        } 
        text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={isLoading}
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <>
                  <i
                    className={`fas ${
                      isEditing ? "fa-save" : "fa-paper-plane"
                    }`}
                  ></i>
                  <span>
                    {t(isEditing ? "translation.Save" : "forget.submit")}
                  </span>
                </>
              )}
            </button>
          ) : null}

          {/* زرار التعديل يظهر فقط لو فيه بيانات ومش في وضع تعديل */}
          {hasData && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#997744] hover:bg-yellow-600 text-white shadow-md transition-all duration-300 font-semibold"
            >
              <i className="fas fa-edit"></i>
              <span>{t("childtracker.edit")}</span>
            </button>
          )}
        </div>

        {/* صورة الطفل */}
        <div className="flex justify-center mt-20">
          <img
            src={baby3}
            className="w-40 h-40 max-w-full object-cover"
            alt="Baby"
          />
        </div>
      </div>

      <div className="flex-1 w-full lg:w-3/6 px-4 md:px-6">
        {/* date*/}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          <input
            type="date"
            value={growthDate}
            onChange={(e) => setGrowthDate(e.target.value)}
            className="w-2/4 p-3 m-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        {/* Height and Weight */}
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-6 mb-6">
          <div className="bg-[#F8DEBD] p-4 rounded-xl shadow-md w-52 max-w-xs mx-auto relative">
            <img
              src={Measure}
              className="w-10 h-10 absolute -top-5 left-1/2 transform -translate-x-1/2"
              alt="Measure"
            />
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
            <img
              src={Scale}
              className="w-10 h-10 absolute -top-5 left-1/2 transform -translate-x-1/2"
              alt="Scale"
            />
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
        {/* زرار الطول و الوزن*/}
        <div className="flex justify-center mt-6">
          <button
            onClick={async () => {
             await postGrowthData();
setValueHeight("");
setValueWeight("");
setGrowthDate("");
localStorage.setItem("growthSubmitted", "true");
setIsFirstVisit(false);

            }}
            className="px-6 py-2  bg-[#3a97a3] hover:bg-[#176974] text-white font-semibold rounded-full shadow-md transition-all duration-300"
          >
            <i className="fas fa-chart-line mr-2"></i>
            {t("childtracker.sendGrowth")}
          </button>
        </div>
        {showGrowthModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
      <h3 className="text-lg font-bold mb-4">{t("childtracker.growthStatus")}</h3>
      <p>{t("childtracker.weightStatus")}: {weightStatus}</p>
      <p>{t("childtracker.heightStatus")}: {heightStatus}</p>
      <button
        onClick={() => setShowGrowthModal(false)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full"
      >
        {t("childtracker.close")}
      </button>
    </div>
  </div>
)}


        <GrowthChart refresh={refreshGrowthKey} />{" "}
       
      </div>
    </div>
  );
}
