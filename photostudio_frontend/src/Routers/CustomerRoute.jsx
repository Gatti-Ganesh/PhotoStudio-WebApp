import React from 'react'

import { Route, Routes } from 'react-router-dom';
import { Home } from '../usercomponents/Home/Home';
import { Navbar } from '../usercomponents/Navbar/Navbar';
import { Services } from '../usercomponents/Services/Services';
import { About } from '../usercomponents/About/About';
import { Contactus } from '../usercomponents/ContactUs/Contactus';
import { Auth } from '../usercomponents/Auth/Auth';
import { Booking } from '../usercomponents/Booking/Booking';
import { UserProfile } from '../usercomponents/Home/UserProfile';
import { MyBookings } from '../usercomponents/Booking/MyBookings';
import { ClientsAlubums } from '../usercomponents/ClientsAlbums/ClientsAlubums';

export const CustomerRoute = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/account/:register' element={<Home/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/clients-albums' element={<ClientsAlubums/>}/>
            <Route path='/contact' element={<Contactus/>}/>
            <Route path='/services/book-now' element={<Booking/>}/>
            <Route path='/my-profile/*' element={<UserProfile/>}/>
            <Route path='/my-bookings/*' element={<MyBookings/>}/>
        </Routes>
        <Auth/>
    </div>
  )
}
