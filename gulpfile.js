var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    wrap = require("gulp-wrap");

//Concat js
gulp.task('concat', function() {
    gulp.src(['js/engine.js','js/*.js', 'js/libs/sylvester.js'])
        .pipe(concat('3dengine.js'))
        .pipe(gulp.dest('dist/js/'));
});

//Minify js
gulp.task('minjs', function() {
    return gulp.src('dist/js/*.js')
        .pipe(uglify())                     
        .pipe(gulp.dest('dist/js/'));                     
}); 


//Gulp watch task
gulp.task('watch', function() { 
    //Watch js files
    gulp.watch('js/*.js', ['concat','minjs']);
});