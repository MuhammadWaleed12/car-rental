const jwt=require('jsonwebtoken')
const Renters=require('../db/models/renters')
const auth=async(req,res,next)=>{
try{
const token=req.header('Authorization').replace('Bearer ','')
const decoded=jwt.verify(token,'authtoken')
const renters=await Renters.findOne({_id:decoded._id,'tokens.token':token})
if(!renters){
throw new Error()
}
req.token=token
req.renters=renters
next()
}catch(e){
    res.status(401).send({error:"Please authenticate"})
}
}
module.exports=auth