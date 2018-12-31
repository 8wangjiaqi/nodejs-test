#!/usr/bin/node
//删除文件
const fs=require('fs');
var file=process.argv[2];
fs.unlinkSync(file);

