import React from 'react';
import { Box } from '@chakra-ui/react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Text } from '@chakra-ui/react';

const UserItem = ({key, user, onClick}) => {
    return (
        <div>
            <Box
                onClick={onClick}
                cursor='pointer'
                bg='#FEFED0'
                _hover={{ bg: '#BEE3F8' }}
                marginTop='10px'
                w='100%'
                d='flex'
                alignItems='center'
                color='black'
                px={3}
                py={2}
                mb={2}
                borderRadius='lg'
                borderWidth='2px'
                borderColor='black'
                fontFamily='work sans'
            >
                <AccountCircle/>
                <Box>
                    <Text fontFamily='work sans'>{user.name}</Text>
                    <Text fontSize='xs' fontFamily='work sans'>
                        <b>Username : </b>
                        {user.username}
                    </Text>
                </Box>
            </Box>
        </div>
    );
};

export default UserItem;