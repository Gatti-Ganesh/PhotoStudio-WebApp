import React from 'react'
import { Registration } from './Registration'
import { Login } from './Login'
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Modal } from '@mui/material';


const style = {
    position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#adb0b3', 
  outline: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px', 
  };
export const Auth = () => {
    const location=useLocation();
    const navigate =useNavigate();
    const handleOnClose=()=>{
        navigate("/")
    }
   
  return (
    <>
     
       <Modal onClose={handleOnClose} open={ 
        location.pathname==="/account/register" ||
        location.pathname==="/account/login"
       }>

        <Box sx={style}>
             {location.pathname==="/account/register"? <Registration/>:<Login/>}
          
        </Box>
          
       </Modal>
    </>
  )
}
