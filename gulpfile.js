const gulp			= require('gulp');
const browserify	= require("browserify");
const source		= require("vinyl-source-stream");
const webpack		= require("webpack-stream");
const concat		= require('gulp-concat');
const sourcemaps	= require('gulp-sourcemaps');
const rename		= require('gulp-rename');
const inject		= require('gulp-inject-string');
const postcss		= require('gulp-postcss');
const autoprefixer	= require('gulp-autoprefixer');
const sprites		= require('postcss-sprites').default;
const cssnano		= require('cssnano');
const cached		= require('gulp-cached');
const uglify		= require('gulp-uglify');
const del			= require('del');
const path			= require('path');
const config		= require('./webpack.config.js');

gulp.task("js",function(){
	return gulp.src(['js/*.js','!js/app.js'])
			.pipe(webpack(config))
			.pipe(gulp.dest('js'));
});

gulp.task('css',function(){
	return gulp.src(['css/*.css','!css/app.css'])
			.pipe(concat('app.css'))
			.pipe(autoprefixer())
			.pipe(gulp.dest('css'));
});

gulp.task('watch:css', function () {
	return gulp.watch(['css/*.css','!css/app.css'], gulp.series(['css']));
});

gulp.task('watch:js', function(){
	return gulp.watch(['js/*.js','!js/app.js'], gulp.series(['js']));;
})

gulp.task('watch',gulp.parallel(['watch:css','watch:js']));
