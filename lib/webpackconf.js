var config = require('../config')
//if(!config.tasks.js) return

// var path            = require('path')
// var webpack         = require('webpack')
//var webpackManifest = require('./webpackManifest')

// module.exports = function(env) {
//   var jsSrc = path.resolve(config.root.src, config.js.src)
//   var jsDest = path.resolve(config.root.dest, config.js.dest)
//   var publicPath = path.join(config.js.dest, '/')
//   var filenamePattern = env === 'production' ? '[name]-[hash].js' : '[name].js'
//   var extensions = config.js.extensions.map(function(extension) {
//     return '.' + extension
//   })

  // return {
  //   entry: [
  //     './dev/index.js'
  //   ],
  //   output: {
  //     path:  jsDest,
  //     publicPath: '/',
  //     filename: 'bundle.js'
  //   },
  //   module: {
  //     loaders: [{
  //       exclude: /node_modules/,
  //       loader: 'babel-loader',
  //       exclude: /node_modules/,
  //       query: {
  //         presets: ['es2015', 'react']
  //       }
  //     },
  //     ]
  //   },
  //   resolve: {
  //     extensions: ['', '.js', '.jsx']
  //   }
  // };

  var webpack = require('webpack');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var path = require('path');
  var env = process.env.NODE_ENV || 'production';


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
  var entry = [
    './dev/src/reset.css',
    './dev/src/normalize.css',
    './dev/src/index.js',

  ];

  var production = {
    devtool: 'source-map',
    entry: entry,
    output: {filename: 'bundle.js', path: path.resolve('example')},
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

    entry: entry.concat([
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server'
    ]),
    output: {filename: 'bundle.js', path: path.resolve('./example')},
    plugins: [
      new HtmlWebpackPlugin({
        template: 'html!./dev/src/index.html'
      }),
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
    eslint: {configFile: 'dev/src/.eslintrc'},
    devServer: {
      hot: true,
      historyApiFallback: true,
      stats: {
        // Do not show list of hundreds of files included in a bundle
        chunkModules: false,
        colors: true
      }
    }
  };

  module.exports = function (){
   return development
  }
  //module.exports = env === 'production' ? production : development;
