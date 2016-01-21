var gulp  = require('gulp');


/*
Packages
 */
// CSS
var sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-minify-css');

// JS
var uglify = require('gulp-uglify'),
	modernizr = require('gulp-modernizr');

// Utilities
var browserSync = require('browser-sync'),
	reload = browserSync.reload,
	size = require('gulp-size'),
	concat = require('gulp-concat'),
	header = require('gulp-header');

// Images
var imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	svg2png = require('gulp-svg2png'),
	svgstore = require('gulp-svgstore');



/*
Variables
 */
var paths = {
		assets: 'assets/',
	},
	jsPlugins = [
		paths.assets + 'js/plugins/jquery.unveil/jquery.unveil.js'
	],
	authors = ['/**',
				' * Site Name: ',
				' * Front-End: ',
				' * Author URI: ',
				' * Author Twitter: ',
				' */',
				''].join('\n');


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
		.pipe(header(authors))
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
	gulp.src(paths.assets + 'js/*.js')
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


// Scripts - Plugins
// Concat plugins into one file and uglify
gulp.task('scripts-plugins', function() {
	gulp.src(jsPlugins)
		.pipe(concat('plugins.js'))
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
gulp.task('images', function () {

	// Sprites
	// Optimize SVG & Create sprite
	gulp.src(paths.assets + 'img/sprite/*.svg')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}]
		}))
		.pipe(svgstore())
		.pipe(gulp.dest(paths.assets + 'build/img/sprite'));


	// SVG
	// Convert SVGs to PNG then optimize said PNGs
	gulp.src(paths.assets + 'img/**/*.svg')
	 	.pipe(svg2png([2]))
	 	.pipe(gulp.dest(paths.assets + 'build/img'))
		.pipe(imagemin({
			progressive: true,
			use: [pngquant({
				quality: '55-70',
				speed: 4
			})]
		}))
		.pipe(gulp.dest(paths.assets + 'build/img'));


	// All images
	// Optimize but exclude Sprite folder
	gulp.src([paths.assets + 'img/**/*', '!' + paths.assets + 'img/sprite/*'])
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
			use: [pngquant({
				quality: '55-70',
				speed: 4
			})]
		}))
		.pipe(gulp.dest(paths.assets + 'build/img'));
});


// Modernizr
// Create custom file based on Modernizr's features used in CSS & JS
gulp.task('modernizr', function() {
	gulp.src(paths.assets + 'build/**/*.{css,js}')
		.pipe(modernizr({
			"cache" : true,
			"options" : [
				"setClasses",
				"addTest",
				"html5printshiv",
				"testProp",
				"fnBind"
			],
		}))
		.pipe(uglify())
		.pipe(gulp.dest(paths.assets + 'build/js'));
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
