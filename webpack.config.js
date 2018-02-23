const PATH = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const outputPath = PATH.resolve(__dirname, "./build");

module.exports = {
  entry: PATH.resolve(__dirname, "./entry.js"),
  output: {
    path: outputPath,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js.*/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015", "stage-2", "react"]
            }
          }
        ]
      },
      {
        test: /\.css?/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      component: PATH.resolve(__dirname, "./component"),
      constant: PATH.resolve(__dirname, "./constant"),
      controller: PATH.resolve(__dirname, "./controller"),
      fp: PATH.resolve(__dirname, "./fp"),
      mixin: PATH.resolve(__dirname, "./mixin"),
      model: PATH.resolve(__dirname, "./model"),
      static: PATH.resolve(__dirname, "./static"),
      style: PATH.resolve(__dirname, "./style"),
      store: PATH.resolve(__dirname, "./store"),
      util: PATH.resolve(__dirname, "./util")
    }
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin([
      {
        from: PATH.resolve(__dirname, "./static/index.html"),
        to: PATH.resolve(outputPath, "./index.html")
      },
      {
        from: PATH.resolve(__dirname, "./static/images"),
        to: PATH.resolve(outputPath, "./images")
      },
    ])
  ]
};
