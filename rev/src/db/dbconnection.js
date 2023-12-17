const mongoose = require("mongoose")
const config = require("../config/config")

const connectDB = async () => {
    mongoose
        .connect(config.mongodb.url, config.mongodb.options)
        .then((data => {
            console.log("Database connaction successfully!");
        }))
        .catch((error) => {
            console.log("Database connection error :", error.message);
        })
}

module.exports = { connectDB };
