const express=require('express');
const connectDB=require("./config/database")
const app=express() //INSANCE OF EXPRESS
const User=require("./models/user")
app.use(express.json()) //handeling request and process json data  meed this mmiddleware convert into js obj
// read json object convert into js object and add js obj to back to this req object in body so now it is js obj
app.post("/signup",async(req,res)=>{
    // console.log(req.body) 
    // output undefing our server is not able to read json data to read json dataw ewill need help of middleware
    // const userObj={
    //     firstName:"Manorath",
    //     lastName:"chugh",
    //     emailId:"manorath@123.com",
    //     passWord:"manorath123"
    // } // save this user to mogoose db for thAT CREte new instance of model
    // create new user instance
    // const user=new User(userObj)
    const user=new User(req.body)
    try{
        await user.save()// saved to database it retirn promise
   res.send("user added successfully")
    }
    catch(err){
        res.status(400).send("error saving the user:"+err.message)  // do error handeling
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