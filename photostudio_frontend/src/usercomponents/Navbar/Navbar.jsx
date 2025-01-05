import React,{ useState } from 'react'
import {IconButton,Avatar} from '@mui/material';
import { AppBar, Toolbar,Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {  useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Person } from '@mui/icons-material';
import { logoutUser } from '../State/Authentication/Action';
import  img from '../img/image.png'
export const Navbar = () => {
  const location =useLocation();
  const {auth} =useSelector((store)=>store);
  const dispatch=useDispatch();
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const navigate =useNavigate();
  const handleMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleAvatarClick=()=>{
       
    if(auth.user?.role==="ROLE_CUSTOMER"){
        navigate("/my-profile")
    }else{
        navigate("/admin/")
    }
}
  
const handleLogout=()=>{
  dispatch(logoutUser());
  navigate("/")
}
  const navLinks = ['Services', 'About', 'Clients Albums', 'Contact'];
  return (
   
    <AppBar position="static" className=" p-3 shadow-none" style={{ backgroundColor: "#000000" }}>
      <Toolbar className="flex justify-between">
        {/* Logo */}
        <div className="text-2xl font-serif tracking-wider cursor-pointer" onClick={()=>navigate("/")} ><img
          src={img} 
          alt="image"
          className="object-cover w-auto h-auto max-h-[90px] max-w-[100px]"
        /></div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 cursor-pointer">
          {navLinks.map((link) => (
            <a
              key={link}
              onClick={() => navigate(`/${link.toLowerCase().replace(" ", "-")}`)}
              className="hover:text-gray-300 transition pt-3"
            >
              {link}
            </a>
          ))}
          
          { auth.user?<a
                    key="MyBookigs"
                    onClick={() => navigate(`/my-bookings`)}
                    className="hover:text-gray-300 transition pt-3"
                  >
                    MyBookigs
                  </a>: ""

          }

          {auth.user?<Avatar sx={{bgcolor:"white",color:"black"}} onClick={handleAvatarClick}> {auth.user?.firstName[0].toUpperCase()}</Avatar>:
                           <IconButton onClick={()=>navigate("/account/login")}>
                            <Person/>
                           </IconButton>
          }
          
          
        </div>

        {/* Mobile Menu Icon */}
        <div className="flex md:hidden" >
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>

      {/* Mobile Menu */}
      
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMenuClose}
        className="md:hidden bg-gray-800"
        
      >
        
        {navLinks.map((link) => (
          
          <MenuItem
             
          key={link}
          onClick={() => {
            handleMenuClose();
            navigate(`/${link.toLowerCase().replace(" ", "-")}`);
          }}
          
        >
          {link}
        </MenuItem>
        ))}

        { auth.user?<p
                    key="MyBookigs"
                    onClick={() =>{handleMenuClose(); navigate(`/my-bookings`)} }
                    className="w-full pb-3 pl-4 cursor-pointer "
                  >
                    MyBookigs
                  </p>: ""

          }

        {auth.user?<p onClick={()=>{handleMenuClose(); handleLogout();}} className="w-full pl-4 cursor-pointer ">Logout</p>:
                           <p onClick={()=>{handleMenuClose(); navigate("/account/login")}} className="w-full pl-4 cursor-pointer ">Login</p>
                         }
        
      </Menu>
      
    </AppBar>
  )
}

