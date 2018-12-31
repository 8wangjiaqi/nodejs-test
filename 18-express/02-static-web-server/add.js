const express=require('express');
const app=express();

app.get('/',(req,res)=>{
  res.end('OK');
});

app.listen(8080);

