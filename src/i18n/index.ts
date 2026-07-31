import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import messages from './local/index';

// No servidor (build SSG) não há navigator: fixamos PT-PT para o HTML pré-renderizado
// ser em português de Portugal (mercado primário). No cliente, o detetor decide a região.
const isServer = typeof window === 'undefined';

if (!isServer) {
  i18n.use(LanguageDetector); // Detetor automático do navegador (só no cliente)
}

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt-PT',
    lng: isServer ? 'pt-PT' : undefined,
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
