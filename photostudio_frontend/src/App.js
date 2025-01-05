import {ThemeProvider,CssBaseline} from '@mui/material';
import {darkTheme} from './Theme/DarkTheme';
import './App.css';
import { Routers } from './Routers/Routers';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './usercomponents/State/Authentication/Action';

function App() {
  const dispatch =useDispatch();
  const {auth} =useSelector((store)=>store);
  const jwt =localStorage.getItem("jwt");
  
    useEffect(()=>{
      dispatch(getUser(jwt || auth.jwt))
    },[auth.jwt])
  
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Routers/>
    </ThemeProvider>
  );
}

export default App;
