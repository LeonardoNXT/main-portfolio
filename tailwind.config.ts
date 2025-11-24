/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        grifinito: ["var(--font-grifinito)"],
        canopee: ["var(--font-canopee)"],
        aeonik: ["var(--font-aeonik)"],
        necosmic: ["var(--font-necosmic)"]
      },
    },
  },
};
