/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themePink: '#c23866',
        themeLightBlue: '#2563eb',
        themeBlue: '#1b1523',
        themeOrange: '#ff5733',
        themeGray: '#333c42',
        themeLightBeige: '#F5DEB3',
        theme1Color1: '#3498db',
        theme1Color2: '#ecf0f1',
        theme1Color3: '#34495e',
        theme1Color4: '#f1c40f'
      },
    },
  },
  plugins: [require("daisyui")],
}
