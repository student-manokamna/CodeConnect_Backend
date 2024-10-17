const mongoose=require('mongoose')
const connectDB=async ()=>{
    await mongoose.connect("mongodb+srv://namastedev:btLLL1csf55MzYTH@namastenode.7bnot.mongodb.net/devTinder") ;
    // wrap this astnc function bcz it retrn promise
}
module.exports=connectDB
// connectDB().then(()=>{
// console.log("database connection successfull")
// }).catch(err=>{
// console.log("database cannot be connected")
// })
// mongodb+srv://namastedev:btLLL1csf55MzYTH@namastenode.7bnot.mongodb.net/