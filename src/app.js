const express=require('express');
const connectDB=require("./config/database")
const app=express() //INSANCE OF EXPRESS
const User=require("./models/user")
const {validateSignupData}=require("./utils/validation")
const bcrypt=require("bcrypt")
app.use(express.json()) //handeling request and process json data  meed this mmiddleware convert into js obj
// read json object convert into js object and add js obj to back to this req object in body so now it is js obj
app.post("/signup",async(req,res)=>{
   //validaon of data
   try{
    validateSignupData(req)
   //encrypt the password
   const {firstName,lastName,emailId,passWord}=req.body
   const passwordHash= await bcrypt.hash(passWord,10)
   console.log(passwordHash);
   //creating new instance of user model
    const user=new User({
        firstName,lastName,emailId,passWord:passwordHash,
    })
    
        await user.save()// saved to database it retirn promise
   res.send("user added successfully")
    }
    catch(err){
        res.status(400).send("ERROr ::"+err.message)  // do error handeling
    }
   
})
app.post("/login",async (req,res)=>{
    try{
        const {emailId,passWord}=req.body;
        // check emaolid no t random email id 
        const user=await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("invalid creditinal")
        }
        const isPassWordValid=await bcrypt.compare(passWord,user.passWord)
        if(isPassWordValid){
            res.send("user login successfull")
        }
        else{
            throw new Error("invalid creditinal")
        }
    }
    catch(err){
        res.status(400).send("ERROr ::"+err.message)  // do error handeling
    }
})
//get user by email
app.get("/user",async (req,res)=>{
    const userEmail=req.body.emailId;
    try{
        const users=  await User.findOne({emailId:userEmail})
        if(users.length==0){
          res.status(404).send("user not found");
        }
        else{
          res.send(users);
        }
        
      }
      catch(err){
          res.status(400).send("something went wrong")
      }
    // try{
    //   const users=  await User.find({emailId:userEmail})
    //   if(users.length==0){
    //     res.status(404).send("user not found");
    //   }
    //   else{
    //     res.send(users);
    //   }
      
    // }
    // catch(err){
    //     res.status(400).send("something went wrong")
    // }
})
app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    try{
        const users=await User.findByIdAndDelete({_id:userId})
    //    const users=await User.findByIdAndDelete(userId) // all db objets
       res.send("user deleted successfully")
    }
    catch(err){
       res.status(400).send("something went wrong")
   }
})
app.patch("/user/:userId",async(req,res)=>{ 
    // const userId=req.body.userId  ab body se nhi param url se lenge userid kyonki update nhi kr skte user id
    const userId=req.params?.userId  
        const data=req.body
     
        // console.log(data)
    try{
        const ALLOWED_UPDATES=["photoUrl","about","gender","age","skills"]
        const isallowedupdates=Object.keys(data).every(k=>
            ALLOWED_UPDATES.includes(k)
        )
        if(!isallowedupdates){
           throw new Error("update not allowed")
        }
        if(data?.skills.length>10){
            throw new Error("Skills can not be more then 10")
        }
        const user=await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"after",
            runValidators:true
        })
        console.log(user)
        res.send("user updated successfully")
    }
    catch(err){
        res.status(400).send("update failed"+err.message)
    }
})
app.get("/feed",async(req,res)=>{
     try{
        const users=await User.find({}) // all db objets
        res.send(users)
     }
     catch(err){
        res.status(400).send("something went wrong")
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