const express=require('express')
const { userAuth } = require('../middlewares/auth')
const paymentRouter=express.Router()

paymentRouter.post('/profile/create',userAuth,(req,res)=>{

})
module.exports=paymentRouter