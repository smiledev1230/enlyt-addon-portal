const merge = require("webpack-merge");

const common = require("./webpack.common");

const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  devtool: "source-map",
  devServer: {
    port: 9000,
    stats: {
      colors: true,
      chunks: false,
      children: false,
      modules: false
    }
  }
});
