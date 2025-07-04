
import { useNavigate } from "react-router-dom";
import style from "./EditProfile.module.css";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGender } from "../../Context/GenderContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditProfile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { gender } = useGender();

  const [childData, setChildData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true); //  حالة التحميل

  // تحميل البيانات الحالية للأم
  useEffect(() => {
    async function fetchChild() {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.get(
          `https://marwabakry23.pythonanywhere.com/api/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setChildData(response.data);
        setFirstName(response.data.first_name || "");
        setLastName(response.data.last_name || "");
        setEmail(response.data.email || "");
      } catch (err) {
        console.error("Error fetching child data:", err);
      } finally {
        setIsLoading(false); //  وقف التحميل بعد ما البيانات توصلك
      }
    }

    fetchChild();
  }, []);

  const handleUpdateMother = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        "https://marwabakry23.pythonanywhere.com/api/api/update-mother/",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("تم التحديث:", response.data.message);
      toast.success(response.data.message);
      // navigate("/todo/profile");
    } catch (error) {
      console.error("فشل في التحديث:", error.response?.data || error);
      toast.error("حدث خطأ أثناء التحديث");
    }
  };

  return (
    <div
      className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
        gender === "male"
          ? "bg-[#c5e1f6]"
          : gender === "female"
          ? "bg-[#f6c5f7]"
          : "bg-gray-300"
      } p-8 rounded-lg shadow-lg w-96 ${style.editpro}`}
    >
      <h3 className={`text-center text-[#1E1E1E] text-2xl mb-5 ${style.edittext}`}>
        {t(`editPro.edit`)}
      </h3>

      {isLoading ? (
        <p className="text-center text-lg font-medium text-gray-700">
<i className="fas fa-spinner fa-spin text-xl text-gray-800"></i>
        </p>
      ) : (
        <div className="space-y-3">
          {childData && (
            <>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 bg-[#F3F8FF] border-gray-300 rounded-lg mb-2"
                placeholder="First Name"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 bg-[#F3F8FF] border-gray-300 rounded-lg mb-2"
                placeholder="Last Name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-[#F3F8FF] border-gray-300 rounded-lg mb-2"
                placeholder="Email"
              />
            </>
          )}

          <button
            onClick={handleUpdateMother}
            className="w-full bg-[#2C2C2C] hover:bg-slate-600 text-white py-2 my-2 rounded-full"
          >
            {t(`editPro.Submit`)}
          </button>
        </div>
      )}
    </div>
  );
}
