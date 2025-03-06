/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1a202c', // Dark background
        text: '#e2e8f0', // Light text
        card: '#2d3748', // Darker card background
        primary: '#3182ce', // Primary button color
        secondary: '#2b6cb0', // Secondary button color
        accent: '#38b2ac', // Accent color
      },
      boxShadow: {
        soft: '0 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow
      },
    },
  },
  plugins: [],
}