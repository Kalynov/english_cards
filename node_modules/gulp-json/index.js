var through = require('through2');
var File = require('vinyl');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var request = require('request');

// consts
const PLUGIN_NAME = 'gulp-json';

// plugin level function (dealing with files)
function gulpJSON() {

  // creating a stream through which each file will pass
  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }
    parsedJson = JSON.parse(file.contents)	
			
    var that = this;
    var keys = Object.keys(parsedJson);
    var count = keys.length;
	function getJSON(key){
		request(parsedJson[key],function(error,response,body){
			if(!error){
				var jsonFile = new File({
  					cwd: "/",
  					base: "/",
  					path: "/"+key+".json",
  					contents: new Buffer(body)
  				});
				that.push(jsonFile);
				--count || cb(); 
			}
			else {
				that.emit('error', new PluginError(PLUGIN_NAME, 'Request to url failed.'));
			}
    	});
	}
    keys.map(getJSON);

  });

  // returning the file stream
  return stream;
};


// exporting the plugin main function
module.exports = gulpJSON;