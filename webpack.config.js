const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "inline-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    alias: {
      OrbitControls$:
        "/node_modules/three/examples/jsm/controls/OrbitControls.js",

      GUI$: "/node_modules/three/examples/jsm/libs/dat.gui.module.js",
    },
  },
};
