#!/usr/bin/node
var me = {}, i = 1;

const msg = ['Name', 'Email', 'QQ', 'Mobile'],
      log = console.log;

log(msg[0] + ':');

const stdin = process.stdin;

stdin.on('data', (data) => {
  //console.log(data);
  //console.log(data.toString('utf8'));
  //console.log(data.slice(0,data.length-1).toString('utf8'));
  me[msg[i-1]] = data.slice(0, data.length - 1).toString('utf8');
  if(i === 4) {
    //log('执行');
    log(me);
    process.exit();
                
  } else {
    //log('1111',me[msg[i-1]]);
    log(msg[i++] + ':');
            
  }

});

stdin.on('end', () => {
  log('aaa',me);
});
