/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Primary Blue & White
        blue: {
          50: "#f0f7ff",
          100: "#e0eeff",
          200: "#c7deff",
          300: "#a3caff",
          400: "#7badff",
          500: "#1565c0", // Primary brand blue
          600: "#1d5baa",
          700: "#1e4a8a",
          800: "#1f3a6d",
          900: "#0d1b2e", // Dark navy
        },
        // Accent: Subtle Amber Logo Hints
        accent: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        // Neutrals: Whites & Grays
        gray: {
          50: "#ffffff",
          100: "#f8fafc",
          200: "#f1f5f9",
          300: "#e2e8f0",
          400: "#cbd5e1",
          500: "#94a3b8",
          600: "#64748b",
          700: "#475569",
          800: "#334155",
          900: "#1e293b",
        },
      },
      fontFamily: {
        sora: ["'Sora', sans-serif"],
      },
      fontSize: {
        xs: "11px",
        sm: "12px",
        base: "14px",
        lg: "15px",
        xl: "17px",
        "2xl": "20px",
        "3xl": "26px",
        "4xl": "clamp(1.8rem, 4vw, 3rem)",
        "5xl": "clamp(2rem, 5vw, 5rem)",
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
      },
      borderRadius: {
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
      },
      boxShadow: {
        soft: "0 2px 12px rgba(21, 101, 192, 0.06)",
        base: "0 4px 20px rgba(21, 101, 192, 0.08)",
        lg: "0 8px 30px rgba(21, 101, 192, 0.12)",
        xl: "0 16px 50px rgba(21, 101, 192, 0.15)",
      },
      backgroundImage: {
        "gradient-sea": "linear-gradient(135deg, #0d1b2e 0%, #1565c0 100%)",
        "gradient-light": "linear-gradient(135deg, #f7faff 0%, #e3f2fd 100%)",
      },
    },
  },
  plugins: [],
};
