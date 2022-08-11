const express=require('express')
const path=require('path')
const dotenv=require('dotenv')
const rentersRouter=require('./routes/renters')
const connectDB=require('./db/mongoose.js')
const app=express()
const pathDirectory=path.join(__dirname,"../.env")


dotenv.config({path:pathDirectory})
connectDB()

const PORT=4000
app.use(express.json())
app.use('/api/v1/renters',rentersRouter)
app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
})