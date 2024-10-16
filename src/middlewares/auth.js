 const adminAuth=(req,res,next)=>{
    console.log("admin auth is getting checked!!")
 const token="xyz"  //req.body?.token
    const isAdminAuthrised=token==="xyz"
     // console.log("dsaven data to dtatabase")
     if(!isAdminAuthrised){
        res.status(401).send("unautrisedn request")
        
        }
        else{
          next()
        }
}
const userAuth=(req,res,next)=>{
    console.log("user auth is getting checked!!")
 const token="xyz"  //req.body?.token
    const isAdminAuthrised=token==="xyz"
     // console.log("dsaven data to dtatabase")
     if(!isAdminAuthrised){
        res.status(401).send("unautrisedn request")
        
        }
        else{
          next()
        }
}
module.exports={
    adminAuth,userAuth,
};