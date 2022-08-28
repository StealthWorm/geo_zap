/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      colors: {
        green: {
          100: '#4CD62B',
          300: '#00B37E',
          500: '#00875F',
          700: '#015F43',
        },
        blue: {
          50: '#A3C7C7',
          100: '#81D8F7',
          200: '#2AA9E0',
          300: '#0693A6',
          400: '#5965E0',
          500: '#4953B8',
          600: '#2E384D',
          700: '#0C333C',
          800: '#192026',
          900: '#010A13',
        },
        orange: {
          500: '#FBA94C',
        },
        red: {
          500: '#F75A68',
        },
        gray: {
          100: '#f2f3f5',
          200: '#DCDDE0',
          300: '#8D8D99',
          400: '#666666',
          500: '#3F4445',
          600: '#29292E',
          700: '#1E2328',
          800: '#121214',
          900: '#09090A'
        },
      },
    },
  },
  plugins: [],
}
