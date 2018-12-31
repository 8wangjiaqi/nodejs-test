#!/usr/bin/node

const fs=require('fs'),
      file=process.argv[2],
      mode=process.argv[3];

//var buf=new Buffer(mode);
fs.chmodSync(file,mode);
//确保文件存在。mode合理合法（1-7,8不可以）

