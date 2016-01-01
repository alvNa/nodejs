'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var docco = require('gulp-docco');

module.exports = function(gulp, config) {
  // Generate documentation pages and save into `docs` directory.
  gulp.task('docs', function() {
    return gulp.src(['src/js/**/*.js'])
      // Docco generated files will be saved in the `docs` directory multiple files
      .pipe(docco())
      .pipe(gulp.dest('build/docs'));
  });

  // Static server
  gulp.task('browser-sync', function() {
    browserSync.init({
      notify: false,
      port: 9000,
      //proxy: 'yourlocal.dev'
      server: {
        baseDir: 'src',
        routes: {
          '/bower_components': './bower_components'
        },
        open: false
      }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(['src/js/**/*.js'], browserSync.reload);
  });

  gulp.task('browser-stop', function() {
    browserSync.exit();
  });
};