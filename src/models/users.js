const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

username:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
img:{
type:String,
required:false
},
phone:{
    type:String,
    required:false
    },
    country:{
        type:String,
        required:false
        },
        city:{
            type:String,
            required:false
            },
isAdmin:{
    type:Boolean,
  default:false
}
},{timestamps:true})


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
