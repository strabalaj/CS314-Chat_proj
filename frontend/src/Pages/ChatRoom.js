import React, { useEffect, useState } from 'react';
import SearchBar from '../Components/SearchBar';
import { Box } from '@chakra-ui/react';
import ChatBox from '../Components/ChatBox';
import { useLocation } from 'react-router-dom';
import ExistingConversations from '../Components/ExistingConversations';



const ChatRoom = () => {
    const { state } = useLocation();
    console.log("state in chatRoom", state);
    const [selectedConversation, setSelectedConversation] = useState({});
    const [chats, setChats] = useState([]);
    return (
        <div style={{ width: '100%'}}>
            <SearchBar setSelectedConversation={setSelectedConversation}/>
            <Box
                d='flex'
                justifyContent='space-between'
                w='100%'
                h='91.5vh'
                p='10px'
            >
                <ExistingConversations username={state.username} selectedConversation={selectedConversation}/>
                <ChatBox/>
            </Box>
        </div>
    );
};

export default ChatRoom;