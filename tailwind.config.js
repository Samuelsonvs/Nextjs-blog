const { spacing, fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...fontFamily.sans],
        typography: (theme) => ({
          DEFAULT: {
            css: {
              color: theme("colors.gray.900"), // 700
              a: {
                color: theme("colors.blue.500"),
                "&:hover": {
                  color: theme("colors.blue.700"),
                },
                code: { color: theme("colors.blue.400") },
              },
              "h2,h3,h4": {
                "scroll-margin-top": spacing[32],
              },
              code: { color: theme("colors.pink.500") },
              "blockquote p:first-of-type::before": false,
              "blockquote p:last-of-type::after": false,
            },
          },
        }),
      },
    },
  },
  variants: {
    extend: {
      scale: ["active"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
