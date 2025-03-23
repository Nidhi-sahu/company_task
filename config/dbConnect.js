require("dotenv").config();

const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
        });
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Database error");
    }
};

module.exports = dbConnect;