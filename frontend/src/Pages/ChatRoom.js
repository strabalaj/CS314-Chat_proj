import React, { useEffect, useState } from 'react';
import ChatBox from '../Components/ChatBox';
import { useLocation } from 'react-router-dom';
import ExistingConversations from '../Components/ExistingConversations';
import { getAllConvos } from '../Helpers/requests';
import Navigator from '../Components/Navigator';
import './ChatRoom.css';
import socketIO from 'socket.io-client';
import CreateGroupModal from '../Components/CreateGroupModal';


const io = socketIO.connect('https://cs314-chat-proj-backend.onrender.com/');


const ChatRoom = () => {
    const { state } = useLocation();

    // always will get existing convo when chat room rerenders
    const [conversations, setConversations] = useState([])
    const [selectedConversation, setSelectedConversation] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [conversationHistory, setConversationHistory] = useState([])
    const [messages, setMessages] = useState([]);

    useEffect( () => {
        getAllConvos(state.token, setConversations);
    }, [state.token])

    return (

        <div className='chat-room' style={{ width: '100%'}}>
            <Navigator setConversations={setConversations} io={io}/>
            <div className='chat-container'>

                <ExistingConversations 
                    conversations={conversations} 
                    setSelectedConversation={setSelectedConversation} 
                    currentUserId={state.id} 
                    io={io} 
                    setConversations={setConversations} 
                    openModal={() => setIsModalOpen(true)}
                    setConversationHistory={setConversationHistory}
                    currentUserToken={state.token}
                    setMessages={setMessages}
                />

                <ChatBox 
                    selectedConversation={selectedConversation}   
                    currentUserId={state.id} 
                    currentUserToken={state.token} 
                    io={io}
                    conversationHistory={conversationHistory}
                    messages={messages}
                    setMessages={setMessages}
                />

            </div>
            <CreateGroupModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                setConversations={setConversations}    
                io={io}
            />
        </div>
    );
};

export default ChatRoom;