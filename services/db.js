const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB Connected...');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;