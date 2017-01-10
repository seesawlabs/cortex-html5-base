var path = require('path');

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var srcDir = path.resolve(__dirname, 'src');
var assetsDir = path.resolve(__dirname, 'assets');
var fontDir = path.resolve(__dirname, 'font');
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
      // { from: assetsDir, to: 'assets' },
      // { from: fontDir, to: 'font' }
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
        loader: 'url-loader?limit=100000',
        test: /\.otf$/,
      },
      {
        loader: "style-loader!css-loader",
        test: /\.css$/,
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'file'
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
