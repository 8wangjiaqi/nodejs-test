#!/use/bin/node

//const http=require('http');
//http.createServer((rep,res)=>{
//  res.end('<!DOCTYPE html><html><hea d><title>hello</title></head><body><h1>hello world!</h1></body></html>');
//}).listen(8080);
const http = require('http');

http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain'});
  response.end('Hello World!');
}).listen(8080);

console.log('Server running at http://192.168.62.144:8080/');
