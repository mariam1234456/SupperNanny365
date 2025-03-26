import { Trans, useTranslation } from "react-i18next";
import style from "./Footer.module.css"
import React from 'react'

export default function Footer() {
    const {t} = useTranslation();
  
  return (
    <>
    <footer className="bg-red-300 text-white text-center p-4 mt-10">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        {/* أيقونات السوشيال ميديا */}
        <div className="flex space-x-4">
          <a href="https://www.facebook.com" target="block" className="text-xl hover:text-gray-300 mx-2"><i className="fa-brands fa-facebook"></i></a>
          <a href="https://www.instagram.com" target="block" className="text-xl hover:text-gray-300"><i className="fa-brands fa-instagram"></i></a>
          <a href="https://www.twitter.com" target="block" className="text-xl hover:text-gray-300"><i className="fa-brands fa-twitter"></i></a>
          <a href="https://www.youtube.com" target="block" className="text-xl hover:text-gray-300"><i className="fa-brands fa-youtube"></i></a>
        </div>

        {/* النصوص */}
        <p className="text-sm"><Trans i18nKey="footer.foo"/></p>

        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:underline mx-3">{t(`footer.PrivacyPolicy`)}</a>
          <a href="#" className="hover:underline">{t(`footer.TermsofService`)}</a>
          <a href="#" className="hover:underline">{t(`footer.CookiesSettings`)}</a>
        </div>
      </div>
    </footer>

    </>
  )
}
