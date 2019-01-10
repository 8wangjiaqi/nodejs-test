#!/usr/bin/node

const log = console.log,
      arg = process.argv[2];

if(typeof(arg) === 'undefined' ||arg === '--help' ||arg === '-h') 
{
  console.log(arg);
  help();
} else {
  calc();
  console.log(typeof(arg));
}

function help() {
  const msg = '' 
        + 'usage: cmd-name [OPTION] [expression]\n'
        + 'evaluate the expression.\n'
        + '\n'
        + 'Mandatory arguments to long options are mandatory for short options too.\n'
        + '  -h, --help output help information and exit\n';
  log(msg);

}

function calc() {
  log(arg);
  log(arg + '=%s', eval(arg));
  log(arg + '=' + eval(arg));

}
