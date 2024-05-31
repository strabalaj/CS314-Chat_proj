// this shows the empty chat room between me and a new user that i search

import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ChatLoading from './ChatLoading';
import { map } from 'lodash';
import { Text } from '@chakra-ui/react';

const getSender = (username, users) => {
    return users[0].username === username.username ? users[1].name : users[0].name;
};

const ExistingConversations = ({username, selectedConversation}) => {
    //const [loggedUser, setLoggedUser] = useState();
    const [contacts, setContacts] = useState([]);
    const toast = useToast();
    const { state } = useLocation(); // state is user logged in
    const [selectContact, setSelectedContact] = useState({});
    const fetchChats = async () => {
        //console.log(state._id);
        fetch(`http://localhost:5002/api/chat/history`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${state.token}`,
                "Content-type" : "application/json"
            }
        }).then((response) => {
            if(response.status === 200) {
                response.json().then(json => {
                    console.log("fetching existing chats", json);
                    console.log("fetching existing chat json", json);
                    setContacts(json);
                })
            }
            if(response.status !== 200) {
                toast({
                    title: "Error Fetching Chats",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position:"bottom-left",
                });
            }
        })
    }
    useEffect( () => {
        fetchChats();
    }, [selectedConversation])
    return (
        <Box
            d={{ base: selectedConversation ? "none" : "flex", md:"flex"}}
            flexDir='column'
            alignItems='center'
            p={3}
            bg='white'
            w={{ base: "100%", md: "31%" }}
            h='100%'
            borderRadius='lg'
            borderWidth='1px'
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
                >
                    New Group Chat
                </Button>
            </Box>
            <Box
                d='flex'
                flexDir='column'
                p={3}
                bg="yellow"
                w='100%'
                h='100%'
                borderRadius='lg'
                overflow='hidden'
            >
                {contacts ? (
                    <Stack overflowY='scroll'>
                        (
                            map(setContacts, (contacts) {
                                <Box
                                    onClick={ () => setSelectedContact(contacts)}
                                    cursor='pointer'
                                    bg={selectContact === contacts ? 'green' : 'pink'}
                                    color={selectContact === contacts ? 'white' : 'black'}
                                    px={3}
                                    py={2}
                                    borderRadius='lg'
                                    key={contacts.username}
                                >
                                    {console.log(contacts.username)}
                                    <Text>
                                        Contact Name
                                        {console.log("added contact",contacts.username)}
                                        {contacts.username}
                                        {/*{!contacts.if_group_chat? getSender(username, contacts.users):(contacts.chat_name)}*/}
                                    </Text>
                                </Box>
                            })
                        )
                    </Stack>
                ) : (
                    <ChatLoading/>
                )}

            </Box>
        </Box>
    );
};

export default ExistingConversations;