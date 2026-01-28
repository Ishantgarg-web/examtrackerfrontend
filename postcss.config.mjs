/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {
      /* Only process CSS in the app directory, ignore styles directory */
      content: ['./app/**/*.{js,ts,jsx,tsx}'],
    },
  },
}

export default config
