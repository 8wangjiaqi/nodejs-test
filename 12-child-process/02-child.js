#!/usr/bin/node
//启动定时器，每隔一秒钟产生数据

console.log('I am child process.PID:',process.pid);

var timer=global.setInterval(()=>{
  console.log('time:',Date.now());
},1500);

global.setTimeout(()=>{
  global.clearInterval(timer);
},15000);
//15秒后失效
