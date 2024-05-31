import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import ChatRoom from './Pages/ChatRoom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={HomePage} exact/>
        <Route path='/chatRoom' Component={ChatRoom}/>
      </Routes>
    </div>
  );
}
export default App;


/*import React from 'react';
import socketIO from 'socket.io-client';
import './App.css';
import LoginForm from './LoginPage/LoginForm';
import ChatPage from './ChatPage/ChatPage';
import { useState } from 'react';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";

const socket = socketIO.connect('http://localhost:5002');
export default function App () {
  const [ fullName, setFullName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  function onSubmitClick() {
    console.log(fullName);
    console.log(username);
    console.log(password);
    //route in here to different page.
  }

  function onFullNameChange(event) {
    setFullName(event.target.value);
  }

  function onUsernameChange(event) {
    setUsername(event.target.value);
  }

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginForm onUsernameChange={onUsernameChange} onPasswordChange={onPasswordChange} onSubmitClick={onSubmitClick} socket={socket}/>} />
          <Route exact path="ChatPage" element={<ChatPage socket={socket}/>} />
        </Routes>
      </Router>
    </div>
  )
}*/

