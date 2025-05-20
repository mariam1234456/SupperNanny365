import style from "../../components/Quick-Tips/Quick-Tips.module.css";
import { useState, useEffect } from "react";
import bottle1 from "../../assets/bottle1.png";
import Group from "../../assets/Group.png";
import Woman from "../../assets/Woman.png";
import bed from "../../assets/bed.png";
import Sleeping from "../../assets/Sleeping.png";
import life from "../../assets/life.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGender } from "../../Context/GenderContext";
import axios from "axios";
import i18n from "../../i18n";

const tips = [
  {
    id: 1,
    api: "https://marwabakry23.pythonanywhere.com/api/advice/bad/",
    icon: bed,
    category: "bad",
  },
  {
    id: 2,
    api: "https://marwabakry23.pythonanywhere.com/api/advice/baby/",
    icon: Sleeping,
    category: "baby",
  },
  {
    id: 3,
    api: "https://marwabakry23.pythonanywhere.com/api/advice/mother/",
    icon: Woman,
    category: "mother",
  },
  {
    id: 4,
    api: "https://marwabakry23.pythonanywhere.com/api/advice/bottle/",
    icon: bottle1,
    category: "bottle",
  },
  {
    id: 5,
    api: "https://marwabakry23.pythonanywhere.com/api/advice/moon/",
    icon: life,
    category: "moon",
  },
];


const fetchAdvice = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Accept-Language": i18n.language,
      },
    });
    const key = Object.keys(response.data).find((k) =>
      k.includes(i18n.language === "ar" ? "_ar" : "_en")
    );
    return response.data[key] || "No advice found.";
  } catch (error) {
    console.error("Error fetching advice:", error);
    return "Error loading advice.";
  }
};

export default function QuickTips() {
  const { t } = useTranslation();
  const { gender } = useGender();
  const [tipsList, setTipsList] = useState(tips);
  const [selectedTip, setSelectedTip] = useState({
    icon: tips[0].icon,
    text: "",
  });

  const [loading, setLoading] = useState(false);

  // تحميل النصيحة عند أول تحميل للصفحة
  // تحميل النصيحة عند أول تحميل للصفحة
useEffect(() => {
  const savedIndex = parseInt(localStorage.getItem("selectedTipIndex")) || 0;
  const tip = tipsList[savedIndex];

  if (tip) {
    setLoading(true);
    fetchAdvice(tip.api).then((text) => {
      setSelectedTip({ icon: tip.icon, text });
      setLoading(false);
    });
  }
}, []);

// تحميل النصيحة عند تغيير اللغة
useEffect(() => {
  const savedIndex = parseInt(localStorage.getItem("selectedTipIndex")) || 0;
  const tip = tipsList[savedIndex];

  if (tip) {
    setLoading(true);
    fetchAdvice(tip.api).then((text) => {
      setSelectedTip({ icon: tip.icon, text });
      setLoading(false);
    });
  }
}, [i18n.language]);

  const handleIconClick = async (index) => {
    const tip = tipsList[index];
    const newText = await fetchAdvice(tip.api);

    const newTipsList = [...tipsList];
    const prevIndex = tipsList.findIndex((t) => t.icon === selectedTip.icon);
    [newTipsList[prevIndex], newTipsList[index]] = [
      newTipsList[index],
      newTipsList[prevIndex],
    ];

    setTipsList(newTipsList);
setSelectedTip({ icon: tip.icon, text: newText, category: tip.category });

    // حفظ الاختيار في localStorage
    localStorage.setItem("selectedTipIndex", index);
  };

  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Group})` }}
    >
      <div className="flex item-center justify-center mt-8">
        <p
          className={`text-xl font-bold ${
            gender === "male"
              ? "bg-[#c5e1f6]"
              : gender === "female"
              ? "bg-[#f7bdf8]"
              : "bg-gray-300"
          } text-center text-white rounded-lg shadow-xl p-2`}
        >
          {t(`quicktips.text`)}
        </p>
      </div>

      <div className="flex flex-col justify-center items-center mt-44">
        <div className="bg-[#D9D9D9] rounded-lg shadow-md max-w-md relative flex flex-col justify-between min-h-[60px] px-4 pt-8 pb-4">
          <h3
            className={`text-lg font-semibold text-white rounded-lg absolute z-10 right-1/2 translate-x-1/2 -top-5 px-2 py-1 ${
              gender === "male"
                ? "bg-[#88c1ec]"
                : gender === "female"
                ? "bg-[#f7bdf8]"
                : "bg-gray-900"
            }`}
          >
            {t(`quicktips.advice`)}
          </h3>

          <div className="flex items-start gap-3 overflow-auto max-h-[70px] mt-2">
            <img src={selectedTip.icon} className="w-6 h-6 mt-1" alt="" />
            <p className="text-gray-700 font-bold">
              {loading ? t("quicktips1.loading") : selectedTip.text}
            </p>
          </div>

          <Link
  to={`/howto/${selectedTip.category}`}
              className={`${
              gender === "male"
                ? "bg-[#88c1ec]"
                : gender === "female"
                ? "bg-[#f7bdf8]"
                : "bg-gray-300"
            } text-lg font-semibold px-2 rounded-lg text-white mt-2 self-end cursor-pointer z-10`}
          >
            {t(`quicktips.read`)}
          </Link>
        </div>

        <div className="grid grid-cols-3 relative w-full h-48 gap-6 -mt-36">
          {tipsList.map((tip, index) => {
            const radius = 200;
            const angle =
              (index / tipsList.length) * 2 * Math.PI - Math.PI / 2;
            const x = Math.cos(angle) * (radius + 120);
            const y = Math.sin(angle) * (radius + 10);

            return (
              <img
                key={tip.id}
                src={tip.icon}
                alt="icon"
                className="w-16 h-16 cursor-pointer absolute transition-all duration-300 ease-in-out scale-150"
                onClick={() => handleIconClick(index)}
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform:
                    index === tips.length - 1 ? "translateX(-60px)" : "none",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
