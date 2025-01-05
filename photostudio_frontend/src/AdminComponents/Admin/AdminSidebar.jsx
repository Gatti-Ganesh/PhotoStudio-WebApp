import { Divider, Drawer, useMediaQuery } from '@mui/material'
import React from 'react'
import { logoutUser } from '../../usercomponents/State/Authentication/Action'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Dashboard, Logout, ShoppingBag } from '@mui/icons-material'
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';

const menu=[
    {titile:"Dashboard",icon:<Dashboard/>,path:""},
    {titile:"Bookings",icon:<ShoppingBag/>,path:"bookings"},
    {titile:"Client Albums",icon:<ShopTwoIcon/>,path:"client-albums"},
    {titile:"All Clients",icon:<CategoryIcon/>,path:"all-clients"},
    
    {titile:"Logout",icon:<Logout/>,path:"/"}

]

export const AdminSidebar = ({handleClose}) => {
    const isSmallScreen =useMediaQuery("(max-width:1080px")
    
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleNavigate=(item)=>{
        navigate(`/admin/${item.path}`)
        if(item.titile==="Logout"){
         navigate("/")
         dispatch(logoutUser())
         handleClose()
        }
     }
  return (
    <div>
      
      <>
        <Drawer variant={isSmallScreen?"temporary":"permanent"} onClose={handleClose} open={true} anchor='left' sx={{zIndex:1}}>
           <div  className='w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]'>
               {menu.map((item,i)=> <>
               <div onClick={()=>handleNavigate(item)} className='px-5 flex item-center gap-5 cursor-pointer'>
                {item.icon}
                <span>{item.titile}</span>
               </div>
               { i!== menu.length-1 && <Divider/>}
               </>)}
           </div>
        </Drawer>
      </>
    </div>
  )
}
