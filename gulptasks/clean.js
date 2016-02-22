var gulp   = require('gulp')
var del    = require('del')
var config = require('../config')
var notify = require("gulp-notify");


var cleanTask = function (cb) {
  notify({
       "title": "Open Github",
       "subtitle": "Project web site",
       "message": "Click to open project site",
       "sound": "Frog", // case sensitive
       "onLast": true,
       "wait": true
  });

  del([config.root.dest]).then(function (paths) {
    cb()
  })
}

gulp.task('clean', cleanTask)
module.exports = cleanTask
