import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import './LoginForm.css'

const LoginForm = ({}) => {
    const [showNewUserContent, setShowNewUserContent] = useState(false);
    return (
        <div className='login-form'>
            <Box
                height={500}
                width={500}
                my={4}
                mx={55}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
                sx={{ 
                    border: '2px solid black', 
                    fontFamily: 'Times',
                    backgroundColor: "white",
                }}
            >
                {!showNewUserContent && (
                    <div className='existing-user-content'>
                        <h1 className='header'>Buzz</h1>
                        <TextField  className='username-field' label='Username' variant='outlined'/>
                        <TextField  className='password-field' label='Password' variant='outlined'/>
                        <Button className='submit-button'>Submit</Button>
                        <Button className='not-a-user' variant="primary" onClick={() => setShowNewUserContent(true)}>Not a user? Make an account</Button>
                    </div>
                )}
                {showNewUserContent && (
                    <div className='new-user-content'>
                        <h1 className='new-header'>Registration</h1>
                        <TextField  className='name-field' label='Full Name' variant='outlined'/>
                        <TextField  className='username-field' label='Username' variant='outlined'/>
                        <TextField  className='password-field' label='Password' variant='outlined'/>
                        <Button className='new-submit-button'>Submit</Button>
                    </div>
                )}
            </Box>
        </div>
    )
}

export default LoginForm;