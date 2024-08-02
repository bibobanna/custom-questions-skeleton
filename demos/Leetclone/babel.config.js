const { plugins } = require("./webpack.config");

// This file is meant for Jest test suite only
module.exports = {
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        runtime: "automatic", // This auto-imports React for JSX transformations.
      },
    ],
  ],
  plugins: ["@babel/plugin-transform-runtime"],
};
