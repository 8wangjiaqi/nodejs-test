#!/usr/bin/node
//删除目录
//只能删除空的目录，非空不能删除
const fs=require('fs');
var dir=process.argv[2];


fs.rmdirSync(dir);
//是个数组
