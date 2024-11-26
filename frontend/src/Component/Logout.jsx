import { Button } from '@mui/material'
import React from 'react'


const Logout = () => {
  const button={marginRight:'20px', fontSize:'1.1rem', fontWeight:'700', padding:'0.2rem 1.3rem'}
  return (
    <Button style={button} color='success' variant='contained'>Admin</Button>
  )
}

export default Logout