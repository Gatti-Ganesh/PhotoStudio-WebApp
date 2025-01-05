import React from 'react'
import { AdminSidebar } from './AdminSidebar'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../Dashboard/Dashboard'
import { AdminBookings } from '../AdminBookings/AdminBookings'
import { Clients } from '../Clients/Clients'
import { Albums } from '../Albums/Albums'

export const Admin = () => {
    const handleClose=()=>{

    }
  return (
    <div>
      
      <div className='lg:flex justify-between'>
          <div>
            <AdminSidebar handleClose={handleClose}/>
          </div>
          <div className='lg:w-[80%]'>
              <Routes>
                <Route path='/' element={<Dashboard/>}></Route>
                <Route path='/bookings' element={<AdminBookings/>}></Route>
                <Route path='/all-clients' element={<Clients/>}></Route>
                <Route path='/client-albums' element={<Albums/>}></Route>
                
              </Routes>
          </div>
      </div>
    </div>
  )
}
