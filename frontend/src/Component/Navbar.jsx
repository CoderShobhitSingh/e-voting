import React from 'react'
import {AppBar ,Typography,Toolbar,Button}  from "@mui/material"
import Logout from './Logout'
import {Link} from 'react-router-dom'


const Navbar = () => {
  const button={marginRight:'20px', fontSize:'1.1rem', fontWeight:'700', padding:'0.2rem 1.3rem'}
  return (
    <AppBar>
        <Toolbar>
            <Typography variant='h4' sx={{flexGrow : 1}}>VoteEx</Typography>
            <Button style={button} color='warning' variant='contained' to="/login" component={Link}>Login</Button>
            <Button style={button}  variant='contained' to="/signup" component={Link}>Signup</Button>
            <Logout />
        </Toolbar>
    </AppBar>
  )
}

export default Navbar