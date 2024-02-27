/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Nunito']
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

