const   mongoose  = require("mongoose") //npm i mongoose

// what field our suser will have
const userSchema= new mongoose.Schema({
    // here we create actual schema 
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
   emailId:{
        type:String
    },
    passWord:{
        type:String
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