var
//jade        = require('jade'),
gulpJade    = require('gulp-jade'),
gulp        = require('gulp'),
plumber     = require('gulp-plumber'),
notify      = require("gulp-notify"),
//newer       = require('gulp-newer'),
path        = require('path'),
livereload  = require('gulp-livereload'),
config      = require('../config'),
//navi				= require('../../navigation')

changed 		= require('gulp-changed'),
debug 			= require('gulp-debug'),
cache 			= require('gulp-cached'),
jadeInheritance = require('gulp-jade-inheritance'),
filter 			= require('gulp-filter');

// jade.filters.smarty = function (str) {
// 	return str + '!!SMARTY!!';
// }


gulp.task('jade', function() {

  var YOUR_LOCALS = {
    debug: true,
    conf: config,
    livereload: config.server.livereload
  };

  gulp.src(config.jade.src)
  .pipe(changed(config.jade.dest, {extension: '.html'}))
  .pipe(cache('jade'))
  .pipe(jadeInheritance({basedir: config.jade.baseDir}))
  .pipe( plumber( {
    errorHandler: notify.onError( {
      "title": "AHOI !!!",
      "subtitle": "Jade Bug",
      "message": "Error: <%= error.message %>",
      "sound": "oink", // case sensitive
      "icon": path.join(__dirname, "gulp.png"), // case sensitive
      "onLast": true,
      "wait": false
    } )
  }))

  // filter out partials (folders and files starting with "_" )
  .pipe(filter(function (file) {
    return !/\/_/.test(file.path) || !/^_/.test(file.relative);
  }))


  .pipe( gulpJade(
    {
      locals: YOUR_LOCALS,
      pretty: true
    })
  )
  .pipe( gulp.dest( config.jade.dest ) )
  .pipe( livereload( config.server.livereload, { auto: true } ) );
});

gulp.task('initalJadeBuild', function() {
  var YOUR_LOCALS = {
    debug: true,
    conf: config,
    livereload: config.server.livereload
  };


  cache.caches = {};
  gulp.src(config.jade.src)
  .pipe(cache('jade'))

  .pipe( plumber( {
    errorHandler: notify.onError( {
      "title": "AHOI !!!",
      "subtitle": "Jade Bug",
      "message": "Error: <%= error.message %>",
      "sound": "oink", // case sensitive
      "icon": path.join(__dirname, "gulp.png"), // case sensitive
      "onLast": true,
      "wait": false
    } )
  }))

  // filter out partials (folders and files starting with "_" )
  .pipe(filter(function (file) {
    //return !/\/_/.test(file.path) ||  !/\/_/.test(file.relative );
    return !/[_]+/g.test(file.relative)
  }))


  .pipe(debug({title: 'Jade:'}))


  .pipe( gulpJade(
    {
      locals: YOUR_LOCALS,
      pretty: true
    })
  )
  .pipe( gulp.dest( config.jade.dest ) )
  .pipe( livereload( config.server.livereload, { auto: true } ) );
});

gulp.task('buildProccess:jade', function() {
  var YOUR_LOCALS = {
    debug: false,
    conf: config,
    navigation: navi,
    livereload: false
  };


  cache.caches = {};
  gulp.src(config.jade.src)
  .pipe(cache('jade'))

  .pipe( plumber( {
    errorHandler: notify.onError( {
      "title": "AHOI !!!",
      "subtitle": "Jade Bug",
      "message": "Error: <%= error.message %>",
      "sound": "oink", // case sensitive
      "icon": path.join(__dirname, "gulp.png"), // case sensitive
      "onLast": true,
      "wait": false
    } )
  }))

  // filter out partials (folders and files starting with "_" )
  .pipe(filter(function (file) {
    //return !/\/_/.test(file.path) ||  !/\/_/.test(file.relative );
    return !/[_]+/g.test(file.relative)
  }))


  .pipe(debug({title: 'Jade:'}))


  .pipe( gulpJade(
    {
      locals: YOUR_LOCALS,
      pretty: true
    })
  )
  .pipe( gulp.dest( config.build.jade.dest ) )
});
