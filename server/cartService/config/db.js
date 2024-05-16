
const mongoose =require("mongoose")
const dotenv = require("dotenv");

dotenv.config();

const conncetToMongoCart=async()=>{
    try{
        const res = await mongoose.connect(process.env.MONGO_URI_CART);
    
        if(res){
            console.log("connected to cart db sucessfully")
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = conncetToMongoCart;