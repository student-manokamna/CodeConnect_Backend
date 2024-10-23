const express=require("express")
const requestRouter=express.Router();
const {userAuth}=require("../middlewares/auth")
const User=require("../models/user")
const ConnectionRequest=require("../models/connectionRequest")
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{ // useauth nhi to token is not valid
  try{
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status
    const allowedStatus=["interested","ignore"]
    if(!allowedStatus.includes(status)){
        return res.status(400).json({message:"invalid status type "+status})
    }

    const toUser=await User.findById(toUserId)
    if(!toUser){
        return res.status(400).json({message:"User not found "})
    }
    //if an existing connection request
    const exisitngConnectionRequest=await ConnectionRequest.findOne({
        $or:[ {fromUserId,
            toUserId},
        {fromUserId:toUserId,toUserId:fromUserId},
        ],
       
    })
    if(exisitngConnectionRequest){
        return res.status(400).json({message:"connection request already exist "})
    }
    const connectionRequest=new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
    })
    const data=await connectionRequest.save();
    res.json({
        message:req.user.firstName+"is "+status+"in "+toUser.firstName
        
    })
  }
  catch(err){
    res.status(400).send("ERROr ::"+err.message)  // do error handeling
}
})
module.exports=requestRouter