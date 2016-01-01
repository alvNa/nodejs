'use strict';

var gulp = require('gulp');
var gulpUtil = require("gulp-util");
var Server = require('karma').Server;

module.exports = function(gulp, config) {
  /**
   * Run test once and exit
   */
  gulp.task('karma-run', function(done) {
    new Server({
      configFile: __dirname + '/../karma.conf.js',
      singleRun: false
    }, function() {
      done();
    }).start();
  });

  /**
   * Watch for file changes and re-run tests on each change
   */
  gulp.task('karma-single-run', function(done) {
    new Server({
      configFile: __dirname + '/../karma.conf.js'
    }, function() {
      done();
    }).start();
  });
};