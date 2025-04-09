import style from "../How-To/How-To.module.css";
import React from "react";
import Woman from "../../assets/Woman.png";
import Sleeping from "../../assets/Sleeping.png";
import life from "../../assets/life.png";
import bottle1 from "../../assets/bottle1.png";
import su from "../../assets/su.png"
export default function HowTo() {
  const tipsData = [
    {
      id: 1,
      icon: bottle1, // استبدل بمسار الأيقونة الفعلي
      description:
        "Proper nutrition during a baby's first year is essential for healthy physical and mental development...",
      bgColor: "bg-[#f1e2a6]", // لون الخلفية
    },
    {
      id: 2,
      icon: Sleeping,
      description:
        "Sleep is essential for your baby's healthy growth, as it supports brain development, boosts immunity...",
      bgColor: "bg-[#debcf1]",
    },
    {
      id: 3,
      icon: Woman,
      description:
        "Spending time with your child and engaging in interactive activities enhances emotional connections...",
      bgColor: "bg-[#dac2a9] ",
    },
    {
      id: 4,
      icon: life,
      description:
        "Safety is the foundation for protecting your child from daily hazards. Ensure your home is safe...",
      bgColor: "bg-[#ecaab7]",
    },
    
  ];
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center gap-9 p-6">
        <div>
          <img src={su} className="w-2/3 h-2/3 mt-10" alt="" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-1/3">
          {tipsData.map((tip) => (
            <div
              key={tip.id}
              className={`p-6 rounded-xl shadow-md hover:scale-125 cursor-pointer ${tip.bgColor}`}
            >
              <img
                src={tip.icon}
                alt={tip.title}
                className="w-12 h-12 mb-4 mx-auto"
              />
              <p className="text-sm text-center">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
