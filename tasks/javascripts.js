'use strict';

module.exports = function(gulp) {
  let changed       = require('gulp-changed'),
      concat        = require('gulp-concat'),
      livereload    = require('gulp-livereload'),
      ngAnnotate    = require('gulp-ng-annotate'),
      uglify        = require('gulp-uglify'),
      wiredep       = require('wiredep');

  function _error(err) {
    console.error('Error!', err.message);
  }

  let tasks = {
    app: function (sources, destinyDir) {
      return function() {
        return gulp.src(sources)
          .pipe(changed(destinyDir))
          .pipe(concat('app.min.js', { newLine: ';' }))
          .pipe(uglify({ mangle: true }).on('error', _error))
          .pipe(gulp.dest(destinyDir))
          .pipe(livereload());
      }
    },

    angular: function (sources, destinyDir) {
      return function() {
        return gulp.src(sources)
        .pipe(changed(destinyDir))
        .pipe(concat('app.min.js', { newLine: ';' }))
        .pipe(ngAnnotate())
        .pipe(uglify({ mangle: true }).on('error', _error))
        .pipe(gulp.dest(destinyDir))
        .pipe(livereload());
      }
    },

    vendors: function (sources, destinyDir) {
      return function() {
        return gulp.src(sources)
          .pipe(changed(destinyDir))
          .pipe(concat('vendors.min.js'))
          .pipe(uglify({ mangle: true }).on('error', _error))
          .pipe(gulp.dest(destinyDir));
      }
    }

  };


  return tasks;
};
