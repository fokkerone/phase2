var config      = require('../config');

var jade        = require('jade');
var gulpJade    = require('gulp-jade');
var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var notify      = require("gulp-notify");
var newer       = require('gulp-newer');
var path        = require('path');

var changed 		= require('gulp-changed');
var debug 			= require('gulp-debug');
var cache 			= require('gulp-cached');
var jadeInheritance = require('gulp-jade-inheritance');
var filter 			 = require('gulp-filter');

var browserSync  = require('browser-sync');
var reload       = browserSync.reload;
var stream       = browserSync.stream;

var handleErrors = require('../lib/logger')


gulp.task('jade', function() {
	var YOUR_LOCALS = {
		debug: true,
		conf: config
	};

	gulp.src(config.jade.src)
    .pipe(plumber({
        inherit: true,
        errorHandler: notify.onError( {
				"title": "AHOI !!!",
				"subtitle": "Jade Bug",
				"message": "Error: <%= error.message %>",
				"sound": "oink", // case sensitive
				"icon": path.join(__dirname, "gulp.png"), // case sensitive
				"onLast": true,
				"wait": false
			  })
      })
    )
    .pipe(changed(config.jade.dest, {extension: '.html'}))
    .pipe(cache('jade'))
    .pipe(jadeInheritance({basedir: config.jade.baseDir}))
  



		//filter out partials (folders and files starting with "_" )
		.pipe(filter(function (file) {
				return !/\/_/.test(file.path) || !/^_/.test(file.relative);
		}))

		.pipe( gulpJade(
			{
				locals: YOUR_LOCALS,
				pretty: true
			})
		)
    .pipe(plumber.stop())
		.pipe( gulp.dest( config.jade.dest ) )
    .pipe( reload( {stream:true} ) );
});
