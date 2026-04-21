/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // 🎨 COLORS
      colors: {
        primary: {
          navy: '#062056',   // Headers, titles
          tech: '#0284C7',   // Buttons, icons
          light: '#F0F7FF',  // Light backgrounds
        },

        blue: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#0A6EDC',
          900: '#1E3A8A',
        },
      },

      // 🔤 FONTS
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      // 🎬 ANIMATIONS
      animation: {
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },

      // 🎞️ KEYFRAMES (IMPORTANT)
      keyframes: {
        slideDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },

        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },

  // 🔌 PLUGINS
  plugins: [
    require("@tailwindcss/line-clamp"),
  ],
};