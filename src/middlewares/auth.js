const jwt= require("jsonwebtoken")
const User=require("../models/user")
//  const adminAuth=(req,res,next)=>{
//     console.log("admin auth is getting checked!!")
//  const token="xyz"  //req.body?.token
//     const isAdminAuthrised=token==="xyz"
//      // console.log("dsaven data to dtatabase")
//      if(!isAdminAuthrised){
//         res.status(401).send("unautrisedn request")
        
//         }
//         else{
//           next()
//         }
// }
// const userAuth=(req,res,next)=>{
//     console.log("user auth is getting checked!!")
//  const token="xyz"  //req.body?.token
//     const isAdminAuthrised=token==="xyz"
//      // console.log("dsaven data to dtatabase")
//      if(!isAdminAuthrised){
//         res.status(401).send("unautrisedn request")
        
//         }
//         else{
//           next()
//         }
// }
const userAuth=async (req,res,next)=>{
   //read the token from thr request cookies
 try{
   const cookies=req.cookies;
   const {token} =cookies;
   if(!token){
      throw new Error("token is not valid")
   }
    const decodedObj= await jwt.verify(token,"DEV@Tinderpo7")
   //validate the token
   const {_id}=decodedObj;
   const user=await User.findById(_id)
   if(!user){
      throw new Error("user not found")
  }
  req.user=user;
  next();
 }
 catch(err){
   res.status(400).send("ERROr :: "+err.message)  // do error handeling
}
   // find the user
}
module.exports={
    userAuth,
};