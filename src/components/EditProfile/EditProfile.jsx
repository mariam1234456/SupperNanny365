import { Link, NavLink, useNavigate } from "react-router-dom";
import style from "./EditProfile.module.css";
import React from "react";
import { useTranslation } from "react-i18next";
import { useGender } from "../../Context/GenderContext";

export default function EditProfile() {
  const navigate=useNavigate();
  const {t}= useTranslation();
  const {gender}=useGender();
  return (
    <>
      <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
        gender === "male"
          ? "bg-[#c5e1f6]"
          : gender === "female"
          ? "bg-[#f6c5f7]"
          : "bg-gray-300"
      }  p-8 rounded-lg shadow-lg w-96 ${style.editpro}`}>
        <h3 className={`text-center text-[#1E1E1E] text-2xl mb-5 ${style.edittext}`}>{t(`editPro.edit`)}</h3>
        <div className="space-y-3"> 
          <input
            type="text"
            placeholder="Puerto"
            className="w-full p-2 bg-[#F3F8FF] border-gray-300 rounded-lg mb-2"
          />
          <input
              type="text"
              placeholder="Rico"
              className="w-full p-2 bg-[#F3F8FF] border-gray-300 rounded-lg mb-2"
            />
            <input
              type="email"
              placeholder="youremail@domain.com"
              className="w-full p-2 bg-[#F3F8FF] border-gray-300 rounded-lg mb-2"
            />
             <input
              type="email"
              placeholder="youremail@domain.com"
              className="w-full p-2 bg-[#F3F8FF] border-gray-300 rounded-lg mb-2"
            />
             <input
              type="phone"
              placeholder="01096477256"
              className="w-full p-2 bg-[#F3F8FF] border-gray-300 rounded-lg mb-2 "
            />
            <button onClick={() => navigate("/todo/profile")} className="w-full bg-[#2C2C2C] hover:bg-slate-600 text-white py-2 my-2 rounded-full">
              {t(`editPro.Submit`)}
            </button>
        </div>
        
      </div>
    </>
  );
}
