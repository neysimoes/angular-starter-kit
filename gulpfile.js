'use strict';
let gulp          = require('gulp'),
    changed       = require('gulp-changed'),
    wiredep       = require('wiredep'),
    bower         = require('./tasks/bower')(gulp),
    browserSync   = require('./tasks/browserSync')(gulp),
    eslint        = require('./tasks/eslint')(gulp),
    htmls         = require('./tasks/htmls')(gulp),
    javascripts   = require('./tasks/javascripts')(gulp),
    styles        = require('./tasks/styles')(gulp);


const REV = `${new Date().getTime()}`;
const WIREDEP_CONFIG = require('./package.json').wiredep;
const DEPENDENCIES = wiredep(WIREDEP_CONFIG);

let replaceOptions = {
  js: `/app/vendors.min.js?${REV}`,
  css: `/app/assets/css/app.min.css?${REV}`,
  cssVendors: `/app/assets/css/vendors.min.css?${REV}`
};


gulp.task('browser-sync', ['stylus'], browserSync.init);


gulp.task('bower', bower('views/includes/*.html', 'views/includes/', WIREDEP_CONFIG));


gulp.task('stylus', styles.stylus('public/assets/stylus/app.styl', 'public/assets/css', 'app.css'));
gulp.task('css', ['stylus'], styles.css('public/assets/css/app.css', 'dist/public/assets/css/'));


gulp.task('js', ['js:app', 'js:vendors']);
gulp.task('js:app', javascripts.app);
gulp.task('js:vendors', ['htmlreplace'], javascripts.vendors(DEPENDENCIES.js, 'dist/public/app/'));


gulp.task('htmlreplace', htmls.replace('views/includes/*.html', 'dist/views/includes', replaceOptions));


gulp.task('default', ['css', 'js', 'htmlreplace']);