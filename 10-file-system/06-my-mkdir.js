#!/usr/bin/node
//创建目录

const fs=require('fs');
var dir=process.argv[2];

fs.mkdirSync(dir);

