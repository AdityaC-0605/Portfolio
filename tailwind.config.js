/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base Layer - Deep space backgrounds
        primary: "#0a0a0f",        // Deep space background
        secondary: "#1a1a2e",      // Card/section backgrounds
        
        // Accent Layer - Electric colors
        "accent-purple": "#8b5cf6", // Electric purple - primary accent
        "accent-green": "#10b981",  // Neon green - secondary accent
        
        // Support Layer - Additional colors
        "support-orange": "#f59e0b", // Warm orange for highlights
        "support-cyan": "#06b6d4",   // Bright cyan for links
        "support-pink": "#ec4899",   // Hot pink for special elements
        "support-blue": "#3b82f6",   // Electric blue for info states
        
        // Text Colors
        "text-primary": "#e5e7eb",   // High contrast white text
        "text-secondary": "#d1d5db", // Medium contrast text
        "text-muted": "#9ca3af",     // Low contrast text
        "text-accent": "#a78bfa",    // Purple-tinted text for highlights
        
        // Neutral grays for hierarchy
        "neutral-800": "#1f2937",
        "neutral-700": "#374151",
        "neutral-500": "#6b7280",
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
