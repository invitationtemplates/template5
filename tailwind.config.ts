import type { Config } from "tailwindcss";

// Palette sampled from the reference sheet: warm paper, blush wash, antique gold-brown ink.
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#FBF3E2", warm: "#F6E8CE", pale: "#FFFAEE", edge: "#EFDDB9" },
        blush: { DEFAULT: "#F9E2D2", deep: "#F1C8B0", soft: "#FCEDE0" },
        gold: { DEFAULT: "#A8782F", light: "#D2A958", soft: "#E6CFA1", deep: "#8A5F1C" },
        cocoa: { DEFAULT: "#7A4A14", dark: "#4A2D0C" },
        ink: { DEFAULT: "#3A2A1B", soft: "#6D5846", mute: "#9A8670" },
      },
      fontFamily: {
        script: ["Allura", "cursive"],
        serif: ["Lora", "Georgia", "serif"],
        caps: ['"Cormorant Garamond"', "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 10px 26px -14px rgba(90, 58, 18, 0.45)",
        soft: "0 5px 14px -8px rgba(90, 58, 18, 0.35)",
      },
      keyframes: {
        sway: { "0%, 100%": { transform: "rotate(-1.2deg)" }, "50%": { transform: "rotate(1.2deg)" } },
        twinkle: { "0%, 100%": { opacity: "0.15", transform: "scale(0.6)" }, "50%": { opacity: "1", transform: "scale(1)" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-5px)" } },
        bob: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(5px)" } },
        shimmer: { "0%": { backgroundPosition: "200% 50%" }, "100%": { backgroundPosition: "-200% 50%" } },
        fall: {
          "0%": { transform: "translate3d(0, -6%, 0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.9" },
          "100%": { transform: "translate3d(40px, 520px, 0) rotate(320deg)", opacity: "0" },
        },
        shine: { "0%, 55%": { transform: "translateX(-130%) skewX(-18deg)" }, "100%": { transform: "translateX(260%) skewX(-18deg)" } },
        ripple: { "0%": { transform: "scale(0.5)", opacity: "0.7" }, "100%": { transform: "scale(2.4)", opacity: "0" } },
        glow: { "0%, 100%": { opacity: "0.5" }, "50%": { opacity: "1" } },
      },
      animation: {
        sway: "sway 8s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        float: "float 4.5s ease-in-out infinite",
        bob: "bob 1.8s ease-in-out infinite",
        shimmer: "shimmer 7s linear infinite",
        fall: "fall 13s linear infinite",
        shine: "shine 5s ease-in-out infinite",
        ripple: "ripple 2.4s ease-out infinite",
        glow: "glow 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
