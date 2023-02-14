const dotenv = require("dotenv");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
// dotenv 
dotenv.config();
const database = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            console.log("mongodb connected");    
        }).catch((error)=>{
            console.log(error);
        })
    } catch(error){
        console.log(error);
    }
}

module.exports = database;



