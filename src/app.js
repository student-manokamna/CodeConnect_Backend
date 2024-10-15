const express=require('express');
const app=express() //INSANCE OF EXPRESS
// app.use("/",(req,res)=>{  //request,response
//     res.send("hello namste   from the dashboard") 
//     }) 
// app.use("/hello",(req,res)=>{  //request,response
//     res.send("hello hello hello")
//     }) 
//tjis will only match get call to /user 
app.get('/user',(req,res)=>{
    res.send({firstname:"akshay",lastname:"saini"})
})
app.post('/user',(req,res)=>{
    // console.log("dsaven data to dtatabase")
    res.send("data successfully saved to database")
})
app.delete('/user',(req,res)=>{
    
    res.send("delted succesfully")
})
//this will match app the http method callto /test
app.use("/test",(req,res)=>{  //request,response
res.send("hello from the server")
}) //request handeler srver is lsiting over here
// app.use("/",(req,res)=>{  //request,response
//     res.send("hello namste   from the dashboard")
//     }) 
app.listen(7777,()=>{
    console.log("server is successfully listing on port 7777")
}) //created a server 
//nodemon install kro sudo npm i -g nodemonfbgh