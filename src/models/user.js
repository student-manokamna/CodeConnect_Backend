const   mongoose  = require("mongoose") //npm i mongoose
const validator=require("validator")
// what field our suser will have
const userSchema= new mongoose.Schema({
    // here we create actual schema 
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLenght:100
    },
    lastName:{
        type:String
    },
   emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true, 
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address: "+value); //these are the validation on schema level
            }
        }
    },
    passWord:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password : "+value);
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data is not valid")
            }
        }

    },// tell what use store and what data it store
    photoUrl:{
        type:String,
        default:"image url add kro",
        // validate(value){
        //     if(!validator.isURL(value)){
        //         throw new Error("invalid photo url : "+value);
        //     }
        // }
    },
    about:{
        type:String,
        default:"this is default about the user"
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true,// by adding this it automatically added time stamps
})
 const User=mongoose.model("User",userSchema) //first model name and second schema use capital letter in model
 module.exports=User;