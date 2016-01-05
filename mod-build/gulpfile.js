'use strict';

var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var wiredep = require('wiredep').stream;
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var docco = require('gulp-docco');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var templateCache = require('gulp-templatecache');

module.exports = function(gulp, config) {

  // Injecting the compiled files into the template
  gulp.task('inject-src', function() {

    gulpUtil.log('Inject bower dependencies and angularjs module files in order into the index.html');

    gulp.src(config.src + 'index.html')
      .pipe(wiredep({
        dependencies: true
      }))
      .pipe(inject(
        gulp.src([config.src + 'js/**/*.js']).pipe(angularFilesort()), {
          ignorePath: config.src,
          addRootSlash: false
        }))
      .pipe(gulp.dest(config.src));
  });

  // Injecting the compiled files into the template
  gulp.task('inject-test', function() {

    gulpUtil.log('Inject bower dependencies and angularjs module files in order into karma.conf');

    gulp.src(config.karmaConf)
      .pipe(wiredep({
        devDependencies: true,
        dependencies: true
      }))
      .pipe(inject(gulp.src([config.src + 'js/**/*.js']).pipe(angularFilesort()), {
        starttag: 'inject:js',
        endtag: '// endinject',
        addRootSlash: false,
        transform: function(filepath, file, i, length) {
          return '\'' + filepath + '\'' + (i + 1 < length ? ',' : ',');
        }
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

  gulp.task('ng-template-cache', function() {
    return gulp.src(config.src + 'html/**/*.html')
      .pipe(templateCache({
        output: config.dist + '/'+ config.appName +'-templates.min.js',
        strip: config.src + 'html',
        prepend: 'tpl',
        // angular module name 
        moduleName: config.modulePrefix + '.templates',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeEmptyElements: true
        }
      }))
      .pipe(gulp.dest('./'));
  });

  gulp.task('uglify-js', function() {
    return gulp.src(config.src + 'js/**/*.js')
      .pipe(angularFilesort())
      // This will output the non-minified version
      .pipe(concat(config.appName + '.js'))
      .pipe(gulp.dest(config.dist))

    .pipe(uglify({
        compress: {
          drop_console: true
        }
      }))
      .pipe(concat(config.appName + '.min.js'))
      .pipe(gulp.dest(config.dist));
  });

};