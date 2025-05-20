
// import { Link, useNavigate } from "react-router-dom";
// import React, { useContext, useState } from "react";
// import google from "../../assets/google.png";
// import logo from "../../assets/suppernanny.png";
// import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
// import { useTranslation } from "react-i18next";
// import i18n from "../../i18n";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";

// import { TokenContext } from "../../Context/TokenContext";
// import { useGender } from "../../Context/GenderContext";

// export default function register() {
//   const { updateMotherId } = useGender();
//   const [message, setmessage] = useState(null);
//   const [messageerr, setmessageerr] = useState(null);
//   const [isLoading, setisLoading] = useState(false);
//   const [motherId, setmotherId] = useState(null);
// let {token ,setToken}=useContext(TokenContext)


//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const isArabic = i18n.language === "ar";

//   const [showPassword, setShowPassword] = useState(true);
//   const [showPassword1, setShowPassword1] = useState(true);

//   const SignupSchema = Yup.object({
//     first_name: Yup.string()
//       .min(2, t("form.too_short"))
//       .max(15, t("form.too_long"))
//       .required(t("form.required")),
//     last_name: Yup.string()
//       .min(2, t("form.too_short"))
//       .max(15, t("form.too_long"))
//       .required(t("form.required")),
//     email: Yup.string().email(t("form.invalid")).required(t("form.required")),
//     password: Yup.string().required(t("form.required"))
//     // .matches(
//     //   /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%*?&]).{8,}$/,
//     //   t("form.pass")
//     // )
//     ,
//     confirm_password: Yup.string()
//       .required(t("form.required"))
//       .oneOf([Yup.ref("password")], t("form.match")),
//   });

//   const formik = useFormik({
//     initialValues: {
//       first_name: "",
//       last_name: "",
//       email: "",
//       password: "",
//       confirm_password: "",
//     },
//     validationSchema: SignupSchema,
//     onSubmit: (values) => {
//       registerForm(values);
//     },
//   });

//   async function registerForm(values) {
//     setisLoading(true);
//     return await axios
//       .post("https://marwabakry23.pythonanywhere.com/api/register/", values)
//       .then((data) => {
//         console.log(data);
//         console.log(data.data.message);
//         setmessage(data.data.message);
//         setmotherId(data.data.mother.id)
//         console.log(data.data.mother.id)
//         setToken({
//           access: data.data.access,
//           refresh: data.data.refresh,
//         });
  
//         localStorage.setItem("accessToken", data.data.access);
//         localStorage.setItem("refreshToken", data.data.refresh);
//         localStorage.setItem("motherId",data.data.mother.id);
//         updateMotherId(data.mother.id); // تحديث motherId في GenderContext
//         setisLoading(false)
//         navigate("/welcome");
        

//       })
//       .catch((err) => {
//         console.log(err.response.data.email);
//         setmessageerr(err.response.data.email);
//         setisLoading(false);
//       });
//   }

//   return (
//     <div
//       dir={isArabic ? "rtl" : "ltr"}
//       className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F1D8E8] to-[#BFDBE9] px-4 py-8"
//     >
//       <div className="relative bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-[900px] overflow-hidden">
//         {/* Close Button */}
//         <button
//           onClick={() => navigate("/")}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
//         >
//           <FaTimes size={20} />
//         </button>

//         {/* Form Section */}
//         <div className="flex-1 p-6 md:p-8">
//           <h2 className="text-2xl font-bold text-gray-800 mt-8">
//             {t(`register.create`)}
//           </h2>
//           <p className="text-gray-600 text-sm mb-7">
//             {t(`register.account`)}
//             <span
//               onClick={() => navigate("/login")}
//               className="text-blue-500 ml-2 cursor-pointer"
//             >
//               {t(`register.login`)}
//             </span>
//           </p>
//           {messageerr?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//             {messageerr}
// </div>:null          }
//           {message ? (
//             <div
//               className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
//               role="alert"
//             >
//               {message}
//             </div>
//           ) : null}
//           <form onSubmit={formik.handleSubmit} className="space-y-4">
//             <div className="flex flex-col md:flex-row gap-4 w-full">
//               <div className="w-full md:w-1/2">
//                 <input
//                   type="text"
//                   name="first_name"
//                   id="first_name"
//                   onChange={formik.handleChange}
//                   value={formik.values.first_name}
//                   onBlur={formik.handleBlur}
//                   placeholder={t(`register.first`)}
//                   className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//                 />
//                 {formik.touched.first_name && formik.errors.first_name ? (
//                   <div
//                     className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                     role="alert"
//                   >
//                     {formik.errors.first_name}
//                   </div>
//                 ) : null}
//               </div>

//               <div className="w-full md:w-1/2">
//                 <input
//                   type="text"
//                   name="last_name"
//                   id="last_name"
//                   onChange={formik.handleChange}
//                   value={formik.values.last_name}
//                   onBlur={formik.handleBlur}
//                   placeholder={t(`register.last`)}
//                   className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//                 />
//                 {formik.touched.last_name && formik.errors.last_name ? (
//                   <div
//                     className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                     role="alert"
//                   >
//                     {formik.errors.last_name}
//                   </div>
//                 ) : null}
//               </div>
//             </div>

//             <input
//               type="email"
//               name="email"
//               id="email"
//               onChange={formik.handleChange}
//               value={formik.values.email}
//               onBlur={formik.handleBlur}
//               placeholder={t(`register.email`)}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
//             />
//             {formik.touched.email && formik.errors.email ? (
//               <div
//                 className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                 role="alert"
//               >
//                 {formik.errors.email}
//               </div>
//             ) : null}

//             <div className="relative">
//               <input
//                 type={showPassword ? "password" : "text"}
//                 name="password"
//                 id="password"
//                 onChange={formik.handleChange}
//                 value={formik.values.password}
//                 onBlur={formik.handleBlur}
//                 // value={password}
//                 // onChange={(e) => setPassword(e.target.value)}
//                 placeholder={t(`register.pass`)}
//                 className="w-full p-3 border rounded-lg focus:outline-none"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className={`absolute top-3 ${
//                   isArabic ? "left-3" : "right-3"
//                 } text-gray-500`}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//               {formik.touched.password && formik.errors.password ? (
//                 <div
//                   className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                   role="alert"
//                 >
//                   {formik.errors.password}
//                 </div>
//               ) : null}
//             </div>
//             <div className="relative">
//               <input
//                 type={showPassword1 ? "password" : "text"}
//                 name="confirm_password"
//                 id="confirm_password"
//                 onChange={formik.handleChange}
//                 value={formik.values.confirm_password}
//                 onBlur={formik.handleBlur}
//                 // value={password1}
//                 // onChange={(e) => setPassword1(e.target.value)}
//                 placeholder={t(`register.confirm`)}
//                 className="w-full p-3 border rounded-lg focus:outline-none"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword1(!showPassword1)}
//                 className={`absolute top-3 ${
//                   isArabic ? "left-3" : "right-3"
//                 } text-gray-500`}
//               >
//                 {showPassword1 ? <FaEyeSlash /> : <FaEye />}
//               </button>
//               {formik.touched.confirm_password &&
//               formik.errors.confirm_password ? (
//                 <div
//                   className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
//                   role="alert"
//                 >
//                   {formik.errors.confirm_password}
//                 </div>
//               ) : null}
//             </div>
// {isLoading?<button
//               type="submit"
//               className="w-full md:w-1/2 bg-red-500 text-white p-3 rounded-full font-semibold "
//             >
//               <i className="fas fa-spinner fa-span"></i>
//             </button>:<button
//               type="submit"
//               className="w-full md:w-1/2 bg-red-500 text-white p-3 rounded-full font-semibold"
//               disabled={!(formik.isValid && formik.dirty)}
//             >
//               {t(`register.button`)}
//             </button>}
            
            
//           </form>
//         </div>

//         {/* Side Image and Social */}
//         <div className="hidden md:flex flex-col items-center justify-center p-6 gap-4 max-w-sm">
//           <img src={logo} alt="Hero" className="w-60" />
//           {/*<button className="w-full bg-white text-blue-600 border border-gray-300 py-2 rounded-full flex items-center justify-center gap-2">
//             <i className="fab fa-facebook"></i>
//             <span className="text-gray-600 px-2">{t(`register.face`)}</span>
//           </button>
//           <button className="w-full bg-white text-red-500 border border-gray-300 py-2 rounded-full mt-2 flex items-center justify-center gap-2">
//             <img src={google} className="w-4 h-4" alt="Google" />
//             <span className="text-gray-600 px-2">{t(`register.google`)}</span>
//           </button>*/}
//         </div>
//       </div>
//     </div>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import google from "../../assets/google.png";
import logo from "../../assets/suppernanny.png";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TokenContext } from "../../Context/TokenContext";

export default function register() {
  const [message, setmessage] = useState(null);
  const [messageerr, setmessageerr] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [motherId, setmotherId] = useState(null);
let {token ,setToken}=useContext(TokenContext)


  const { t } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";

  const [showPassword, setShowPassword] = useState(true);
  const [showPassword1, setShowPassword1] = useState(true);

  const SignupSchema = Yup.object({
    first_name: Yup.string()
      .min(2, t("form.too_short"))
      .max(15, t("form.too_long"))
      .required(t("form.required")),
    last_name: Yup.string()
      .min(2, t("form.too_short"))
      .max(15, t("form.too_long"))
      .required(t("form.required")),
    email: Yup.string().email(t("form.invalid")).required(t("form.required")),
    password: Yup.string().required(t("form.required"))
    // .matches(
    //   /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%*?&]).{8,}$/,
    //   t("form.pass")
    // )
    ,
    confirm_password: Yup.string()
      .required(t("form.required"))
      .oneOf([Yup.ref("password")], t("form.match")),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      registerForm(values);
    },
  });

  async function registerForm(values) {
    setisLoading(true);
    return await axios
      .post("https://marwabakry23.pythonanywhere.com/api/register/", values)
      .then((data) => {
        console.log(data);
        console.log(data.data.message);
        setmessage(data.data.message);
        setmotherId(data.data.mother.id)
        localStorage.setItem("motherId",data.data.mother.id)
        console.log(data.data.mother.id)
        setToken({
          access: data.data.access,
          refresh: data.data.refresh,
        });
  
        localStorage.setItem("accessToken", data.data.access);
        localStorage.setItem("refreshToken", data.data.refresh);
        localStorage.setItem("motherId",data.data.mother.id);

        setisLoading(false)
        navigate("/welcome");
        

      })
      .catch((err) => {
        console.log(err.response.data.email);
        setmessageerr(err.response.data.email);
        setisLoading(false);
      });
  }

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#F1D8E8] to-[#BFDBE9] px-4 py-8"
    >
      <div className="relative bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-[900px] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>

        {/* Form Section */}
        <div className="flex-1 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mt-8">
            {t(`register.create`)}
          </h2>
          <p className="text-gray-600 text-sm mb-7">
            {t(`register.account`)}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 ml-2 cursor-pointer"
            >
              {t(`register.login`)}
            </span>
          </p>
          {messageerr?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {messageerr}
</div>:null          }
          {message ? (
            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              {message}
            </div>
          ) : null}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                  onBlur={formik.handleBlur}
                  placeholder={t(`register.first`)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <div
                    className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formik.errors.first_name}
                  </div>
                ) : null}
              </div>

              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                  onBlur={formik.handleBlur}
                  placeholder={t(`register.last`)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <div
                    className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formik.errors.last_name}
                  </div>
                ) : null}
              </div>
            </div>

            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              placeholder={t(`register.email`)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            {formik.touched.email && formik.errors.email ? (
              <div
                className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}

            <div className="relative">
              <input
                type={showPassword ? "password" : "text"}
                name="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                placeholder={t(`register.pass`)}
                className="w-full p-3 border rounded-lg focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute top-3 ${
                  isArabic ? "left-3" : "right-3"
                } text-gray-500`}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {formik.touched.password && formik.errors.password ? (
                <div
                  className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="relative">
              <input
                type={showPassword1 ? "password" : "text"}
                name="confirm_password"
                id="confirm_password"
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
                onBlur={formik.handleBlur}
                // value={password1}
                // onChange={(e) => setPassword1(e.target.value)}
                placeholder={t(`register.confirm`)}
                className="w-full p-3 border rounded-lg focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword1(!showPassword1)}
                className={`absolute top-3 ${
                  isArabic ? "left-3" : "right-3"
                } text-gray-500`}
              >
                {showPassword1 ? <FaEyeSlash /> : <FaEye />}
              </button>
              {formik.touched.confirm_password &&
              formik.errors.confirm_password ? (
                <div
                  className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.confirm_password}
                </div>
              ) : null}
            </div>
{isLoading?<button
              type="submit"
              className="w-full md:w-1/2 bg-red-500 text-white p-3 rounded-full font-semibold "
            >
              <i className="fas fa-spinner fa-span"></i>
            </button>:<button
              type="submit"
              className="w-full md:w-1/2 bg-red-500 text-white p-3 rounded-full font-semibold"
              disabled={!(formik.isValid && formik.dirty)}
            >
              {t(`register.button`)}
            </button>}
            
            
          </form>
        </div>

        {/* Side Image and Social */}
        <div className="hidden md:flex flex-col items-center justify-center p-6 gap-4 max-w-sm">
          <img src={logo} alt="Hero" className="w-60" />
          {/*<button className="w-full bg-white text-blue-600 border border-gray-300 py-2 rounded-full flex items-center justify-center gap-2">
            <i className="fab fa-facebook"></i>
            <span className="text-gray-600 px-2">{t(`register.face`)}</span>
          </button>
          <button className="w-full bg-white text-red-500 border border-gray-300 py-2 rounded-full mt-2 flex items-center justify-center gap-2">
            <img src={google} className="w-4 h-4" alt="Google" />
            <span className="text-gray-600 px-2">{t(`register.google`)}</span>
          </button>*/}
        </div>
      </div>
    </div>
  );
}