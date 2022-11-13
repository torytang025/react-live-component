const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['haskoy', ...defaultTheme.fontFamily.sans],
    },
    colors: {
      'primary-1': 'rgb(194, 140, 46)',
      'primary-2': 'rgba(194, 140, 46, 80%)',
    },
  },
  plugins: [],
};
