// import style from "../How-To/How-To.module.css";
// import React from "react";
// import Woman from "../../assets/Woman.png";
// import Sleeping from "../../assets/Sleeping.png";
// import life from "../../assets/life.png";
// import bottle1 from "../../assets/bottle1.png";
// import su from "../../assets/su.png"
// export default function HowTo() {
//   const tipsData = [
//     {
//       id: 1,
//       icon: bottle1, // استبدل بمسار الأيقونة الفعلي
//       description:
//         "Proper nutrition during a baby's first year is essential for healthy physical and mental development...",
//       bgColor: "bg-[#f1e2a6]", // لون الخلفية
//     },
//     {
//       id: 2,
//       icon: Sleeping,
//       description:
//         "Sleep is essential for your baby's healthy growth, as it supports brain development, boosts immunity...",
//       bgColor: "bg-[#debcf1]",
//     },
//     {
//       id: 3,
//       icon: Woman,
//       description:
//         "Spending time with your child and engaging in interactive activities enhances emotional connections...",
//       bgColor: "bg-[#dac2a9] ",
//     },
//     {
//       id: 4,
//       icon: life,
//       description:
//         "Safety is the foundation for protecting your child from daily hazards. Ensure your home is safe...",
//       bgColor: "bg-[#ecaab7]",
//     },
    
//   ];
//   return (
//     <>
//       <div className="flex flex-col lg:flex-row items-center gap-9 p-6">
//         <div>
//           <img src={su} className="w-2/3 h-2/3 mt-10" alt="" />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-1/3">
//           {tipsData.map((tip) => (
//             <div
//               key={tip.id}
//               className={`p-6 rounded-xl shadow-md hover:scale-125 cursor-pointer ${tip.bgColor}`}
//             >
//               <img
//                 src={tip.icon}
//                 alt={tip.title}
//                 className="w-12 h-12 mb-4 mx-auto"
//               />
//               <p className="text-sm text-center">{tip.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useTranslation } from "react-i18next";
// import Woman from "../../assets/Woman.png";
// import Sleeping from "../../assets/Sleeping.png";
// import life from "../../assets/life.png";
// import bottle1 from "../../assets/bottle1.png";
// import su from "../../assets/su.png";
// import bed from "../../assets/bed.png";

// const categoryIcons = {
//   mother: Woman,
//   baby: Sleeping,
//   moon: life,
//   bottle: bottle1,
//   bad: bed,
// };
// const getCategoryColor = (category) => {
//   switch (category) {
//     case "mother":
//       return "bg-[#dac2a9]";
//     case "baby":
//       return "bg-[#f1e2a6]";
//     case "bottle":
//       return "bg-[#b2f2bb]";
//     case "bad":
//       return "bg-gray-400";
//     case "moon":
//       return "bg-[#ecaab7]";
//     default:
//       return "bg-gray-200";
//   }
// };

// export default function HowTo() {
//   const { category } = useParams();
//   const { t, i18n } = useTranslation();
//   const [tips, setTips] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const apiMap = {
//     mother: "https://marwabakry23.pythonanywhere.com/api/howto/mother/",
//     baby: "https://marwabakry23.pythonanywhere.com/api/howto/baby/",
//     moon: "https://marwabakry23.pythonanywhere.com/api/howto/moon/",
//     bad: "https://marwabakry23.pythonanywhere.com/api/howto/bad/",
//     bottle: "https://marwabakry23.pythonanywhere.com/api/howto/bottle/",
//   };

//   useEffect(() => {
//     const fetchTips = async () => {
//       try {
//         const response = await axios.get(apiMap[category], {
//           headers: {
//             "Accept-Language": i18n.language,
//           },
//         });
//         // هنا بنفترض إن البيانات كلها في "content"
//         const fetchedTips = response.data.map((item) => item.content);
//         setTips(fetchedTips);
//       } catch (error) {
//         console.error("Failed to fetch tips:", error);
//         setTips([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTips();
//   }, [category, i18n.language]);

//   return (
//     <div className="flex flex-col lg:flex-row items-center gap-9 p-6">
//       <div>
//         <img src={su} className="w-2/3 h-2/3 mt-10" alt="" />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-1/2">
//         {loading ? (
//           <p className="text-center col-span-2">{t("loading")}</p>
//         ) : tips.length === 0 ? (
//           <p className="text-center col-span-2">{t("notips")}</p>
//         ) : (
//           tips.map((description, index) => (
//            <div
//   key={index}
//   className={`p-6 rounded-xl shadow-md hover:scale-105 cursor-pointer text-white ${getCategoryColor(category)}`}
// >
//   <img
//     src={categoryIcons[category]}
//     alt="icon"
//     className="w-12 h-12 mb-4 mx-auto"
//   />
//   <p className="text-sm text-center">{description}</p>
// </div>

//           ))
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Woman from "../../assets/Woman.png";
import Sleeping from "../../assets/Sleeping.png";
import life from "../../assets/life.png";
import bottle1 from "../../assets/bottle1.png";
import su from "../../assets/su.png";
import bed from "../../assets/bed.png";
import style from "./How-To.module.css";


const categoryIcons = {
  mother: Woman,
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
// const highlightedId = searchParams.get("highlighted");
const highlightedId = parseInt(searchParams.get("highlighted"), 10); // convert to number

  useEffect(() => {
      
    
const fetchTips = async () => {
  try {
    // لو category undefined أو 'all' جيبي من كل APIs
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
//     <div className="flex flex-col lg:flex-row items-center gap-9 p-6 ">
//       <div>
//         <img src={su} className="w-2/3 h-2/3 mt-10" alt="" />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-1/2">
//         {loading ? (
//           <p className="text-center col-span-2">{t("loading")}</p>
//         ) : tips.length === 0 ? (
//           <p className="text-center col-span-2">{t("notips")}</p>
//         ) : (
//           tips.map((tip, index) => (
//   <div
//     key={index}
//     className={`p-6 rounded-xl shadow-md hover:scale-105 cursor-pointer ${getCategoryColor(tip.category)}`}
//   >
//     <img
//       src={categoryIcons[tip.category]}
//       alt="icon"
//       className="w-12 h-12 mb-4 mx-auto"
//     />
//     <p className="text-sm text-center">{tip.content}</p>
//   </div>
// ))

//         )}
//       </div>
//     </div>
<div className="flex flex-col lg:flex-row items-start gap-9 p-6">
  {/* الصورة تبقى ثابتة في الأعلى */}
  <div className="sticky top-0 self-start">
    <img src={su} className="w-2/3 h-2/3 mt-10" alt="" />
  </div>

  {/* الكروت */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-1/2">
    {loading ? (
    //  <i className="fas fa-spinner fa-spin flex justify-center items-center m-11 w-2/3 h-2/3"></i>
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
