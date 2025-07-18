// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import translationEN from './locales/en/translation.json';
import translationHE from './locales/he/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  he: {
    translation: translationHE,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'he', // default language
    fallbackLng: 'en', // fallback language if translation is missing

    interpolation: {
      escapeValue: false, // react already escapes by default
    },
    // For debugging purposes, uncomment the line below
    // debug: true,
  });

export default i18n;
