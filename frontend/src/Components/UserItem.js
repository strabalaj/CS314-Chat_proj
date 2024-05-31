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
                bg='yellow'
                _hover={{
                    background: "grey",
                    color:'white',
                }}
                w='100%'
                d='flex'
                alignItems='center'
                color='black'
                px={3}
                py={2}
                mb={2}
                borderRadius='lg'
            >
                <AccountCircle/>
                <Box>
                    <Text>{user.name}</Text>
                    <Text fontSize='xs'>
                        <b>Username : </b>
                        {user.username}
                    </Text>
                </Box>
            </Box>
        </div>
    );
};

export default UserItem;