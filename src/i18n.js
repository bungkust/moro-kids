import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "welcome": "Welcome to Moro Kids"
        }
    },
    id: {
        translation: {
            "welcome": "Selamat Datang di Moro Kids"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'id',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
