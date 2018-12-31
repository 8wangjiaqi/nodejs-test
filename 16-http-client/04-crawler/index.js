#!/usr/bin/node
//爬虫
const http=require('http'),
      cheerio=require('cheerio');

var addr='http://edu.51cto.com/courselist/index-zh5.html';


http.get(addr,(res)=>{
  var html='';
  res.on('data',(data)=>{
    //var html='';
    html+=data;
  });
  res.on('end',()=>{
    var $=cheerio.load(html);
    $('body').find('div.main').each(function(){
      var cName=$(this).find('a').text(),
          cTime=$(this).find('p.fl').text(),
          cTarget=$(this).find('div.course_target').text(),
          cURL=$(this).find('a').attr('href');

      if(cTime==='')return;
      console.log('课程名称：·',cName.trim());
      console.log('课程时长：',cTime.trim());
      console.log('课程目标：',cTarget.trim());
      console.log('课程地址：',cURL.trim());
      //trim字符串操作，去掉空格
      console.log('');
    });
  });
});
