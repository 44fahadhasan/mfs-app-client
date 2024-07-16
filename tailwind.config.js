/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  //...themes
  daisyui: {
    themes: [
      // dark

      {
        myDarkTheme: {
          primary: "#ff1949",

          "primary-content": "#fff",

          secondary: "#3800ff",

          "secondary-content": "#cddaff",

          accent: "#bda600",

          "accent-content": "#0d0a00",

          neutral: "#040404",

          "neutral-content": "#c4c4c4",

          "base-100": "#000000",

          "base-200": "#0e0e0e",

          "base-300": "#191a1d",

          "base-content": "#fff",

          info: "#00a9e5",

          "info-content": "#000a12",

          success: "#6fbe00",

          "success-content": "#040d00",

          warning: "#ffa400",

          "warning-content": "#160a00",

          error: "#ff003c",

          "error-content": "#160001",
        },
      },

      // light
      {
        myLightTheme: {
          primary: "#ff1949",

          "primary-content": "#fff",

          secondary: "#a27e00",

          "secondary-content": "#0a0500",

          accent: "#57ce00",

          "accent-content": "#030f00",

          neutral: "#2a253b",

          "neutral-content": "#d0cfd5",

          "base-100": "#FFFFFF",

          "base-200": "#F3F4F6",

          "base-300": "#FFECF0",

          "base-content": "#252525",

          info: "#0074d2",

          "info-content": "#d2e4f8",

          success: "#67d955",

          "success-content": "#041102",

          warning: "#c01e00",

          "warning-content": "#f8d6cf",

          error: "#ef4b68",

          "error-content": "#140204",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
