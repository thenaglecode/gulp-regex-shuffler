# gulp-regex-shuffler

## Installation

`npm install --save-dev gulp-regex-shuffler`

## Description

use this gulp plugin to cut and paste text via regular expressions within a file.

## Usage

```js
var regexCutAndPaste = require('gulp-regex-shuffler');

gulp.task('move-text', function() {
    return gulp.src('*.txt')
        .pipe(regexCutAndPaste(/move this text\n/g, /^/g)
        .pipe(gulp.dest('dist'));
});
```

This will take the text `move this text` and place it after the line `text goes here`. e.g.

    some line
    move this text

Will become

    text goes here
    some line

## API
### Syntax

    function(cutRegex, pasteRegex[, opts]) {...}

### Arguments
#### cutRegex
> - **Required:** `true`
> - **Type:** `RegExp|String`
> - **Description:** regular expression used to define what to cut out. Currently only supports regexps with global modifiers but future support is planned.
> - **Example:** `/ab*c/g` OR `'ab*c'`

#### pasteRegex
> - **Required:** `true`
> - **Type:** `RegExp|String`
> - **Example:** `/ab*c/g` OR `'ab*c'`
> - **Description:** regular expression used to define where to paste. Currently only supports regexps with global modifiers but future support is planned.

#### opts
> - **Required:** `false`
> - **Type:** `object`
> - **Description:** used to configure the plugin, see [options]
> - **Example:** `{verbose: true, pasteBefore: true, captureGroup: 1}`

### Options
#### opts.verbose
> - **Default:** `false`
> - **Type:** `boolean`
> - **Description:** whether to output debug information or not.

#### opts.pasteBefore
> - **Default:** false
> - **Type:** `boolean`
> - **Description:** determines whether the text found with the `cutRegex` argument will be pasted before or after the text found with `pasteRegex`

#### opts.captureGroup
> - **Default:** `0`
> - **Type:** number
> - **Description:** an integer >= 0. describes the capture group that will be cut from the matching text.


## Planned Improvements
- Arbitrary cut and paste objects. Using `String(objectToInjectIntoText)` on whatever is passed into the first argument
  to allow for anything to be placed where the pasteRegex specifies
- handle streams (still have to learn a bit more about streams before i complete this. If anyone can lead me to a
  comprehensive document on this i would be greatful :)
- multiple match, cut and pastes using non-global regexes. e.g. /$\s*\S*hello\S*\s*^/m would find every string with the
  text hello in it and paste each one one after the other or all together according to the provided options. There are
  a few scenarios I'll need to cater for so this change might take a while.
