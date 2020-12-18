const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    pathinfo: false,
  },
  devServer: {
    open: true,
    hot: true,
    contentBase: "./dist",
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
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
