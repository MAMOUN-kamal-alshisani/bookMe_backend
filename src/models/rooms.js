const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({

title:{
    type:String,
    required:true,
},
price:{
    type:Number,
    required:true
},
desc:{
    type:String,
    required:true,

},
maxPeople:{
    type:Number,
    required:true,

},
roomNumber:{
    type:[{number:Number,unavailableDates:{type:[Date]}}],
    required:true,

}
},{timestamps:true})


const roomModel = mongoose.model("room", roomSchema);

module.exports = roomModel;
