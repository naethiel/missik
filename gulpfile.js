var	gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
// 	sourcemaps = require('gulp-sourcemaps'),
	cssnano = require('gulp-cssnano');

var path = {
	'assets' : {
		'sass' : './assets/sass/',
		'js' : './assets/js/'
	},
	'vendors' : './bower_components/',
	'static' : {
		'css' : './static/css/',
		'maps' : './static/maps/',
		'js' : './static/js/'
	}
}

gulp.task('styles', function(){
	gulp.src(path.assets.sass + 'main.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(cssnano({
		discardComments: {removeAll: true}
	}))
	.pipe(gulp.dest(path.static.css))
});

gulp.task('vendors', function(){
	gulp.src([
		path.vendors + 'jquery/dist/jquery.js',
		path.vendors + 'threejs/build/three.js',
		path.vendors + 'animejs/anime.js',
		path.vendors + 'tether/dist/js/tether.js',
		path.vendors + 'bootstrap/dist/js/bootstrap.js'
	])
	.pipe(plumber())
	.pipe(concat('vendors.js'))
	.pipe(uglify())
	.pipe(gulp.dest(path.static.js));
});

gulp.task('scripts', function(){
	gulp.src([
		path.assets.js + '*'
	])
	.pipe(plumber())
	.pipe(concat("app.js"))
	.pipe(uglify())
	.pipe(gulp.dest(path.static.js));
});

gulp.task('watch', function() {
	gulp.watch([path.assets.sass + '*.scss'], ['styles']);
	gulp.watch([path.assets.js + '*.js'], ['scripts']);
});

gulp.task('build', ['scripts', 'styles', 'vendors']);

gulp.task('default', ['build']);
