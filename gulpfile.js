const gulp = require('gulp');
const gls = require('gulp-live-server');
const sass = require('gulp-sass');
const connect = require('connect');

gulp.task('serveprod', ['sass'], function() {
  connect.server({
    root: '.',
    port: process.env.PORT || 80,
    livereload: false
  });
});

gulp.task('serve', ['sass'], function () {
  const server = gls.new('./app.js');
  server.start();
  gulp.watch(
    [
      "./client/**/*.html",
      "./client/**/*.css",
      "./client/**/*.js"
    ],
    function (file) {
      console.log("Changed: " + file.path);
      server.notify(file);
    });

    gulp.watch("./server/**/*.js", file =>{
      console.log("Restart server file");
      server.start();
      server.notify(file);      
    });
    gulp.watch("./app.js", function (file) {
      console.log("Restart app");
      server.start();
      server.notify(file);
    });
    gulp.watch("./client/sass/**/*.scss", ['sass']);
});

gulp.task('sass', function() {
  gulp.src('./client/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('client/styles'));
});

gulp.task('default', ['sass', 'serve']);