import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import './LoginForm.css'
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

const LoginForm = ({}) => {
    const [showNewUserContent, setShowNewUserContent] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const [alert, setAlert] = useState(false);
    
    function authenticateInfo() {
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
            if(response.status == 200) {
                navigate("/ChatPage")
            }
            if(response.status != 200) {
                setAlert(true);
            }
        })
    }
    function createUser() {
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
            if(response.status == 200) {
                navigate("/ChatPage")
            }
            if(response.status != 200) {
                setAlert(true);
            }
        })
    }
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
                        <TextField  className='username-field' label='Username' variant='outlined' onChange={(e) =>  setUsername(e.target.value)}/>
                        <TextField  className='password-field' label='Password' type="password" variant='outlined' onChange={(e) =>  setPassword(e.target.value)}/>
                        <Button className='submit-button' onClick={() => authenticateInfo()}>Submit</Button>
                        {alert ? <Alert variant="filled" severity="error">Invalid Credentials</Alert> : <></> }
                        <Button className='not-a-user' variant="primary" onClick={() => setShowNewUserContent(true)}>Not a user? Make an account</Button>
                    </div>
                )}
                {showNewUserContent && (
                    <div className='new-user-content'>
                        <h1 className='new-header'>Registration</h1>
                        <TextField  className='name-field' label='Full Name' variant='outlined' onChange={(e) =>  setName(e.target.value)}/>
                        <TextField  className='username-field' label='Username' variant='outlined' onChange={(e) =>  setUsername(e.target.value)}/>
                        <TextField  className='password-field' label='Password' type="password" variant='outlined' onChange={(e) =>  setPassword(e.target.value)}/>
                        <Button className='new-submit-button' variant="primary" onClick={() => createUser()}>Submit</Button>
                        {alert ? <Alert variant="filled" severity="error">User Already Exists!</Alert> : <></> }
                    </div>
                )}
            </Box>
        </div>
    )
}

export default LoginForm;