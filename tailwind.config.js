/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#020617",     // Deep midnight base
        secondary: "#0b1220",   // Elevated sections / cards
        accent: "#5eead4",      // Mint accent (matches shirt)
        highlight: "#facc15",   // Warm yellow (background lights)
        "text-primary": "#e5e7eb",
        "text-muted": "#94a3b8",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
