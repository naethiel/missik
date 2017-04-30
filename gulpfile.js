var	gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	cssnano = require('gulp-cssnano');

var path = {
	'assets' : {
		'sass' : './assets/sass/',
		'js' : './assets/js/'
	},
	'vendors' : {
		npm: './node_modules/',
		bower: './bower_components/'
	},
	'static' : {
		'css' : './static/css/',
		'maps' : './static/maps/',
		'js' : './static/js/',
		'fonts' : './static/fonts/'
	}
}

gulp.task('vendors', function(){
	gulp.src([
		path.vendors.npm + 'jquery/dist/jquery.js',
		path.vendors.npm + 'three/build/three.js',
		path.vendors.npm + 'animejs/anime.js'
	])
	.pipe(plumber())
	.pipe(concat('vendors.js'))
	.pipe(uglify())
	.pipe(gulp.dest(path.static.js));
});

gulp.task('fonts', function(){
	gulp.src([
		path.vendors.bower + 'font-awesome/fonts/*'
	])
	.pipe(gulp.dest(path.static.fonts))
});

gulp.task('styles', function() {
	gulp.src(path.assets.sass + 'main.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(sourcemaps.write())
	.pipe(cssnano({
		discardComments: {removeAll: true}
	}))
	.pipe(gulp.dest(path.static.css))
});

gulp.task('scripts', function() {
	gulp.src([
		path.assets.js + '*'
	])
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(babel({
		presets: ["es2015"]
	}))
	.pipe(concat("app.js"))
	.pipe(uglify().on('error', function(error){
		console.error(err);
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(path.static.js));
});

gulp.task('watch', function() {
	gulp.watch([path.assets.sass + '*' ], ['styles']);
	gulp.watch([path.assets.js + '*.js'], ['scripts']);
});

gulp.task('build', ['scripts', 'styles', 'fonts', 'vendors']);

gulp.task('default', ['build']);
