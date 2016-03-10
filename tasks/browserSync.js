'use strict';

module.exports = function(gulp) {
  var  browserSync   = require('browser-sync').create();

  let tasks = {
    init: function() {
      browserSync.init({
        server: {
            baseDir: "./app"
        },
        open: false,
        notify: true
      });
      gulp.watch('app/assets/stylus/**/*.styl', ['stylus']);
      gulp.watch('app/assets/css/**/*.css').on('change', browserSync.reload);
    }
  };

  return tasks;
};
