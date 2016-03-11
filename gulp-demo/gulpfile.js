var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var colors = require('colors');
var imageToAscii = require('image-to-ascii');

gulp.task('minify-js', function() {
  console.log('minifying js ...');
  return gulp.src('src/js/*.js')
    .pipe(concat('todo.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js/'));
});

gulp.task('minify-img', function() {
  console.log('minifying img ...');
  return gulp.src('src/img/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

gulp.task('show-colors', function() {
  console.log('hello'.green); // outputs green text
  console.log('i like cake and pies'.underline.red) // outputs red underlined text
  console.log('inverse the color'.inverse); // inverses the color
  console.log('OMG Rainbows!'.rainbow); // rainbow
  console.log('Run the trap'.trap); // Drops the bass

  var name = 'Marak';
  console.log(colors.cyan('Hello %s'), name);
});

gulp.task('show-logo', function() {
  // Convert to ascii this image
  return imageToAscii(__dirname + '/src/img/dia.jpeg', function(err,
    converted) {
    console.log(err || converted);
  });
});

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', function() {
    console.log('watching js changes...');
  });
});

gulp.task('default', ['minify-js', 'minify-img', 'show-colors'],
  function() {
    console.log('Ejecutando gulp...');
  });
