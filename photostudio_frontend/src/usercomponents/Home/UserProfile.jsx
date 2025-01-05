
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../State/Authentication/Action';

export const UserProfile = () => {
    const {auth} =useSelector((store)=>store)
  const navigate=useNavigate();
  const dispatch=useDispatch();
    const handleLogout=()=>{
      dispatch(logoutUser());
      navigate("/")
    }
  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center'>
        <div className='flex flex-col items-center justify-center'>
            <AccountCircleIcon sx={{fontSize:"9rem"}}/>
            <h1 className='py-5 text-2xl font-semibold'>
                {auth.user?.firstName}
            </h1>
            <p>{auth.user?.email}</p>
            <Button variant='contained' onClick={handleLogout} sx={{margin:"2rem 0rem"}}>Logout</Button>
        </div>
      
    </div>
  )
}
