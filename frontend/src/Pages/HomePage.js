import { Container, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from '../Components/Authentication/Login';
import SignUp from '../Components/Authentication/SignUp';

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
                bg={'orange'}
                w='100%'
                m="40px 0 15px 0"
                borderRadius='lg'
                borderWidth='1px'
            >
                <Text fontSize="4xl" color='black'>Buzz</Text>
            </Box>
            <Box
                bg='white'
                w='100%'
                p={4}
                borderRadius='lg'
                color='black'
                borderWidth='1px'
            >
                <Tabs variant='soft-rounded'>
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