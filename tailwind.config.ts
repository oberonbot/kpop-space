/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss';
const config: Config = {
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
      colors: {
        foreground: 'rgb(var(--foreground-rgb))',
        apricot: '#FCC89B',
        fluomagenta: '#FF5FA2',
        fearlessblue: '#719CFF',
      },
      keyframes: {
        appear: {
          '0%': {
            opacity: '0',
          },
          '20%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        appear: 'appear 0.5s linear forwards',
        'appear-1': 'appear 5s linear forwards',
      },
    },
    screens: {
      sm: '500px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
export default config;
