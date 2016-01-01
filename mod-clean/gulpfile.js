'use strict';

var gulp = require('gulp');
var stripDebug = require('gulp-strip-debug'); // only as an example
var del = require('del');
var vinylPaths = require('vinyl-paths');
var gulpUtil = require("gulp-util");

module.exports = function(gulp, config) {

  gulp.task('clean', function() {

    if (config.buildDir) {

      gulpUtil.log('Cleaning the ' + config.buildDir + ' directory ...');

      return gulp.src(config.buildDir + '*')
        .pipe(vinylPaths(del))
        .pipe(stripDebug());
    } else {
      gulpUtil.warn('Directory undefined');
    }

  });
};