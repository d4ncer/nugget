var Webpack = require('webpack');
var path = require('path');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'client', 'public', 'js');
var srcPath = path.resolve(__dirname, 'client', 'src', 'js');

var commonsPlugin = new Webpack.optimize.CommonsChunkPlugin('common.js');

var hotLoaderPlugin = new Webpack.HotModuleReplacementPlugin();
var noErrorsPlugin = new Webpack.NoErrorsPlugin();

var entryArrayCreator = function(file) {
  return ['webpack/hot/only-dev-server', path.resolve(srcPath, file)];
};

var config = {
  devtool: 'eval',
  entry: {
    landing: entryArrayCreator('landing.jsx'),
    aboutEntry: entryArrayCreator('aboutEntry.jsx'),
    client: 'webpack-dev-server/client?http://localhost:3001'
  },
  output: {
    publicPath: '/js/',
    path: buildPath,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
        include: srcPath
      },
      {
        test: /\.jsx$/,
        loaders: ['react-hot-loader', 'jsx-loader?harmony'],
        include: srcPath
      },
      {
        test: /\.js$/ ,
        loaders: ['react-hot-loader', 'jsx-loader?harmony'],
        include: srcPath
      }
    ]
  },
  plugins: [
    hotLoaderPlugin,
    noErrorsPlugin,
    commonsPlugin
  ]
};

module.exports = config;