/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        pine: {
          DEFAULT: '#1E3D34',
          50: '#EDF2F0',
          100: '#D6E2DD',
          200: '#AEC5BB',
          300: '#86A899',
          400: '#4F7566',
          500: '#1E3D34',
          600: '#1A362E',
          700: '#152B25',
          800: '#10201C',
          900: '#0B1613',
        },
        linen: {
          DEFAULT: '#FAF7F2',
          100: '#FFFFFF',
          200: '#F3EEE4',
          300: '#E7DFCF',
        },
        clay: {
          DEFAULT: '#B5654A',
          50: '#F6E9E4',
          100: '#EFD7CE',
          400: '#C17E63',
          500: '#B5654A',
          600: '#9A5039',
          700: '#7C4030',
        },
        ink: {
          DEFAULT: '#23201C',
          soft: '#4A453D',
        },
        sand: '#E7DFCF',
      },
      fontFamily: {
        serif: ['"Fraunces Variable"', 'Georgia', 'serif'],
        sans: ['"Public Sans Variable"', '"Public Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
        content: '72rem',
      },
      boxShadow: {
        none: 'none',
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.375rem',
      },
    },
  },
  plugins: [],
};
