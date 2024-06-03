import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import ChatBox from '../Components/ChatBox';
import { useLocation } from 'react-router-dom';
import ExistingConversations from '../Components/ExistingConversations';
import { getAllConvos } from '../Helpers/requests';
import Navigator from '../Components/Navigator';
import './ChatRoom.css';
import socketIO from 'socket.io-client';
import CreateGroupModal from '../Components/CreateGroupModal';


const io = socketIO.connect('http://localhost:5002');


const ChatRoom = () => {
    const { state } = useLocation();
    console.log("STATE", state)
    /*console.log("state in chatRoom", state);
    const [selectedConversation, setSelectedConversation] = useState({});
    const [chats, setChats] = useState([]);*/

    // always will get existing convo when chat room rerenders
    const [conversations, setConversations] = useState([])
    const [selectedConversation, setSelectedConversation] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect( () => {
        getAllConvos(state.token, setConversations);
    }, [state.token])

    console.log("conversations after get all", conversations)
    return (

        <div className='chat-room' style={{ width: '100%'}}>
            <Navigator setConversations={setConversations} io={io}/>
            <div className='chat-container'>
                <ExistingConversations conversations={conversations} setSelectedConversation={setSelectedConversation} currentUserId={state.id} io={io} setConversations={setConversations} openModal={() => setIsModalOpen(true)}/>
                <ChatBox selectedConversation={selectedConversation} currentUserId={state.id} currentUserToken={state.token} io={io}/>
            </div>
            <CreateGroupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setConversations={setConversations} io={io}/>
        </div>
    );
};

export default ChatRoom;