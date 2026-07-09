import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import messages from './local/index';

i18n
  .use(LanguageDetector) // Ativa o detetor automático do navegador
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt-BR',
    debug: false,
    resources: messages,

    detection: {
      order: ['navigator', 'querystring', 'cookie', 'localStorage'],
      caches: ['localStorage', 'cookie'],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;