const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  rentersId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Renters',
    required: true,
  },
  seats: {
    type: Number,
    min: 4,
    max: 72,
    required: true,
  },
  tires:{
    type:String,
    enum: {
        values:['All-Season','Summer','Winter'],
        message: '{VALUE} is not supported'
      }
 ,
    required:true,
  },
  condition:{
    type:String,
    enum: {
        values: ['Good','Average','Rough'],
        message: '{VALUE} is not supported'
      }
,
    
    required:true
  },
  fuelType:{
    type:String,
    enum: {
        values: ['Gasoline','Petrol','Diesel'],
        message: '{VALUE} is not supported'
      }
,
    required:true
  },carType:{
    type:String,
    enum: {
        values: ['Car','Bus','Wagon'],
        message: '{VALUE} is not supported'
      }
,
    required:true
  },
  model:{
    type:Number,
    required:true,
    validate(value){
        if(value > 2022 && value<1990){
            throw new Error('Please enter valid Model')
        }
    }
  },
  price:{
    type:Number,
    required:true,
    vaidate(value){
        if(value >150000){
            throw new Error("please Enter price in range")
        }
    }
  }
});
const Car=mongoose.model('Car',carSchema)
module.exports=Car