var gulp = require('gulp'),
    gutil = require('gulp-util'),
    stream = require('stream'),
    jshint = require('gulp-jshint'),
    shuffle = require('./index.js'),
    del = require('del'),
    Readable = stream.Readable,
    PluginError = gutil.PluginError,
    rs = new Readable(),
    paths = {
        src: {
            jshint: '*.js',
            test: ['test/*.txt']
        },
        dest: {
            test: '.tmp/output'
        }
    };

gulp.task('jshint', function() {
    return gulp.src(paths.src.jshint)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function() {
    return gulp.src(paths.src.test)
        .pipe(shuffle(/"use strict";[\n\s]*((?:\/\*[\s\S]*\*\/)[\n\s]*)[^\/]/g, /^/g, {captureGroup: 1}))
        .pipe(gulp.dest(paths.dest.test));
});

gulp.task('clean', require('del').bind(null, ['.tmp']));

gulp.task('default', ['clean'], function(){
    return gulp.start('test');
});