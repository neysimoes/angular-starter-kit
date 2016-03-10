'use strict';

module.exports = function(gulp) {
  let changed       = require('gulp-changed'),
      htmlreplace   = require('gulp-html-replace');

  function _error(err) {
    console.error('Error!', err.message);
  }

  let tasks = {
    replace: function (sources, destinyDir, options) {
      return function() {
        return gulp.src(sources)
          .pipe(htmlreplace(options))
          .pipe(gulp.dest(destinyDir));
      }
    },

    views: function (sources) {
      return function() {
        return gulp.src(sources)
          .on('error', _error);
      }
    }

  };


  return tasks;
};
