**Buzz: Real-Time Chat Website**
This Instant Messaging Application is a simplified platform akin to Slack or Telegram, designed for seamless communication between users. With a focus on essential functionalities, users can exchange messages in real-time through a central server, facilitating connections across the Internet. Key features include robust authentication mechanisms for user registration and login/logout procedures. Users can create new chat rooms, either one-on-one or with groups, engage in conversations within these rooms, and access a history of past discussions. Additionally, the application allows for the management of chat rooms, including the ability to delete them as needed. Underpinning these features is a reliable database system ensuring the secure storage of user data, contact information, and message histories.

Technologies Used
The technologies used in this application consist of:

    -MERN Stack: MongoDB, Express, React, and Node.js.
    -Socket.io: For real-time communication.
    -Chakra UI and Material UI: For user interface components.
    -GitHub: For version control and collaboration.

  
**Application Features**
  Authentication:
      Login/Logout
      User Registration
  
  Chatroom Management:
    Create new chat rooms (private and group)
    Add friends to chat rooms
    Delete chat rooms
  
  Messaging:
    Real-time messaging in chat rooms
    Conversation history
    
  User Interaction:
    Search for users to start conversations
    Display all chat rooms a user is part of


**Configuration and Setup**
Prerequisites
  Node.js and npm installed
  MongoDB setup
  Accounts on relevant deployment platforms (e.g., render.com for hosting)

Installation and Run Locally
  Clone the repository
  Install dependencies for both frontend and backend (listed in technologies used section)
  To initialize backend, cd into MERN-chatApp and enter: npm start 
  To initialize frontend, cd into frontend and enter: npm start

Deployment Link:
  Frontend: https://cs314-chat-proj.onrender.com/ 
  Backend: https://cs314-chat-proj-backend.onrender.com/


Testing
We have outlined a comprehensive test plan in our test plan documentation. Here is an overview of the tests executed:

Unit Tests: For individual components and functions.
Integration Tests: To ensure different parts of the application work together.
End-to-End Tests: Simulating user interactions to ensure the application functions correctly from start to finish.
All tests and their results are included in the GitHub repository. You can find the test plans and test results under the /tests directory.


Status
THIS IS A WORK IN PROGRESS, FEATURES MAY BE MISSING.

Feature Status
🟢 = Fully working | 🟡 = Partly working/in progress | 🟠 = To be added | 🔴 = Broken

System:

Database 🟢
Homepage/Landing page 🟢
Chatroom Page 🟢
Authentication:

Sign Up 🟢
Sign In 🟢
Chatroom:

Create a New Private Chatroom (2 Users) 🟢
Create a Group Chatroom 🟢
Add Friends to Chatroom 🟢
Sending Messages in Chatroom 🟢
History of conversations in user's chatrooms 🟢
Display all chatrooms user is a part of 🟢
Delete chatroom 🟢
