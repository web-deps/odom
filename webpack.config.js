const path = require("path");

const mode = process.env.NODE_ENV;
const sourceMap = mode === "development" ? "eval-source-map" : "source-map";

module.exports = {
  mode,
  entry: path.resolve(__dirname, "./src/main.js"),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    library: "odom",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  devtool: sourceMap
};
