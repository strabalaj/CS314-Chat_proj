import React from "react";
import Box from '@mui/material/Box';
import './ChatPage.css'
import { TextField, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Bee from './Bee.jpg'
import InputAdornment from '@mui/material/InputAdornment';
import AddContact from "./AddContact/AddContact";

export default function ChatPage () {
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
                <TextField 
                    className='search-bar'  
                    variant='outlined' 
                    size='small' 
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                />
                {/*<Button className='add-chat-button' variant='outlined' startIcon={<AddIcon/>}></Button>*/}
                <AddContact></AddContact>

            </Box>
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
        </div>
    )
}
