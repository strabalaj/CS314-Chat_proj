import React from 'react';
import { IconButton, useDisclosure } from '@chakra-ui/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';


const MyProfileModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { state } = useLocation();
    return (
        <div>
            {
                children ? (
                <span onClick={onOpen}>{children}</span>
                ) : (
                    <IconButton
                        d={{ base: 'flex' }}
                        icon={<AccountCircleIcon/>}
                        onClick={onOpen}
                    />
                )
            }
            <Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                    <ModalContent>
                        <ModalHeader
                            fontSize='40px'
                            fontFamily='work sans'
                            d='flex'
                            justifyContent='center'
                        >
                            Logged in as: {' '} 
                            {state.username}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody
                            d='flex'
                            flexDir='column'
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            {/*<AccountCircleIcon fontSize='large'/>*/}
                        </ModalBody>

                        <ModalFooter>
                            <Button bg='#FEFED0' _hover={{ bg: '#BEE3F8' }} fontFamily='work sans' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </div>
    );
};

export default MyProfileModal;