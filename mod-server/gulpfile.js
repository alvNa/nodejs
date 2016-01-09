'use strict';

var gulp = require('gulp');
var docco = require('gulp-docco');
//var browserSync = require('browser-sync').create();

module.exports = function(gulp, config) {
  // Generate documentation pages and save into `docs` directory.
  gulp.task('docs', function() {
    return gulp.src(['src/js/**/*.js'])
      // Docco generated files will be saved in the `docs` directory multiple files
      .pipe(docco())
      .pipe(gulp.dest(config.buildDir + 'docs'));
  });

  var expressServer = require(config.baseDir + '/' + config.server + '/server.js')(config);

  gulp.task('server-run', function() {
    // Start the server at the beginning of the task 
    expressServer.run();
    // add browserSync.reload to the tasks array to make all browsers reload after tasks are complete.
    gulp.watch(['src/js/**/*.js',config.server + '/routes/**/*.js'], function(){
      console.log('changes ...');
      expressServer.reload();
    });
  });

  gulp.task('server-stop', function() {
    // Stop the server
    expressServer.stop();
  });

};