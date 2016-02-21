var config = require('../config')
//if(!config.tasks.js) return

var path            = require('path')
var webpack         = require('webpack')
//var webpackManifest = require('./webpackManifest')

module.exports = function(env) {
  var jsSrc = path.resolve(config.root.src, config.js.src)
  var jsDest = path.resolve(config.root.dest, config.js.dest)
  var publicPath = path.join(config.js.dest, '/')
  var filenamePattern = env === 'production' ? '[name]-[hash].js' : '[name].js'
  var extensions = config.js.extensions.map(function(extension) {
    return '.' + extension
  })

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

  return {
    devtool: 'eval',

    entry: [
      './dev/index.js',
      './dev/src/index.js'
    ],
    output: {
      path:  jsDest,
      publicPath: '/',
      filename: 'bundle.js'
    },

    module: {
      loaders: [
        {
          exclude: /node_modules/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react']
          }
        },

        {test: /\.jade$/, loaders: ['react-hot', 'jade-react'], include: [path.resolve('src')]}
      ]
    },
    resolve: {extensions: ['', '.js', '.jsx']},
    stats: {colors: true},
    eslint: {configFile: 'src/.eslintrc'},
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
}
