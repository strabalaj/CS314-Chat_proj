const express = require("express");
const dotenv = require("dotenv");
const mongo_connect = require("./config/database");
const cors = require("cors"); 

const user_routes = require("./routes/user_routes");
const chat_routes = require("./routes/chat_routes");
const message_routes = require("./routes/message_routes");

dotenv.config();

// Debugging: MONGO_URI to ensure it's read correctly
//console.log("MONGO_URI:",process.env.MONGO_URI);

// Connect to MongoDB
mongo_connect();

const app = express();

// Use CORS middleware
app.use(cors());

// ensures all files sent from FE are converted to JSON files
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is Running Successfully");
});

app.use('/api/user', user_routes);
app.use('/api/chat', chat_routes);
app.use('/api/messages', message_routes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
