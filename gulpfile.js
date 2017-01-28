const gulp = require('gulp');
const gls = require('gulp-live-server');
const sass = require('gulp-sass');

gulp.task('serve', ['sass'], function () {
  const server = gls.new('./app.js');
  server.start();
  gulp.watch(
    [
      "./app/**/*.html",
      "./app/**/*.css",
      "./app/**/*.js"
    ],
    function (file) {
      console.log("Changed: " + file.path);
      server.notify(file);
    });

    gulp.watch("./app.js", function (file) {
    server.start();
    server.notify(file);
  });
  gulp.watch("./app/sass/**/*.scss", ['sass']);
});

gulp.task('sass', function() {
  gulp.src('app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/styles'));
});

gulp.task('default', ['sass', 'serve']);