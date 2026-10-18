/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border, 0 0% 18%))",
        input: "hsl(var(--input, 0 0% 18%))",
        ring: "hsl(var(--ring, 356 80% 50%))",
        background: "hsl(var(--background, 240 10% 4%))",
        foreground: "hsl(var(--foreground, 40 20% 93%))",
        primary: {
          DEFAULT: "hsl(var(--primary, 356 80% 50%))",
          foreground: "hsl(var(--primary-foreground, 0 0% 100%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 240 6% 12%))",
          foreground: "hsl(var(--secondary-foreground, 0 0% 98%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0 84% 60%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 98%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 240 6% 15%))",
          foreground: "hsl(var(--muted-foreground, 215 16% 65%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 240 6% 15%))",
          foreground: "hsl(var(--accent-foreground, 0 0% 98%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 240 10% 6%))",
          foreground: "hsl(var(--popover-foreground, 40 20% 93%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 240 10% 7%))",
          foreground: "hsl(var(--card-foreground, 40 20% 93%))",
        },
        "chart-1": "hsl(var(--chart-1, 12 76% 61%))",
        "chart-2": "hsl(var(--chart-2, 173 58% 39%))",
        "chart-3": "hsl(var(--chart-3, 197 37% 24%))",
        "chart-4": "hsl(var(--chart-4, 43 74% 66%))",
        "chart-5": "hsl(var(--chart-5, 27 87% 67%))",
      },
      borderRadius: {
        lg: "var(--radius, 0.75rem)",
        md: "calc(var(--radius, 0.75rem) - 2px)",
        sm: "calc(var(--radius, 0.75rem) - 4px)",
      },
    },
  },
  plugins: [],
};
