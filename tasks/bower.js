'use strict';

module.exports = function(gulp) {
  let wiredep       = require('wiredep');

  let bower = function (sources, destinyDir, config) {
    return function() {
      return gulp.src(sources)
      .pipe(wiredep.stream(config))
      .pipe(gulp.dest(destinyDir));
    }
  };

  return bower;
};
