/**
 * Created by euser on 13/12/2014.
 */
var assert = require("assert"),
    File = require('vinyl'),
    shuffler = require('../');

describe('Test Regex Shuffler', function(){
    describe('in streaming mode', function(){
        it('should have placed the last line first', function() {
            var file = new File({
               contents: new Buffer("first text\nthis text")
            });
            var regexShuffler = shuffler(/this text/g, /^/g);
            regexShuffler.write(file);
            regexShuffler.once('data', function(file) {
                assert.equal("this textfirst text\n", String(file.contents));
            });
        });
        it('should use capture group 1 to cut and paste', function(){
            var file = new File({
                contents: new Buffer("not this. but this. not this")
            });
            var regexShuffler = new shuffler(/not this\. (but this\.) not this/g, /^/g, {captureGroup: 1});
            regexShuffler.write(file);
            regexShuffler.once('data', function(file){
                assert.equal('but this.not this.  not this', new Buffer(file.contents));
            });
        });
    });

});
