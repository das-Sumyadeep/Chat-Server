const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connection successful to DB");
    }
    catch (err) {
        console.error("connection to DB failed");
    }
};

module.exports = connectDB;