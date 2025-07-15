/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        text: {
          main: 'var(--color-text-main)',
          muted: 'var(--color-text-muted)',
        },
        pink: 'var(--color-pink)',
        green: 'var(--color-green)',
        blue: 'var(--color-blue)',
        purple: 'var(--color-purple)',
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        cedarville: ["Cedarville Cursive", "cursive"],
      },
    },
  },
  plugins: [],
};
