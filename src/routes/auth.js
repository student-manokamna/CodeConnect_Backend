// manage routes specific to auth
const express=require("express")
const {validateSignupData}=require("../utils/validation")
const User=require("../models/user")
const bcrypt=require("bcrypt")
const authRouter=express.Router();
authRouter.post("/signup",async(req,res)=>{
    //validaon of data 
    try{
     validateSignupData(req)
    //encrypt the password
    const {firstName,lastName,emailId,passWord}=req.body
    const passwordHash= await bcrypt.hash(passWord,10)
 //    console.log(passwordHash);
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
 authRouter.post("/login",async (req,res)=>{
    try{
        const {emailId,passWord}=req.body;
        // check emaolid no t random email id 
        const user=await User.findOne({emailId:emailId})
        if(!user){
            throw new Error("invalid creditinal")
        }
        // const isPassWordValid=await bcrypt.compare(passWord,user.passWord)
        const isPassWordValid=await user.validatePassword(passWord)
        if(isPassWordValid){
            //create ajwt token
            // upload this to handeler method
            // const token=await jwt.sign({_id:user._id},"DEV@Tinderpo7",{expiresIn:"1d"}); //hiding the user id and second arhument secret key only known by server 
            // console.log(token)
            //add token to cokkies and asend response back gto user kind of temop password which will come in all the request
            const token=await user.getJWT(); //user.js me hh ye
            res.cookie("token",token,{
                expires:new Date(Date.now()+8*3600000)
            })
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
authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    });
    res.send("Logout SuccessFull!!!")
})
module.exports=authRouter