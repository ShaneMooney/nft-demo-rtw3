module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeBack: {
          '0%': { opacity: 0 },
          '100%': { opacity: 100 },
        },
      },
      animation: {
        fadeBack: 'fadeBack 1s ease-in',
      },
    },
  },
  plugins: [],
};
