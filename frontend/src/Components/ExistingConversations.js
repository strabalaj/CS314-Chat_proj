// this shows the empty chat room between me and a new user that i search

import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ChatLoading from './ChatLoading';
import { map, union } from 'lodash';
import { Text } from '@chakra-ui/react';
import { isUndefined, isEmpty } from 'lodash';
import CreateGroupModal from './CreateGroupModal';
import { getAllConvos, getMessageHistory } from '../Helpers/requests';
import './ExistingConversations.css';
import ClearIcon from '@mui/icons-material/Clear';
import { removeConversation } from '../Helpers/requests';

const ExistingConversations = ({conversations, setSelectedConversation, currentUserId, io, setConversations, openModal, setConversationHistory, currentUserToken, setMessages}) => {
    console.log("CONVERSATIONS", conversations)
    function getContactName(conversation) {
        if(conversation.if_group_chat === true) {
            return conversation.chat_name;
        }
        if(!isUndefined(conversation.users)) {
            if(conversation.users[0]._id === currentUserId) {
                return conversation.users[1].name;
            }
            return conversation.users[0].name;
        }

    }

    function handleSelectConversation(conversation) {
        setSelectedConversation(conversation);
        setMessages([]);
        getMessageHistory(conversation._id, currentUserToken, setConversationHistory);
    }

    function handleRemoveConversation(conversation) {
        removeConversation(conversation._id, currentUserToken, setConversations);

    }

    useEffect( () => {
        io.on('create_conversation', (data) => {
            const prevConversations = conversations;
            setConversations(union(conversations, [data]));
            });
    }, [conversations])

    return (
        <Box
            className='my-conversations'
            flexDir='column'
            alignItems='center'
            p={3}
            bg='white'
            w={{ base: "100%", md: "31%" }}
            h='100%'
            borderRadius='lg'
            borderWidth='2px'
            borderColor='black'
            marginTop='50px'
            marginLeft='40px'
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily='Work sans'
                d="flex"
                w="100%"
                justifyContent='space-between'
                alignItems='center'
            >
                My Conversations
                <Button
                    d='flex'
                    fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                    rightIcon={<AddIcon/>}
                    bg='#FEFED0'
                    _hover={{ bg: '#BEE3F8' }}
                    borderWidth='2px'
                    borderColor='black'
                    fontFamily='Work sans'
                    onClick={openModal}
                >
                    New Group Chat
                </Button>
            </Box>
            <Box
                className='search-results-container'
                d='flex'
                flexDir='column'
                p={3}
                bg="white"
                w='100%'
                h='100%'
                borderRadius='lg'
                overflow='hidden'
            >
                {conversations ? (
                    <Stack overflowY='scroll'>
                        <div className='search-results'>
                        {
                            !isEmpty(conversations) && map(conversations, (conversation) =>
                                <Box
                                    bg='#FEFED0'
                                    cursor='pointer'
                                    px={3}
                                    py={2}
                                    borderRadius='lg'
                                    borderWidth='2px'
                                    borderColor='black'
                                    marginBottom='5px'
                                    key={conversation._id}
                                >
                                    <Button bg='#FEFED0'  fontFamily='work sans' onClick={ () => handleSelectConversation(conversation)} _hover={{ bg: '#FEFED0' }}>
                                        {getContactName(conversation)}
                                    </Button>
                                    <Button bg='#FEFED0'  fontFamily='work sans' onClick={ () => handleRemoveConversation(conversation)} _hover={{ bg: '#FEFED0' }}>
                                        <ClearIcon fontSize="small"/>
                                    </Button>
                                </Box>
                            )
                        }
                        </div>
                    </Stack>
                ) : (
                    <ChatLoading/>
                )}

            </Box>
        </Box>
    );
};

export default ExistingConversations;