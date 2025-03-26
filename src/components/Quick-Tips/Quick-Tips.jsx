import style from "../../components/Quick-Tips/Quick-Tips.module.css";
import React, { useState } from "react";
import bottle1 from "../../assets/bottle1.png";
import Group from "../../assets/Group.png";
import Woman from "../../assets/Woman.png";
import bed from "../../assets/bed.png";
import Sleeping from "../../assets/Sleeping.png";
import life from "../../assets/life.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const tips = [
  { id: 1, text: "Make sure to put your baby to sleep on his back to ensure his safety.", icon: bed },
  { id: 2, text: "Ensure your baby sleeps on their back to reduce the risk of SIDS.", icon: Sleeping },
  { id: 3, text: "Hold your baby securely when lifting them to prevent falls.", icon: Woman },
  { id: 4, text: "Make sure to breastfeed your baby every 2-3 hours to ensure healthy Growth.", icon: bottle1 },
  { id: 5, text: "Make sure to breastfeed your baby every 2-3 hours to ensure healthy Growth.", icon: life },
];

export default function QuickTips() {
  const {t} =useTranslation();
  const [selectedTip, setSelectedTip] = useState(tips[0]); // الأيقونة النشطة في الأعلى
  const [tipsList, setTipsList] = useState(tips); // بيخزن ترتيب الايقونات
  const handleIconClick = (index) => {
    const newTipsList = [...tipsList]; // نسخة جديدة من القائمة
    const previousIndex = tipsList.findIndex((tip) => tip.id === selectedTip.id);

    // تبادل الأماكن بين الأيقونة المختارة والأيقونة في الأعلى
    [newTipsList[previousIndex], newTipsList[index]] = [newTipsList[index], newTipsList[previousIndex]];

    // تحديث الحالة
    setSelectedTip(newTipsList[previousIndex]);
    setTipsList(newTipsList);
  };

  return (
    <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Group})` }}>
      <div className="flex item-center justify-center mt-8">
        <p className="text-xl font-bold bg-[#f7bdf8] text-center text-white rounded-lg shadow-xl p-2">
          {t(`quicktips.text`)}
        </p>
      </div>

      {/* مربع النص العلوي */}
      <div className="flex flex-col justify-center items-center mt-44">
        <div className="bg-[#D9D9D9] p-4 rounded-lg shadow-md max-w-md h-28 relative">
          <h3 className="text-lg font-semibold text-white mb-2 rounded-lg absolute z-10 right-48 -top-5 px-1 py-1 bg-[#F49AF6]">
          {t(`quicktips.advice`)}
          </h3>

          <div className="flex items-center gap-3 p-2">
            <img src={selectedTip.icon} className="w-6 h-6" alt="" />
            <p className="text-gray-700 font-bold">{selectedTip.text}</p>
          </div>

          <Link to="/howto" className="z-10 bg-[#F49AF6] text-lg font-semibold px-2 rounded-lg absolute right-4 text-white">
          {t(`quicktips.read`)}
          </Link>
        </div>

        {/* ترتيب الأيقونات في دائرة */}
        <div className="grid grid-cols-3 relative w-full h-48 gap-6 -mt-36">
          {tipsList.map((tip, index) => {
            const radius = 200;
            const angle = (index / tipsList.length) * 2 * Math.PI - Math.PI / 2;
            const x = Math.cos(angle) * (radius + 120);
            const y = Math.sin(angle) * (radius + 10);

            return (
              <img
                key={tip.id}
                src={tip.icon}
                alt="icon"
                className="w-16 h-16 cursor-pointer absolute transition-all duration-300 ease-in-out hover:scale-150"
                onClick={() => handleIconClick(index)}
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                  transform:index===tips.length-1?"translateX(-60px)":"none"
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

