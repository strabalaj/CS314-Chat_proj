import React, { useState } from 'react';
import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [show, setShow] = useState(false)
    const [username, setUserName] = useState()
    const [password, setPassWord] = useState()
    const toast = useToast()
    const navigate = useNavigate()

    const handleClick = () => setShow(!show);
    const submitHandler = async () => {
        if(!username || !password) {
            toast({
                title: "Fill in all the Fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position:"bottom",
            });
        }
        fetch("http://localhost:5002/api/user/login", {
            method: "POST",
            body: JSON.stringify({
                username, 
                password
            }),
            headers: {
                "Content-type" : "application/json"
            }
        }).then((response) => {
            if(response.status === 200) {
                localStorage.setItem("userInfo", JSON.stringify(response))
                response.json().then(json => {
                    navigate("/ChatRoom", {state: {username, token: json.token, id: json._id}})
                })
                //navigate("/ChatRoom", {state: {username, token: response.token}})
            }
            if(response.status !== 200) {
                toast({
                    title: "Invalid Credentials",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position:"bottom",
                });
            }
        })
    };
    return (
        <VStack spacing='5px'>
            <FormControl id='user-name' isRequired>
                <FormLabel fontFamily='work sans'>Username</FormLabel>
                <Input
                    placeholder='Enter Username'
                    fontFamily='work sans'
                    value={username}
                    onChange={ (e) => setUserName(e.target.value)}
                />
            </FormControl>
            <FormControl id='pass-word' isRequired>
                <FormLabel fontFamily='work sans'>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text':'password'}
                        placeholder='Enter Password'
                        fontFamily='work sans'
                        value={password}
                        onChange={ (e) => setPassWord(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button fontFamily='work sans' bg='#FEFED0' _hover={{ bg: '#BEE3F8' }} h='1.75rem' size='sm' onClick={handleClick} >
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button 
                bg='#FEFED0'
                _hover={{ bg: '#BEE3F8' }}
                width='100%'
                style={{marginTop: 15}}
                onClick={submitHandler}
                borderWidth='2px'
                borderColor='black'
                fontFamily='work sans'
            >
                Login
            </Button>
            <Button
                bg='#FEFED0'
                _hover={{ bg: '#BEE3F8' }}
                fontFamily='work sans'
                width='100%'
                borderWidth='2px'
                borderColor='black'
                onClick={ () => {
                    setUserName("guest");
                    setPassWord("guest123");
                }}
            >
                Guest User
            </Button>
        </VStack>
    );
};

export default Login