var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var config      = require('../config')


gulp.task('browser-sync', function() {
  browserSync(config.server.development);
});


gulp.task('default', ['browser-sync', 'webpack:watch'], function () {
  gulp.watch( config.jade.src, ['jade']);
  gulp.watch( config.scss.src, ['scss']);
  gulp.watch( "dev/fonts/**", ['copyfontassets']);
});
