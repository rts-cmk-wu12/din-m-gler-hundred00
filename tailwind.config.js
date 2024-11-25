/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        commonBlue: "#162A41",
        energyLabelA: "#10AC84",
        energyLabelB: "#F2C94C",
        energyLabelC: "#F2994A",
        energyLabelD: "#EB5757",
      },
      backgroundImage: {
        "placeholder": "url('/images/placeholder.jpg')",
        "hero-image": "url('/images/home/hero-image.jpg')",
        "newsletter-image": "url('/images/home/newsletter-background.jpg')",
        "title-header-image": "url('/images/common/page-title-header-background.jpg')",
      }
    },
  },
  plugins: [],
};
