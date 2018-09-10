var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var $ = require('gulp-load-plugins')();

const cssDest = "app/css"

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
  	.pipe($.plumber())
  	.pipe($.sourcemaps.init())
		.pipe($.sass())
		.pipe($.autoprefixer('last 2 versions', 'ie 8', 'ie 9'))
	  .pipe($.sourcemaps.write('.'))
	  .pipe($.plumber.stop())
		.pipe(gulp.dest('app/css'))
		.pipe(gulp.dest('web/assets/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('cache:clear', function (callback) {
	return cache.clearAll(callback)
})
gulp.task("clean:dist", function() {
	return $.del.sync('dist');
});

gulp.task('images', function() {
	return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
	.pipe($.cache($.imagemin({
		interlaced: true
	})))
	.pipe(gulp.dest('web/assets/images'))
});

gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('web/assets/fonts'))
})
gulp.task('useref', function(){
  return gulp.src('*.html')
    .pipe($.useref())
    
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('templates'))
});

gulp.task('browserSync', function() {
	browserSync.init({
		proxy: "http://localhost/vbank/web"
	});
});

gulp.task('build', function (callback) {
	runSequence(
	['sass', 'useref', 'images', 'fonts'],
	callback
	)
});

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('templates/**/*.html').on("change", browserSync.reload);
	gulp.watch('web/assets/js/**/*.js').on("change", browserSync.reload);
});
