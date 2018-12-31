#!/usr/bin/node

const http = require('http'),
      url  = require('url');

var address = process.argv[2] || 'http://localhost:8080';

const options={
    hostname:url.parse(address).hostname,
    port:url.parse(address).port,
    path:url.parse(address).pathname,
    method:"POST",
    headers:{
      'User-Agent':'03-post.js'
    }
};

var req=http.request(options, (res) => {
  console.log(`HTTP/${res.httpVersion} ${res.statusCode} ${res.statusMessage}`);
  console.log('headers:', res.headers);
  console.log();
  res.pipe(process.stdout);
});

req.end("name=wangding");
