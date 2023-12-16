import { nextui } from "@nextui-org/react";
import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
const config: Config = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        bb_bgDark: "#040404",
        bb_bgLight: "#F1F1F1",
        bb_textDark: "#323232",
        bb_textLight: "#F1F1F1",
        bb_secondary: '#e9d022',
        bb_third: '#e60b09',

        bb_text: '#D4D4D4',
        bb_primary: '#252525',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
    },
  },
  plugins: [nextui()]
}
export default config;
