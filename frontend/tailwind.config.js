/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      fontFamily: {
        gamja: ['"Gamja Flower"', 'cursive'],
        gantari: ['"Gantari"', 'sans-serif'],
        fingerpaint: ["Finger Paint", 'sans-serif'],
      },
    },
  },
  plugins: [],
};