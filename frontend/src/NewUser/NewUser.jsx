import React from "react";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import './NewUser.css'

const NewUser = ({onFullNameChange, onUsernameChange, onPasswordChange, onSubmitClick}) => {
    return (    
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
            <div className="new-user-contents">
                <Typography
                    variant="h1"
                    alignItems="center"
                    sx={{
                        fontFamily: 'Times',
                        }}
                >
                    Welcome New User!
                </Typography>
                <div className="input-new-fullname">
                    <input type="text" placeholder='Full Name' onChange={(e) => onFullNameChange(e)}/>
                    <p> </p>
                </div>
                <div className="input-new-username">
                    <input type="text" placeholder='Username' onChange={(e) => onUsernameChange(e)}/>
                    <p> </p>
                </div>
                <div className="input-new-password">
                    <input type="password" placeholder='Password' onChange={(e) => onPasswordChange(e)}/>
                </div>
                <Button 
                    sx={{
                        color: 'black',
                        backgroundColor:'#FEFED0',
                        border: "1px black solid",
                    }}
                    variant="outlined" 
                    onClick={onSubmitClick}
                >
                    Submit
                </Button>
                {/*<div className="input-container">
                    <TextField id="outlined-basic" label="Full Name" variant="outlined" onChange={(e) => onFullNameChange(e)}/>
                    <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e) => onUsernameChange(e)}/>
                    <TextField type="password" id="outlined-basic" label="Password" variant="outlined" onChange={(e) => onPasswordChange(e)}/>
                </div>
                    <Button variant="outlined" onClick={onSubmitClick}>Submit</Button>*/}
            </div>
        </Box>
    )
}

export default NewUser