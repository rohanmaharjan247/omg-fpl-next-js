const { fontFamily } = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', ...fontFamily.sans]
      },
      colors: {
        primary: 'rgb(3, 4, 94)',
        secondary: 'rgb(2, 62, 138)',
        tertiary: 'rgb(0, 119, 182)',
        'light-primary': 'rgb(0, 150, 199)',
        'light-secondary': 'rgb(0, 180, 216)'
      }
    },
  },
  plugins: [],
}
