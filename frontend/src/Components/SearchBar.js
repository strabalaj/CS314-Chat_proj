// search bar closes once user to chat with is selected

import { Box, Button, Center, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyProfileModal from './MyProfileModal';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import ChatLoading from './ChatLoading';
import UserItem from './UserItem';
import { map } from 'lodash';
import { Spinner } from '@chakra-ui/react';

const SearchBar = ({setSelectedConversation}) => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState({});
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose} = useDisclosure();
    const toast = useToast();
    const { state } = useLocation();
    
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate('/');
    };

    const handleSearch = async() => {
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
        //console.log(state)
        fetch(`http://localhost:5002/api/user?search=${search}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${state.token}`,
                "Content-type" : "application/json"
            }
        }).then((response) => {
            setLoading(false);
            if(response.status === 200) {
                console.log("searching", response)
                response.json().then(json => {
                    console.log("json", json);
                    setSearchResult(json);
                })
            }
            if(response.status !== 200) {
                toast({
                    title: "Invalid Search",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position:"bottom-left",
                });
            }
        })
    };

    const onSelectGroupChat = (selectedUsername, selectedUserId) => {
        onClose();
        createConversation(selectedUserId);
        setSelectedConversation(selectedUsername);
    }
    const createConversation = (selectedUserId) => {
        fetch(`http://localhost:5002/api/chat/new_single_chat`, {
            method: "POST",
            body: JSON.stringify({
                userId: selectedUserId
            }),
            headers: {
                "Authorization": `Bearer ${state.token}`,
                "Content-type" : "application/json"
            }
        }).then((response) => {
            if(response.status === 200) {
                response.json().then(json => {
                    console.log("seleceted userId", selectedUserId)
                    console.log("sent userId", json);
                })
            }
            if(response.status !== 200) {
                toast({
                    title: "Error Creating Chat",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position:"bottom-left",
                });
            }
        })
    };

    return (
        <>
        <Box
            d='flex'
            justifyContent='space-between'
            alignItems='center'
            bg='white'
            w='100%'
            p='5px'
            borderWidth='5px'
        >
            <Tooltip 
                label="Find a User to Message"
                hasArrow
                placement='bottom-end'
            >
                <Button 
                    onClick={onOpen}
                    variant='outline' 
                    leftIcon={<SearchIcon />} 
                    //outlineColor='black'
                >
                    <Text d={{base:'none', md:'flex'}} px='4'>
                        Search User
                    </Text>
                </Button>
            </Tooltip>

            <Center>
                Buzz
            </Center>
            {/*<Text fontSize='2xl'>
                Buzz
            </Text>*/}
            <div className='drop-menu'>
                <Menu>
                    <MenuButton p='1'>
                        <div className='bell'>
                            <NotificationsIcon/>
                        </div>
                    </MenuButton>
                    {/*{<MenuList></MenuList>}*/}
                </Menu>
                <Menu>
                <MenuButton as={Button} rightIcon={<ExpandMoreIcon/>}>
                    Profile        
                </MenuButton>
                <MenuList>
                    <MyProfileModal>
                        <MenuItem>My Profile</MenuItem>
                    </MyProfileModal>
                    <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
                </MenuList>
                </Menu>
            </div>    
        </Box>
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
                <DrawerBody>
                    <Box
                        d='flex'
                        pd={2}
                    >
                        <Input
                            placeholder='Search By Username'
                            mr={2}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button 
                            onClick={handleSearch}
                        >
                            Go
                        </Button>
                    </Box>
                    {loading ? <ChatLoading/> : 
                        (   
                            map(searchResult, (result) =>
                                <UserItem
                                    key={result.username}
                                    user={result}
                                    onClick={ () => onSelectGroupChat(result.username, result._id)}
                                />
                            )
                        )
                    }
                    {loadingChat && <Spinner m1="auto" d="flex"/>}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
        </>
    );
};

export default SearchBar;