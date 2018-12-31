#!/usr/bin/node
//监控当前目录变化

const fs=require('fs');
/*
fs.watch(__dirname,function(e,f){
  console.log(e,f);
})
*/

var w = fs.watch(__dirname, console.log);

process.on('SIGINT', () => {
  w.close();

  console.log('unwitch the directory');
  console.log('Game over after ten second...');
  setTimeout(() => {
    process.exit();   
  }, 5000);

});
