import React, { useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { Input } from '@chakra-ui/react';
import { getMessageHistory } from '../Helpers/requests';
import { map, isUndefined } from 'lodash';
import './ChatBox.css';
import SendIcon from '@mui/icons-material/Send';




const ChatBox = ({selectedConversation, currentUserId, currentUserToken, io}) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    function getContactName(selectedConversation) {
        if(!isUndefined(selectedConversation.users)) {
            if(selectedConversation.users[0]._id === currentUserId) {
                return selectedConversation.users[1].name;
            }
            return selectedConversation.users[0].name;
        }
    }
    const handleOnSubmit = () => {
        io.emit("chat_message", {sender: currentUserId, message, chat: selectedConversation._id});
        setMessage('')
    }
    useEffect( () => {
        if(!isEmpty(selectedConversation)) {
            getMessageHistory(selectedConversation._id, currentUserToken, setMessages);
        }
        io.on('chat_message', (message) => {
            const prevMessages = messages
            setMessages([... prevMessages, message]);
            });
    }, [messages, selectedConversation._id])
    return (
        <div className='chat-box'>
            <Box
                    className='text-box'
                    h='800px'
                    w='900px'
                    display="flex"
                    alignItems="center"
                    padding={20}
                    bg='white'
                    margin='50px'
                    borderWidth='2px'
                    borderColor='black'
                    borderRadius='lg'
                >
                    {/*{!isEmpty(selectedConversation) && selectedConversation.users[1].name}*/}
                    <div className='contact-name'>
                        {getContactName(selectedConversation)}
                    </div>
                    <div className='message-history'>
                        {
                            map(messages, (message) => {
                                return (
                                    <div className='single-message'>
                                        {message.message}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='send-chat'>
                        <Input marginTop='700px' marginLeft='-60px' fontFamily='work sans' onChange={ (event) => setMessage(event.target.value) }/>
                        <Button rightIcon={<SendIcon/>} bg='#FEFED0' _hover={{ bg: '#BEE3F8' }} borderWidth='2px' borderColor='black' marginLeft='600px' onClick={ handleOnSubmit }></Button>
                    </div>
                
                </Box>
        </div>
    );
};

export default ChatBox;