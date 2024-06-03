import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    HStack,
  } from '@chakra-ui/react';
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { Input } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { getSearchResults } from "../Helpers/requests";
import ChatLoading from "./ChatLoading";
import { filter, map, union } from 'lodash';
import UserItem from "./UserItem";
import { Spinner } from "@chakra-ui/react";
import {
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
  } from '@chakra-ui/react';
import { createGroupConversation } from "../Helpers/requests";

function CreateGroupModal({isOpen, onClose, setConversations, io}) {
    const [search, setSearch] = useState("");
    const [groupName, setGroupName] = useState("");
    const toast = useToast();
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState({});
    const [loadingChat, setLoadingChat] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState([]);

    const handleSearch = () => {
        setLoading(true);
        if(!search) {
            toast({
                title: "Enter a Username to Search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
        }
        getSearchResults(search, setSearchResult, state.token, setLoading);
    };

    const handleSelectContact = (result) => {
        setSelectedContacts(union(selectedContacts,[result]));
    }

    const handleRemoveContact = (contactToRemove) => {
        setSelectedContacts(filter(selectedContacts, (contact) => contact._id !== contactToRemove._id));
    }

    const handleCreateGroup = () => {
        createGroupConversation(state.token, groupName, selectedContacts, setConversations, io);
        onClose();
    }

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Group Chat</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Input
                            placeholder='Enter Group Chat Name'
                            fontFamily='work sans'
                            borderWidth='2px'
                            borderColor='black'
                            mr={2}
                            marginBottom='10px'
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                />
                Select Users
                <Input
                            placeholder='Search By Username'
                            fontFamily='work sans'
                            borderWidth='2px'
                            borderColor='black'
                            mr={2}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                />
                <div>
                    <HStack>
                    {
                        map(selectedContacts, (contact) => {
                            return (
                                <Tag
                                    size={'sm'}
                                    key={'sm'}
                                    borderRadius='full'
                                    variant='solid'
                                    colorScheme='green'
                                >
                                    <TagLabel>{contact.username}</TagLabel>
                                    <TagCloseButton onClick={() => handleRemoveContact(contact)}/>
                                </Tag>
                            )
                        })
                    }
                    </HStack>
                </div>
                <Button 
                    onClick={handleSearch}
                        fontFamily='work sans'
                        bg='#FEFED0'
                        _hover={{ bg: '#BEE3F8' }}
                        borderWidth='2px'
                        borderColor='black'
                        marginTop='5px'
                    >
                        Go
                </Button>
                {loading ? <ChatLoading/> : 
                        (   
                            map(searchResult, (result) =>
                                <UserItem
                                    key={result.username}
                                    user={result}
                                    onClick={ () => handleSelectContact(result)}
                                />
                            )
                        )
                    }
                    {loadingChat && <Spinner m1="auto" d="flex"/>}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost' onClick={handleCreateGroup}>Create Group</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
};

export default CreateGroupModal;