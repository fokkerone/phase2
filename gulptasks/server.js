var
  gulp          = require('gulp'),
  browserSync   = require('browser-sync'),
  reload        = browserSync.reload;
  livereload    = require('gulp-livereload'),
  config        = require('../config'),
  //
  // grapher       = require('sass-graph'),
  // print         = require('gulp-print'),
  //
  // gutil         = require('gulp-util'),
  // sass			= require('gulp-sass'),
  // path          = require('path'),
  // touch         = require('touch'),
  // print         = require('gulp-print'),



// graph = grapher.parseDir('../dev/sass', {
//   loadPaths: ['../dev/sass', '../dev/sass/bootstrap','../dev/sass/core']
// });


gulp.task('server', function() {
  browserSync(config.server[process.env.NODE_ENV || 'development']);
});
