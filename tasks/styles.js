'use strict';

module.exports = function(gulp) {
  let bootstrap     = require('bootstrap-styl'),
      changed       = require('gulp-changed'),
      concat        = require('gulp-concat'),
      cssnano       = require('gulp-cssnano'),
      postcss       = require('gulp-postcss'),
      stylus        = require('gulp-stylus'),
      lost          = require('lost'),
      rucksack      = require('rucksack-css'),
      rupture       = require('rupture');


  function _error(err) {
    console.error('Error!', err.message);
  }

  let tasks = {
    stylus: function (sources, destinyDir, output) {
      return function() {
        let config = {
          'include css': true,
          use: [rupture()]
        };
        return gulp.src(sources)
          .pipe(stylus(config))
          .pipe(postcss([
            lost(),
            rucksack({
              autoprefixer: true
            })
          ]))
          .pipe(concat(output))
          .pipe(cssnano({ zindex: false }).on('error', _error))
          .pipe(gulp.dest(destinyDir));
      }
    },

    bootstrap: function (app, destinyDir) {
      let config = {
        use: [bootstrap()]
      };
      return function() {
        return gulp.src(`app/assets/styles/${app}.styl`)
          .pipe(stylus(config))
          .pipe(gulp.dest(destinyDir));
      }
    },


    vendors: function (source, destinyDir) {
      return function() {
        return gulp.src(source)
          .pipe(changed(destinyDir))
          .pipe(concat('vendors.min.css'))
          .pipe(cssnano().on('error', _error))
          .pipe(gulp.dest(destinyDir));
      }
    },

    css: function (sources, destinyDir) {
      return function() {
        return gulp.src(sources)
          .pipe(changed('app/assets/stylus/'))
          .pipe(cssnano().on('error', _error))
          .pipe(concat('app.min.css'))
          .pipe(gulp.dest(destinyDir));
      }
    }
  };


  return tasks;
};
