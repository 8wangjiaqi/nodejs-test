#!/usr/bin/node
//去掉重复的
//用spawn 方法通过管道执行：cat，sort，uniq 三个外部程序
//用spawn的方法就是执行结果是以流的方式输出的，一点一点的


const cp=require('child_process');

var cat=cp.spawn('cat',['./a.txt']);
var sort=cp.spawn('sort');
var uniq=cp.spawn('uniq');

cat.stdout.pipe(sort.stdin);
sort.stdout.pipe(uniq.stdin);
uniq.stdout.pipe(process.stdout);


