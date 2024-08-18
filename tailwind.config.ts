import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'blue-900': '10px 10px 20px rgba(0, 0, 139, 0.5)', // Tạo bóng đổ màu xanh đậm
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '5/3': '5 / 3',
      },
      flex: {
        '1/2': '1 1 50%',
      },
      colors: {
        grey: '#f5f5f5',
      },
      height: {
        '2/5': '48%',
      },
      backgroundColor: {
        'almost-white': '#F7F7F7',
      },
      screens: {
        xs: '375px',
        sm: '576px',
        md: '960px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '10px',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
      fontSize: {
        xxs: '0.625rem',
        xs: '0.75rem',
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
    },
  },
  plugins: [],
};
export default config;
