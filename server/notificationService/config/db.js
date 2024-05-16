
const mongoose =require("mongoose")
const dotenv = require("dotenv");

dotenv.config();

const conncetToMongoNotif=async()=>{
    try{
        const res=await mongoose.connect(process.env.MONGO_URI_NOTIF)
    
        if(res){
            console.log("connected notifications db sucessfully")
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = conncetToMongoNotif