// import React, { useState } from "react";
// import logo from "../../assets/suppernanny.png";
// import emogi from "../../assets/emogi.png";
// import bottle from "../../assets/bottle.png";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { useGender } from "../../Context/GenderContext";

// export default function Welcome() {
//   const { t } = useTranslation();
//   const [isLoading, setisLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [error1, setError1] = useState("");
//   const [babyId, setbabyId] = useState(null)
//   const { gender, setGender } = useGender();
//   console.log("Gender in component:", gender);

//   const navigate = useNavigate();

//   const handleGenderSelect = (selected) => {
//     setGender(selected);
//   };

//   const SignupSchema = Yup.object({
//     birth_date: Yup.date()
//       .required(t("form.required"))
//       .max(new Date(), t("form.date3")),
//   });

//   const formik = useFormik({
//     initialValues: {
//       birth_date: "",
//     },
//     validationSchema: SignupSchema,
//     onSubmit: (values) => {
//       birthDate(values);
//     },
//   });
// //داله لتجديد التوكين
//   async function refreshAccessToken() {
//     const refreshToken = localStorage.getItem("refreshToken");

//     if (!refreshToken) {
//       console.warn("No refresh token found.");
//       return null;
//     }

//     try {
//       const response = await axios.post(
//         "https://marwabakry23.pythonanywhere.com/api/token/refresh/",
//         { refresh: refreshToken }
//       );

//       const newAccess = response.data.access;

//       // خزّن التوكن الجديد في localStorage
//       localStorage.setItem("access", newAccess);

//       return newAccess;
//     } catch (error) {
//       console.error("Failed to refresh token:", error);
//       return null;
//     }
//   }
//   const motherId=localStorage.getItem("motherId")
//   async function birthDate(values) {
//     setisLoading(true);

//     const payload = {
//       mother:motherId,
//       gender: gender,
//       birth_date: values.birth_date

//     };

//     let accessToken = localStorage.getItem("accessToken");

//     try {
//       const { data } = await axios.post(
//         "https://marwabakry23.pythonanywhere.com/api/pre-register-child/",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       console.log(data);
//       setisLoading(false);
//       navigate("/congrate");
//       setbabyId(data.id);
//       localStorage.setItem("baby", JSON.stringify(data.child));
// localStorage.setItem("babyId", data.child.id);
// localStorage.setItem("gender", data.child.gender);
// setGender(data.child.gender);

//     } catch (err) {
//       // لو خطأ 401 نحاول نعمل refresh للتوكن
//       if (err.response?.status === 401) {
//         const newToken = await refreshAccessToken();

//         if (newToken) {
//           try {
//             // إعادة المحاولة بالتوكن الجديد
//             const { data } = await axios.post(
//               "https://marwabakry23.pythonanywhere.com/api/pre-register-child/",
//               payload,
//               {
//                 headers: {
//                   Authorization: `Bearer ${newToken}`,
//                 },
//               }
//             );

//             console.log(data);
//             setisLoading(false);
//             navigate("/congrate");
//             setbabyId(data.id);
//             localStorage.setItem("babyId", data.id);

//             return; // نخرج بعد النجاح
//           } catch (err2) {
//             console.error("Retry after token refresh failed:", err2);
//           }
//         }
//       }

//       // لو ما نجحنا أو الخطأ مش 401
//       console.error(err);
//       setError1(err.response?.data?.type);
//       setError(err.response?.data?.birth_date);
//       setisLoading(false);
//     }
//   }

//   return (
//     <>
//       <h1 className="text-[#DF5248] text-2xl text-center my-6">
//         <span className="text-[#DF5248] font-bold text-4xl">
//           {t(`welcome.welcome`)}
//         </span>{" "}
//         {t(`welcome.text`)}
//         <br />
//         {t(`welcome.text1`)}
//         <span className="text-[#DF5248] font-bold text-4xl">
//           {t(`welcome.baby`)}
//         </span>
//       </h1>

//       <div className="absolute top-14 right-10">
//         <img src={emogi} alt="Baby Icon" className="w-12 h-12" />
//       </div>

//       <div className="flex flex-col items-center lg:flex-row lg:justify-center gap-x-6 max-w-6xl mx-auto p-6">
//         <div className="flex-1 flex justify-center">
//           <img src={logo} alt="Hero" className="w-full max-w-sm" />
//         </div>

//         <div className="flex-1 bg-white rounded-lg p-6 w-full max-w-md">
//           <h2 className="text-2xl font-bold text-gray-700 mb-4">
//             {t(`welcome.choose`)}
//           </h2>

//           <p className="text-gray-600 mb-2">{t(`welcome.gender`)}</p>
//           {error1 && (
//             <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
//               {error1}
//             </div>
//           )}

//           <div className="flex gap-4 mb-4">
//             <button
//               type="button"
//               onClick={() => handleGenderSelect("male")}
//               className={`flex-1 p-3 border rounded-lg text-gray-700 hover:bg-red-100 ${
//                 gender === "male" ? "bg-red-200" : ""
//               }`}
//             >
//               {t(`welcome.male`)}
//             </button>

//             <button
//               type="button"
//               onClick={() => handleGenderSelect("female")}
//               className={`flex-1 p-3 border rounded-lg text-gray-700 hover:bg-red-100 ${
//                 gender === "female" ? "bg-red-200" : ""
//               }`}
//             >
//               {t(`welcome.female`)}
//             </button>
//           </div>

//           <p className="text-gray-600 mb-2">{t(`welcome.date`)}</p>
//           {error && (
//             <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
//               {error}
//             </div>
//           )}

//           {formik.touched.birth_date && formik.errors.birth_date && (
//             <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
//               {formik.errors.birth_date}
//             </div>
//           )}

//           <form onSubmit={formik.handleSubmit} className="relative">
//             <input
//               type="date"
//               name="birth_date"
//               id="birth_date"
//               onChange={formik.handleChange}
//               value={formik.values.birth_date}
//               onBlur={formik.handleBlur}
//               className="w-2/3 p-3 m-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//             />

//             <div className="flex justify-center items-center gap-4">
//               <button
//                 type="submit"
//                 className="w-full md:w-1/2 bg-red-500 text-white p-3 rounded-full font-semibold"
//               >
//                 {isLoading ? (
//                   <i className="fas fa-spinner fa-spin"></i>
//                 ) : (
//                   t(`register.button`)
//                 )}
//               </button>

//               <img src={bottle} alt="Baby Icon" className="w-12 h-12" />
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }




import React, { useState } from "react";
import logo from "../../assets/suppernanny.png";
import emogi from "../../assets/emogi.png";
import bottle from "../../assets/bottle.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useGender } from "../../Context/GenderContext";

export default function Welcome() {
  const { t } = useTranslation();
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [babyId, setbabyId] = useState(null);
  const { gender, setGender } = useGender();

  const navigate = useNavigate();

  const handleGenderSelect = (selected) => {
    setGender(selected);
  };

  const SignupSchema = Yup.object({
    baby: Yup.string()
      .required(t("form.required"))
      .min(2, t("form.nameTooShort")),
    birth_date: Yup.date()
      .required(t("form.required"))
      .max(new Date(), t("form.date3")),
  });

  const formik = useFormik({
    initialValues: {
      baby: "",
      birth_date: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      birthDate(values);
    },
  });

  async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      console.warn("No refresh token found.");
      return null;
    }

    try {
      const response = await axios.post(
        "https://marwabakry23.pythonanywhere.com/api/token/refresh/",
        { refresh: refreshToken }
      );

      const newAccess = response.data.access;
      localStorage.setItem("access", newAccess);
      return newAccess;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return null;
    }
  }

  const motherId = localStorage.getItem("motherId");

  async function birthDate(values) {
    setisLoading(true);

    const payload = {
      mother: motherId,
      baby: values.baby,
      gender: gender,
      birth_date: values.birth_date,
    };

    let accessToken = localStorage.getItem("accessToken");

    try {
      const { data } = await axios.post(
        "https://marwabakry23.pythonanywhere.com/api/pre-register-child2/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

console.log(data);
      setbabyId(data.child.id); // ← أول حاجة نحفظ الـ ID
localStorage.setItem("baby", JSON.stringify(data.child));
localStorage.setItem("babyId", data.child.id);
localStorage.setItem("gender", data.child.gender);
setGender(data.child.gender);
setisLoading(false);
navigate("/congrate"); // ← بعد ما نخلص التخزين

    } catch (err) {
      if (err.response?.status === 401) {
        const newToken = await refreshAccessToken();

        if (newToken) {
          try {
            const { data } = await axios.post(
              "https://marwabakry23.pythonanywhere.com/api/pre-register-child2/",
              payload,
              {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                },
              }
            );

            setisLoading(false);
            navigate("/congrate");
            setbabyId(data.id);
            localStorage.setItem("babyId", data.id);
            return;
          } catch (err2) {
            console.error("Retry after token refresh failed:", err2);
          }
        }
      }

      console.error(err);
      setError1(err.response?.data?.type);
      setError(err.response?.data?.birth_date);
      setisLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-[#DF5248] text-2xl text-center my-6">
        <span className="text-[#DF5248] font-bold text-4xl">
          {t(`welcome.welcome`)}
        </span>{" "}
        {t(`welcome.text`)}
        {/* <br /> */}
        {t(`welcome.text1`)}
        <span className="text-[#DF5248] font-bold text-4xl">
          {t(`welcome.baby`)}
        </span>
      </h1>

      <div className="absolute top-14 right-10">
        <img src={emogi} alt="Baby Icon" className="w-12 h-12" />
      </div>

      <div className="flex flex-col items-center lg:flex-row lg:justify-center gap-x-6 max-w-6xl mx-auto p-6">
        <div className="flex-1 flex justify-center">
          <img src={logo} alt="Hero" className="w-full max-w-sm" />
        </div>

        <div className="flex-1 bg-white rounded-lg p-6 w-full max-w-md">
          {/* <h2 className="text-2xl font-bold text-gray-700 mb-4">
            {t(`welcome.choose`)}
          </h2> */}

          <p className="text-gray-600 mb-2">{t(`welcome.gender`)}</p>
          {error1 && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
              {error1}
            </div>
          )}

          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => handleGenderSelect("male")}
              className={`flex-1 p-3 border rounded-lg text-gray-700 hover:bg-red-100 ${
                gender === "male" ? "bg-red-200" : ""
              }`}
            >
              {t(`welcome.male`)}
            </button>

            <button
              type="button"
              onClick={() => handleGenderSelect("female")}
              className={`flex-1 p-3 border rounded-lg text-gray-700 hover:bg-red-100 ${
                gender === "female" ? "bg-red-200" : ""
              }`}
            >
              {t(`welcome.female`)}
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className="relative">
            {/* اسم الطفل */}
            <p className="text-gray-600 mb-2">{t(`welcome.name`)}</p>
            {formik.touched.baby && formik.errors.baby && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                {formik.errors.baby}
              </div>
            )}
            <input
              type="text"
              name="baby"
              id="baby"
              onChange={formik.handleChange}
              value={formik.values.baby}
              onBlur={formik.handleBlur}
              className="w-2/3 p-3 m-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              placeholder={t("welcome.place")}
            />

            {/* تاريخ الميلاد */}
            <p className="text-gray-600 mb-2">{t(`welcome.date`)}</p>
            {error && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                {error}
              </div>
            )}
            {formik.touched.birth_date && formik.errors.birth_date && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
                {formik.errors.birth_date}
              </div>
            )}
            <input
              type="date"
              name="birth_date"
              id="birth_date"
              onChange={formik.handleChange}
              value={formik.values.birth_date}
              onBlur={formik.handleBlur}
              className="w-2/3 p-3 m-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            <div className="flex justify-center items-center gap-4">
              <button
                type="submit"
                className="w-full md:w-1/2 bg-red-500 text-white p-3 rounded-full font-semibold"
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  t(`register.button`)
                )}
              </button>

              <img src={bottle} alt="Baby Icon" className="w-12 h-12" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
