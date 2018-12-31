#!/usr/bin/node
//六秒钟主进程退出，子进程是否工作

const cp=require('child_process');

console.log('I am father.PID:',process.pid);
cp.fork('./02-child.js');

//直接启动程序
global.setTimeout(()=>{
  console.log('I am father,Goodbye!');
  process.exit(100);
},6000);





