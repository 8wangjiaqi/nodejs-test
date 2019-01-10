#!/usr/bin/node
console.log('file name:', __filename);
console.log('dir name:', __dirname);


//var file = __dirname + '/views/view.html';
//console.log('data file:',file);



const path = require('path');
var fileName = path.join(__dirname, 'views', 'login.html');
console.log('fileName:', fileName);

//console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'))
//console.log(path.join('/foo', 'bar', 'baz/asdf', '..','aa'))




















