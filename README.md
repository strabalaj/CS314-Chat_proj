<h1>Buzz Chat App</h1>
<p>This Instant Messaging Application is a simplified platform akin to Slack or Telegram, designed for seamless communication between users. With a focus on essential functionalities, users can exchange messages in real-time through a central server, facilitating connections across the Internet. Key features include robust authentication mechanisms for user registration and login/logout procedures. Users can create new chat rooms, either one-on-one or with groups, engage in conversations within these rooms, and access a history of past discussions. Additionally, the application allows for the management of chat rooms, including the ability to delete them as needed. Underpinning these features is a reliable database system ensuring the secure storage of user data, contact information, and message histories.</p>

<p>The project was structured and implemented with a clear focus on essential functionalities and seamless communication. The front-end and back-end microservices architecture formed the backbone of the system. In the front-end, components like the Login Form and Chat Room were organized systematically within the src folder, ensuring ease of development and maintenance. The Login Form incorporated robust authentication mechanisms, leveraging hooks and components from the Material UI library to provide a user-friendly interface for registration and login/logout procedures. On the other hand, the Chat Room component facilitated real-time messaging and management of chat rooms, allowing users to engage in conversations and access past discussions effortlessly. API calls were instrumental in enabling actions such as chat creation and message sending, ensuring smooth communication between users. The back-end, developed using Node.js and Express.js, utilized MongoDB Atlas for cloud-based database management. Microservices dedicated to authentication, chat management, and message handling were implemented to ensure efficient communication and secure data storage. MongoDB's NoSQL flexibility facilitated the storage of user data, contact information, and message histories in a structured manner.
</p>
<p>
To deploy the application, render.com was utilized, providing a reliable platform for hosting and launching the instant messaging application. Despite the successful launch, ongoing concerns regarding security vulnerabilities, user interface complexities, and scalability were acknowledged, highlighting the importance of thorough testing and continuous refinement to address these issues effectively.
</p>


</div>

# 🐈‍⬛: GitHub link to project
https://github.com/strabalaj/CS314-Chat_proj 

</div>

## :star2: About the Project

</div>

### :space_invader: Tech Stack
<details> <summary>Client</summary> <ul>
<li><a href="">React</a></li>
<li><a href="">Chakra UI</a></li>
<li><a href="">Material UI</a></li>
<li><a href="">Socket.io-client</a></li>
</ul> </details>
<details> <summary>Server</summary> <ul>
<li><a href="">Node.js</a></li>
<li><a href="">Express</a></li>
<li><a href="">Socket.io</a></li>
</ul> </details>
<details> <summary>Database</summary> <ul>
<li><a href="">MongoDB</a></li>
</ul> </details>
<details> <summary>DevOps</summary> <ul>
<li><a href="https://cs314-chat-proj.onrender.com/">Render </a></li>
</ul> </details>

</div>

### :dart: Features
- Authentication
- Chatroom Management
- Messaging
- User Interaction

</div>

## :toolbox: Getting Started

### :bangbang: Prerequisites

- Install Node.js and npm on your computer
```bash
https://nodejs.org/en
```
- Set up a MongoDB environment
```bash
https://account.mongodb.com/account/login
```


### :gear: Installation

Install dependencies from frontend
```bash
cd frontend npm install
```
Install dependencies from backend
```bash
cd backend npm install
```

</div>

### :test_tube: Running Tests
<p>Feature testing, each feature of the application was tested to ensure it meets user requirements and delivers a satisfactory user experience. For example, authentication features are tested to validate new user registration, existing user login, and handling incorrect login attempts. Chatroom-related features are also extensively tested, including creating new chatrooms, adding friends to chatrooms, messaging within chatrooms, viewing conversation history, displaying all chatrooms for a user, and deleting chatrooms. These tests ensure that users can effectively interact with the application and perform essential tasks without encountering issues or unexpected behavior.
</p>

Run Feature Tests:
```bash
/MERN-chatApp/npm test
```
</div>



### :triangular_flag_on_post: Local Deployment

Start up backend
```bash
/MERN-chatApp npm start
```
Start up frontend
```bash
/frontend npm start
```

### :triangular_flag_on_post: Web Deployment Link

frontend render page <https://cs314-chat-proj.onrender.com/>

backend render page <https://cs314-chat-proj-backend.onrender.com/>


## :compass: Roadmap

* [x] System (database, landing page, chatroom page)
* [x] Authentication (sign up, sign in)
* [x] Chatroom (create chatroom, add users, remove users, send message(s), history of conversations, display rooms, delete chatroom)


## :handshake: Contact

Helen Khoshnaw - - hhk2@pdx.edu


Jeffrey Strabala - - strab@pdx.edu
