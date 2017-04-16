const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', () => {
  return gulp.src('./dev/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  gulp.src('./dev/scripts/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./public/scripts'))
    .pipe(reload({stream: true}));
});

gulp.task('watch', function() {
  gulp.watch('./dev/scripts/**/*.js', ['scripts']);
  gulp.watch('./dev/styles/**/*.scss', ['styles']);
  gulp.watch('*.html', reload);
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: '.'  
  })
});

gulp.task('default', ['browser-sync','styles', 'scripts', 'watch']);