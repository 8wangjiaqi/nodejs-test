#!/usr/bin/node
//父子进程通信

//子进程。启动后给父进程发消息
//可以是任何，字符串、Json等

//const cp=require('child_process');

console.log('I am child process.PID:'+process.pid);


process.send('Chid process is coming process.PID:'+process.pid);

//收消息
process.on('message',(msg)=>{
  console.log('message from father:',msg);
})







