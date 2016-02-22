var config = require('../config')
if(!config.js) return


  var webpackManifest = require('./webpackManifest')
  var webpack = require('webpack');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var path = require('path');
  var env = process.env.NODE_ENV || 'development';


  var embedFileSize = 65536;
  var assetsLoaders = [
    {
      test: /\.css$/,
      loader: 'style!css?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]'
    },
    {test: /\.json$/, loader: 'json'},
    {test: /\.mp4$/, loader: 'url?limit=' + embedFileSize + '&mimetype=video/mp4'},
    {test: /\.svg$/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/svg+xml'},
    {test: /\.png$/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/png'},
    {test: /\.jpg$/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/jpeg'},
    {test: /\.gif$/, loader: 'url?limit=' + embedFileSize + '&mimetype=image/gif'},
    {
      test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=' + embedFileSize
    }
  ];
  var _entry = [
    './dev/src/reset.css',
    './dev/src/normalize.css',
    './dev/src/index.js',

  ];

  var jsSrc = path.resolve(config.root.src, config.js.src)
  var jsDest = path.resolve(config.root.dest, config.js.dest)
  var publicPath = path.join(config.js.dest, '/')
  var filenamePattern = env === 'production' ? '[name]-[hash].js' : '[name].js'
  var extensions = config.js.extensions.map(function(extension) {
    return '.' + extension
  })

  module.exports = function (){

    var production = {
      devtool: 'eval',

      entry: _entry,
      output: {
        filename: config.js.bundleName || "bundle.js",
        path: jsDest
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"' + env + '"'
          }
        })
      ],

      module: {
        loaders: assetsLoaders.concat([
          {
            test: /\.js$/,
            loader: 'babel',
            query: {
              presets: [ 'es2015', 'react' ]
            },
            include: [path.resolve('/dev/src')]
          },
          {test: /\.jade$/, loaders: ['jade-react'], include: [path.resolve('dev/src')]}
        ])
      },
      resolve: {extensions: ['', '.js']},
      stats: {colors: true}
    };

    var development = {
      devtool: 'eval',

      entry: _entry.concat([
        'webpack/hot/only-dev-server'
      ]),
      output: {
        filename: config.js.bundleName || "bundle.js",
        path: jsDest
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"' + env + '"'
          }
        }),
        new webpack.HotModuleReplacementPlugin()
      ],
      module: {
        loaders: assetsLoaders.concat([
          {test: /\.js$/, loader: 'react-hot!babel?presets[]=react,presets[]=es2015', include: [path.resolve('dev/src')]},
          {test: /\.jade$/, loaders: ['react-hot', 'jade-react'], include: [path.resolve('dev/src')]}
        ]),
        preLoaders: [
          {test: /\.js$/, loaders: ['eslint'], include: [path.resolve('dev/src')]}
        ]
      },
      resolve: {extensions: ['', '.js']},
      stats: {colors: true},
      eslint: {configFile: 'dev/src/.eslintrc'}
    };

    return env === 'production' ? production : development;
}
