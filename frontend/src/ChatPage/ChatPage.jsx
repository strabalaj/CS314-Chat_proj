/*
import React from "react";
import Box from '@mui/material/Box';
import { useState, useEffect } from "react";
import './ChatPage.css'
import { TextField, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Bee from './Bee.jpg'
import InputAdornment from '@mui/material/InputAdornment';
import AddContact from "./AddContact/AddContact";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { map, concat } from 'lodash';
import SendIcon from '@mui/icons-material/Send';

export default function ChatPage ({ socket}) {
    const [searchKey, setSearchKey] = useState("");
    const [showContact, setShowContact] = useState(false);
    const [newChat, setNewChat] = useState("");
    const [allChats, setAllChats] = useState([]);
    
    const [message, setMessage] = useState('');

    const [messages, setMessages] = useState([]);

    const [users, setUsers] = useState([]);

    useEffect(() => {
      socket.on('messageResponse', (data) => console.log('response from socket', data));
      socket.on('newUserResponse', (data) => setUsers(data));
    }, [socket, messages, users]);


    const handleSendMesage = (e) => {
        e.preventDefault();
          socket.emit('message', {
            text: message,
            name: localStorage.getItem('userName'),
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
          });
        
        setMessage(e.target.value);
    }
    
    function findUser() {
        fetch(`http://localhost:5002/api/user?search=${searchKey}`, {
            method: "GET",
            headers: {
                "Content-type" : "application/json"
            }
        }).then((response) => console.log(response))
    }
    findUser();
    return (
        <div className='chat-page'>
            <Box
                className='contact-box'
                height={650}
                width={300}
                my={6}
                mx={14}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
                sx={{ 
                    border: '2px solid black',
                    backgroundColor: 'white' 
                }}
            >*/
                /*//<Button className='search-button' startIcon={<SearchIcon/>} onClick={() => findUser()}></Button>
                <TextField 
                    className='search-bar'  
                    variant='outlined' 
                    size="small"
                    onChange={(e) =>  setSearchKey(e.target.value)}
                />
                <Button 
                    className='show-contact' 
                    startIcon={<AccountCircleIcon sx={{color:"black"}}/>}
                    onClick={() => setShowContact(true)}>
                    Contact    
                </Button>
                    <div className="chat__users">
                        <h4>USERS</h4>
                        {users.map((user) => (
                            <p key={user.socketID}>Active Users{user.userName}</p>
                        ))}
                    </div>
                //<Button className='add-chat-button' variant='outlined' startIcon={<AddIcon/>}></Button>
                
            </Box>
            {!showContact && (
                <Box
                    className='chat-box'
                    height={650}
                    width={700}
                    my={36}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    p={2}
                    sx={{ 
                        border: '2px solid black',
                        backgroundColor: 'white' 
                    }}
                >
                    <h1 className='header'>Find Friends to Begin Chatting!</h1>
                    <div className='bee'>
                        <img src={Bee} alt="Bee" />
                    </div>
                
                </Box>
            )}
            {showContact && (
                <Box
                className='chat-box'
                height={650}
                width={700}
                my={36}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
                sx={{ 
                    border: '2px solid black',
                    backgroundColor: 'white' 
                }}
            >
                <h1 className='header'>Contact's Chats</h1>
                <div className='new-chat'>
                    {map(allChats, (chat) => {
                        return (
                            <div className='chat'>
                                {chat}
                            </div>
                        )
                    })}
                </div>
                <div className='text-container'>
                    <TextField  value={message} className='send-chat' label='Enter Chat' variant='outlined' onChange={(e) =>  handleSendMesage(e)}/>
                    <Button className='sent-chat' variant='outlined' label='add' startIcon={<SendIcon/>}onClick={() => setAllChats(concat(allChats, [newChat]))}></Button>
                </div>
            </Box>
        )}
        </div>
    )
}
*/
