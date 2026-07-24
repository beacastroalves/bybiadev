/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        // Mapeia as utilitárias base do Tailwind para as fontes da marca,
        // corrigindo os títulos (font-serif) e labels (font-mono) que caíam
        // nas fontes genéricas do sistema. Ver specs/07 §1.
        fontFamily: {
          sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
          serif: ['"Instrument Serif"', '"Times New Roman"', 'serif'],
          mono: ['"JetBrains Mono"', 'monospace'],
        },
      },
    },
    plugins: [],
  }