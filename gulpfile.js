var gulp = require('gulp'),
    gutil = require('gulp-util'),
    stream = require('stream'),
    jshint = require('gulp-jshint'),
    shuffle = require('./index.js'),
    Readable = stream.Readable,
    PluginError = gutil.PluginError,
    rs = new Readable();

gulp.task('jshint', function() {
    return gulp.src('index.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function() {
    return gulp.src('test/*.txt')
        .pipe(shuffle(/"use strict";[\n\s]*((?:\/\*[\s\S]*\*\/)[\n\s]*)[^\/]/g, /^/g, {verbose: true, captureGroup: 1}))
        .pipe(gulp.dest('test/output'));
});