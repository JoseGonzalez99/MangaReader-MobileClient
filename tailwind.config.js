/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#DA0037",
        secondary: "#444444",
        white: "#EDEDED",
        background: "#171717",
        text: "#ffffff",
        textMuted: "#9ca3af",
        icon: "#ffffff",
        maximumTrackTintColor: "rgba(255,255,255,0.4)",
        minimumTrackTintColor: "rgba(255,255,255,0.6)",
      }
    },
  },
  plugins: [],
}