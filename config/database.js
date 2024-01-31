const mongoose = require('mongoose')

const connectDB = () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=> console.log("DB connection is successfull"))
    .catch((error)=>{
        console.log("issue in DB connection");
        console.error(error.message); 
        process.exit(1)
    });
}

module.exports = connectDB