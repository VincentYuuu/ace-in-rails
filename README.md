# ace editor in Rails 6.1.3.1

This is a practice project. To build a codepen-like editor.

## Quick Start
1. `yarn` to get all dependencies
2. `bundle` to get all gems
3. `foreman s` to run rails server and webpack
4. Go to your browser and open http://localhost:3000

Last thing to say, bable will fail to compile because of the emmet.js  syntax error
to avoid getting failed, you need to go in the node_module/emmet-core/emmet.js
at line 14636, you'll see some code like below
```javascript
getImageSize: function(stream) {
	var pngMagicNum = "\211PNG\r\n\032\n",
		jpgMagicNum = "\377\330",
		gifMagicNum = "GIF8",
		pos = 0,
		nextByte = function() {
			return stream.charCodeAt(pos++);
		};
```
just delete `\` before those numbers
```javascript
getImageSize: function(stream) {
	var pngMagicNum = "211PNG\r\n032\n",
		jpgMagicNum = "377330",
		gifMagicNum = "GIF8",
		pos = 0,
		nextByte = function() {
			return stream.charCodeAt(pos++);
		};
```
And you can successfully complie JS files.
