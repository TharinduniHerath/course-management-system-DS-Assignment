
const mongoose =require("mongoose")
const dotenv = require("dotenv");

dotenv.config();

const conncetToMongo=async()=>{
    try{
        const res=await mongoose.connect(process.env.MONGO_URI)
    
        if(res){
            console.log("connected sucessfully")
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = conncetToMongo