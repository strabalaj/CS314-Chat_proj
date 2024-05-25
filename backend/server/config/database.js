const mongoose = require("mongoose");

const mongo_connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`YE YE MongoDB on lock: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = mongo_connect;

