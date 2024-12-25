const express=require('express');
const connectDB=require("./config/database")
const app=express() //INSANCE OF EXPRESS



const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")

app.use(express.json())  //middleware given by react to convert json data into js obj
//handeling request and process json data  meed this mmiddleware convert into js obj redable stream ko js obj me convert krta hai
app.use(cookieParser()) // iske bina undefined output dega
// read json object convert into js object and add js obj to back to this req object in body so now it is js obj


const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")
const requestRouter=require("./routes/request")
const userRouter=require("./routes/user")
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
//get user by email
// app.get("/user",async (req,res)=>{
//     const userEmail=req.body.emailId;
//     try{
//         const users=  await User.findOne({emailId:userEmail})
//         if(users.length==0){
//           res.status(404).send("user not found");
//         }
//         else{
//           res.send(users);
//         }
        
//       }
//       catch(err){
//           res.status(400).send("something went wrong")
//       }
//     // try{
//     //   const users=  await User.find({emailId:userEmail})
//     //   if(users.length==0){
//     //     res.status(404).send("user not found");
//     //   }
//     //   else{
//     //     res.send(users);
//     //   }
      
//     // }
//     // catch(err){
//     //     res.status(400).send("something went wrong")
//     // }
// })
// app.delete("/user",async(req,res)=>{
//     const userId=req.body.userId;
//     try{
//         const users=await User.findByIdAndDelete({_id:userId})
//     //    const users=await User.findByIdAndDelete(userId) // all db objets
//        res.send("user deleted successfully")
//     }
//     catch(err){
//        res.status(400).send("something went wrong")
//    }
// })
// app.patch("/user/:userId",async(req,res)=>{ 
//     // const userId=req.body.userId  ab body se nhi param url se lenge userid kyonki update nhi kr skte user id
//     const userId=req.params?.userId  
//         const data=req.body
     
//         // console.log(data)
//     try{
//         const ALLOWED_UPDATES=["photoUrl","about","gender","age","skills"]
//         const isallowedupdates=Object.keys(data).every(k=>
//             ALLOWED_UPDATES.includes(k)
//         )
//         if(!isallowedupdates){
//            throw new Error("update not allowed")
//         }
//         if(data?.skills.length>10){
//             throw new Error("Skills can not be more then 10")
//         }
//         const user=await User.findByIdAndUpdate({_id:userId},data,{
//             returnDocument:"after",
//             runValidators:true
//         })
//         console.log(user)
//         res.send("user updated successfully")
//     }
//     catch(err){
//         res.status(400).send("update failed"+err.message)
//     }
// })
// app.get("/feed",async(req,res)=>{
//      try{
//         const users=await User.find({}) // all db objets
//         res.send(users)
//      }
//      catch(err){
//         res.status(400).send("something went wrong")
//     }
// })

connectDB().then(()=>{
    console.log("database connection successfull")
    }).catch(err=>{
    console.log("database cannot be connected")
    }) //call here firstly databse connection is must
app.listen(7777,()=>{
    console.log("server is successfully listing on port 7777")
}) //created a server 
//nodemon install kro sudo npm i -g nodemonfbgh kk