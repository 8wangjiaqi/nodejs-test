#!/usr/bin/node
//重定向用的还是客户端
//递归调用
const http=require('http'),
      url=require('url'),
      log=console.log;
const addr='http://www.sian.com/';


function getOption(addr){
  var options=url.parse(addr);
  options.headers={'User-Agent':'cyrl/7.0'}
  return options;
}


//定义了一个get函数，然后调用它
function getURL(opt){
  http.get(opt,(res)=>{{
  
    g(`HTTP/${res.httpVersion} ${res.statusCode} ${res.statusMessage}`);
        log(res.headers);
            log('');

    //res.pipe(process.stdout);
    if(res.statusCode>300 &&res.statusCode<400){
      var newAddr=res.headers['location'];
      log(`HTTP/${res.httpVersion} ${res.statusCode} ${res.statusMessage}`);
      log(res.headers);
      log('');
      log(newAddr);
      getURL(getOptio(newAddr));
    }
    //不是重定向
    else{
      res.pipe(process.stdout);
    }

  });
}

getURL(opt);
//getURL(addr);
