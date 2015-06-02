var gulp  = require('gulp');


/*
Packages
 */
// CSS
var sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css');

// JS
var uglify = require('gulp-uglify');

// Utilities
var browserSync = require('browser-sync'),
	reload = browserSync.reload,
	size = require('gulp-size');

// Images
var pngquant = require('imagemin-pngquant');



/*
Variables
 */
var paths = {
	assets: 'assets/',
};



/*
Errors
 */
function handleErrors(log){
	console.error.bind(log);
	this.emit('end');
}



/*
Tasks
 */
// Styles
// Compile SASS, autoprefix properties, minify the code, show us some size stats and reload browser
gulp.task('styles', function() {
	gulp.src(paths.assets + 'sass/**/*.s{c,a}ss')
		.pipe(sass({
			indentedSyntax: true,
			errLogToConsole: true
		}))
		.pipe(autoprefixer(['last 3 version, > 1%']))
		.pipe(minifyCSS({
			aggressiveMerging: false
		}))
		.on('error', handleErrors)
		.pipe(size({
			title: 'CSS:',
			showFiles: true
		}))
		.pipe(gulp.dest(paths.assets + 'build/css'))
		.pipe(reload({
			stream: true
		}));
});


// Scripts
// Minify the code, show us some size stats and reload browser
gulp.task('scripts', function() {
	gulp.src(paths.assets + 'js/**/*.js')
		.pipe(uglify())
		.pipe(size({
			title: 'JS:',
			showFiles: true
		}))
		.pipe(gulp.dest(paths.assets + 'build/js'))
		.pipe(reload({
			stream: true
		}));
});


// Images
// Optimize PNGs
gulp.task('images', function () {
	return gulp.src(paths.assets + 'img/**/*.png')
		.pipe(pngquant({
			quality: '55-70',
			speed: 4
		})())
		.pipe(gulp.dest(paths.assets + 'build/images'));
});


// Browser Reload
gulp.task('browser-sync', function() {
	browserSync({
		proxy: "boilerplate.dev",
		open: false
	});
});


// Watch files for changes
gulp.task('watch', function() {
	gulp.watch(paths.assets + 'sass/**/*.s{c,a}ss', ['styles']);
	gulp.watch(paths.assets + 'js/**/*.js', ['scripts']);
});


// Default
gulp.task('default', ['browser-sync', 'watch']);
