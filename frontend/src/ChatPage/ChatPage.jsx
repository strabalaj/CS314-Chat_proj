import React from "react";
import Box from '@mui/material/Box';
import { useState } from "react";
import './ChatPage.css'
import { TextField, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Bee from './Bee.jpg'
import InputAdornment from '@mui/material/InputAdornment';
import AddContact from "./AddContact/AddContact";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { map, concat } from 'lodash';

export default function ChatPage () {
    const [searchKey, setSearchKey] = useState("");
    const [showContact, setShowContact] = useState(false);
    const [newChat, setNewChat] = useState("");
    const [allChats, setAllChats] = useState([]);
    
    /*function findUser() {
        fetch(`http://localhost:5002/api/user?search=${searchKey}`, {
            method: "GET",
            headers: {
                "Content-type" : "application/json"
            }
        }).then((response) => console.log(response))
    }*/
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
            >
                {/*<Button className='search-button' startIcon={<SearchIcon/>} onClick={() => findUser()}></Button>*/}
                <TextField 
                    className='search-bar'  
                    variant='outlined' 
                    size='small' 
                    onChange={(e) =>  setSearchKey(e.target.value)}
                />
                <Button 
                    className='show-contact' 
                    startIcon={<AccountCircleIcon sx={{color:"black"}}/>}
                    onClick={() => setShowContact(true)}>
                    Timmy T    
                    </Button>
                {/*<Button className='add-chat-button' variant='outlined' startIcon={<AddIcon/>}></Button>*/}
                {/*<AddContact></AddContact>*/}
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
                <h1 className='header'>Timmy T's Chats</h1>
                <div className='new-chat'>
                    {map(allChats, (chat) => {
                        return (
                            <div className='chat'>
                                {chat}
                            </div>
                        )
                    })}
                </div>
                <TextField  className='send-chat' label='Enter Chat' variant='outlined' onChange={(e) =>  setNewChat(e.target.value)}/>
                <Button className='new-chat' variant='outlined' label='add' onClick={() => setAllChats(concat(allChats, [newChat]))}></Button>
            </Box>
        )}
        </div>
    )
}
