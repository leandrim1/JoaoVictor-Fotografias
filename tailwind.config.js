/**
 * A escala padrão de opacidade do Tailwind tem saltos (0, 5, 10, 20, 25...),
 * e um valor fora dela — `bg-ink/97`, por exemplo — é descartado em silêncio.
 * Aqui liberamos todos os inteiros de 0 a 100 para ajustar véus e bordas finas
 * com precisão.
 */
const opacity = Object.fromEntries(
  Array.from({ length: 101 }, (_, value) => [value, String(value / 100)]),
);

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      opacity,
      colors: {
        canvas: '#FAF9F6',
        sand: '#F1EEE8',
        ink: '#171715',
        muted: '#77736D',
        gold: '#A58B64',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
      },
      letterSpacing: {
        label: '0.22em',
      },
      maxWidth: {
        prose: '850px',
        shell: '1440px',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(26px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        revealImage: {
          '0%': { opacity: '0', transform: 'scale(1.06)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.85s cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
        'reveal-image': 'revealImage 1.4s cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
};
