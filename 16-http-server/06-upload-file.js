#!/usr/bin/node

const http=require('http'),
      fs=require('fs'),
      //qs=require('querystring'),
      log  =console.log;
//res.setCharacterEncoding('utf-8');
var data='';
http.createServer((req,res)=>{
  //log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  //log(req.headers);
  //log('');

  
  //var data='';
  if(req.url==='/'&& req.method==='GET'){
    show(req,res,uploadPage);
    return;
  }

  if(req.url ==='/upload' && req.method ==='POST'){
    //var data='';
    req.setEncoding('binary');
    //实现对可读流的接收
    req.on('data',(chunk)=>{
      data+=chunk;
    });
    req.on('end',()=>{
      //log(data);
      //换行符分割
      //log(data.split('\r\n'));
      
      var das=data.split('\r\n');
      //文件信息
      //log('das1',das[1]);
      //文件类型
      //log('das2',das[2]);
      //log('das3',das[3]);

      //拿到文件名字
      var fileName=das[1].split(';')[2].split('=')[1];
      //log(das[1]);
    
      //log(das[1].split(';')[2].split('=')[1]);
      

      //log(fileName);
      //去掉双引号
      fileName=fileName.slice(1,fileName.length-1);
      //log(fileName);
      
      
      //log('fileName:',fileName);
      //log(data);
      //log(data.substr(0,1));
      

      //拿到文件内容
      //log('das[4]',das[4]);
      var fileData=das[4];
      //log('fileData:',fileData);
      
      fs.writeFileSync(fileName,fileData,'binary');
      log(fs.writeFileSync(fileName,fileData,'binary'));

      log(uploadPage.replace('%',fileData));
      
      show(req,res,uploadPage.replace('%',fileData));
      
      //res.end('OK');
    });
    //req.pipe(process.stdout);
    //show(req,res,backPage);
    //res.end('OK');
  }else{
    show(req,res,errPage);
    res.statusCode=404;
    res.end('Error!');

  }
}).listen(8080);


function  show(req,res,page){
  res.statusCode=(page==='errPafe'?404:200);
  res.setHeader('Content-Type','text/html');
  //res.setHeader('Conent-Length',Buffer.byteLength(File));


  res.end(page);
}

const uploadPage=''
                + '<!DOCTYPE html>'
                +'  <html lang="en">'
                +'  <head>'
                +'    <meta charset="UTF-8">'
                +'    <title>Upload File</title>'
                +'  </head>'
                +'  <body>'
                +'    <h1>Upload File</h1>'

                +'    <form  action="/upload" method="POST" enctype= "multipart/form-data">'
                +'       <input type="file" name="filename">'
                +'      <input type="submit" value="Upload">'
                +'    </form>'
                +'    <div style="width:200px; height:200px; background:yellow">'
                +       '%'
              
                +'    </div>'
                +'  </body>'
                +'</html>';

/*const backPage=''
+'<!DOCTYPE html>'
+'<html lang="en">'
+'<head>'
+'  <meta charset="UTF-8">'
 + '  <title>Back</title>'
 + '  </head>'
+ '   <body>'
+'      <h1>OK! Upload Success!</h1>'
 + '      <a href="/">Continue to Upload File</a>'
  + '     </body>'
  +'      </html>';

*/

const  errPage = ''
          + '<!DOCTYPE html>'
              + '<html>'
                    + '<head>'
                            + '<meta charset="UTF-8">'
                                    + '<title>Error</title>'
                                          + '</head>'
                                                + '<body>'
          + '<h1>Sorry! There is  nothing!</h1>'
                                                                + '<a href="/">back to Upload File</a>'
                                                                      + '</body>'
                                                                          + '</html>';

