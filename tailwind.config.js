import daisyui from 'daisyui';
import darkTheme from "daisyui/src/theming/themes"

const darkTh = darkTheme["dark"];

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        "form-width" : "100rem"
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        dark: {
          ...darkTh,
          "base-100" : "#d6d3d1"
        }
      }
    ]
  }

}