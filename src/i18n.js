// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// import ar from './locales/ar.json';
// import en from './locales/en.json';

// i18n
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: { translation: en },
//       ar: { translation: ar },
//     },
//     lng: 'en', // اللغة الافتراضية
//     fallbackLng: 'en',
//     interpolation: { escapeValue: false },
//   });

// i18n.on('languageChanged', (lng) => {
//   document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
// });

// export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from './locales/ar.json';
import en from './locales/en.json';

// ✅ نجيب اللغة المحفوظة من localStorage أو نخليها en افتراضيًا
const savedLang = localStorage.getItem('lang') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: savedLang, // ✅ هنا بنستخدم اللغة المحفوظة
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

// ✅ لما المستخدم يغيّر اللغة، نحفظها + نضبط اتجاه الصفحة
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('lang', lng); // ← نحفظ اللغة
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
});

export default i18n;
