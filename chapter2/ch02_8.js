var path = require('path');

var directories = ['users', 'mike', 'docs']
var docsDirectory = directories.join(path.sep);
console.log('directory : %s',docsDirectory);

var curPath = path.join('/Users/mike', 'notepad.exe');
console.log('path : %s', curPath);

var filename = "C:\\Users\\james\\memo.exe"
var dirname = path.dirname(filename);
var basename = path.basename(filename);
var extname = path.extname(filename);
console.log(dirname, basename, extname);