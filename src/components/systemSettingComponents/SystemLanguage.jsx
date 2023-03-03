import { Suspense } from "react";
import i18next from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
const fallbackLng = [navigator.language[0]+navigator.language[1]];
const translationsEn = {
  language: "System Language:",
};
const translationsTr = {
  language: "Sistem Dili:",
};
const options = {
  order: ["localStorage"],
  lookupLocalStorage: "lng",
};
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationsEn },
      tr: { translation: translationsTr },
    },
    debug: true,
    fallbackLng,
    supportedLngs: ["tr", "en"],
    // interpolation: { escapeValue: false },
    detection: options,
  });
const SystemLanguage = () => {
  const { t } = useTranslation();
  const onChange = (event) => {
    i18next.changeLanguage(event.target.value);
  };
  return (
    <Suspense fallback={"Loading..."}>
      <div className="language">
        <label className="label2">{t("language")}</label>
        <select className="select" onChange={onChange}>
          <option value="en">English</option>
          <option value="tr">Turkish</option>
        </select>
      </div>
    </Suspense>
  );
};

export default SystemLanguage;
