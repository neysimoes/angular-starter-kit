'use strict';

module.exports = function(gulp) {
  let eslint        = require('gulp-eslint');

  let tasks = {
    run: function (sources, config) {
      if (!Array.isArray(sources)) {
        throw new Error('Sources param must be a array!');
      }

      sources = sources.push('!node_modules/**');

      return function() {
        return gulp.src(['app/*.js','!node_modules/**'])
          .pipe(eslint(config))
          .pipe(eslint.formatEach('compact', process.stderr));
      }
    }

  };

  return tasks;
};
