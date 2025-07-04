
import style from "./MyProfile.module.css";
import React, { useContext, useEffect, useState } from "react";
import imog from "../../assets/emogi.png";
import { Link, useNavigate } from "react-router-dom";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { useGender } from "../../Context/GenderContext";
import axios from "axios";
import { PhotoContext } from "../../Context/photoContext";

export default function MyProfile({ isSidebaropen }) {
  const { photoUrl } =useContext(PhotoContext);
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem("language", lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr"; // تغيير اتجاه الصفحة
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
  }, []);
  const [childData, setChildData] = useState(null); // لتخزين بيانات الطفل
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchChild() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const babyId = localStorage.getItem("babyId"); // ← تأكدي إنه متخزن

        const response = await axios.get(
          `https://marwabakry23.pythonanywhere.com/api/child/${babyId}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("re", response);
        console.log("Child data:", response.data);
        setChildData(response.data);
      } catch (err) {
        console.error("Error fetching child data:", err);
        setError("Failed to load child profile.");
      }
    }

    fetchChild();
  }, []);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { gender } = useGender();
  const getBackgroundColor = () => {
    if (gender === "female") return "#fa9af6";
    if (gender === "male") return "#c5e1f6";
    return "#F49AF6";
  };

  const getGradient = () => {
    if (gender === "female") {
      return "linear-gradient(to bottom, #f2f2f2, #fa9af6)"; // pink
    }
    if (gender === "male") {
      return "linear-gradient(to bottom, #f2f2f2, #c5e1f6)"; // blue
    }
    return "linear-gradient(to bottom, #f2f2f2, #fa9af6)"; // default
  };
  return (
    <div
      className={style.profileContainer}
      style={{ background: getBackgroundColor() }}
    >
      <div
        className={style.headerSection}
        style={{ background: getGradient() }}
      >
        <div className={style.avatarWrapper}>
          <img src={photoUrl || imog} alt="Avatar" className={style.avatar} />
          
        </div>
        {childData ? (
          <>
            <h2 className={style.userName}>{childData.baby}</h2>
            <p className={style.userInfo}>{childData.gender}</p>
            <p className={style.userInfo}> {childData.birth_date}</p>
          </>
        ) : (
          ""
        )}
      </div>

      <div
        className={style.optionsSection}
        style={{ background: getBackgroundColor() }}
      >
        <ul className={style.optionsList}>
          <div className={style.optionGroup}>
            <li className={style.optionItem}>
              <i className="fa-solid fa-gear text-gray-600"></i>
              <span className={style.optionText}>{t(`profile.settings`)}</span>
            </li>
          </div>

          <div className={style.optionGroup}>
            <li className={style.optionItem}>
              <i className="fa-solid fa-user-pen text-gray-600"></i>
              <Link to="/todo/profile/edit" className={style.optionLink}>
                {t(`profile.edit`)}
              </Link>
            </li>
            {/* <li className={style.optionItem}>
              <i className="fa-solid fa-baby text-gray-600"></i>
              <Link to="/todo/profile/baby" className={style.optionLink}>
                {t(`profile.baby`)}
              </Link>
            </li> */}
            {/* <li className={style.optionItem}>
              <i className="fa-solid fa-bell text-gray-600"></i>
              <span className={style.optionText}>
                {t(`profile.Notifacitions`)}
              </span>
              <label className={style.switch}>
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </li> */}
            <li className={style.optionItem}>
              <i className="fa-solid fa-language text-gray-600"></i>
              <span className={style.optionText}>{t(`profile.Language`)}</span>

              <div className={style.dropdownWrapper}>
                <select
                  onChange={(e) => changeLanguage(e.target.value)}
                  value={language}
                  className={`${style.dropdown} ${
                    language === "ar" ? style.rtl : ""
                  }`}
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
            </li>
          </div>

          <div className={style.optionGroup}>
            <li className={style.optionItem}>
              <i className="fa-solid fa-circle-question text-gray-600"></i>
              <span className={style.optionText}>{t(`profile.help`)}</span>
            </li>
            <li className={style.optionItem}>
              <i className="fa-solid fa-envelope text-gray-600"></i>
              <span className={style.optionText}>{t(`profile.contact`)}</span>
            </li>
            <li className={style.optionItem}>
              <i className="fa-solid fa-lock text-gray-600"></i>
              <span className={style.optionText}>{t(`profile.Privacy`)}</span>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
