const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

let config = {
  experiments: {
    asyncWebAssembly: true
  },
  entry: { index: "./src/javascript/index.js" },
  output: {
    path: path.resolve(__dirname, "dist")
  },

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
  },
  module: {

    rules: [
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: ["babel-loader"]
      // },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // {
      //   test: /\.wasm$/,
      //   type: 'webassembly/async',
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "static", "index.html"),
    })
  ],
};


module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
  }

  return config;
};
