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

        // Escala tipográfica única (8 papéis). Títulos fluidos com clamp():
        // escalam suavemente com a largura, sem saltos por breakpoint.
        // Uso: text-display, text-h2, text-h3, text-h4, text-body-lg, text-body, text-small, text-caption. Ver specs/07 §3.
        fontSize: {
          display:   ['clamp(3rem, 1.6rem + 6.4vw, 6.75rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
          h2:        ['clamp(2.5rem, 1.3rem + 4.9vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
          h3:        ['clamp(1.625rem, 1.2rem + 1.9vw, 2.25rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
          h4:        ['clamp(1.1875rem, 1.05rem + 0.55vw, 1.375rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
          'body-lg': ['clamp(1.0625rem, 1rem + 0.25vw, 1.125rem)', { lineHeight: '1.7' }],
          body:      ['1rem', { lineHeight: '1.65' }],
          small:     ['0.8125rem', { lineHeight: '1.6' }],
          caption:   ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
        },

        // Tokens de cor da marca (adoção gradual: bg-brand, text-accent, etc.).
        colors: {
          brand: { DEFAULT: '#534AB7', deep: '#433aa1', soft: '#7F77DD', light: '#9D8EFF' },
          accent: '#02C39A',
          ink: '#0F0E1A',
          cream: '#f3ede4',
          paper: '#fafafa',
        },
      },
    },
    plugins: [],
  }