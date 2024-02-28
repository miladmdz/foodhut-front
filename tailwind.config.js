/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        width: "90%",
      },
      fontFamily: {
        sofiaProRegular: "sofiaProRegualr",
        sofiaProMedium: "sofiaProMedium",
        sofiaProBold: "sofiaProBold",
      },
      colors: {
        primryOrang: "#F54748",
        primryBlack: "#0D0D0D",
        primryBlackLight: "#191919",
        primryYellow: "#FDC55E",
        primrygray: "#686D77",
        primryOrangCirDark: "#512F00",
        primryOrangCir: "#FFE8C8",

      },
      boxShadow: {
        shadowPrimary: "0px 15px 30px 0px rgba(223, 105, 81, 0.30)",
      },
      fontSize: {
        xxs: "0.625rem",
        xxxs: "0.5rem",
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
