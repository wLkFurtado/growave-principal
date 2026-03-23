/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#111111",
        surfaceHover: "#1a1a1a",
        primary: "#4AFF5A", // Brand specific green
        border: "#222222",
        textDefault: "#eaeaea",
        textMuted: "#a1a1aa", // slightly brighter muted text for readability
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'], // Emulating the JSON provided
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '2rem',
        '3xl': '3rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(74, 255, 90, 0.15)',
        'glow-strong': '0 0 40px rgba(74, 255, 90, 0.3)',
      },
      transitionTimingFunction: {
        'magnetic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      }
    },
  },
  plugins: [],
}
