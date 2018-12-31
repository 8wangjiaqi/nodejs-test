#!/usr/bin/node

const http = require('http');

http.createServer((req, res) => {
  //res.setHeader('Access-Control-Allow-Methods', '*');
  //res.setHeader('Access-Control-Allow-Headers', 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE');
  res.setHeader('Content-Type','text/plain');


  
  res.setHeader('Access-Control-Allow-Origin', '*');
  req.pipe(process.stdout);
  console.log('req:',req.headers);
  //res.send('ok');
  //var json={status:20};
  //res.write('aaa');
  res.end('json');


}).listen(3000);
