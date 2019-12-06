const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TerserPlugin = require('terser-webpack-plugin');


const isProd = process.env.NODE_ENV == "production";

module.exports = {
  entry: path.resolve(__dirname, "../client/index.js"),
  output: {
    path: path.resolve(__dirname, "../public"),
    filename: "javascripts/bundle.js",
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "/assets/"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js"],
    modules: ["node_modules"]
  }
};
