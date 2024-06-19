import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend, { HttpBackendOptions } from "i18next-http-backend"

// Used backend: http
// Plugins: LanguageDetector
i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init<HttpBackendOptions>({
    fallbackLng: "en", debug: true,
    backend:{
        loadPath: "/weather-app/locales/{{lng}}/{{ns}}.json"
    }
});
export default i18n;