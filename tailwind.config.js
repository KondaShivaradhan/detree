/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        color0: 'hsl(220, 100%, 14%)',
        color1: '#301860',
        color2: '#483078',
        color3: '#604878',
        color4: '#906090',
      },
    },
  },
  plugins: [],
}

