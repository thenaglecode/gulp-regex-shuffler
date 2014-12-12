# gulp-regex-shuffler

### Installation

`npm install --save-dev gulp-regex-shuffler`

### Description

use this gulp plugin to cut and paste text via regular expressions within a file.

### Usage

```js
var regexCutAndPaste = require('gulp-regex-shuffler');

gulp.task('move-text', function() {
    return gulp.src('*.txt')
        .pipe(regexCutAndPaste(/move this text\n/g, /^/g)
        .pipe(gulp.dest('dist'));
});
```

This will take the text `move this text` and place it after the line `text goes here`.

e.g.

    some line
    move this text

Will become

    text goes here
    some line

### Function Definition

    function(cutRegex, pasteRegex[, opts]) {...}
    
<dl>
    <dt id="args.cutRegex"><h3>cutRegex</h3></dt>
    <dd><strong>required:</strong> <code>true</code></dd>
    <dd><strong>type:</strong><code> RegExp|String</code></dd>
    <dd>
        <strong>description:</strong> regular expression used to define what to cut out.
        Currently only supports regexes with global modifiers but future support is planned. 
    </dd>
    <dd><strong>example:</strong> <code>/ab*c/g</code> OR <code>'ab*c'</code></dd>
    <dt id="args.pasteRegex"><h3>pasteRegex</h3></dt>
    <dd><strong>required:</strong> <code>true</code></dd>
    <dd><strong>type:</strong> <code>RegExp|String</code></dd><dd>
    <dd><strong>description:</strong> regular expression used to define where to paste.
        Currently only supports regexes with global modifiers but future support is planned.</dd>
    <dd><strong>example:</strong> <code>/ab*c/g</code> OR <code>'ab*c'</code></dd>
    <dt id="args.opts"><h3>opts</h3></dt>
    <dd><strong>required:</strong> <code>false</code></dd>
    <dd><strong>type:</strong> <code>object</code></dd><dd>
    <dd><strong>description:</strong> used to configure the plugin, see <a href="#options" >Options</a></dd>
    <dd><strong>example:</strong> <code>{verbose: true, pasteBefore: true, captureGroup: 1}</code></dd>
</dl>

<hr/>

<h3 id="options">Options</h3>

<dl>
    <dt id="opts.verbose"><h3>opts.verbose</h3></dt>
    <dd>
        <strong>default:</strong> <code>false</code>
    </dd>
    <dd><strong>type:</strong> <code>boolean</code></dd>
    <dd>
        <strong>description:</strong> whether to output debug information or not
    </dd>
    <dt id="opts.pasteBefore"><h3>opts.pasteBefore</h3></dt>
    <dd>
        <strong>default:</strong> <code>false</code>
    </dd>
    <dd><strong>type:</strong> <code>boolean</code></dd>
    <dd>
        <strong>description:</strong> determines whether the text found with the 
        <code>cutRegex</code> will be pasted
    </dd>
    <dt id="opts.captureGroup">opts.captureGroup</dt>
    <dd><strong>default:</strong> <code>0</code></dd>
    <dd><strong>type:</strong> <code>number</code></dd>
    <dd><strong>description:</strong> an integer >= 0. describes the capture group that will be cut from the matching text.</dd>
</dl>