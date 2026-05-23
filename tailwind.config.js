/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, // Disable Tailwind CSS reset to prevent breaking vanilla CSS
  },
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        background: "var(--bg)",
        foreground: "var(--fg)",
        primary: {
          DEFAULT: "var(--accent)",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "var(--surface2)",
          foreground: "var(--fg2)",
        },
        accent: {
          DEFAULT: "var(--accent2)",
          foreground: "#ffffff",
        },
      },
    },
  },
  plugins: [],
}
