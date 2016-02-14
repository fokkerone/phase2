var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var livereload  = require('gulp-livereload');
var config      = require('../config').server


gulp.task('browser-sync', function() {
  browserSync(config.development);
});

gulp.task('default', ['browser-sync'], function () {
  livereload.listen(config.livereload);
  gulp.watch( "dev/jade/**/*.jade", ['jade']);
  gulp.watch( "dev/scss/**/*.scss", ['scss']);
  gulp.watch( "dev/fonts/**", ['copyfontassets']);
});
