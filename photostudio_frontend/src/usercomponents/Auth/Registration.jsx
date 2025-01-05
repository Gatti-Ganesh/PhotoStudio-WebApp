import React from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import {Formik, Field,Form} from 'formik';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { registerUser } from '../State/Authentication/Action';
const initialValues={
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    role:""
}
export const Registration = () => {
    const navigate=useNavigate();
    const dispatch =useDispatch();

    const handleSubmit=(values)=>{
      dispatch(registerUser({userData:values,navigate}))
    }
  return (
    <div>
       <Typography variant='h5' className='text-center'>
           Register
       </Typography>
       <Formik onSubmit={handleSubmit} initialValues={initialValues}>
           <Form>
              <Field
                 as={TextField}
                 name="firstName"
                 label="First Name"
                 variant="outlined"
                 fullWidth
                 margin="normal"
                 
              />
              <Field
                 as={TextField}
                 name="lastName"
                 label="Last Name"
                 variant="outlined"
                 fullWidth
                 margin="normal"
                 
              />
              <Field
                 as={TextField}
                 name="email"
                 label="email"
                 variant="outlined"
                 fullWidth
                 margin="normal"
                 
              />
              <Field
                 as={TextField}
                 name="password"
                 label="password"
                 variant="outlined"
                 fullWidth
                 margin="normal"
                 type="password"
                 
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-simple-select-label">Role</InputLabel>
                <Field
                    as={Select}
                    name="role"
                    labelId="role-simple-select-label"
                    id="role-simple-select"
                    label="role"
                >
                    <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                    <MenuItem value={"ROLE_ADMIN"}>Admin</MenuItem>
                   
                </Field>
                </FormControl>
              <Button sx={{mt:2,padding:"1rem"}} fullWidth type="submit" variant='contained'>Register</Button>
           </Form>
       </Formik>
       <Typography variant='body2' align='center' sx={{mt:3}}>
          If have an account already?
          <Button size='small' onClick={()=> navigate("/account/login")}>
             Login
          </Button>
       </Typography>
    </div>
  )
}
