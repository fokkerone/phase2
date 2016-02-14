var config        = require('../config');
if(!config.scss) return

var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;
var stream       = browserSync.stream;

var sass         = require('gulp-sass')
var sourcemaps   = require('gulp-sourcemaps')
var handleErrors = require('../lib/logger')
var autoprefixer = require('gulp-autoprefixer')
// var path         = require('path')

// var paths = {
//   src: path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
//   dest: path.join(config.root.dest, config.tasks.css.dest)
// }

var cssTask = function () {
  return gulp.src(config.scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'nested'}))
    .on('error', handleErrors)
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scss.dest))
    .pipe( stream(  ) );
}

gulp.task('scss', cssTask);
module.exports = cssTask
