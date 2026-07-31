import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import messages from './local/index';

// A partir das rotas por locale (/, /br, /en) é a URL que decide o idioma. Já NÃO
// usamos o detetor de navegador (evita conflito com o URL e mismatch de hidratação).
// O idioma inicial vem do pathname (no cliente) para a hidratação bater certo com o
// HTML pré-renderizado; no servidor arranca em PT-PT e o Layout fixa o locale de cada
// rota durante o render SSR. Fallback: PT-PT (Portugal).
function initialLng(): string {
  if (typeof window === 'undefined') return 'pt-PT';
  const p = window.location.pathname;
  if (p.startsWith('/br')) return 'pt-BR';
  if (p.startsWith('/en')) return 'en';
  return 'pt-PT';
}

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt-PT',
    lng: initialLng(),
    debug: false,
    resources: messages,

    interpolation: {
      escapeValue: false,
    },

    react: {
      // Sem Suspense: troca de língua síncrona no SSG e na hidratação.
      useSuspense: false,
    },
  });

export default i18n;
