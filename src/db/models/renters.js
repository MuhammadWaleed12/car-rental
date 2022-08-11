const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const rentersSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validtae(value) {
      if (value.length < 6 && value.toLowerCase().includes("password")) {
        throw new Error("Please Enter correct Password");
      }
    },
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }]
});

// Generat Auth Token
rentersSchema.methods.generateAuthToken=async function(){
  const renters=this
  const token=jwt.sign({_id:renters._id.toString()},"authtoken")
  renters.tokens=renters.tokens.concat({token})
  await renters.save()
  return token
}



rentersSchema.methods.toJSON=function(){
const renters=this
const rentersObject=renters.toObject()
delete rentersObject.password
delete rentersObject.tokens
return rentersObject

}

// For passowrd checking

rentersSchema.statics.findByCredentials=async(email,password)=>{
  
  const renter=await Renters.findOne({email})
  
  if(!renter){
    throw new Error("Unable to Login")
  }
  const compare=await bcrypt.compare(password,renter.password)
  
  if(!compare){ 
    throw new Error("Unable to login")
  }
  return renter
}


// Hash plain text password before saving

rentersSchema.pre("save", async function (next) {
  const renters = this;
  if (renters.isModified("password")) {
    renters.password = await bcrypt.hash(renters.password, 10);
  }
  next();
});

const Renters = mongoose.model("Renters", rentersSchema);
module.exports = Renters;
