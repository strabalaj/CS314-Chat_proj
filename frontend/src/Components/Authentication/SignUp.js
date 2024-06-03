import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState()
    const [username, setUserName] = useState()
    const [password, setPassWord] = useState()
    const toast = useToast()
    const navigate = useNavigate()

    const handleClick = () => setShow(!show);
    const submitHandler = async() => {
        if(!name || !username || !password) {
            toast({
                title: "Fill in all the Fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position:"bottom",
            });
        }
        fetch("http://localhost:5002/api/user/register", {
            method: "POST",
            body: JSON.stringify({
                name,
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
                    navigate("/ChatRoom", {state: {username, token: json.token}})
                })
            }
            if(response.status !== 200) {
                toast({
                    title: "User Exists",
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
            <FormControl id='full-name' isRequired>
                <FormLabel fontFamily='work sans'>Name</FormLabel>
                <Input
                    placeholder='Enter Name'
                    fontFamily='work sans'
                    onChange={ (e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id='user-name' isRequired>
                <FormLabel fontFamily='work sans'>Username</FormLabel>
                <Input
                    placeholder='Enter Username'
                    fontFamily='work sans'
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
                        onChange={ (e) => setPassWord(e.target.value)}
                    />
                    <InputRightElement width='4.5rem' fontFamily='work sans'>
                        <Button fontFamily='work sans' h='1.75rem' size='sm' onClick={handleClick} >
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button 
                bg='#FEFED0'
                width='100%'
                fontFamily='work sans'
                style={{marginTop: 15}}
                _hover={{ bg: '#BEE3F8' }}
                onClick={submitHandler}
            >
                Sign Up
            </Button>
        </VStack>
    );
};

export default SignUp