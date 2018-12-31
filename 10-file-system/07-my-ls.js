#!/usr/bin/node
//查看目录

const fs=require('fs');
var dir=process.argv[2];


console.log(fs.readdirSync(dir));
//是个数组
