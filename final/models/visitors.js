

const mongoose=require("mongoose");
var visitorSchema=mongoose.Schema(
{
    name: {
        type:String,
        required:true},
    designation:{
        type:String,
        required:true},
    phone:{
        type:String,
        required:true
       },
    email:{
    type:String,
    required:true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   },
   occupation:{
    type:String,
    required:true,
   },
   barcode: {
    type: String,
    required: true,
  },
});
const Visitors=mongoose.model("Visitors",visitorSchema);
module.exports=Visitors;