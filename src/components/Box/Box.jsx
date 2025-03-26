// import { Link, useLocation } from "react-router-dom"
// import style from "./Box.module.css"
// import React from 'react'
// import todo from "../../assets/todo.png";
// import face from "../../assets/facebook.png";
// import insta from "../../assets/instagram.png";
// import you from "../../assets/youtube.png";
// import tik from "../../assets/tiktok.png";
// import { useState } from "react";
// import { useTranslation } from "react-i18next";


// export default function Box() {
//   const [showIcons, setShowIcons] = useState(false);
//   const {t} = useTranslation();

//   return (
//     <>
//     <button
//                     id="dropdownDefaultButton"
//                     data-dropdown-toggle="dropdown"
//                     className="text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
//                     type="button"
//                   >
//                     <i className="fas fa-bars"></i>
//                   </button>
    
//                   <div
//                     id="dropdown"
//                     className="z-10 hidden bg-white divide-y shadow-lg divide-gray-100 w-[200px] h-[550px] dark:bg-gray-700"
//                   >
//                     <ul
//                       className="py-2 text-sm text-gray-700 dark:text-gray-200"
//                       aria-labelledby="dropdownDefaultButton"
//                     >
//                       <li>
//                         <a
//                           href="#"
//                           className="block px-12 py-2 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
//                         >
//                           {t(`sidebar.ToDoList`)}
//                         </a>
//                         <img
//                           src={todo}
//                           alt=""
//                           className="w-4 h-4 fixed top-5 left-7"
//                         />
//                         <div className="w-full h-[1px] bg-gray-400 my-4"></div>
//                       </li>
//                       <li>
//                         <Link
//                           to="/todo"
//                           className="block px-4 py-2 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
//                         >
//                           <i className="fas fa-calendar-alt mx-4"></i>
//                           {t(`sidebar.TaskDay`)}
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/todo/import"
//                           className="block px-4 py-2 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
//                         >
//                           <i className="fas fa-star mx-4"></i>
//                           {t(`sidebar.Importance`)}
//                         </Link>
//                         <div className="w-full h-[1px] bg-gray-400 my-4"></div>
//                       </li>
//                       <li>
//                         <Link
//                           to="/todo/profile"
//                           className="block px-4 py-2 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
//                         >
//                           <i className="fas fa-user-circle mx-4"></i>
//                           {t(`sidebar.MyProfile`)}
//                         </Link>
//                       </li>
//                       <li>
//                         <a
//                           href="#"
//                           className="block px-4 py-2 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
//                           onClick={() => setShowIcons(!showIcons)}
//                         >
//                           <i className="fas fa-hands-holding-circle mx-4"></i>
//                           {t(`sidebar.Comunity`)}
//                         </a>
//                         {showIcons && (
//                           <div className="absolute left-0 mt-2 flex flex-col space-y-2 bg-white p-3 shadow-lg rounded-lg">
//                             <a
//                               href="https://facebook.com"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                             >
//                               <img
//                                 src={face}
//                                 alt="Facebook"
//                                 className="w-8 h-8 hover:scale-125 transition-transform duration-300"
//                               />
//                             </a>
//                             <a
//                               href="https://instagram.com"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                             >
//                               <img
//                                 src={insta}
//                                 alt="Instagram"
//                                 className="w-8 h-8 hover:scale-125 transition-transform duration-300"
//                               />
//                             </a>
//                             <a
//                               href="https://youtube.com"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                             >
//                               <img
//                                 src={you}
//                                 alt="YouTube"
//                                 className="w-8 h-8 hover:scale-125 transition-transform duration-300"
//                               />
//                             </a>
//                             <a
//                               href="https://tiktok.com"
//                               target="_blank"
//                               rel="noopener noreferrer"
//                             >
//                               <img
//                                 src={tik}
//                                 alt="TikTok"
//                                 className="w-8 h-8 hover:scale-125 transition-transform duration-300"
//                               />
//                             </a>
//                           </div>
//                         )}
//                       </li>
//                       <li>
//                         <div className="w-full h-[1px] bg-gray-400 shadow-lg fixed bottom-11"></div>
//                         <a
//                           href="#"
//                           className="block px-4 py-2 fixed bottom-2 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
//                         >
//                           <i className="fas fa-sign-out-alt mx-4"></i>
//                           {t(`sidebar.LogOut`)}
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//     </>
//   )
// }
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import todo from "../../assets/todo.png";
import face from "../../assets/facebook.png";
import insta from "../../assets/instagram.png";
import you from "../../assets/youtube.png";
import tik from "../../assets/tiktok.png";
import style from "./Box.module.css"
import { useTranslation } from "react-i18next";

export default function Box() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {/* زر فتح وإغلاق القائمة */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* القائمة الجانبية */}
      <div
        className={`z-10 bg-white shadow-lg w-[250px] h-full fixed top-0 left-0 transform transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          <li className="flex items-center px-4 py-2">
            <img src={todo} alt="" className="w-5 h-5 mr-3" />
            {t("sidebar.ToDoList")}
          </li>

          <li>
            <Link
              to="/todo"
              className="block px-4 py-2 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <i className="fas fa-calendar-alt mx-4"></i>
              {t("sidebar.TaskDay")}
            </Link>
          </li>

          <li>
            <Link
              to="/todo/import"
              className="block px-4 py-2 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <i className="fas fa-star mx-4"></i>
              {t("sidebar.Importance")}
            </Link>
          </li>

          <li>
            <Link
              to="/todo/profile"
              className="block px-4 py-2 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <i className="fas fa-user-circle mx-4"></i>
              {t("sidebar.MyProfile")}
            </Link>
          </li>

          <li>
            <button
              onClick={() => setShowIcons(!showIcons)}
              className="w-full text-left px-4 py-2 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <i className="fas fa-hands-holding-circle mx-4"></i>
              {t("sidebar.Comunity")}
            </button>

            {/* إظهار الأيقونات عند الضغط */}
            {showIcons && (
              <div className="flex justify-around p-3">
                <a href="https://facebook.com" target="_blank">
                  <img src={face} alt="Facebook" className="w-8 h-8" />
                </a>
                <a href="https://instagram.com" target="_blank">
                  <img src={insta} alt="Instagram" className="w-8 h-8" />
                </a>
                <a href="https://youtube.com" target="_blank">
                  <img src={you} alt="YouTube" className="w-8 h-8" />
                </a>
                <a href="https://tiktok.com" target="_blank">
                  <img src={tik} alt="TikTok" className="w-8 h-8" />
                </a>
              </div>
            )}
          </li>

          <li>
            <button className="block w-full px-4 py-2 text-left hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white">
              <i className="fas fa-sign-out-alt mx-4"></i>
              {t("sidebar.LogOut")}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
