/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D4AF37', // Dourado
          dark: '#B8941F',
          light: '#F4D678',
        },
        secondary: {
          DEFAULT: '#000000', // Preto
          light: '#1A1A1A',
          lighter: '#2D2D2D',
        },
        accent: {
          DEFAULT: '#8B4513', // Marrom terroso
          light: '#A0522D',
          dark: '#654321',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

