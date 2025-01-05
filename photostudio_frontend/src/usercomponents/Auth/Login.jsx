import { Button, TextField, Typography} from '@mui/material'
import React, { useState } from 'react'
import {Formik, Field,Form} from 'formik';
import {Await, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { loginUser } from '../State/Authentication/Action';
const initialValues={
    email:"",
    password:""
}

export const Login = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
   const [error, setError] = useState("");

const handleSubmit = async (values) => {
  try {
    // Dispatch login action
    
    await dispatch(loginUser({ userData: values, navigate }));
    
  } catch (err) {
    setError("Invalid credentials. Please try again.");
    console.log("submit login error: ",error);
  }
};
  return (
    <div>
       {error && <Typography color="error" align="center">{error}</Typography>}
       <Typography variant='h5' className='text-center'>
           Login
       </Typography>
       <Formik onSubmit={handleSubmit} initialValues={initialValues}>
           <Form>
              <Field
                 as={TextField}
                 name="email"
                 label="Email"
                 variant="outlined"
                 fullWidth
                 margin="normal"
                 
              />
              <Field
                 as={TextField}
                 name="password"
                 label="password"
                 variant="outlined"
                 type="password"
                 fullWidth
                 margin="normal"
                 
                 
              />
              <Button sx={{mt:2,padding:"1rem"}} fullWidth type="submit" variant='contained'>Login</Button>
           </Form>
       </Formik>
       <Typography variant='body2' align='center' sx={{mt:3}}>
          Don't have an account?
          <Button size='small' onClick={()=> navigate("/account/register")}>
             Register
          </Button>
       </Typography>
    </div>
  )
}
