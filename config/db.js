const mongoose = require('mongoose');
const connectDB = async ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("MongoDB connected"))
    .catch(err => console.log(err));
}

module.exports = connectDB;