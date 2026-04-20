/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#67e8f9',
          violet: '#a78bfa',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(103, 232, 249, 0.18)',
      },
    },
  },
  plugins: [],
}
