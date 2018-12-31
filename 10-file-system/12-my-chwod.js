#!/usr/bin/node
//改变组

const fs=require('fs'),
      file=process.argv[2],
      uid=process.argv[3],//通过命令行参数获取
      gid=process.argv[4];


fs.chownSync(file,Number(uid),Number(gid));


