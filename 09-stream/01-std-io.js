#!/usr/bin/node
/*标准输入输出流*/
const stdin=process.stdin;
/*stdin.resume();*/
stdin.setEncoding('utf8');

/*stdin.on('data',(data)=>{
  process.stdout.write(data.toUpperCase());//做大写转换
});*/


/*订阅了data事件*/
/*global.setTimeout(()=>{
  stdin.removeAllListeners();
},3000);*/

/*stdin.on('end',()=>{
  process.exit();
})
*/

stdin.pipe(process.stdout);
