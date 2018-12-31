#!/usr/bin/node
//查看链接
const fs=require('fs');
var lnk=process.argv[2];
//只能读取软链接
console.log(fs.readlinkSync(lnk));
//console.log(fs.readFile(lnk));
