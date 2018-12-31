#!/usr/bin/node
//用了shall外壳
//去掉重复的,且按着字母顺序排序
//exec是结果是一下子输出的，如果数据复杂，就要等很长的执行时间，然后一下子反应出来
const cp=require('child_process');

cp.exec('cat a.txt|sort|uniq',(err,out)=>{
  if(err){
    console.error(err.message);
    process.exit(100);
  }
  console.log(out);
});
