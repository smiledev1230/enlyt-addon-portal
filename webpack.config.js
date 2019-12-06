const { resolve } = require("path");

const stage = process.env.NODE_ENV === "production" ? "prod" : "dev";

module.exports = require(resolve(__dirname, "webpack", `webpack.${stage}.js`));