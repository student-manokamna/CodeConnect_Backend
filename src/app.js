const express=require('express');
const app=express()
app.use("/",(req,res)=>{  //request,response
    res.send("hello namste   from the dashboard")
    }) 
app.use("/hello",(req,res)=>{  //request,response
    res.send("hello hello hello")
    }) 
app.use("/test",(req,res)=>{  //request,response
res.send("hello from the server")
}) //request handeler srver is lsiting over here
app.listen(7777,()=>{
    console.log("server is successfully listing on port 7777")
}) //created a server 
//nodemon install kro sudo npm i -g nodemonfbgh