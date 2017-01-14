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
	'vendors' : './node_modules/',
	'static' : {
		'css' : './static/css/',
		'maps' : './static/maps/',
		'js' : './static/js/'
	}
}

function scripts() {
	gulp.src([
		path.assets.js + '*'
	])
	.pipe(plumber())
	.pipe(concat("app.js"))
	.pipe(uglify())
	.pipe(gulp.dest(path.static.js));
}

function styles() {
	gulp.src(path.assets.sass + 'main.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(cssnano({
		discardComments: {removeAll: true}
	}))
	.pipe(gulp.dest(path.static.css))
}


gulp.task('vendors', function(){
	gulp.src([
		path.vendors + 'jquery/dist/jquery.js',
		path.vendors + 'three/build/three.js',
		path.vendors + 'animejs/anime.js'
	])
	.pipe(plumber())
	.pipe(concat('vendors.js'))
	.pipe(uglify())
	.pipe(gulp.dest(path.static.js));
});

gulp.task('styles', styles);
gulp.task('scripts', scripts);

gulp.task('scripts-from-ftp', function(){
	setTimeout(scripts, 1000);
});

gulp.task('styles-from-ftp', function() {
	setTimeout(styles, 1000);
});

gulp.task('watch', function() {
	gulp.watch([path.assets.sass + '*.scss'], ['styles']);
	gulp.watch([path.assets.js + '*.js'], ['scripts']);
});

gulp.task('watch-from-ftp', function(){
	gulp.watch([path.assets.sass + '*.scss'], ['styles-from-ftp']);
	gulp.watch([path.assets.js + '*.js'], ['scripts-from-ftp']);
});

gulp.task('build', ['scripts', 'styles', 'vendors']);

gulp.task('default', ['build']);
