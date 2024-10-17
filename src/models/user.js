const   mongoose  = require("mongoose") //npm i mongoose

// what field our suser will have
const userSchema= new mongoose.Schema({
    // here we create actual schema 
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String
    },
   emailId:{
        type:String,
        required:true,
        unique:true,
    },
    passWord:{
        type:String
        ,required:true,
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },// tell what use store and what data it store
})
 const User=mongoose.model("User",userSchema) //first model name and second schema use capital letter in model
 module.exports=User;