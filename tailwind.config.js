/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary_blue: 'var(--primary-blue-color)',
        primary_grey: 'var(--primary-grey-color)',
        primary_white: 'var(--primary-white-color)',
      },
    },
  },
  plugins: [],
};
