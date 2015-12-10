'use strict';


var gulp         = require('gulp'),
    path         = require('path'),
    sass         = require('gulp-sass'),
    haml         = require('gulp-haml'),
    sourcemaps   = require('gulp-sourcemaps'),
    minifyCss    = require('gulp-minify-css'),
    jshint       = require('gulp-jshint'),
    prettify     = require('gulp-prettify'),
    livereload   = require('gulp-livereload'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    plumber      = require('gulp-plumber'),
    cache        = require('gulp-cached'),
    uglify       = require('gulp-uglify');



gulp.task('images', function(){
    gulp.src('./src/images/**')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(plumber())
        .pipe(gulp.dest('./build/images'));
});

gulp.task('haml', function() {
    gulp.src('./src/**/*.haml')
        .pipe(haml())
        .pipe(prettify())
        .pipe(gulp.dest('./build/'))
        .pipe(livereload({start: true}));
});

gulp.task('sass', function() {
    gulp.src('./src/scss/**/*.scss')
        .pipe(sass({includePaths: ['./build/css']}))
        .pipe(sass({ compass: true, sourcemap: true, outputStyle: 'compressed'}))
        .pipe(livereload())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('scripts', function() {
    gulp.src('./src/scripts/**/*.js')
        .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(livereload())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/scripts'));
});

gulp.task('plugins', function() {
    gulp.src('./src/scripts/plugins/*.js')
        .pipe(uglify())
        .pipe(livereload())
        .pipe(concat('plugins.min.js'))
        .pipe(gulp.dest('./build/scripts'));
});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./src/images/**', ['images']);
    gulp.watch('./src/**/*.haml', ['haml']);
    gulp.watch('./src/scripts/**/*.js', ['scripts']);
    gulp.watch('./src/scripts/plugins/*.js', ['plugins']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);

});

gulp.task('default', ['watch', 'sass', 'images', 'scripts', 'plugins', 'haml'])