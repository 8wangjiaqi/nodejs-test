

const express=require('express');
const app=express();

//根目录为当前目录下的文件
app.use(express.static('.'));
app.listen('8080');
