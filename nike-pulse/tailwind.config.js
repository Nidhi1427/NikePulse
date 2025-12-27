/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'tilt': 'tilt 15s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        tilt: {
          '0%, 100%': { transform: 'rotate(0deg) skew(0deg)' },
          '25%': { transform: 'rotate(1deg) skew(1deg)' },
          '75%': { transform: 'rotate(-1deg) skew(-1deg)' },
        }
      },
      backdropBlur: { xs: '2px' }
    },
  },
}
