'use strict';

var gulp = require('gulp');
var docco = require('gulp-docco');
var express = require('express');
var browserSync = require('browser-sync');
var fs = require('fs');
var path = require('path');

module.exports = function(gulp, config) {
  var app = express();
  var port = process.env.PORT || config.port;
  var hasStarted = false;

  app.use(express.static(config.srcDir));
  app.use(config.bower, express.static(config.bowerDir));

  //Load all files in serverDir directory
  function loadRoutes(serverDir, app) {
    fs.readdirSync(serverDir).forEach(function(file) {
      if (path.extname(file) === '.js') {
        require(serverDir + '/' + file)(app);
      }
    });
  }

  function listening() {
    browserSync({
      port: port,
      proxy: 'localhost:' + port,
      files: [config.src + '/**/*.*']
    });
  }

  // Generate documentation pages and save into `docs` directory.
  gulp.task('docs', function() {
    return gulp.src([config.src + '/js/**/*.js'])
      // Docco generated files will be saved in the `docs` directory multiple files
      .pipe(docco())
      .pipe(gulp.dest(config.buildDir + 'docs'));
  });

  gulp.task('server-run', function() {
    // Start the server at the beginning of the task 
    if (!hasStarted) {
      loadRoutes(config.serverDir, app);
      app.listen(port, listening);
      hasStarted = true;
    }

    // add browserSync.reload to the tasks array to make all browsers reload after tasks are complete.
    gulp.watch([config.src + '/js/**/*.js', config.server + '/**/*.js'], function(){
      console.log('changes in code ...');
      loadRoutes(config.serverDir, app);
      //app.notify();
      browserSync.reload();
    });
  });

  gulp.task('server-stop', function() {
    // Stop the server
    browserSync.exit();
  });

};