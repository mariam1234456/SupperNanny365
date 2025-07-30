
import google from "../../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import style from "./LogIn.module.css";
import React, { useContext, useState } from "react";
import girl from "../../assets/girl.png";
import boy from "../../assets/boy.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import i18n from "../../i18n";
import { TokenContext } from "../../Context/TokenContext";
import { useGender } from "../../Context/GenderContext";
import toast from "react-hot-toast";

export default function LogIn() {
  const [message, setmessage] = useState(null);
  const [code, setCode] = useState("");

  const [messageerr, setmessageerr] = useState(null);
  const [messageerr1, setmessageerr1] = useState(null);
  const [motherId,setmotherId]=useState(null);
  const [userId, setUserId] = useState(null);

  const [isLoading, setisLoading] = useState(false);
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showVerifyCode, setShowVerifyCode] = useState(false);
  const [showSetPassword, setShowSetPassword] = useState(false);
  const [gender, setgender] = useState("")
const [id, setid] = useState(null)
  const isArabic = i18n.language === "ar";
  const { setGender } = useGender();

  const navigate = useNavigate();
let {token ,setToken}=useContext(TokenContext)
  const SignupSchema = Yup.object({
    username: Yup.string()
      .email(t("form.invalid"))
      .required(t("form.required")),
    password: Yup.string().required(t("form.required")),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      loginForm(values);
    },
  });

  async function loginForm(values) {
    setisLoading(true);
    return await axios
      .post("https://marwabakry23.pythonanywhere.com/api/login/", values)
      .then((data) => {
        console.log(data);
        console.log(data.data.access);
        console.log(data.data.refresh)
        setmessage(data.data.message);
        setToken({
          access: data.data.access,
          refresh: data.data.refresh,
        });
        setmotherId(data.data.user_id
        )
        setgender(data.data.child.gender)
        setid(data.data.child.id)
        setGender(data.data.child.gender);               
        localStorage.setItem("gender", data.data.child.gender);  
        localStorage.setItem("babyId", data.data.child.id);
        console.log(data.data.child.id)
        console.log(data.data.child.gender)
        localStorage.setItem("accessToken", data.data.access);
        localStorage.setItem("refreshToken", data.data.refresh);
        localStorage.setItem("motherId", data.user_id); 


        setisLoading(false);
        navigate("/todo");

   
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setmessageerr(err.response.data.message);
        setisLoading(false);
      });
  }

  const SignupSchema1 = Yup.object({
    email: Yup.string()
      .email(t("form.invalid"))
      .required(t("form.required")),
  });

  const formik1 = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: SignupSchema1,
    onSubmit: (values) => {
      ForgetPass(values);
    },
  });
  async function ForgetPass(values) {
    setisLoading(true);
    return await axios
      .post("https://marwabakry23.pythonanywhere.com/api/request_password/", values)
      .then((data) => {
        console.log(data)
          setShowForgotPassword(false);
 setUserId(data.data.user_id);
          setShowVerifyCode(true);
        setisLoading(false);
     console.log(data.data.message)
     toast(data.data.message)
      })
      .catch((err) => {
       console.log(err.response.data.error)

       setmessageerr1(err.response.data.error)
        setisLoading(false);
      });
  }
async function resetPassword() {
  setisLoading(true);

  try {
    const res = await axios.post("https://marwabakry23.pythonanywhere.com/api/reset_password/", {
      user_id: userId,
      code: code,
      new_password: password,
    });

    toast.success(res.data.message);

    setShowSetPassword(false);
    setShowVerifyCode(false);
    setShowForgotPassword(false);
    setIsOpen(true);

    setCode("");
    setPassword("");
    setmessageerr1(null);

  } catch (err) {
    const errorMsg = err.response?.data?.error || "حدث خطأ ما";
    toast.error(errorMsg);
    setmessageerr1(errorMsg);
  } finally {
    setisLoading(false);
  }
}




  return (
    <>
      <div className="relative flex items-center justify-center h-screen bg-gradient-to-b from-[#F1D8E8] to-[#BFDBE9] overflow-auto">
        {/* الصور (الفتاة والولد) */}
        <img
          src={girl}
          alt="baby-left"
          className="hidden md:block absolute left-5 top-5 w-32 h-32 lg:w-40 lg:h-40"
        />
        <img
          src={boy}
          alt="baby-right"
          className="hidden md:block absolute right-5 bottom-5 w-32 h-32 lg:w-40 lg:h-40"
        />

        {/* المودال */}
        {isOpen && (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-96">
            {showSetPassword ? (
              <div>
                <button
                  onClick={() => setShowSetPassword(false)}
                  className="absolute top-3 left-3 text-gray-500 hover:text-gray-800 text-sm md:text-base"
                >
                  ← {t(`forget.back`)}
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  <i className="fas fa-times"></i>
                </button>
                <h2 className="text-lg md:text-xl font-semibold my-4">
                  {t(`resentpass.set`)}
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mt-2">
                  {t(`resentpass.reset`)}
                </p>
                <div className="flex items-center border my-3 rounded-md w-full">
                  <input
                    type={showPassword ? "password" : "text"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t(`resentpass.create`)}
                    className="w-full p-2 pe-10 border-none focus:outline-none focus:ring-0 text-sm md:text-base"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700 p-2"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                
                <button
  className="w-full bg-red-500 text-white py-2 mt-4 rounded-full text-sm md:text-base"
  onClick={resetPassword}
>
  {t(`resentpass.button`)}
</button>

              </div>
            ) : showVerifyCode ? (
              <div>
    <button
      onClick={() => setShowVerifyCode(false)}
      className="absolute top-3 left-3 text-gray-500 hover:text-gray-800 text-sm md:text-base"
    >
      ← {t(`forget.back`)}
    </button>
    <button
      onClick={() => navigate("/")}
      className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
    >
      <i className="fas fa-times"></i>
    </button>
    <h2 className="text-lg md:text-xl font-semibold my-4">
      {t(`verify.verify`)}
    </h2>
    <p className="text-xs md:text-sm text-gray-500 mt-2">
      {t(`verify.code`)}
    </p>

    {/* هنا بيتم إدخال الكود */}
    <input
      type="text"
      placeholder={t(`verify.enter`)}
      value={code}
      onChange={(e) => setCode(e.target.value)}
      className="w-full p-2 border-gray-300 rounded-lg mt-4 text-sm md:text-base"
    />

    <input
      type="password"
      placeholder={t(`resentpass.create`)}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-2 mt-3 border-gray-300 rounded-lg text-sm md:text-base"
    />

   <button
  className="w-full bg-red-500 text-white py-2 mt-4 rounded-full text-sm md:text-base"
  onClick={resetPassword}
  disabled={isLoading}
>
  {isLoading ? <i className="fas fa-spinner fa-spin"></i> : t(`verify.verifybutton`)}
</button>

  </div>
            ) : showForgotPassword ? (
              <div>
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="absolute top-3 left-3 text-gray-500 hover:text-gray-800 text-sm md:text-base"
                >
                  ← {t(`forget.back`)}
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  <i className="fas fa-times"></i>
                </button>
                <h2 className="text-lg md:text-xl font-semibold my-4">
                  {t(`forget.forget`)}
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mt-2">
                  {t(`forget.worry`)}
                </p>
                {messageerr1 ? (
                  <div
                    class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {messageerr1}
                  </div>
                ) : null}
                <form onSubmit={formik1.handleSubmit}>
                  <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={formik1.handleChange}
                  value={formik1.values.email}
                  onBlur={formik1.handleBlur}
                  placeholder={t(`login.email`)}
                  className="w-full p-2 border-gray-300 rounded-lg mt-4 text-sm md:text-base"
                />
                 {formik1.touched.email && formik1.errors.email ? (
                      <div
                        className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        {formik1.errors.email}
                      </div>
                    ) : null}
                    {isLoading?<button
                type="submit"
                  className="w-full bg-red-500 text-white py-2 mt-4 rounded-full text-sm md:text-base"
                >
                  <i className="fas fa-spinner fa-spin"></i>
                </button>: <button
                type="submit"
                  className="w-full bg-red-500 text-white py-2 mt-4 rounded-full text-sm md:text-base"
                  disabled={!(formik1.isValid && formik1.dirty)}

                >
                  {t(`forget.submit`)}
                </button>}
                
                </form>
               
               
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/")}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                  <i className="fas fa-times"></i>
                </button>
                <h2 className="text-lg md:text-xl font-semibold text-center">
                  {t(`login.login`)}
                </h2>
                <p className="text-xs md:text-sm text-gray-500 text-center">
                  {t(`login.account`)}{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-blue-500"
                  >
                    {t(`login.signup`)}
                  </button>
                </p>
                
                {messageerr ? (
                  <div
                    class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {messageerr}
                  </div>
                ) : null}
                <form onSubmit={formik.handleSubmit} className="space-y-4 mt-3">
                  <div>
                    <input
                      type="email"
                      name="username"
                      id="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      onBlur={formik.handleBlur}
                      placeholder={t(`register.email`)}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    {formik.touched.username && formik.errors.username ? (
                      <div
                        className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        {formik.errors.username}
                      </div>
                    ) : null}
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "password" : "text"}
                      name="password"
                      id="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
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

                  <p className="text-end text-xs md:text-sm underline">
                    <button
                      onClick={() => setShowForgotPassword(true)}
                      className="text-blue-500"
                    >
                      {t(`login.forget`)}
                    </button>
                  </p>

                  {isLoading ? (
                    <button
                      type="submit"
                      className="w-full bg-red-500 text-white py-2 my-2 rounded-full text-sm md:text-base"
                    >
                      <i className="fas fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-red-500 text-white py-2 my-2 rounded-full text-sm md:text-base"
                      disabled={!(formik.isValid && formik.dirty)}
                    >
                      {t(`login.login`)}
                    </button>
                  )}
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

