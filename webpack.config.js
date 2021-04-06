const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

let config = {
  entry: { index: path.resolve(__dirname, "src", "index.js") },
  output: {
    path: path.resolve(__dirname, "dist")
  },

  module: {

    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.wasm$/,
        type: 'webassembly/async',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "source", "index.html"),
    })
  ],
};


module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'eval-cheap-module-source-map';
  }

  return config;
};
