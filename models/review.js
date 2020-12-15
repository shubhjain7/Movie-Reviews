const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const reviewSchema = mongoose.Schema({
    email:{type:String,required:true,unique:true},
    rating:{type:Number,required:true},
  review:{type:String,required:true}
  });

  reviewSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Review",reviewSchema);