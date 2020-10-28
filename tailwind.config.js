module.exports = {
  important: true,
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: () => ({
        "sidebar-pattern-light": `url("/images/loafpattern-dark.svg")`,
        "sidebar-pattern-dark": `url("/images/loafpattern-light.svg")`,
      }),
      spacing: {
        sidebar: "380px",
        "not-sidebar": "calc(100% - 380px)",
        topbar: "16rem",
      },
      inset: {
        topbar: "16rem",
      },
    },
  },
  variants: {},
  plugins: [],
}
