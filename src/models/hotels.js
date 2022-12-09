const mongoose = require("mongoose");
const hotelSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
city:{
    type:String,
    required:true
},
type:{
    type:String,
    required:true
},
address:{
    type:String,
    required:true
},

picture:{
    type:[String]
},
placePicture:{
    type:String
},
desc:{
    type:String,
    required:true
},
rating:{
    type:Number,
   min:0,
   max:10
},
rooms:{
    type:[String],
},
min_price:{
    type:Number,
    required:true

},
featured:{
    type:Boolean,
  default:false
}
})

const hotelModel = mongoose.model("hotel", hotelSchema);

module.exports = hotelModel;
