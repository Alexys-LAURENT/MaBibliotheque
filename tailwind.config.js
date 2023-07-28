/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        bb_primary: '#F8F3ED',
        bb_secondary: '#4C3E34',
        bb_text: '#202020',
        bb_third: '#EEEAE6',
      },
      fontFamily: {
        literata: ["Literata", "Inter", 'serif'],
      },
    },
    plugins: [],
  }
}
