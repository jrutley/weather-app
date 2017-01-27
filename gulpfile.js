var gulp = require('gulp'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  watch = require('gulp-watch');
 
gulp.task('webserver', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('sass', function() {
  gulp.src('app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/styles'))
    .pipe(connect.reload());
});

gulp.task('reload', function(){
  gulp.src('app/*.html').pipe(connect.reload());
})

gulp.task('watch', function() {
    gulp.watch(['sass/**/*.scss'], {cwd: 'app'}, ['sass']);
    gulp.watch(['*.html', 'scripts/**/*.js'], {cwd: 'app'}, ['reload']);
});
 
gulp.task('default', ['sass', 'webserver', 'watch']);