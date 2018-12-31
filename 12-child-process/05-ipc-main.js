#!/usr/bin/node
//六秒钟主进程退出，子进程是否工作
//父进程
const cp=require('child_process');
console.log('I am father process.PID:',process.pid);
var cmd=cp.fork('./05-ipc-child.js');

global.setTimeout(()=>{
  cmd.send('I am father process.PID:'+process.pid);

},3000);

//因为有一个参数，所以1不能用:
//
cmd.on('message',(msg)=>{
  console.log('CHILD-MSG:',msg);
});




