#!/usr/bin/node
//创建硬链接
const fs=require('fs');
var src=process.argv[2],//获取第二个参数
    lnk=process.argv[3];//获取第三个参数
fs.linkSync(src,lnk);

