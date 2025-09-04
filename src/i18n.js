// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import or from "./locales/or.json";
import pa from "./locales/pa.json";
import hry from "./locales/hry.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    or: { translation: or },
    pa: { translation: pa },
    hry: { translation: hry }
  },
  lng: "en", // default
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;
