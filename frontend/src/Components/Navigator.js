// search bar closes once user to chat with is selected

import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyProfileModal from './MyProfileModal';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import UserItem from './UserItem';
import { map, isEmpty } from 'lodash';
import { createPrivateConversation, getSearchResults } from '../Helpers/requests';
import './Navigator.css';

const Navigator = ({setConversations, io}) => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose} = useDisclosure();
    const toast = useToast();
    const { state } = useLocation();
    
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate('/');
    };

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
            return;
        }
        getSearchResults(search, setSearchResult, state.token, setLoading);
    };

    const handleSelectContact = (selectedContactId) => {
        createPrivateConversation(selectedContactId, state.token, onClose, setConversations, io)
    }
    
    return (
        <>
        <Box
            d='flex'
            flexDirection='row'
            height='100px'
            justifyContent='space-between'
            alignItems='center'
            bg='white'
            w='100%'
            p='5px'
            borderWidth='2px'
            borderColor='black'
        >
            <Tooltip 
                label="Find a User to Message"
                hasArrow
                placement='bottom-end'
                bg='#BEE3F8'
                color='black'
            >
                <Button 
                    onClick={onOpen}
                    bg='#FEFED0'
                    _hover={{ bg: '#BEE3F8' }}
                    leftIcon={<SearchIcon />}
                    borderWidth='2px'
                    borderColor='black'
                    fontFamily='Work sans'
                    marginTop='10px'
                >
                    <Text d={{base:'none', md:'flex'}} px='4'>
                        Search User
                    </Text>
                </Button>
            </Tooltip>

            <div className='header'>
                <Text fontSize='4xl' fontFamily='work sans'>Buzz</Text>
            </div>
            <div className='drop-menu'>
                <Menu>
                <div className='profile-menu'>
                <Tooltip 
                    label="Profile Options"
                    hasArrow
                    placement='top'
                    bg='#BEE3F8'
                    color='black'
                >
                    <MenuButton as={Button} rightIcon={<ExpandMoreIcon/>} bg='#FEFED0' _hover={{ bg: '#BEE3F8' }} borderWidth='2px'
                        borderColor='black' fontFamily='Work sans' marginLeft='1300' marginBottom='200px'>
                        Profile        
                    </MenuButton>
                </Tooltip>
                </div>
                <MenuList>
                    <MyProfileModal>
                        <MenuItem fontFamily='work sans' _hover={{ bg: '#BEE3F8' }}>My Profile</MenuItem>
                    </MyProfileModal>
                    <MenuItem onClick={logoutHandler} fontFamily='work sans' _hover={{ bg: '#BEE3F8' }}>Log Out</MenuItem>
                </MenuList>
                </Menu>
            </div>    
        </Box>
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px' fontFamily='work sans' bg='white'>Search Users</DrawerHeader>
                <DrawerBody fontFamily='work sans' bg='white'>
                    <Box
                        d='flex'
                        pd={2}
                    >
                        <Input
                            placeholder='Search By Username'
                            fontFamily='work sans'
                            borderWidth='2px'
                            borderColor='black'
                            mr={2}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
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
                    </Box> 
                        {
                            !isEmpty(searchResult) && map(searchResult, (result) =>
                                <UserItem
                                    key={result.username}
                                    user={result}
                                    onClick={ () => handleSelectContact(result._id)}
                                />
                            )
                        }
                
                </DrawerBody>
            </DrawerContent>
        </Drawer>
        </>
    );
};

export default Navigator;