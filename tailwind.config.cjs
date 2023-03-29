const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['haskoy', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        back: '#302621',
        front: '#D8CDB9',
        'primary-1': 'rgb(194, 140, 46)',
        'primary-2': 'rgba(194, 140, 46, 80%)',
        'highlight-1': '#721B29',
      },
      boxShadow: {
        chatBubbleLeftTail: '9px 4px 0 0 #D8CDB9',
        chatBubbleRightTail: '-9px 4px 0 0 #D8CDB9',
      },
      backgroundImage: {
        'study-live': 'url(/src/assets/img/shot.png)',
      },
      zIndex: {
        top: '99997',
        layer: '99998',
        modal: '99999',
      },
    },
  },
  plugins: [],
};
