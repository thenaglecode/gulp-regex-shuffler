# npm-regex-cut-and-paste

### Installation

```
npm install --save-dev npm-regex-cut-and-paste
```

### Description

use this package to cut and paste text via regular expressions within a file.

e.g.

```js
var regexCutAndPaste = require('npm-regex-cut-and-paste');

gulp.task('move-text', function() {
	return gulp.src('*.js')
		.pipe(regexCutAndPaste(/move this text/g, /text goes here\s*\n/g);
});
```
