
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import woman from "../../assets/woman.png";
import Sleeping from "../../assets/Sleeping.png";
import life from "../../assets/life.png";
import bottle1 from "../../assets/bottle1.png";
import su from "../../assets/su.png";
import bed from "../../assets/bed.png";
import style from "./How-To.module.css";


const categoryIcons = {
  mother: woman,
  baby: Sleeping,
  moon: life,
  bottle: bottle1,
  bad: bed,
};
const getCategoryColor = (category) => {
  switch (category) {
    case "mother":
      return "bg-[#dac2a9]";
    case "baby":
      return "bg-[#f1e2a6]";
    case "bottle":
      return "bg-[#b2f2bb]";
    case "bad":
      return "bg-gray-400";
    case "moon":
      return "bg-[#ecaab7]";
    default:
      return "bg-gray-200";
  }
};

const apiMap = {
  mother: "https://marwabakry23.pythonanywhere.com/api/howto/mother/",
  baby: "https://marwabakry23.pythonanywhere.com/api/howto/baby/",
  moon: "https://marwabakry23.pythonanywhere.com/api/howto/moon/",
  bad: "https://marwabakry23.pythonanywhere.com/api/howto/bad/",
  bottle: "https://marwabakry23.pythonanywhere.com/api/howto/bottle/",
};

export default function HowTo() {
  const { category } = useParams();
  const { t, i18n } = useTranslation();
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
const highlightedId = parseInt(searchParams.get("highlighted"), 10); // convert to number

  useEffect(() => {
      
    
const fetchTips = async () => {
  try {
    if (!category || category === "all") {
      let allTips = [];

      for (const key in apiMap) {
        const response = await axios.get(apiMap[key], {
          headers: { "Accept-Language": i18n.language },
        });

        const categoryTips = response.data.map((item) => ({
  id: item.id,
  content: item.content,
  category: key,
}));


        allTips = [...allTips, ...categoryTips];
      }

      setTips(allTips);
    } else {
      // حالة تصنيف واحد
      const response = await axios.get(apiMap[category], {
        headers: { "Accept-Language": i18n.language },
      });

      const fetchedTips = response.data.map((item) => ({
  id: item.id,
  content: item.content,
  category: category,
}));


      setTips(fetchedTips);
    }
  } catch (error) {
    console.error("Failed to fetch tips:", error);
    setTips([]);
  } finally {
    setLoading(false);
  }
};

    fetchTips();
  }, [category, i18n.language]);

  return (

<div className="flex flex-col lg:flex-row items-start gap-9 p-6">
  {/* الصورة تبقى ثابتة في الأعلى */}
  <div className="sticky top-0 self-start">
    <img src={su} className="w-2/3 h-2/3 mt-10" alt="" />
  </div>

  {/* الكروت */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-1/2">
    {loading ? (
    <div className={`${style.loader_container}`}>
          <span className={`${style.loader}`}></span>

    </div>

    ) : tips.length === 0 ? (
      <p className="text-center col-span-2">{t("notips")}</p>
    ) : (
      tips.map((tip, index) => {
  console.log("tip.id:", tip.id, "category:", tip.category); // 👈 هنا

  return (
    <div
      key={index}
      className={`p-6 rounded-xl shadow-md hover:scale-105 cursor-pointer transition-transform duration-200
        ${getCategoryColor(tip.category)}
          
        }
      `}
    >
      <img
        src={categoryIcons[tip.category]}
        alt="icon"
        className="w-12 h-12 mb-4 mx-auto"
      />
      <p className="text-sm text-center">{tip.content}</p>
    </div>
  );
})

    )}
  </div>
</div>

  );
}
