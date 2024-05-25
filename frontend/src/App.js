import React from 'react';
import './App.css';
import LoginForm from './LoginPage/LoginForm';
import ChatPage from './ChatPage/ChatPage';
import { useState } from 'react';
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";

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
          <Route exact path="/" element={<LoginForm onUsernameChange={onUsernameChange} onPasswordChange={onPasswordChange} onSubmitClick={onSubmitClick}/>} />
          <Route exact path="ChatPage" element={<ChatPage/>} />
        </Routes>
      </Router>
    </div>
  )
}

