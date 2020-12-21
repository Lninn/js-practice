const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split('://')
const publicUrl = `8080-${host}`

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    pathinfo: false,
  },
  devServer: {
    open: true,
    hot: true,
    public: publicUrl,
    // host: 'localhost',
    // https://github.com/gitpod-io/gitpod/issues/26
    // https://github.com/gitpod-io/gitpod/issues/628
    disableHostCheck: true,
    contentBase: "./dist"
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Tetris",
      template: "./index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
