const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Database Succesfully Connected')
    } catch (error) {
        console.log(`Connection is failder, ${error.message}`);
    }
}

module.exports = connectDB;