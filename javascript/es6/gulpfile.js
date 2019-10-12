var gulp = require('gulp');
var babel = require('gulp-babel');
// var browserify = require('gulp-browserify');
var bro = require('gulp-bro');

// require("@babel/polyfill");
// require("@babel/register");

gulp.task('default', function() {
  return (
    gulp
      .src('src/*.js')
      .pipe(
        babel({
          plugins: [['@babel/transform-runtime']]
        })
      )
      // .pipe(browserify({
      //   insertGlobals: false,
      //   debug: false
      // }))
      .pipe(bro())
      .pipe(gulp.dest('dist/'))
  );
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', gulp.series('default'));
});
