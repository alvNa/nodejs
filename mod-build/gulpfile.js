'use strict';

var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var docco = require('gulp-docco');

module.exports = function(gulp, config) {

  // Injecting the compiled files into the template
  gulp.task('inject', function() {

    gulpUtil.log('Inject bower dependencies and js module files');

    gulp.src(config.src + 'index.html')
      .pipe(wiredep({
        dependencies: true
      }))
      .pipe(inject(gulp.src([config.src + 'js/**/module.js', config.src + 'js/**/!(module)*.js'], {
        read: false
      }), {
        ignorePath: config.src,
        addRootSlash: false
      }))
      .pipe(gulp.dest(config.src));
  });

  // Injecting the compiled files into the template
  gulp.task('pre-test', function() {

    gulpUtil.log('Inject bower dependencies into karma.conf');

    gulp.src('karma.conf.js')
      .pipe(wiredep({
        devDependencies: true,
        dependencies: true
      }))
      .pipe(gulp.dest('./'));
  });

  // Generate documentation pages and save into `docs` directory.
  gulp.task('docs', function() {
    return gulp.src([config.src + 'js/**/*.js'])
      // Docco generated files will be saved in the `docs` directory multiple files
      .pipe(docco())
      .pipe(gulp.dest(config.buildDir + 'docs'));
  });
};