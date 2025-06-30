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


// import { Link } from "react-router-dom";
// import style from "./Box.module.css";
// import React, { useState } from "react";
// import todo from "../../assets/todo.png";
// import face from "../../assets/facebook.png";
// import insta from "../../assets/instagram.png";
// import you from "../../assets/youtube.png";
// import tik from "../../assets/tiktok.png";
// import { useTranslation } from "react-i18next";

// export default function Box() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showIcons, setShowIcons] = useState(false);
//   const { t, i18n } = useTranslation();
//   const isRtl = i18n.language === "ar"; 

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <button
//         id="dropdownDefaultButton"
//         onClick={toggleSidebar}
//         className="text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center absolute top-5 ltr:-ml-11 rtl:-mr-11"
//         type="button"
//       >
//         <i className="fas fa-bars"></i>
//       </button>

//       <div
//         id="dropdown"
//         className={`z-10 bg-white divide-y shadow-lg divide-gray-100 w-[200px] h-[550px] dark:bg-gray-700 absolute top-20 ${
//           isRtl ? "right-0" : "left-0"
//         } transition-all duration-500 ease-in-out ${
//           isOpen ? "w-[200px]" : "w-0"
//         } overflow-hidden`}
//       >
//         <ul
//           className="py-2 text-sm text-gray-700 dark:text-gray-200"
//           aria-labelledby="dropdownDefaultButton"
//           dir={isRtl ? "rtl" : "ltr"} // تغيير اتجاه النصوص
//         >
//           <li>
//             <a
//               href="#"
//               className="block px-12 py-2 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
//             >
//               {t(`sidebar.ToDoList`)}
//             </a>
//             <img
//               src={todo}
//               alt=""
//               className={`w-4 h-4 absolute top-5 ${isRtl ? "right-7" : "left-7"}`}
//             />
//             <div className="w-full h-[1px] bg-gray-400 my-4"></div>
//           </li>
//           <li>
//             <Link
//               to="/todo"
//               className="block px-4 py-2 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
//             >
//               <i className={`fas fa-calendar-alt ${isRtl ? "ml-4" : "mr-4"}`}></i>
//               {t(`sidebar.TaskDay`)}
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/todo/import"
//               className="block px-4 py-2 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
//             >
//               <i className={`fas fa-star ${isRtl ? "ml-4" : "mr-4"}`}></i>
//               {t(`sidebar.Importance`)}
//             </Link>
//             <div className="w-full h-[1px] bg-gray-400 my-4"></div>
//           </li>
//           <li>
//             <Link
//               to="/todo/profile"
//               className="block px-4 py-2 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
//             >
//               <i className={`fas fa-user-circle ${isRtl ? "ml-4" : "mr-4"}`}></i>
//               {t(`sidebar.MyProfile`)}
//             </Link>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="block px-4 py-2 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
//               onClick={() => setShowIcons(!showIcons)}
//             >
//               <i
//                 className={`fas fa-hands-holding-circle ${
//                   isRtl ? "ml-4" : "mr-4"
//                 }`}
//               ></i>
//               {t(`sidebar.Comunity`)}
//             </a>
//             {showIcons && (
//               <div
//                 className={`absolute ${
//                   isRtl ? "right-0" : "left-0"
//                 } mt-2 flex flex-col space-y-2 bg-white p-3 shadow-lg rounded-lg`}
//               >
//                 <a
//                   href="https://facebook.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <img
//                     src={face}
//                     alt="Facebook"
//                     className="w-8 h-8 hover:scale-125 transition-transform duration-300"
//                   />
//                 </a>
//                 <a
//                   href="https://instagram.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <img
//                     src={insta}
//                     alt="Instagram"
//                     className="w-8 h-8 hover:scale-125 transition-transform duration-300"
//                   />
//                 </a>
//                 <a
//                   href="https://youtube.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <img
//                     src={you}
//                     alt="YouTube"
//                     className="w-8 h-8 hover:scale-125 transition-transform duration-300"
//                   />
//                 </a>
//                 <a
//                   href="https://tiktok.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <img
//                     src={tik}
//                     alt="TikTok"
//                     className="w-8 h-8 hover:scale-125 transition-transform duration-300"
//                   />
//                 </a>
//               </div>
//             )}
//           </li>
//           <li>
//             <div className="w-full h-[1px] bg-gray-400 shadow-lg absolute bottom-11"></div>
//             <a
//               href="#"
//               className="block px-4 py-2 absolute bottom-1 hover:bg-[#F49AF6] dark:hover:bg-gray-600 dark:hover:text-white"
//             >
//               <i className={`fas fa-sign-out-alt ${isRtl ? "ml-4" : "mr-4"}`}></i>
//               {t(`sidebar.LogOut`)}
//             </a>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import style from "./Box.module.css";
import React, { useContext, useState } from "react";
import todo from "../../assets/todo.png";
import face from "../../assets/facebook.png";
import insta from "../../assets/instagram.png";
import you from "../../assets/youtube.png";
import tik from "../../assets/tiktok.png";
import { useTranslation } from "react-i18next";
import { TokenContext } from "../../Context/TokenContext";
import { useGender } from "../../Context/GenderContext";

export default function Box() {
    const { gender ,setGender} = useGender();
  
  let navigate =useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
let { token, setToken } = useContext(TokenContext);
function handelLogout(){
localStorage.removeItem("accessToken");
localStorage.removeItem("refreshToken");
localStorage.removeItem("babyId");
localStorage.removeItem("childId");
localStorage.removeItem("motherId");
localStorage.removeItem("baby");
localStorage.removeItem("gender");
localStorage.removeItem("taskId");
localStorage.removeItem("tasks");
localStorage.removeItem("gender");

    // تصفير الجندر في السياق
    setGender("");





setToken(null);
navigate("/login")

}
  return (
    <>
      <button
        id="dropdownDefaultButton"
        onClick={toggleSidebar}
        className="text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center absolute top-5 ltr:-ml-11 rtl:-mr-11"
        type="button"
      >
        <i className="fas fa-bars"></i>
      </button>

      <div
        id="dropdown"
        className={`z-10 bg-white divide-y shadow-lg divide-gray-100 dark:bg-gray-700 absolute top-20 ${
          isRtl ? "right-0" : "left-0"
        } transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : isRtl ? "translate-x-64" : "-translate-x-64"
        } w-[200px] h-[550px]`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
          dir={isRtl ? "rtl" : "ltr"}
        >
          <li>
            <a
              href="#"
              className={`block px-12 py-2 ${
                gender === "male"
                  ? "hover:bg-[#c5e1f6]"
                  : gender === "female"
                  ? "hover:bg-[#F49AF6]"
                  : "bg-gray-300"
              } dark:hover:bg-gray-600 dark:hover:text-white`}
            >
              {t(`sidebar.ToDoList`)}
            </a>
            <img
              src={todo}
              alt=""
              className={`w-4 h-4 absolute top-5 ${isRtl ? "right-7" : "left-7"}`}
            />
            <div className="w-full h-[1px] bg-gray-400 my-4"></div>
          </li>
          <li>
            <Link
              to="/todo"
              className={`block px-4 py-2 ${
                gender === "male"
                  ? "hover:bg-[#c5e1f6]"
                  : gender === "female"
                  ? "hover:bg-[#F49AF6]"
                  : "bg-gray-300"
              } dark:hover:bg-gray-600 dark:hover:text-white`}
            >
              <i className={`fas fa-calendar-alt ${isRtl ? "ml-4" : "mr-4"}`}></i>
              {t(`sidebar.TaskDay`)}
            </Link>
          </li>
          <li>
            <Link
              to="/todo/import"
              className={`block px-4 py-2 ${
                gender === "male"
                  ? "hover:bg-[#c5e1f6]"
                  : gender === "female"
                  ? "hover:bg-[#F49AF6]"
                  : "bg-gray-300"
              } dark:hover:bg-gray-600 dark:hover:text-white`}            >
              <i className={`fas fa-star ${isRtl ? "ml-4" : "mr-4"}`}></i>
              {t(`sidebar.Importance`)}
            </Link>
            <div className="w-full h-[1px] bg-gray-400 my-4"></div>
          </li>
          <li>
            <Link
              to="/todo/profile"
              className={`block px-4 py-2 ${
                gender === "male"
                  ? "hover:bg-[#c5e1f6]"
                  : gender === "female"
                  ? "hover:bg-[#F49AF6]"
                  : "bg-gray-300"
              } dark:hover:bg-gray-600 dark:hover:text-white`}            >
              <i className={`fas fa-user-circle ${isRtl ? "ml-4" : "mr-4"}`}></i>
              {t(`sidebar.MyProfile`)}
            </Link>
          </li>
          <li>
            <a
              href="#"
              className={`block px-4 py-2 ${
                gender === "male"
                  ? "hover:bg-[#c5e1f6]"
                  : gender === "female"
                  ? "hover:bg-[#F49AF6]"
                  : "bg-gray-300"
              } dark:hover:bg-gray-600 dark:hover:text-white`}              onClick={() => setShowIcons(!showIcons)}
            >
              <i
                className={`fas fa-hands-holding-circle ${
                  isRtl ? "ml-4" : "mr-4"
                }`}
              ></i>
              {t(`sidebar.Comunity`)}
            </a>
            {showIcons && (
              <div
                className={`absolute ${
                  isRtl ? "right-0" : "left-0"
                } mt-2 flex flex-col space-y-2 bg-white p-3 shadow-lg rounded-lg`}
              >
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={face}
                    alt="Facebook"
                    className="w-8 h-8 hover:scale-125 transition-transform duration-300"
                  />
                </a>
                <a
                  href="https:// -- Instagram link -- "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={insta}
                    alt="Instagram"
                    className="w-8 h-8 hover:scale-125 transition-transform duration-300"
                  />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={you}
                    alt="YouTube"
                    className="w-8 h-8 hover:scale-125 transition-transform duration-300"
                  />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={tik}
                    alt="TikTok"
                    className="w-8 h-8 hover:scale-125 transition-transform duration-300"
                  />
                </a>
              </div>
            )}
          </li>
          <li>
            <div className="w-full h-[1px] bg-gray-400 shadow-lg absolute bottom-11"></div>
            <a
            onClick={()=>handelLogout()}
              href="#"
              className={`block px-4 py-2 absolute bottom-1 ${
                gender === "male"
                  ? "hover:bg-[#c5e1f6]"
                  : gender === "female"
                  ? "hover:bg-[#F49AF6]"
                  : "bg-gray-300"
              } dark:hover:bg-gray-600 dark:hover:text-white`}
            >
              <i className={`fas fa-sign-out-alt ${isRtl ? "ml-4" : "mr-4"}`}></i>
              {t(`sidebar.LogOut`)}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}