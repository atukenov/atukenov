import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../public/locales/en/common.json";
import ru from "../public/locales/ru/common.json";

const resources = {
  en: { common: en },
  ru: { common: ru },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    // Keep "en" for SSR / first paint; I18nProvider switches on the client after mount.
    lng: "en",
    fallbackLng: "en",
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;
