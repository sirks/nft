module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      machina: ["NeueMachina", "sans-serif"],
      helveticaBlack: ["HelveticaNeueBlack", "sans-serif"],
      helveticaBold: ["HelveticaNeueBold", "sans-serif"],
      helveticaRegular: ["HelveticaNeueRegular", "sans-serif"],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#f9f9f9',
      'orange': '#fcaf17',
      'orangeLight': '#ffedce',
      'red': '#fc174c',
      'redLight': '#ffe9e9',
      'green': '#25e140',
      'greenLight': '#dbffe1',
      'blue': '#1795fc',
      'black': '#1e2722',
    },
    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '992px',
      // => @media (min-width: 992px) { ... }

      'xl': '1200px',
      // => @media (min-width: 1200px) { ... }
    },
    container: {
      center: true,
    },
    // container: {
    //   screens: {
    //     sm: "100%",
    //     md: "100%",
    //     lg: "1024px",
    //     xl: "1280px"
    //   },
    //   maxWidth: {
    //     sm: '540px',
    //     md: '720px',
    //     lg: '960px',
    //     xl: '1140px',
    //   }
    // },
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '960px',
          },
          '@screen xl': {
            maxWidth: '1140px',
          },
        }
      })
    }
  ]
}
