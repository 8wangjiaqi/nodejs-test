#!/usr/bin/node
//先写不分离的

const cp=require('child_process');

console.log('I am father process.PID:',process.pid);


//不分离的，子进程随主进程的结束而结束
var cmd=cp.spawn('./02-child.js');
cmd.stdout.pipe(process.stdout);


/*//分离的,子进程不随主进程的结束而结束
 var cmd=cp.spawn('./02-child.js',[],{detached:true,stdio:['ignore',1,2]})*/

//已经把流安排好了，没有分离的时候就安排好了

//cmd代表子进程
/*cmd.stdout.pipe(process.stdout);*/
//process代表主进程  子进程标准输出流管道到主进程的



global.setTimeout(()=>{
  console.log('I am father,goodbye!');
  process.exit();
},6000);





