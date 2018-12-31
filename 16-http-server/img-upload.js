#!/usr/bin/node

const http=require('http'),
      fs  =require('fs');


var data='';
http.createServer((req,res)=>{
  //log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  //log(req.headers);
  //log('');

  if(req.url != '/'){
    //提示错误信息
    err(res);
    return;          
  }

    
  //console.log(req.headers);
  console.log('');

  console.log(req.method);


  switch(req.method){
    case 'GET':
      show(res);
      break;

    case 'POST':
      add(req,res);
      break;

    default:
      err(res);
      break;
  }
}).listen(8080);



function show(res){
  var html='<!DOCTYPE html>'
            +'  <html lang="en">'
            +'  <head>'
            +'    <meta charset="UTF-8">'
            +'    <title>Upload File</title>'
            +'  </head>'
            +'  <body>'
            +'    <h1>Upload File</h1>'

            +'    <form  action="/upload" method="POST" enctype= "multipart/form-data">'
            +'       <input type="file" name="filename">'
            +'       <input type="submit" value="Upload">'
            +'    </form>'
            +'    <div style="width:200px; height:200px; background:yellow">'
                                                                                                                                             +       data
                                                                                                                                             +'    </div>'
                                                                                                                                            +'  </body>'
           +'</html>';

  res.setHeader('Content-Type','text/html');
  res.setHeader('Content-Length',Buffer.byteLength(html));
          
  res.statuCode=200;
  res.end(html);


}

function add(req,res){
  //var body='';
  req.setEncoding('binary');
  //实现对可读流的接收
  req.on('data',(chunk)=>{
    data+=chunk;
  });
  req.on('end',()=>{
    console.log(data);
    //log(data.substr(0,10));
    //换行符分割
    //log(data.split('\r\n'));
                                                  
    var das=data.split('\r\n');
    var fileName=das[1].split(';')[2].split('=')[1];
    fileName=fileName.slice(1,fileName.length-1);
                                                                                    
    //log('fileName:',fileName);
    console.log(data);
    //log(das[4]);
    var fileData=das[4];
    //log('fileData:',fileData);
    fs.writeFileSync(fileName,fileData,'binary');
    show(res);
  });
}


function err(res){
  var msg='Not Found!';
  res.statuCode=404;
  res.setHeader('Content-Length',msg.length);
  res.setHeader('Content-Type','text/plain');

  res.end(msg);

}

