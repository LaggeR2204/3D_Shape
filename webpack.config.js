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
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // type: "asset/resource",
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      OrbitControls$:
        "/node_modules/three/examples/jsm/controls/OrbitControls.js",

      // GUI$: "/node_modules/three/examples/jsm/libs/dat.gui.module.js",
      GUI$: path.resolve(
        __dirname,
        "node_modules/three/examples/jsm/libs/dat.gui.module.js"
      ),
      TransformControls$:
        "/node_modules/three/examples/jsm/controls/TransformControls.js",
      Controls: path.resolve(
        __dirname,
        "node_modules/three/examples/jsm/controls/"
      ),
      CustomGeometry: path.resolve(
        __dirname,
        "node_modules/three/examples/jsm/geometries/"
      ),
    },
  },
};
