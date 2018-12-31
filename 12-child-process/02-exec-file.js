#!/usr/bin/node

//execFile就是一下子呈现结果，等好久那种

const cp = require('child_process');

/*console.log('I am father process. PID:', process.pid);*/

cp.execFile('./02-child.js', (err, out) => {
  if(err){
    console.error(err.message);
    process.exit(100);
  }
  console.log(out);
});
