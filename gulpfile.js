var gutil = require('gulp-util'),
    stream = require('stream'),
    through = require('through2'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    Readable = stream.Readable,
    rs = new Readable();  

/*
    will cut and paste text according to regular expressions
 */
var shuffle = function(cutRegex, pasteRegex, opts) {
    if(typeof opts === 'undefined' || typeof opts !== 'object') {
        opts = {};
    }    
}

gulp.task('test', function() {
   console.log('We haven\'t implemented this yet'); 
});