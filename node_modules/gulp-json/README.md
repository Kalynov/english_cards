# gulp-json
# Usage
Create a json file that you will pipe into the plugin in this format, using json apis.
```json
{
"twitch":"https://api.twitch.tv/kraken",
"pokemon":"http://pokeapi.co/api/v2/pokemon/1/"
}
```
The plugin outputs a stream of multiple json files that can be piped into gulp.dest("DESTINATION GOES HERE") or you can pipe it into another plugin to do something with these json files.
Example gulp pipeline:
```javascript
var gulp = require('gulp');
var gulpJson = require('gulp-json');


 gulp.src('api.json')
  .pipe(gulpJson())
  .pipe(gulp.dest('api'));
```
The output would be piped into the folder api with a twitch.json file and a pokemon.json file both populated with api data.
