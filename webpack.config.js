const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  target: "node",
  entry: {
    index: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
    library: "slack-msg",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: ["node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
