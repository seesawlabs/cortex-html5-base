var path = require('path');

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var srcDir = path.resolve(__dirname, 'src');
var assetsDir = path.resolve(__dirname, 'assets');
var htmlDir = path.resolve(__dirname, 'html');
var outDir = path.resolve(__dirname, 'build');

module.exports = {
  entry: path.resolve(srcDir, 'main.js'),
  output: {
    path: outDir,
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: htmlDir },
      { from: assetsDir, to: 'assets' }
    ]),
    new webpack.DefinePlugin({
      'APP_NAME': JSON.stringify(require("./package.json").name)
    }),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: srcDir,
      },
      { 
        loader: "style-loader!css-loader?url=false",
        test: /\.css$/,
      },
      {
        loader: "json-loader",
        test: /\.json$/
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
