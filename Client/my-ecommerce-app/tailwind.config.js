// Importing the typography plugin
const typography = require('@tailwindcss/typography');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      typography: {
        // Customizing default typography
        DEFAULT: {
          css: {
            color: '#333333', // Default text color for body
            a: {
              color: '#1D4ED8', // Custom link color
              '&:hover': {
                color: '#1E40AF', // Hover state for links
              },
            },
            h1: {
              fontSize: '2.25rem', // Custom size for H1
              fontWeight: '700', // Custom weight for H1
              color: '#000000', // Color for H1
              lineHeight: '1.2',
            },
            h2: {
              fontSize: '1.875rem',
              fontWeight: '700',
              color: '#000000',
              lineHeight: '1.3',
            },
            p: {
              fontSize: '1rem',
              lineHeight: '1.75',
              color: '#333333', // Paragraph text color
            },
            button: {
              backgroundColor: '#000000',
              color: '#FFFFFF',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.375rem',
              fontWeight: '600',
              '&:hover': {
                backgroundColor: '#1D4ED8',
              },
            },
          },
        },
      },
    },
  },
  // Adding the typography plugin to Tailwind
  plugins: [
    typography,
  ],
};
