/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./categories.html",
    "./leaderboard.html",
    "./signup.html",
    "./test.html",
    "./settings.html",
    "./*.js"
  ],
  theme: {
    extend: {
      colors: {
        "primary-container": "#8083ff",
        "inverse-on-surface": "#283044",
        "error-container": "#93000a",
        "secondary-fixed": "#f0dbff",
        "on-secondary-container": "#d6a9ff",
        "surface-container-low": "#131b2e",
        "outline-variant": "#464554",
        "surface": "#0b1326",
        "on-surface-variant": "#c7c4d7",
        "on-tertiary-container": "#570032",
        "secondary-container": "#6f00be",
        "surface-bright": "#31394d",
        "on-secondary-fixed": "#2c0051",
        "on-error": "#690005",
        "on-primary-container": "#0d0096",
        "on-tertiary-fixed-variant": "#8c0053",
        "surface-container-high": "#222a3d",
        "on-primary": "#1000a9",
        "on-primary-fixed": "#07006c",
        "inverse-primary": "#494bd6",
        "on-primary-fixed-variant": "#2f2ebe",
        "on-error-container": "#ffdad6",
        "on-background": "#dae2fd",
        "primary": "#c0c1ff",
        "error": "#ffb4ab",
        "background": "#0b1326",
        "surface-dim": "#0b1326",
        "tertiary": "#ffb0cd",
        "tertiary-container": "#f751a1",
        "on-tertiary-fixed": "#3e0022",
        "secondary-fixed-dim": "#ddb7ff",
        "surface-container": "#171f33",
        "on-tertiary": "#640039",
        "secondary": "#ddb7ff",
        "outline": "#908fa0",
        "on-secondary-fixed-variant": "#6900b3",
        "inverse-surface": "#dae2fd",
        "surface-variant": "#2d3449",
        "surface-container-highest": "#2d3449",
        "surface-container-lowest": "#060e20",
        "primary-fixed-dim": "#c0c1ff",
        "on-secondary": "#490080",
        "tertiary-fixed": "#ffd9e4",
        "surface-tint": "#c0c1ff",
        "on-surface": "#dae2fd",
        "primary-fixed": "#e1e0ff",
        "tertiary-fixed-dim": "#ffb0cd"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        gutter: "24px",
        "stack-lg": "48px",
        "stack-sm": "8px",
        "stack-md": "24px",
        "margin-mobile": "16px",
        "container-max": "1280px"
      },
      fontFamily: {
        "body-lg": ["Plus Jakarta Sans"],
        "display-lg-mobile": ["Plus Jakarta Sans"],
        "display-lg": ["Plus Jakarta Sans"],
        "headline-md": ["Plus Jakarta Sans"],
        "body-sm": ["Plus Jakarta Sans"],
        "label-caps": ["Plus Jakarta Sans"]
      },
      fontSize: {
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "display-lg-mobile": ["32px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "700" }],
        "body-sm": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        "label-caps": ["12px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "600" }]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries")
  ]
};