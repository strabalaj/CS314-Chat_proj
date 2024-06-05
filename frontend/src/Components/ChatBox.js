import React, { useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { Input } from '@chakra-ui/react';
import { createMessage, getMessageHistory } from '../Helpers/requests';
import { map, isUndefined, union } from 'lodash';
import './ChatBox.css';
import SendIcon from '@mui/icons-material/Send';




const ChatBox = ({selectedConversation, currentUserId, io, conversationHistory, currentUserToken, messages, setMessages}) => {
    const [message, setMessage] = useState("");
    

    function getContactName(selectedConversation) {
        if(!isUndefined(selectedConversation.users)) {
            if(selectedConversation.if_group_chat === true){
                return selectedConversation.chat_name;
            }
            if(selectedConversation.users[0]._id === currentUserId) {
                return selectedConversation.users[1].name;
            }
            return selectedConversation.users[0].name;
        }
    }

    function getStyle(message) {
        if(message.sender._id === currentUserId) {
            return 'single-message current-user-message'
        }
        else {
            return 'single-message member-message'
        }
    }
    const handleOnSubmit = () => {
        // TO DO: make api request to save new message
        createMessage(message, selectedConversation._id, currentUserToken,io)
        setMessage('')
    }
    useEffect( () => {
        io.on('chat_message', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
            });
            
            return () => {
            io.off('chat_message');
            };
    }, [])
    return (
            <Box
                    className='chat-box'
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
                    <div className='contact-name'>
                        {getContactName(selectedConversation)}
                    </div>
                    <div className='message-history'>
                        {
                            !isEmpty(union(conversationHistory, messages)) && 
                            map(union(conversationHistory, messages) , (message) => {
                                return (
                                    <div className={getStyle(message)}>
                                        {message.sender.name + ':' +'   '}
                                        {message.message}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='send-chat'>
                        <Input className='input-box' marginTop='700px' marginLeft='-60px' value={message} fontFamily='work sans' onChange={ (event) => setMessage(event.target.value) }/>
                        <Button className='send-button' rightIcon={<SendIcon/>} bg='#FEFED0' _hover={{ bg: '#BEE3F8' }} borderWidth='2px' borderColor='black' marginLeft='600px' onClick={ handleOnSubmit }></Button>
                    </div>
                
                </Box>
    );
};

export default ChatBox;