#!/usr/bin/node

//文件拷贝（不能实现权限也拷贝)

const fs=require('fs');

var src=process.argv[2],
    dst=process.argv[3];

fs.writeFileSync(dst,fs.readFileSync(src));
