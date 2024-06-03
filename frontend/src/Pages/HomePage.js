import { Container, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from '../Components/Authentication/Login';
import SignUp from '../Components/Authentication/SignUp';
import './HomePage.css';

const HomePage = () => {
    //const navigate = useNavigate();

    /*useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if(user) {
            navigate("/ChatRoom")
        }
    }, []);*/
    
    return (
        <Container maxW='xl' centerContent>
            <Box
                d='flex'
                justifyContent='center'
                p={3}
                bg={'#FEFED0'}
                w='100%'
                m="40px 0 15px 0"
                borderRadius='lg'
                borderWidth='2px'
                borderColor='black'
            >
                <div className='title'>
                    <Text fontFamily='work sans' fontSize="4xl" color='black'>Buzz</Text>
                </div>
            </Box>
            <Box
                bg='white'
                w='100%'
                p={4}
                borderRadius='lg'
                color='black'
                borderWidth='2px'
                borderColor='black'
            >
                <Tabs variant='soft-rounded' colorScheme='blue' fontFamily='work sans'>
                    <TabList mb='1em'>
                        <Tab width='50%'>Login</Tab>
                        <Tab width='50%'>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <SignUp />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};

export default HomePage;