const express = require("express");
const dotenv = require("dotenv");
const mongo_connect = require("./config/database");
//const http = require('http').Server(app);
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
//const http = require('http').Server(app);

// Use CORS middleware
app.use(cors());

// ensures all files sent from FE are converted to JSON files
app.use(express.json());

/*let users = [];
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data);
        console.log(data);
      });
    
      socket.on('newUser', (data) => {
        //Adds the new user to the list of users
        users.push(data);
        // console.log(users);
        //Sends the list of users to the client
        socketIO.emit('newUserResponse', users);
      });
    
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });
});


*/
app.get('/', (req, res) => {
    res.send("API is Running Successfully");
});


app.use('/api/user', user_routes);
app.use('/api/chat', chat_routes);
app.use('/api/messages', message_routes);

const PORT = process.env.PORT || 5002;

/*http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});*/

app.listen(PORT, () => {
     console.log(`Server started on PORT ${PORT}`);
});
