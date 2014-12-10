var
    through = require('through2'),
    gutil = require('gulp-util'),
    stream = require('stream'),
    PluginError = gutil.PluginError;

var defaultOpts = function (opts) {
    if(typeof opts === 'undefined' || typeof opts !== 'object') {
        opts = {};
    }

    // place option defaults here.
    opts.verbose = opts.verbose || false;
    opts.pasteBefore = opts.pasteBefore || false;
    opts.captureGroup = opts.captureGroup || 0;
    checkOpts(opts);
    return opts;
};

var checkOpts = function(opts) {
    if(typeof opts.verbose !== 'boolean') {
        throw new PluginError('verbose option must be a boolean');
    }
    if(typeof opts.pasteBefore !== 'boolean') {
        throw new PluginError('pasteBefore option must be a boolean');    
    }
    if(typeof opts.captureGroup !== 'number' || 
        opts.captureGroup !== parseInt(opts.captureGroup, 10) ||
        opts.captureGroup < 0) {
        throw new PluginError('captureGroup must be an integer >= 0');
    }
};

var normalizeCutRegex = function(cutRegex, pasteRegex) {
    if(typeof cutRegex === 'string') {
        if(opts.verbose) console.log('creating a regex from a string');
        cutRegex = new RegExp(cutRegex, 'g');
    } else if (!(cutRegex instanceof RegExp)) {
        throw new PluginError(cutRegex + ' is not a regular expression');
    }
    if(!cutRegex.global) {
        throw new PluginError('we currently only support global cut zones');
    }
    return cutRegex;
};

var normalizePasteRegex = function(pasteRegex) {
    if(typeof pasteRegex === 'string') {
        pasteRegex = new RegExp(pasteRegex, 'g');
    } else if (!(pasteRegex instanceof RegExp)) {
        throw new PluginError(pasteRegex + ' is not a regular expression');
    }
    if(!pasteRegex.global) {
        throw new PluginError('we currently only support global paste zones');
    }
    return pasteRegex;
};

/*
 will cut and paste text according to regular expressions
 */
var shuffle = function(cutRegex, pasteRegex, opts) {

    opts = defaultOpts(opts);
    cutRegex = normalizeCutRegex(cutRegex);
    pasteRegex = normalizePasteRegex(pasteRegex);

    var stream = through.obj(function(file, enc, cb){
        var cutMatch, pasteMatch, all, afterCutText, fullMatchText, cutText, indexOfCaptureGroup, output;
        if(file.isStream()) {
            throw new PluginError('Streams not yet supported... please teach me more');
        }
        if(file.isBuffer()) {
            all = String(file.contents);
            while ((cutMatch = cutRegex.exec(all))) {
                fullMatchText = cutMatch[0];
                cutText = cutMatch[opts.captureGroup];
                if(opts.verbose) {
                    console.log('found a match for ' + cutRegex.source + ' at ' + cutMatch.index);
                    console.log('using capture group ' + opts.captureGroup + ': ' + cutText);
                    console.log('searching for a paste zone...');
                }
                pasteMatch = pasteRegex.exec(all);
                if(pasteMatch) {
                    if(opts.captureGroup > 0) {
                        indexOfCaptureGroup = fullMatchText.indexOf(cutText);
                        afterCutText = [all.slice(0, cutMatch.index + indexOfCaptureGroup), 
                            all.slice(cutMatch.index + indexOfCaptureGroup + cutText.length, all.length)]
                            .join('');
                    } else {
                        afterCutText = [all.slice(0, cutMatch.index), all.slice(cutRegex.lastIndex - 1, all.length)].join('');
                    }
                    position = (opts.pasteBefore) ? pasteMatch.index : pasteRegex.lastIndex;
                    output = [afterCutText.slice(0, position), cutText, afterCutText.slice(position)].join('');
                    file.contents = new Buffer(output);
                } else {
                    console.log('could not find the paste zone for this match, leaving the cut zone where it is');
                }
            }
        }
        this.push(file);
        cb();
    });

    return stream;
};

module.exports = shuffle;