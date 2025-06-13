const mongoose=require('mongoose')
const connectDB=async ()=>{
    await mongoose.connect("mongodb+srv://chughmanorath:OCPzHWCPmHcKEgn1@cluster0.0mhs4vu.mongodb.net/devTinder") ;

}
module.exports=connectDB
