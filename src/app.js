const express=require('express');
const connectDB=require("./config/database")
const app=express() //INSANCE OF EXPRESS
const User=require("./models/user")
app.post("/signup",async(req,res)=>{
    // const userObj={
    //     firstName:"Manorath",
    //     lastName:"chugh",
    //     emailId:"manorath@123.com",
    //     passWord:"manorath123"
    // } // save this user to mogoose db for thAT CREte new instance of model
    // create new user instance
    // const user=new User(userObj)
    const user=new User({
        firstName:"virat",
        lastName:"kholi",
        emailId:"manorath@123.com",
        passWord:"manorath123"
    })
    try{
        await user.save()// saved to database it retirn promise
   res.send("user added successfully")
    }
    catch(err){
        res.status(400).send("error saving the user:"+err.message)  // do error handeling
    }
   
})
connectDB().then(()=>{
    console.log("database connection successfull")
    }).catch(err=>{
    console.log("database cannot be connected")
    }) //call here firstly databse connection is must
app.listen(7777,()=>{
    console.log("server is successfully listing on port 7777")
}) //created a server 
//nodemon install kro sudo npm i -g nodemonfbgh kk